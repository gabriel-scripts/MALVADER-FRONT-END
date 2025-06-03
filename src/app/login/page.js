"use client";

import { useState } from "react";
import Image from "next/image";
import "./login.css";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui vai a chamada para o backend
    console.log("CPF:", cpf);
    console.log("Senha:", senha);
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

          <div className="forgot">
            <a href="#">Esqueci minha senha</a>
          </div>

          <button type="submit">Login</button>

          <div className="register">
            Ainda não tem uma conta? <a href="#">Crie uma conta</a>
          </div>

          
        </form>
      </div>
    </div>
  );
}
