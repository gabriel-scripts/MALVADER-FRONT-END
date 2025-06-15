"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./emprestimo.css";

export default function EmprestimoCliente() {
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const [saldo, setSaldo] = useState(null);
  const router = useRouter();

  const [valorEmprestimo, setValorEmprestimo] = useState("");
  const [prazo, setPrazo] = useState("");
  const [finalidade, setFinalidade] = useState("");
  const [resultado, setResultado] = useState("");

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

  const handleChangeValor = (e) => {
    const valorFormatado = formatarMoeda(e.target.value);
    setValorEmprestimo(valorFormatado);
  };

  const handleSolicitarEmprestimo = () => {
    const valorNumerico = Number(valorEmprestimo.replace(/[R$\s.]/g, "").replace(",", "."));
    const prazoNumerico = parseInt(prazo);

    if (
      isNaN(valorNumerico) ||
      valorNumerico < 1000 ||
      valorNumerico > 100000
    ) {
      alert("O valor deve estar entre R$ 1.000,00 e R$ 100.000,00.");
      return;
    }

    if (isNaN(prazoNumerico) || prazoNumerico < 6 || prazoNumerico > 60) {
      alert("O prazo deve ser entre 6 e 60 meses.");
      return;
    }

    if (!finalidade.trim()) {
      alert("Informe a finalidade do empréstimo.");
      return;
    }

    const taxaJuros = 2.0;
    const valorTotal = valorNumerico * Math.pow(1 + taxaJuros / 100, prazoNumerico);
    const parcela = valorTotal / prazoNumerico;

    setResultado(
      `
      Empréstimo Aprovado!
      Valor: R$ ${valorNumerico.toFixed(2)}
      Prazo: ${prazoNumerico} meses
      Juros: ${taxaJuros}% ao mês
      Total com juros: R$ ${valorTotal}
      Parcela: R$ ${parcela.toFixed(2)}`
    );
  };

  return (
    <div className="container-empres">
      <div className="centralizado-conteudo-e">
        <div className="mascote-container">
          <img src="/imperio.png" alt="Cliente" />
        </div>
        <div className="subtitulo-empres">EMPRÉSTIMO</div>

        <div className="saldo-container-e">
          <p className="texto-saldo">Saldo disponível:</p>
          <div className="valor-saldo-e">
            {mostrarSaldo ? `R$ ${saldo}` : "••••••"}
          </div>
          <button
            onClick={alternarVisibilidade}
            className="icone-olho"
            aria-label={mostrarSaldo ? "Ocultar saldo" : "Mostrar saldo"}
          >
            {mostrarSaldo ? <EyeOff size={24} /> : <Eye size={24} />}
          </button>
        </div>

        <div className="form-emprestimo">
          <label>Prazo (em meses):</label>
          <input
            type="number"
            placeholder="De 6 a 60 meses
"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
          />

          <label>Finalidade:</label>
          <input
            type="text"
            placeholder="Ex: Compra de carro"
            value={finalidade}
            onChange={(e) => setFinalidade(e.target.value)}
          />

          <p className="text_valor">Valor do Empréstimo</p>
          <input
            type="text"
            placeholder="R$ 0,00"
            value={valorEmprestimo}
            onChange={handleChangeValor}
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

<p className="restricoes-empres">Mínimo de R$ 1.000,00 e máximo de R$ 100.000,00 </p>

        <div className="botao-voltar-container">
          <div className="voltar">
            <button onClick={() => router.push("/client")} className="botao-voltar">
              Voltar
            </button>
            <button onClick={handleSolicitarEmprestimo} className="botao-confirmar">
            Solicitar
          </button>
        </div>

        {resultado && (
          <div className="resultado-emprestimo">
            <pre>{resultado}</pre>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}