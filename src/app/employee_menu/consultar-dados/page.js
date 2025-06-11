"use client";
import { useState } from "react";
import "./consultar-dados.css";

const mockConta = {
  tipo: "Conta Corrente",
  nome: "Ana Silva",
  cpf: "123.456.789-00",
  saldo: "R$ 4.530,50",
  limite: "R$ 2.000,00",
  vencimento: "10/07/2025",
  historico: [
    { data: "11/05/2025", desc: "Pix recebido", valor: "+R$ 800,00" },
    { data: "20/04/2025", desc: "Pagamento Boleto", valor: "-R$ 230,00" },
    { data: "01/04/2025", desc: "Depósito", valor: "+R$ 1.000,00" },
  ],
  projRend: "R$ 27,50 (projeção próxima etapa)",
};
const mockFuncionario = {
  codigo: "F2023",
  cargo: "Gerente",
  nome: "João Pedro",
  cpf: "999.888.777-66",
  nascimento: "20/01/1980",
  telefone: "(61) 99999-8888",
  endereco: "Rua das Acácias, 900, Centro",
  contasAbertas: 24,
  desempenho: "R$ 95.000,00 (média mov.)",
};
const mockCliente = {
  nome: "Carlos Eduardo",
  cpf: "321.654.987-00",
  nascimento: "30/06/1996",
  telefone: "(61) 99888-2222",
  endereco: "Av. das Árvores, 222, Setor Sul",
  score: "870 (excelente)",
  contas: [
    { tipo: "CP", status: "Ativa" },
    { tipo: "CC", status: "Inativa" },
  ],
};

export default function ConsultarDados() {
  const [aba, setAba] = useState("conta");
  const [busca, setBusca] = useState("");
  const [resultado, setResultado] = useState(null);

  const handleBusca = (e) => {
    e.preventDefault();
    // Aqui vai a busca no backend 
    if (aba === "conta") setResultado(mockConta);
    if (aba === "funcionario") setResultado(mockFuncionario);
    if (aba === "cliente") setResultado(mockCliente);
  };

  return (
    <div className="consultar-dados-container">
      <h2>Consulta de Dados</h2>
      <div className="submenu-consulta">
        <button className={aba === "conta" ? "ativo" : ""} onClick={() => { setAba("conta"); setResultado(null); }}>Conta</button>
        <button className={aba === "funcionario" ? "ativo" : ""} onClick={() => { setAba("funcionario"); setResultado(null); }}>Funcionário</button>
        <button className={aba === "cliente" ? "ativo" : ""} onClick={() => { setAba("cliente"); setResultado(null); }}>Cliente</button>
      </div>

      <form className="busca-form" onSubmit={handleBusca}>
        {aba === "conta" && (
          <input
            type="text"
            placeholder="Digite o número da conta ou CPF"
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        )}
        {aba === "funcionario" && (
          <input
            type="text"
            placeholder="Digite o código ou nome do funcionário"
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        )}
        {aba === "cliente" && (
          <input
            type="text"
            placeholder="Digite o CPF ou nome do cliente"
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        )}
        <button type="submit">Buscar</button>
      </form>

      <div className="resultado-consulta">
        {aba === "conta" && resultado && (
          <div className="card-consulta">
            <p><b>Tipo:</b> {resultado.tipo}</p>
            <p><b>Nome:</b> {resultado.nome}</p>
            <p><b>CPF:</b> {resultado.cpf}</p>
            <p><b>Saldo atual:</b> {resultado.saldo}</p>
            <p><b>Limite disponível:</b> {resultado.limite}</p>
            <p><b>Data de vencimento:</b> {resultado.vencimento}</p>
            <p><b>Projeção de rendimentos:</b> {resultado.projRend}</p>
            <b>Histórico (últ. 90 dias):</b>
            <ul>
              {resultado.historico.map((h, idx) =>
                <li key={idx}>{h.data} — {h.desc} <span>{h.valor}</span></li>
              )}
            </ul>
          </div>
        )}
        {aba === "funcionario" && resultado && (
          <div className="card-consulta">
            <p><b>Código:</b> {resultado.codigo}</p>
            <p><b>Cargo:</b> {resultado.cargo}</p>
            <p><b>Nome:</b> {resultado.nome}</p>
            <p><b>CPF:</b> {resultado.cpf}</p>
            <p><b>Data de nascimento:</b> {resultado.nascimento}</p>
            <p><b>Telefone:</b> {resultado.telefone}</p>
            <p><b>Endereço:</b> {resultado.endereco}</p>
            <p><b>Contas abertas:</b> {resultado.contasAbertas}</p>
            <p><b>Desempenho:</b> {resultado.desempenho}</p>
          </div>
        )}
        {aba === "cliente" && resultado && (
          <div className="card-consulta">
            <p><b>Nome:</b> {resultado.nome}</p>
            <p><b>CPF:</b> {resultado.cpf}</p>
            <p><b>Data de nascimento:</b> {resultado.nascimento}</p>
            <p><b>Telefone:</b> {resultado.telefone}</p>
            <p><b>Endereço:</b> {resultado.endereco}</p>
            <p><b>Score de crédito:</b> {resultado.score}</p>
            <b>Contas:</b>
            <ul>
              {resultado.contas.map((c, idx) =>
                <li key={idx}>{c.tipo} — {c.status}</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
