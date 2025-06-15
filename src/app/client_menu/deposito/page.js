"use client";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import "./deposito.css";
import { useRouter } from "next/navigation";

export default function DepositoCliente() {
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const [valorDepos, setValorDepos] = useState("");
  const saldo = 5273.45;
  const router = useRouter();

  const limiteDiario = 10000.00;
  const depositadoHoje = 4000.00; // EXEMPLO!!!!!!
  const limiteRestante = limiteDiario - depositadoHoje;

  const alternarVisibilidade = () => {
    setMostrarSaldo(!mostrarSaldo);
  };

  const handleDeposito = () => {
    const valor = parseFloat(valorDepos.replace(",", "."));

    if (isNaN(valor) || valor <= 0) {
      alert("Informe um valor válido para depósito.");
      return;
    }

    if (valor > limiteRestante) {
      alert(`Limite diário excedido. Você só pode depositar até R$ ${limiteRestante.toFixed(2)} hoje.`);
      return;
    }

    alert(`Depósito de R$ ${valor.toFixed(2)} realizado com sucesso!`);
    setValorDepos("");
  };
  

  const handleChangeDeposito = (e) => {
    const valorFormatado = formatarMoeda(e.target.value);
    setValorDepos(valorFormatado);
  };

  const formatarMoeda = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, ""); // Remove tudo que não for número
    const valorNumerico = parseFloat(apenasNumeros) / 100; // Divide por 100 para pegar os centavos
  
    if (isNaN(valorNumerico)) {
      return "";
    }
  
    return valorNumerico.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

   
    }

  return (
    <div className="container-deposito">
      <div className="centralizado-conteudo-d">
        <div className="mascote-container">
          <img src="/imperio.png" alt="Cliente" />
        </div>
        <div className="subtitulo-deposito">DEPÓSITO</div>

        <div className="saldo-container-d">
          <p className="texto-saldo">Saldo disponível:</p>
          <div className="valor-saldo-d">
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
          <p className="text_valor">Valor que deseja depositar</p>
          <input
  type="text"
  placeholder="R$ 0,00"
  value={valorDepos}
  onChange={handleChangeDeposito}
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

          
          <p className="depos-restante">
            Limite restante de depósito hoje: R$ {limiteRestante.toFixed(2)}
          </p>

          <div className="botao-voltar-container">
            <div className="voltar">
              <button onClick={() => router.push("/client")} className="botao-voltar">Voltar</button>
              <button onClick={handleDeposito} className="botao-confirmar">Confirmar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}