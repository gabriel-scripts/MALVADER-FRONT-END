"use client";

import { useState, useRef, useEffect } from "react";
import "./otp.css";
import Image from "next/image";

export default function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    console.log("OTP enviado:", code);
    // Aqui vai a chamada para a API
  };

  return (
    <div className="otp-container">
      <div className="otp-box">
        <Image
          src="/clone.png"
          alt="Mascote"
          width={200}
          height={160}
        />
        <h1>DIGITE O CÓDIGO</h1>
        <p>Enviamos um código de verificação<br />para o seu e-mail</p>

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
              />
            ))}
          </div>
          <button type="submit">Confirmar Código</button>
        </form>

        <p className="otp-resend">
          Não recebeu seu código? <a href="#">Enviar novamente</a>
        </p>
      </div>
    </div>
  );
}
