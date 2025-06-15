"use client";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import "./transferencia.css";
import { useRouter } from "next/navigation";


export default function TransferenciaCliente() {
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const [instituicao, setInstituicao] = useState("");
  const [agencia, setAgencia] = useState("");
  const [conta, setConta] = useState("");
  const [tipoConta, setTipoConta] = useState("Corrente");
  const [paraQuem, setParaQuem] = useState("");
  const saldo = 5273.45;
  const [valor, setValor] = useState("");
  const router = useRouter();

  const alternarVisibilidade = () => {
    setMostrarSaldo(!mostrarSaldo);

  };



  return (
        
 <div className="container-tran">
 <div className="centralizado-conteudo-tran">
        <div className="mascote-container">
          <img src="/imperio.png" alt="Cliente" />
        </div>
        <div className="subtitulo-transferencia">TRANSFERÊNCIA</div>

        <div className="saldo-container">
          <p className="texto-saldo">Saldo disponível:</p>
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
      

      <div className="form-container">
        

        <label>Instituição</label>
        <select value={instituicao} onChange={(e) => setInstituicao(e.target.value)}>
          <option value="">Selecione a instituição</option>
          <option value="banco1"> 066 | Banco Malvader</option>

        </select>

        <div className="linha-horizontal">
          <div>
            <label>Agência</label>
            <input
              type="text"
              placeholder="0000"
              value={agencia}
              onChange={(e) => setAgencia(e.target.value)}
            />
          </div>
          <div>
            <label>Conta</label>
            <input
              type="text"
              placeholder="0000000-0"
              value={conta}
              onChange={(e) => setConta(e.target.value)}
            />
          </div>
        </div>

        <label>Tipo de conta</label>
        <select value={tipoConta} onChange={(e) => setTipoConta(e.target.value)}>
          <option value="Corrente">Corrente</option>
          <option value="Poupança">Poupança</option>
        </select>

        <label>Para quem é o pagamento</label>
        <div className="radio-group">
  <label>
    <input
      type="radio"
      name="pagamento"
      value="mim"
      checked={paraQuem === "mim"}
      onChange={() => setParaQuem("mim")}
    />
    <span>Para mim</span>
  </label>
  <label>
    <input
      type="radio"
      name="pagamento"
      value="outra"
      checked={paraQuem === "outra"}
      onChange={() => setParaQuem("outra")}
    />
    <span>Para outra pessoa</span>
  </label>
</div>


<p className="text_valor">valor a pagar</p>
<input
  type="text"
  placeholder="R$ 0,00"
  value={valor}
  onChange={(e) => setValor(e.target.value)}
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
        
<div className="botoes">
<div className="botao-voltar-container">
  <button onClick={() => router.push("/client")} className="botao-voltar">Voltar</button>

  <button
  // disabled={!instituicao || !agencia || !conta}
  className="botao-continuar">Transferir</button>
  </div>
</div>
      </div>
    </div>
    </div>
   
  );
}