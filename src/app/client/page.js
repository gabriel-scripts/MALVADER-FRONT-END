"use client";

import Image from "next/image";
import {Eye, EyeOff,} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import "./client.css";
import { useRouter } from "next/navigation";

;
export default function SaldoCliente() {
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const saldo = 5273.45;
  const router = useRouter();

  const alternarVisibilidade = () => {
    setMostrarSaldo(!mostrarSaldo);
  };

  return (
    <>
     
     <div className="container">
  <div className="centralizado-conteudo">
  <div className="mascote-container">
      <img src="/imperio.png" alt="Cliente" />
    </div>
    <div className="subtitulo-cliente">
    BEM-VINDO AO SEU IMPÉRIO, <br /> TUDO SOB SEU COMANDO.
    </div>
    <div className="saldo-container">
            <div className="valor-saldo">
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
    
            
        <div className="botoes-cliente">
        <button onClick={() => router.push("/client_menu/transferencia")}>TRANSFERÊNCIA</button>
          <button onClick={() => router.push("/client_menu/deposito")}>DEPÓSITO</button>
          <button onClick={() => router.push("/client_menu/saque")}>SAQUE</button>
          <button onClick={() => router.push("/client_menu/lmite")}>LIMITE</button>
          <button onClick={() => router.push("/client_menu/extrato")}>EXTRATO</button>
          <button onClick={() => router.push("/client_menu/emprestimo")}>EMPRÉSTIMO</button>
        </div>
      </div>
      
  </div>
     
    </>
  );
}