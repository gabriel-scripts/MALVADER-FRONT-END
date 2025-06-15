"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import "./deposito.css";
import { useRouter } from "next/navigation";

export default function DepositoCliente() {
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const [valorDepos, setValorDepos] = useState("");
  const [saldo, setSaldo] = useState(null);
  const [erro, setErro] = useState("");
  const router = useRouter();

  const [ limiteRestante, SetlimiteRestante] = useState("");


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
          SetlimiteRestante(Math.max(0, Number(10000.00 - data.depositado_hoje)));
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
    
  const alternarVisibilidade = () => {
    setMostrarSaldo(!mostrarSaldo);
  };

  const handleDeposito = async () => {
    const valor = parseFloat(valorDepos.replace(/\D/g, "")) / 100;

    if (isNaN(valor) || valor <= 0) {
      alert("Informe um valor válido para depósito.");
      return;
    }

    if (valor > limiteRestante) {
      alert(`Limite diário excedido. Você só pode depositar até R$ ${limiteRestante} hoje.`);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuário não autenticado.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/depositar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ valor }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(`Depósito de R$ ${Number(data.deposito).toFixed(2)} realizado com sucesso!`);
        setValorDepos("");  
        fetchSaldo();
      }
    } catch (err) {
      alert("Erro de conexão.");
    }
  };
    

  const handleChangeDeposito = (e) => {
    const valorFormatado = formatarMoeda(e.target.value);
    setValorDepos(valorFormatado);
  };

  const formatarMoeda = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, ""); 
    const valorNumerico = parseFloat(apenasNumeros) / 100; 
  
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
            {mostrarSaldo
              ? saldo !== null && saldo !== undefined
                ? `R$ ${Number(saldo).toFixed(2)}`
                : "R$ 0,00"
              : "••••••"}
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
            Limite restante de depósito hoje: R$ {limiteRestante}
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