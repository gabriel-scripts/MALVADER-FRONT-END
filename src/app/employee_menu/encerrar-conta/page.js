"use client";
import { useState } from "react";
import "./encerrar-conta.css";

export default function EncerrarConta() {
  const [form, setForm] = useState({
    conta: "",
    motivo: "",
    motivoOutro: "",
    senhaAdm: "",
    otp: "",
  });
  const [mensagem, setMensagem] = useState("");
  const [otpStatus, setOtpStatus] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpDisabled, setOtpDisabled] = useState(false);

  // Função genérica de mudança de campo
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar código OTP
  const handleEnviarOTP = async () => {
    setOtpLoading(true);
    setOtpStatus("");
    // Simulação de chamada para o backend 
    setTimeout(() => {
      setOtpStatus("Código enviado para seu e-mail!");
      setOtpLoading(false);
      setOtpDisabled(true);
      // Reativa botão após 30 segundos (exemplo)
      setTimeout(() => setOtpDisabled(false), 30000);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.conta ||
      !form.motivo ||
      !form.senhaAdm ||
      !form.otp ||
      (form.motivo === "outro" && !form.motivoOutro)
    ) {
      setMensagem("Preencha todos os campos obrigatórios!");
      return;
    }
    // Simulação de saldo pendente:
    if (form.conta === "12345-6") {
      setMensagem("Não é possível encerrar: saldo pendente/dívida ativa!");
      return;
    }

    setMensagem("Conta encerrada com sucesso!");
    // Aqui enviaria para o backend
  };

  return (
    <div className="encerrar-conta-container">
      <h2>Encerramento de Conta</h2>
      <form className="encerrar-conta-form" onSubmit={handleSubmit}>
        <div className="campo-form">
          <label>Número da Conta *</label>
          <input
            name="conta"
            placeholder="Número da conta (ex: 12345-6)"
            value={form.conta}
            onChange={handleChange}
          />
        </div>
        <div className="campo-form">
          <label>Motivo do Encerramento *</label>
          <select name="motivo" value={form.motivo} onChange={handleChange}>
            <option value="">Selecione o motivo</option>
            <option value="solicitacao">Solicitação do Cliente</option>
            <option value="inadimplencia">Inadimplência</option>
            <option value="fraude">Fraude</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        {form.motivo === "outro" && (
          <div className="campo-form">
            <label>Descreva o motivo *</label>
            <input
              name="motivoOutro"
              placeholder="Descreva o motivo"
              value={form.motivoOutro}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="campo-form">
  <label>Código OTP *</label>
  <input
    name="otp"
    type="text"
    placeholder="Digite o código OTP"
    value={form.otp}
    onChange={handleChange}
    maxLength={6}
  />
  <button
    type="button"
    className="enviar-otp-btn"
    style={{
      background: "#df2121",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      padding: "10px 0",
      fontWeight: "bold",
      cursor: otpDisabled ? "not-allowed" : "pointer",
      opacity: otpDisabled ? 0.5 : 1,
      fontSize: "1rem",
      marginTop: 8,
      width: "100%"
    }}
    onClick={handleEnviarOTP}
    disabled={otpDisabled || otpLoading}
  >
    {otpLoading ? "Enviando..." : "Enviar OTP"}
  </button>
  {otpStatus && (
    <div style={{
      color: "#fff",
      fontSize: 15,
      marginTop: 8,
      textAlign: "center",
      fontFamily: "'League Spartan', sans-serif",
      fontWeight: 500
    }}>
      {otpStatus}
    </div>
  )}
</div>
        <button type="submit">Encerrar Conta</button>
        {mensagem && <div className="mensagem">{mensagem}</div>}
      </form>
    </div>
  );
}
