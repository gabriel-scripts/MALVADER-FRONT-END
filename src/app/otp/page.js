"use client";

import { useState, useRef } from "react";
import "./otp.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Busca as informações salvas no login
  const loginInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("loginInfo") || "{}")
      : {};

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const code = otp.join("");
    if (code.length < 6) {
      setErro("Por favor, preencha todos os campos do código.");
      setLoading(false);
      return;
    }

    
    const body = {
      cpf: loginInfo.cpf,
      senha: loginInfo.senha,
      otp: code,
      ...(loginInfo.tipo === "funcionario" && {
        codigo_funcionario: loginInfo.codigo_funcionario,
      }),
    };
    
    console.log("Enviando para autenticação:", JSON.stringify(body, null, 2));

    try {
      const response = await fetch(`${API_URL}/authenticate_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.cliente) {
          localStorage.setItem("token", data.cliente);
          localStorage.removeItem("loginInfo");
          router.push("/client");
        } else if (data.funcionario) {
          localStorage.setItem("token", data.funcionario);
          localStorage.removeItem("loginInfo");
          router.push("/dashboard/employee");
        } else {
          setErro("Tipo de usuário não reconhecido na resposta.");
        }
      } else {
        let msg = "Código ou dados inválidos.";
        try {
          const erroData = await response.json();
          msg = erroData.detail || JSON.stringify(erroData);
        } catch {}
        setErro(msg);
      }
    } catch (error) {
      setErro("Erro de conexão: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-box">
        <Image src="/clone.png" alt="Mascote" width={200} height={160} />
        <h1>DIGITE O CÓDIGO</h1>
        <p>
          Enviamos um código de verificação
          <br />
          para o seu e-mail
        </p>

        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputs.current[index] = el)}
                autoFocus={index === 0}
              />
            ))}
          </div>
          {erro && (
            <div style={{ color: "#e00", marginBottom: 8 }}>{erro}</div>
          )}
          <button type="submit" disabled={loading}>
            {loading ? "Confirmando..." : "Confirmar Código"}
          </button>
        </form>

        <p className="otp-resend">
          Não recebeu seu código? <a href="#">Enviar novamente</a>
        </p>
      </div>
    </div>
  );
}
