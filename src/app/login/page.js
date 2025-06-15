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
  const [erro, setErro] = useState("");
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    const cpfLimpo = cpf.replace(/\D/g, "");

    const body = {
      cpf: cpfLimpo,
      senha: senha,
      ...(tipo === "funcionario" && { codigo_funcionario: codigoFuncionario }),
    };
    const endpoint =
      tipo === "funcionario"
        ? `${API_URL}/login_funcionario`
        : `${API_URL}/login_cliente`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        localStorage.setItem(
          "loginInfo",
          JSON.stringify({
            cpf: cpfLimpo,
            tipo: tipo,
            senha: senha,
            codigo_funcionario: tipo === "funcionario" ? codigoFuncionario : "",
          })
        );
        router.push("/otp");
      } else {
        let errorMessage = "Erro ao logar.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || JSON.stringify(errorData);
        } catch {
          // Erro não veio em JSON
        }
        setErro(errorMessage);
      }
    } catch (error) {
      setErro("Erro de conexão: " + error.message);
    }
  };
  return (
    <div className="container-login">
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

          {erro && (
            <div className="erro" style={{ color: "#e00", marginBottom: "10px" }}>
              {erro}
            </div>
          )}

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
