"use client";
import { useState } from "react";
import "./alterar-dados.css";

export default function AlterarDados() {
  const [aba, setAba] = useState("conta");
  const [busca, setBusca] = useState("");
  const [registro, setRegistro] = useState(null);
  const [form, setForm] = useState({});
  const [mensagem, setMensagem] = useState("");

  // Dados simulados para edição (mock)
  const dadosConta = {
    limite: "2000",
    vencimento: "2025-08-01",
    taxa: "0,50%",
    tipo: "CC",
    score: "720"
  };
  const dadosFuncionario = {
    cargo: "Atendente",
    telefone: "(61) 98765-1234",
    endereco: "Rua X, 111, Centro",
    nivelUsuario: "Atendente"
  };
  const dadosCliente = {
    telefone: "(61) 99888-2222",
    endereco: "Av. Y, 200",
    senha: ""
  };

  // Buscar registro (mock)
  const handleBuscar = (e) => {
    e.preventDefault();
    setMensagem("");
    if (!busca) return setMensagem("Digite o identificador para buscar!");
    if (aba === "conta") { setRegistro(dadosConta); setForm(dadosConta); }
    if (aba === "funcionario") { setRegistro(dadosFuncionario); setForm(dadosFuncionario); }
    if (aba === "cliente") { setRegistro(dadosCliente); setForm(dadosCliente); }
  };

  // Editar campos do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Salvar alterações
  const handleSubmit = (e) => {
    e.preventDefault();
    setMensagem("");
    // Senha de administrador obrigatória
    if (!form.senhaAdm) {
      setMensagem("Informe a senha de administrador para confirmar.");
      return;
    }
    // Validações específicas
    if (aba === "conta" && form.limite && registro.score && parseInt(form.limite) > 4000 && parseInt(registro.score) < 700) {
      setMensagem("Limite não permitido: score de crédito insuficiente.");
      return;
    }
    if (aba === "cliente" && form.senha && form.senha.length < 8) {
      setMensagem("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    setMensagem("Alterações salvas com sucesso! (Auditado)");
    // Aqui enviaria os dados antigos/novos para auditoria/back-end
  };

  return (
    <div className="alterar-dados-container">
      <h2>Alteração de Dados</h2>
      <div className="submenu-consulta">
        <button className={aba === "conta" ? "ativo" : ""} onClick={() => { setAba("conta"); setRegistro(null); setMensagem(""); }}>Conta</button>
        <button className={aba === "funcionario" ? "ativo" : ""} onClick={() => { setAba("funcionario"); setRegistro(null); setMensagem(""); }}>Funcionário</button>
        <button className={aba === "cliente" ? "ativo" : ""} onClick={() => { setAba("cliente"); setRegistro(null); setMensagem(""); }}>Cliente</button>
      </div>

      <form className="busca-form" onSubmit={handleBuscar}>
        <input
          type="text"
          placeholder={
            aba === "conta"
              ? "Digite o número da conta ou CPF"
              : aba === "funcionario"
              ? "Digite o código ou nome do funcionário"
              : "Digite o CPF ou nome do cliente"
          }
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {registro && (
        <form className="alterar-form" onSubmit={handleSubmit}>
          {aba === "conta" && (
            <>
              <div className="campo-form">
                <label>Limite disponível (R$)</label>
                <input
                  name="limite"
                  value={form.limite}
                  onChange={handleChange}
                  placeholder="Novo limite"
                  type="number"
                />
              </div>
              <div className="campo-form">
                <label>Data de vencimento</label>
                <input
                  name="vencimento"
                  type="date"
                  value={form.vencimento}
                  onChange={handleChange}
                />
              </div>
              <div className="campo-form">
                <label>Taxa de rendimento/manutenção (%)</label>
                <input
                  name="taxa"
                  value={form.taxa}
                  onChange={handleChange}
                  placeholder="Nova taxa (%)"
                />
              </div>
            </>
          )}
          {aba === "funcionario" && (
            <>
              <div className="campo-form">
                <label>Cargo</label>
                <select name="cargo" value={form.cargo} onChange={handleChange}>
                  <option value="Estagiário">Estagiário</option>
                  <option value="Atendente">Atendente</option>
                  <option value="Gerente" disabled={form.nivelUsuario !== "Gerente"}>Gerente</option>
                </select>
              </div>
              <div className="campo-form">
                <label>Telefone</label>
                <input
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  placeholder="Telefone"
                />
              </div>
              <div className="campo-form">
                <label>Endereço</label>
                <input
                  name="endereco"
                  value={form.endereco}
                  onChange={handleChange}
                  placeholder="Endereço"
                />
              </div>
            </>
          )}
          {aba === "cliente" && (
            <>
              <div className="campo-form">
                <label>Telefone</label>
                <input
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  placeholder="Telefone"
                />
              </div>
              <div className="campo-form">
                <label>Endereço</label>
                <input
                  name="endereco"
                  value={form.endereco}
                  onChange={handleChange}
                  placeholder="Endereço"
                />
              </div>
              <div className="campo-form">
                <label>Nova senha</label>
                <input
                  name="senha"
                  type="password"
                  value={form.senha}
                  onChange={handleChange}
                  placeholder="Nova senha"
                />
              </div>
            </>
          )}
          <div className="campo-form">
            <label>Senha de Administrador *</label>
            <input
              name="senhaAdm"
              type="password"
              value={form.senhaAdm || ""}
              onChange={handleChange}
              placeholder="Senha do administrador"
              required
            />
          </div>
          <button type="submit">Salvar Alterações</button>
          {mensagem && <div className="mensagem">{mensagem}</div>}
        </form>
      )}
    </div>
  );
}
