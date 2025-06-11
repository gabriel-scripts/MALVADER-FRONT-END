"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./login.css";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("funcionario");
  const [codigoFuncionario, setCodigoFuncionario] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("CPF:", cpf);
    console.log("Senha:", senha);
    console.log("Tipo de usuário:", tipo);

    if (tipo === "funcionario") {
      console.log("Código de Funcionário:", codigoFuncionario);
    }

    // Aqui você pode adicionar a lógica para autenticar o usuário
  };

  return (
    <div className="container">
      {/* Lado esquerdo */}
      <div className="login-left">
        <Image
          src="/darth-vezzi.svg"
          alt="Mascote MALVADER"
          width={180}
          height={180}
          className="mascote"
        />
        <h1 className="banco-title">
          <span className="banco">BANCO</span>
          <span className="malvader">MALVADER</span>
        </h1>
        <p className="slogan">acho lindo esse momento</p>
      </div>

      {/* Lado direito */}
      <div className="login-right">
        <h2>Olá!</h2>
        <h3>Bem-vindo de volta!</h3>

        <form className="login-form" onSubmit={handleLogin}>
          <label>CPF</label>
          <input
            type="text"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {/* Campo "Código de Funcionário" só aparece para funcionário */}
          {tipo === "funcionario" && (
            <>
              <label>Código de Funcionário</label>
              <input
                type="text"
                placeholder="Informe o seu código de funcionário"
                value={codigoFuncionario}
                onChange={(e) => setCodigoFuncionario(e.target.value)}
              />
            </>
          )}

          <div className="tipo-usuario">
            <label>
              <input
                type="radio"
                name="tipo"
                value="funcionario"
                checked={tipo === "funcionario"}
                onChange={() => setTipo("funcionario")}
              />
              Funcionário
            </label>
            <label>
              <input
                type="radio"
                name="tipo"
                value="cliente"
                checked={tipo === "cliente"}
                onChange={() => setTipo("cliente")}
              />
              Cliente
            </label>
          </div>

          <div className="forgot">
            <a href="#">Esqueci minha senha</a>
          </div>

          <button type="submit">Login</button>

          <div className="register">
            <div>
              Ainda não tem uma conta?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/register");
                }}
              >
                Crie uma conta
              </a>
            </div>
          </div>
        </form>
        <div className="exit-inside">
          <button type="button" onClick={() => router.push("/")}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
