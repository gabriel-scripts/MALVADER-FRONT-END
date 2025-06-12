"use client";

import Image from "next/image";
import Link from "next/link";
import './register.css';
import { useState, useRef } from "react";


function validaSenha(senha) {
  if (senha.length < 12) return "A senha deve ter ao menos 12 caracteres.";
  if (!/[a-z]/.test(senha)) return "A senha deve ter ao menos uma letra minúscula.";
  if (!/[A-Z]/.test(senha)) return "A senha deve ter ao menos uma letra maiúscula.";
  if (!/[0-9]/.test(senha)) return "A senha deve ter ao menos um número.";
  return null;
}

function validaCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ''); 
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false; 

  let soma = 0;
  for (let i = 0; i < 9; i++)
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = 11 - (soma % 11);
  let digito1 = resto === 10 || resto === 11 ? 0 : resto;
  if (digito1 !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++)
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = 11 - (soma % 11);
  let digito2 = resto === 10 || resto === 11 ? 0 : resto;
  if (digito2 !== parseInt(cpf.charAt(10))) return false;

  return true;
}


export default function Register() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [CPF, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const inputDataRef = useRef(null);
  const cursorPosition = useRef(null);

  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [CEP, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [complemento, setComplemento] = useState("");

  function handleDataChange(e) {
    let value = e.target.value;
    let cursorPos = e.target.selectionStart;

    let digits = value.replace(/\D/g, "");
    if (digits.length > 8) digits = digits.slice(0, 8);

    let formattedValue = "";
    if (digits.length <= 2) {
      formattedValue = digits;
    } else if (digits.length <= 4) {
      formattedValue = digits.slice(0, 2) + "/" + digits.slice(2);
    } else {
      formattedValue = digits.slice(0, 2) + "/" + digits.slice(2, 4) + "/" + digits.slice(4);
    }

    if (cursorPos === 3 || cursorPos === 6) cursorPos += 1;

    setDataNascimento(formattedValue);
    cursorPosition.current = cursorPos;
  }

  async function buscaCep() {
    const cepLimpo = CEP.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      alert("Digite um CEP válido com 8 números");
      return;
    }

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        alert("CEP não encontrado");
        return;
      }

      setLogradouro(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.localidade || "");
      setEstado(data.uf || "");
    } catch {
      alert("Erro ao buscar CEP");
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    // Validação da senha
    const erroSenha = validaSenha(senha);
    if (erroSenha) {
      alert(erroSenha);
      return;
    }

    if (!validaCPF(CPF)) {
  alert("CPF inválido!");
  return;
}

  

    let dataFormatada = null;
    if (dataNascimento && dataNascimento.length === 10) {
      const [dia, mes, ano] = dataNascimento.split("/");
      if (dia && mes && ano) {
        dataFormatada = `${ano}-${mes}-${dia}`;
      }
    }

    const body = {
      nome: nome,
      cpf: CPF.replace(/\D/g, ""),
      data_nascimento: dataFormatada,
      telefone: telefone,
      tipo_usuario: "cliente",
      senha_hash: senha,
      email: email,
      score_credito: null,
      cargo: null,
      id_supervisor: null,
      endereco: {
        cep: CEP,
        local: logradouro,
        numero_casa: numero ? parseInt(numero) : null,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        complemento: complemento || null
      }
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        
      } else {
        const errorData = await response.json();
        alert("Erro ao cadastrar: " + (errorData.detail || JSON.stringify(errorData)));
      }
    } catch (error) {
      alert("Erro de conexão com o servidor: " + error.message);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <Image
              src="/darth-vezzi.svg"
              alt="Mascote MALVADER"
              width={100}
              height={100}
              className="mascote"
            />
            <h1 className="banco-title">
              <span className="banco">BANCO</span>
              <span className="malvader">MALVADER</span>
            </h1>
          </div>
          <Link href="/login" className="login-link">
            login
          </Link>
        </div>
      </header>
      <div className="cabeçalho">
        <p>Cadastre-se no Malvader e desperte o poder financeiro que há em você</p>
      </div>

      <form className="register-form" onSubmit={handleRegister}>
        <div className="container">
          <p className="dados">Dados Pessoais</p>

          <label className="texto">Nome</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label className="texto">Sobrenome</label>
          <input
            type="text"
            placeholder="Digite seu sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />

          <label className="texto a">CPF</label>
          <input
            type="text"
            placeholder="Digite seu CPF"
            value={CPF}
            onChange={(e) => setCpf(e.target.value)}
          />

          <label className="texto">Data de Nascimento</label>
          <input
            ref={inputDataRef}
            type="text"
            placeholder="DD/MM/AAAA"
            maxLength={10}
            value={dataNascimento}
            onChange={handleDataChange}
            className="input-data"
          />

          <label className="texto">Telefone</label>
          <input
            type="text"
            placeholder="Digite apenas numeros"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <label className="texto">Email</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="texto">Senha</label>
          <input
            type="password"
            placeholder="Crie sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <label className="texto">Confirmar Senha</label>
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </div>

        <div className="container">
          <p className="dados">Endereço</p>

          <label className="texto">CEP</label>
          <input
            type="text"
            placeholder="Digite seu CEP"
            value={CEP}
            onChange={(e) => setCep(e.target.value)}
            onBlur={buscaCep}
          />

          <label className="texto">Logradouro / Local</label>
          <input
            type="text"
            placeholder="Rua, Avenida, etc."
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
          />

          <label className="texto">Número da residência</label>
          <input
            type="text"
            placeholder="Número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />

          <label className="texto">Bairro</label>
          <input
            type="text"
            placeholder="Bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />

          <label className="texto">Cidade</label>
          <input
            type="text"
            placeholder="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />

          <label className="texto">Estado (UF)</label>
          <input
            type="text"
            placeholder="Estado"
            maxLength={2}
            value={estado}
            onChange={(e) => setEstado(e.target.value.toUpperCase())}
          />

          <label className="texto">Complemento (opcional)</label>
          <input
            type="text"
            placeholder="Apartamento, bloco, casa, etc."
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}
