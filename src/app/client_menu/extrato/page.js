"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import "./extrato.css";
import { useRouter } from "next/navigation";

export default function ExtratoCliente() {
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const [saldo, setSaldo] = useState(null);
  const [transacoes, setTransacoes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Aqui você vai depois trocar pra buscar da sua API
    const extratoFake = [
      { id: 1, tipo: "Crédito", descricao: "Salário", valor: 3500, data: "2025-06-10" },
      { id: 2, tipo: "Débito", descricao: "Transferência PIX", valor: -150, data: "2025-06-11" },
      { id: 3, tipo: "Débito", descricao: "Compra Mercado", valor: -200, data: "2025-06-12" },
    ];
    setTransacoes(extratoFake);
  }, []);

  const alternarVisibilidade = () => {
    setMostrarSaldo(!mostrarSaldo);
  };

    const fetchSaldo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setErro("Usuário não autenticado.");
        return;
      }
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/saldo`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setSaldo(Number(data.valor));
        } else {
          setErro("Erro ao buscar saldo.");
        }
      } catch (err) {
        setErro("Erro de conexão.");
      }
  };
  useEffect(() => {
      fetchSaldo();
    }, []);

  return (
    <div className="container-ext">
      <div className="centralizado-conteudo-ex">
        <div className="mascote-container">
          <img src="/imperio.png" alt="Cliente" />
        </div>

        <div className="subtitulo-extrato">EXTRATO</div>

        <div className="saldo-container-ex">
          <p className="texto-saldo">Saldo disponível:</p>
          <div className="valor-saldo">
            {mostrarSaldo ? `R$ ${saldo.toFixed(2)}` : "••••••"}
          </div>
          <button onClick={alternarVisibilidade} className="icone-olho">
            {mostrarSaldo ? <EyeOff size={24} /> : <Eye size={24} />}
          </button>
        </div>

        <div className="extrato-container">
          {transacoes.map((transacao) => (
            <div
              key={transacao.id}
              className={`transacao ${transacao.tipo === "Crédito" ? "credito" : "debito"}`}
            >
              <div className="transacao-dados">
                <span className="data">{new Date(transacao.data).toLocaleDateString()}</span>
                <span className="descricao">{transacao.descricao}</span>
              </div>
              <div className="transacao-valor">
                {transacao.tipo === "Crédito" ? "+" : "-"} R$ {Math.abs(transacao.valor).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="botao-voltar-container">
        <div className="voltar">
          <button onClick={() => router.push("/client")} className="botao-voltar">Voltar</button>
        </div>
      </div>
    </div>
    </div>
  );
}