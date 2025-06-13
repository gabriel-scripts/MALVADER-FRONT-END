"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import "./cadastrar-funcionarios.css";

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

export default function CadastrarFuncionario() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cargo, setCargo] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [complemento, setComplemento] = useState("");
  const inputDataRef = useRef(null);
  const cursorPosition = useRef(null);

  //Busca CEP
  async function buscaCep() {
    const cepLimpo = cep.replace(/\D/g, "");
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

  // Para formatar data DD/MM/AAAA
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

  const handleRegister = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const erroSenha = validaSenha(senha);
    if (erroSenha) {
      alert(erroSenha);
      return;
    }

    if (!validaCPF(cpf)) {
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

    // Lê o token do localStorage (depois do login)
    const token = localStorage.getItem("token"); 

    const body = {
      nome: nome,
      cpf: cpf.replace(/\D/g, ""),
      data_nascimento: dataFormatada,
      telefone: telefone,
      tipo_usuario: "funcionario",
      senha_hash: senha,
      email: email,
      cargo: cargo,
      endereco: {
        cep: cep,
        local: logradouro,
        numero_casa: numero ? parseInt(numero) : null,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        complemento: complemento || null
      }
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register_funcionario`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer ${token}" 

        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        alert("Funcionário cadastrado com sucesso!");
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
          <Link href="/dashboard/employee" className="login-link">
            Voltar
          </Link>
        </div>
      </header>
      <div className="cabeçalho">
        <p>Cadastro de Funcionário</p>
      </div>

      <form className="register-form" onSubmit={handleRegister}>
        <div className="container">
          <p className="dados">Dados do Funcionário</p>

          <label className="texto">Nome</label>
          <input
            type="text"
            placeholder="Digite o nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label className="texto">CPF</label>
          <input
            type="text"
            placeholder="Digite o CPF"
            value={cpf}
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
            placeholder="Digite apenas números"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <label className="texto">Email</label>
          <input
            type="email"
            placeholder="Digite o email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="texto">Senha</label>
          <input
            type="password"
            placeholder="Crie a senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <label className="texto">Confirmar Senha</label>
          <input
            type="password"
            placeholder="Confirme a senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />

          <label className="texto">Cargo</label>
          <input
            type="text"
            placeholder="Cargo do funcionário"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
        </div>

        <div className="container">
          <p className="dados">Endereço</p>

          <label className="texto">CEP</label>
          <input
            type="text"
            placeholder="Digite o CEP"
            value={cep}
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
        <button type="submit">Cadastrar Funcionário</button>
      </form>
    </>
  );
}
