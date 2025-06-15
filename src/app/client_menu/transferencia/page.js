"use client";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
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
  const [saldo, setSaldo] = useState(null);
  const [erro, setErro] = useState("");
  const [valorTransferencia, setValorTransferencia] = useState("");
  const router = useRouter();

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
  };

  const handleChangeTransferencia = (e) => {
    setValorTransferencia(formatarMoeda(e.target.value));
  };

  const handleTransferir = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuário não autenticado.");
      return;
    }
    const valorNumerico = Number(
      valorTransferencia.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, "")
    );

    if (!instituicao || !agencia || !conta || isNaN(valorNumerico) || valorNumerico <= 0) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transferir`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            agencia: agencia,
            cpf_destino: conta,
            valor: valorNumerico,
          }),
        }
      );

      if (response.ok) {
        alert("Transferência realizada com sucesso!");
        setValorTransferencia("");
        setAgencia("");
        setConta("");
        setInstituicao("");
        setParaQuem("");
        fetchSaldo();
      } else {
        const data = await response.json();
        alert(data.detail || "Erro ao realizar transferência.");
      }
    } catch (err) {
      alert("Erro de conexão.");
    }
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
            {erro
              ? erro
              : saldo !== null && saldo !== undefined
              ? (mostrarSaldo ? `R$ ${Number(saldo).toFixed(2)}` : "••••••")
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

        <div className="form-container">
          <label>Instituição</label>
          <select value={instituicao} onChange={(e) => setInstituicao(e.target.value)}>
            <option value="">Selecione a instituição</option>
            <option value="banco1">066 | Banco Malvader</option>
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
              <label>CPF</label>
              <input
                type="text"
                placeholder="00000000000"
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
            value={valorTransferencia}
            onChange={handleChangeTransferencia}
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
                className="botao-continuar"
                onClick={handleTransferir}
              >
                Transferir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}