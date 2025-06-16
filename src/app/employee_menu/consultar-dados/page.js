"use client";
import { useState } from "react";
import "./consultar-dados.css";

export default function ConsultarDados() {
  const [aba, setAba] = useState("conta");
  const [busca, setBusca] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");

  const handleBusca = async (e) => {
    e.preventDefault();
    setErro("");
    setResultado(null);

    try {
      if (aba === "conta") {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_conta`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conta: busca }),
        });
        if (response.ok) {
          const data = await response.json();
          setResultado(data);
        } else {
          setErro("Conta não encontrada.");
        }
      }
      if (aba === "cliente") {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cpf: busca }),
        });
        
        if (response.ok) {
          const data = await response.json();
          setResultado(data);
        } else {
          setErro("Cliente não encontrado.");
        }
      }
      if (aba === "funcionario") {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_funcionario`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ codigo: busca }),
        });
        if (response.ok) {
          const data = await response.json();
          setResultado(data);
        } else {
          setErro("Funcionário não encontrado.");
        }
      } catch {
        setErro("Erro de conexão.");
      }
    }
    } catch {
      setErro("Erro de conexão.");
    }
  };

  return (
    <div className="consultar-dados-container">
      <h2>Consulta de Dados</h2>
      <div className="submenu-consulta">
        <button className={aba === "conta" ? "ativo" : ""} onClick={() => { setAba("conta"); setResultado(null); setErro(""); }}>Conta</button>
        <button className={aba === "funcionario" ? "ativo" : ""} onClick={() => { setAba("funcionario"); setResultado(null); setErro(""); }}>Funcionário</button>
        <button className={aba === "cliente" ? "ativo" : ""} onClick={() => { setAba("cliente"); setResultado(null); setErro(""); }}>Cliente</button>
      </div>

      <form className="busca-form" onSubmit={handleBusca}>
        {aba === "conta" && (
          <input
            type="text"
            placeholder="Digite o número da conta"
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
            placeholder="Digite o CPF do cliente"
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        )}
        <button type="submit">Buscar</button>
      </form>

      <div className="resultado-consulta">
        {erro && <div className="erro">{erro}</div>}

        {aba === "conta" && resultado && (
          <div className="card-consulta">
            <p><b>Número da Conta:</b> {resultado.conta}</p>
            <p><b>Saldo:</b> {resultado.saldo !== undefined ? `R$ ${Number(resultado.saldo).toLocaleString("pt-BR", {minimumFractionDigits:2})}` : "-"}</p>
            <p><b>Data de Abertura:</b> {resultado.abertura}</p>
          </div>
        )}

        {aba === "cliente" && resultado && (
          <div className="card-consulta">
            <p><b>CPF:</b> {resultado.Cpf}</p>
            <p><b>Data de nascimento:</b> {resultado.data_nascimento}</p>
            <p><b>Telefone:</b> {resultado.Telefone}</p>
            <p><b>Email:</b> {resultado.email}</p>
          </div>
        )}
        
       {aba === "funcionario" && resultado && (
          <div className="card-consulta">
            <p><b>Cargo:</b> {resultado.cargo}</p>
            <p><b>ID Supervisor:</b> {resultado.id_supervisor ?? "Nenhum"}</p>
          </div>
        )}
      </div>
    </div>
  );
}