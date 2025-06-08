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

  // Valores simulados automáticos
  const TAXA_RENDIMENTO = "0,50% a.m. (definida pelo banco)";
  const TAXA_MANUTENCAO = "29,90 (definida pelo sistema)";
  const VALOR_MINIMO = "500,00";
  const LIMITE_DINAMICO = "Definido automaticamente pelo sistema";

  // Atualiza campos do form
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.cpf || !form.nome || !form.agencia) {
      setMensagem("Preencha todos os campos obrigatórios!");
      return;
    }
    setMensagem("Conta aberta com sucesso! Número: 12345-6");
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
        {/* Campos gerais */}
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

        {/* Campos específicos */}
        {tipo === "CP" && (
          <div className="campo-form">
            <label>Taxa de rendimento</label>
            <input
              name="taxaRendimento"
              value={TAXA_RENDIMENTO}
              disabled
              readOnly
              style={{ background: "#231b2d", color: "#e6bc6a" }}
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
                style={{ background: "#231b2d", color: "#e6bc6a" }}
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
                style={{ background: "#231b2d", color: "#e6bc6a" }}
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
                style={{ background: "#231b2d", color: "#e6bc6a" }}
              />
            </div>
          </>
        )}

        <button type="submit">Abrir Conta</button>
      </form>
      {mensagem && <div className="mensagem">{mensagem}</div>}
    </div>
  );
}
