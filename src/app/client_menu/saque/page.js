"use client";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import "./saque.css";
import { useRouter } from "next/navigation";

export default function SaqueCliente() {
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const [valorSaque, setValorSaque] = useState("");
  const [saquesRealizados, setSaquesRealizados] = useState(3); // EXEMPLO!!! ja fez 3 saques no mês
  const totalSaquesPermitidos = 5;
  const saldo = 5273.45;
  const router = useRouter();

  const alternarVisibilidade = () => {
    setMostrarSaldo(!mostrarSaldo);
  };

  const handleSaque = () => {
    if (!valorSaque || parseFloat(valorSaque) <= 0) {
      alert("Informe um valor válido para saque.");
      return;
    }

    if (parseFloat(valorSaque) > saldo) {
      alert("Saldo insuficiente para o saque.");
      return;
    }

    const saquesRestantes = totalSaquesPermitidos - saquesRealizados;
    if (saquesRestantes <= 0) {
      alert("Limite mensal de saques gratuitos atingido. Será cobrada uma taxa extra.");
    }

    alert(`Saque de R$ ${parseFloat(valorSaque).toFixed(2)} realizado com sucesso!`);
    setValorSaque("");
    setSaquesRealizados(saquesRealizados + 1);
  };

  const saquesRestantes = totalSaquesPermitidos - saquesRealizados;

  return (
    <div className="container-saque">
      <div className="centralizado-conteudo-s">
        <div className="mascote-container">
          <img src="/imperio.png" alt="Cliente" />
        </div>
        <div className="subtitulo-saque">SAQUE</div>

        <div className="saldo-container-sa">
          <p className="texto-saldo">Saldo disponível:</p>
          <div className="valor-saldo-s">
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

        <div className="form-saque">
          <p className="text_valor">Valor a sacar</p>
          <input
            type="text"
            placeholder="R$ 0,00"
            value={valorSaque}
            onChange={(e) => setValorSaque(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              borderBottom: '2px solid red',
              fontSize: '3rem',
              padding: '8px 0',
              outline: 'none',
              backgroundColor: 'transparent',
              color: '#000',
              marginTop: '5px',
            }}
          />

         
          <p className="saques-restantes">
            {saquesRestantes > 0
              ? `${saquesRestantes} saques gratuitos restantes neste mês.`
              : "Você já atingiu o limite de saques gratuitos. Será cobrada uma taxa extra."}
          </p>

          <div className="botao-voltar-container">
            <div className="voltar">
              <button onClick={() => router.push("/client")} className="botao-voltar">
                Voltar
              </button>
              <button onClick={handleSaque} className="botao-confirmar">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}