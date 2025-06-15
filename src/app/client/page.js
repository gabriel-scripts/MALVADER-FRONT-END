"use client";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./client.css";

export default function SaldoCliente() {
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const [saldo, setSaldo] = useState(null);
  const [erro, setErro] = useState("");
  const router = useRouter();

  const alternarVisibilidade = () => {
    setMostrarSaldo((prev) => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
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
          setSaldo(data.saldo);
        } else {
          setErro("Erro ao buscar saldo.");
        }
      } catch (err) {
        setErro("Erro de conexão.");
      }
    };
    fetchSaldo();
  }, []);

  return (
    <div className="container-cliente">
      <div className="centralizado-conteudo-c">
        <div className="mascote-container-c">
          <Image src="/imperio.png" alt="Cliente" width={120} height={120} />
        </div>
        <div className="subtitulo-cliente">
          BEM-VINDO AO SEU IMPÉRIO, <br /> TUDO SOB SEU COMANDO.
        </div>
        <div className="saldo-container-c">
          <div className="valor-saldo-c">
            {erro
              ? erro
              : saldo === null
              ? "••••••"
              : mostrarSaldo
              ? `R$ ${Number(saldo).toFixed(2)}`
              : "••••••"}
          </div>
          <button
            onClick={alternarVisibilidade}
            className="icone-olho-c"
            aria-label={mostrarSaldo ? "Ocultar saldo" : "Mostrar saldo"}
            type="button"
          >
            {mostrarSaldo ? <EyeOff size={24} /> : <Eye size={24} />}
          </button>
        </div>
        <div className="botoes-cliente">
          <button type="button" onClick={() => router.push("/client_menu/transferencia")}>TRANSFERÊNCIA</button>
          <button type="button" onClick={() => router.push("/client_menu/deposito")}>DEPÓSITO</button>
          <button type="button" onClick={() => router.push("/client_menu/saque")}>SAQUE</button>
          <button type="button" onClick={() => router.push("/client_menu/limite")}>LIMITE</button>
          <button type="button" onClick={() => router.push("/client_menu/extrato")}>EXTRATO</button>
          <button type="button" onClick={() => router.push("/client_menu/emprestimo")}>EMPRÉSTIMO</button>
        </div>
      </div>
    </div>
  );
}