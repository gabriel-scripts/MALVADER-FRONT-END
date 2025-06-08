"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./funcionario.css";

export default function DashboardFuncionario() {
  const router = useRouter();

  return (
   <div className="funcionario-bg">
  <div className="funcionario-card">
    <div className="mascote-container">
      <img src="/sith.png" alt="Funcionário" />
    </div>
    <div className="titulo-funcionario">FUNCIONÁRIO</div>
    <div className="subtitulo-funcionario">
      ALÉM DE NADA, O QUE <br /> MAIS VOCÊ PODE FAZER?
    </div>
        <div className="botoes-funcionario">
          <button onClick={() => router.push("/menu_funcionario/abrir-conta")}>ABRIR CONTA</button>
          <button onClick={() => router.push("/menu_funcionario/encerrar-conta")}>ENCERRAR CONTA</button>
          <button onClick={() => router.push("/menu_funcionario/consultar-dados")}>CONSULTAR DADOS</button>
          <button onClick={() => router.push("/menu_funcionario/alterar-dados")}>ALTERAR DADOS</button>
          <button onClick={() => router.push("/menu_funcionario/gerar-relatorio")}>GERAR RELATÓRIO</button>
          <button onClick={() => router.push("/menu_funcionario/cadastrar-funcionarios")}>CADASTRAR FUNCIONÁRIOS</button>
        </div>
      </div>
    </div>
  );
}
