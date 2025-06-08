"use client";
import { useRouter } from "next/navigation";
import "./employee.css";

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
          <button onClick={() => router.push("/employee_menu/abrir-conta")}>ABRIR CONTA</button>
          <button onClick={() => router.push("/employee_menu/encerrar-conta")}>ENCERRAR CONTA</button>
          <button onClick={() => router.push("/employee_menu/consultar-dados")}>CONSULTAR DADOS</button>
          <button onClick={() => router.push("/employee_menu/alterar-dados")}>ALTERAR DADOS</button>
          <button onClick={() => router.push("/employee_menu/gerar-relatorio")}>GERAR RELATÓRIO</button>
          <button onClick={() => router.push("/employee_menu/cadastrar-funcionarios")}>CADASTRAR FUNCIONÁRIOS</button>
        </div>
      </div>
    </div>
  );
}
