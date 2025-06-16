"use client";
import { useState } from "react";
import "./abrir-conta.css";

export default function AbrirConta() {
  const [tipo, setTipo] = useState("CP");
  const [form, setForm] = useState({
    agencia: "",
    nome: "",
    cpf: "",
    nascimento: "",
    telefone: "",
    endereco: "",
    senha: "",
    perfilRisco: "",
    vencimento: "",
  });
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const TAXA_RENDIMENTO = "0,50% a.m. (definida pelo banco)";
  const TAXA_MANUTENCAO = "29,90 (definida pelo sistema)";
  const VALOR_MINIMO = "500,00";
  const LIMITE_DINAMICO = "Definido automaticamente pelo sistema";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTipoChange = (novoTipo) => {
    setTipo(novoTipo);
    setMensagem("");
    setForm({
      agencia: "",
      nome: "",
      cpf: "",
      nascimento: "",
      telefone: "",
      endereco: "",
      senha: "",
      perfilRisco: "",
      vencimento: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setLoading(true);

    if (!form.cpf || !form.nome || !form.agencia || !form.nascimento || !form.telefone || !form.endereco || !form.senha) {
      setMensagem("Preencha todos os campos obrigatórios!");
      setLoading(false);
      return;
    }
    if (tipo === "CI" && !form.perfilRisco) {
      setMensagem("Selecione o perfil de risco!");
      setLoading(false);
      return;
    }
    if (!id_cliente) {
      setMensagem("Cliente não encontrado pelo CPF.");
      setLoading(false);
      return;
    }
    const body = {
      numero_conta: null,
      id_agencia: Number(form.agencia),
      cpf_cliente: form.cpf,
      saldo: 0.0,
      tipo_conta:
        tipo === "CP"
          ? "poupanca"
          : tipo === "CC"
          ? "corrente"
          : "investimento",
      id_cliente: id_cliente,
      data_abertura: new Date().toISOString().split("T")[0],
      status: "ativa",
      agencia: {
        nome: "Agência Central",
        codigo_agencia: Number(form.agencia),
        endereco_id: "END123",
      },
      perfil_risco:
        tipo === "CI"
          ? form.perfilRisco
          : "medio", 
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        setMensagem("Conta aberta com sucesso!");
        setForm({
          agencia: "",
          nome: "",
          cpf: "",
          nascimento: "",
          telefone: "",
          endereco: "",
          senha: "",
          perfilRisco: "",
          vencimento: "",
        });
      } else {
        const data = await response.json();
        setMensagem(data.detail || "Erro ao criar conta.");
      }
    } catch (err) {
      setMensagem("Erro de conexão.");
    }
    setLoading(false);
  };

  return (
    <div className="abrir-conta-container">
      <h2>Abertura de Conta</h2>

      <div className="tipos-conta">
        <button className={tipo === "CP" ? "ativo" : ""} onClick={() => handleTipoChange("CP")}>Conta Poupança</button>
        <button className={tipo === "CC" ? "ativo" : ""} onClick={() => handleTipoChange("CC")}>Conta Corrente</button>
        <button className={tipo === "CI" ? "ativo" : ""} onClick={() => handleTipoChange("CI")}>Conta Investimento</button>
      </div>

      <form className="abrir-conta-form" onSubmit={handleSubmit}>
        <div className="campo-form">
          <label>Agência *</label>
          <input name="agencia" placeholder="Agência" value={form.agencia} onChange={handleChange} />
        </div>
        <div className="campo-form">
          <label>Nome completo *</label>
          <input name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} />
        </div>
        <div className="campo-form">
          <label>CPF *</label>
          <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} />
        </div>
        <div className="campo-form">
          <label>Data de nascimento *</label>
          <input name="nascimento" type="date" placeholder="Data de Nascimento" value={form.nascimento} onChange={handleChange} />
        </div>
        <div className="campo-form">
          <label>Telefone *</label>
          <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} />
        </div>
        <div className="campo-form">
          <label>Endereço completo *</label>
          <input name="endereco" placeholder="Endereço completo" value={form.endereco} onChange={handleChange} />
        </div>
        <div className="campo-form">
          <label>Senha *</label>
          <input name="senha" type="password" placeholder="Senha" value={form.senha} onChange={handleChange} />
        </div>

        {tipo === "CP" && (
          <div className="campo-form">
            <label>Taxa de rendimento</label>
            <input
              name="taxaRendimento"
              value={TAXA_RENDIMENTO}
              disabled
              readOnly
            />
          </div>
        )}

        {tipo === "CC" && (
          <>
            <div className="campo-form">
              <label>Limite dinâmico</label>
              <input
                name="limite"
                value={LIMITE_DINAMICO}
                disabled
                readOnly
              />
            </div>
            <div className="campo-form">
              <label>Data de vencimento *</label>
              <input
                name="vencimento"
                type="date"
                placeholder="Data de vencimento"
                value={form.vencimento}
                onChange={handleChange}
              />
            </div>
            <div className="campo-form">
              <label>Taxa de manutenção</label>
              <input
                name="taxaManutencao"
                value={TAXA_MANUTENCAO}
                disabled
                readOnly
              />
            </div>
          </>
        )}

        {tipo === "CI" && (
          <>
            <div className="campo-form">
              <label>Perfil de risco *</label>
              <select name="perfilRisco" value={form.perfilRisco} onChange={handleChange}>
                <option value="">Selecione o perfil</option>
                <option value="baixo">Baixo</option>
                <option value="medio">Médio</option>
                <option value="alto">Alto</option>
              </select>
            </div>
            <div className="campo-form">
              <label>Valor mínimo de investimento</label>
              <input
                name="valorMinimo"
                value={VALOR_MINIMO + " (definido pelo sistema)"}
                disabled
                readOnly
              />
            </div>
          </>
        )}

        <button type="submit" disabled={loading}>{loading ? "Abrindo..." : "Abrir Conta"}</button>
      </form>
      {mensagem && <div className="mensagem">{mensagem}</div>}
    </div>
  );
}