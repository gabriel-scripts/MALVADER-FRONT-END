"use client";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./limite.css";
import { useRouter } from "next/navigation";

export default function LimiteCliente() {
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const [saldo, setSaldo] = useState(null);
  const [mostrarLimite, setMostrarLimite] = useState(false);
  const limiteTotal = 5000.0;
  const limiteUtilizado = 2000.0;
  const router = useRouter();

  const alternarVisibilidade = () => {
    setMostrarSaldo(!mostrarSaldo);
  };
  const porcentagemUso = (limiteUtilizado / limiteTotal) * 100;


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
    <div className="container-limite">
      <div className="centralizado-conteudo-l">
        <div className="mascote-container">
          <img src="/imperio.png" alt="Cliente" />
        </div>
        <div className="subtitulo-limite">LIMITE</div>

        <div className="saldo-container-l">
          <p className="texto-saldo">Saldo disponível:</p>
          <div className="valor-saldo-l">
            {mostrarSaldo ? `R$ ${saldo.toFixed(2)}` : "••••••"}
          </div>
          <button
            onClick={alternarVisibilidade}
            className="icone-olho"
            aria-label={mostrarSaldo ? "Ocultar saldo" : "Mostrar saldo"}
          >
            {mostrarSaldo ? <EyeOff size={24} /> : <Eye size={24} />}
          </button>
        </div>
        
        
        <div className="barra-limite">
          <div
            className="preenchimento-barra"
            style={{ width: `${porcentagemUso}%` }}
          ></div>
        </div>

        <div className="limite-detalhes">
  <div className="bloco-uso">
    <span className="valor-uso">R$ {limiteUtilizado.toFixed(2)}</span>
    <span className="label-uso">Utilizado</span>
  </div>
  <div className="bloco-disp">    
<span className="valor-disp">R$ {(limiteTotal - limiteUtilizado).toFixed(2)}</span>
    <span className="label-disp">Disponível</span>
  </div>
</div>

<span className="valor-total"> valor total: R$ {limiteTotal.toFixed(2)}</span>

<div className="botao-voltar-container">
<div className="voltar">
<button onClick={() => router.push("/client")} className="botao-voltar">Voltar</button>
</div>
      </div>
    </div>
    </div>
  );
}
