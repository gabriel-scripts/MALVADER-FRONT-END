"use client";
import { useState } from "react";
import "./gerar-relatorio.css";

export default function GerarRelatorio() {
  const [tipoRelatorio, setTipoRelatorio] = useState("");
  const [filtros, setFiltros] = useState({
    dataInicio: "",
    dataFim: "",
    tipoTransacao: "",
    agencia: "",
    funcionario: ""
  });
  const [resultado, setResultado] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const exportar = (tipo) => {
    alert(`Exportando relatório em formato ${tipo}`);
  };

  const handleFiltro = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    setCarregando(true);
    setTimeout(() => {
      setResultado([/* dados simulados */]);
      setCarregando(false);
    }, 1000);
  };

  // Opções para selects
  const opcoesTransacao = [
    { label: "Depósito", value: "deposito" },
    { label: "Saque", value: "saque" },
    { label: "Transferência", value: "transferencia" }
  ];

  return (
    <div className="relatorio-container">
      <h2>Geração de Relatórios</h2>
      <div className="tipo-relatorio-selector">
        <label>
          <input type="radio" name="tipo" value="movimentacoes" checked={tipoRelatorio === "movimentacoes"} onChange={() => setTipoRelatorio("movimentacoes")} />
          Movimentações
        </label>
        <label>
          <input type="radio" name="tipo" value="inadimplencia" checked={tipoRelatorio === "inadimplencia"} onChange={() => setTipoRelatorio("inadimplencia")} />
          Inadimplência
        </label>
        <label>
          <input type="radio" name="tipo" value="desempenho" checked={tipoRelatorio === "desempenho"} onChange={() => setTipoRelatorio("desempenho")} />
          Desempenho de Funcionários
        </label>
      </div>

      {tipoRelatorio ? (
        <form className="filtros-relatorio" onSubmit={handleBuscar}>
          <div className="filtro-campo">
            <label htmlFor="dataInicio">Data inicial</label>
            <input
              id="dataInicio"
              type="date"
              name="dataInicio"
              value={filtros.dataInicio}
              onChange={handleFiltro}
            />
          </div>
          <div className="filtro-campo">
            <label htmlFor="dataFim">Data final</label>
            <input
              id="dataFim"
              type="date"
              name="dataFim"
              value={filtros.dataFim}
              onChange={handleFiltro}
            />
          </div>
          {tipoRelatorio === "movimentacoes" && (
            <div className="filtro-campo">
              <label htmlFor="tipoTransacao">Tipo de Transação</label>
              <select
                id="tipoTransacao"
                name="tipoTransacao"
                value={filtros.tipoTransacao}
                onChange={handleFiltro}
              >
                <option value="">Selecione</option>
                {opcoesTransacao.map(opt => (
                  <option value={opt.value} key={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          )}
          {(tipoRelatorio === "movimentacoes" ||
            tipoRelatorio === "inadimplencia" ||
            tipoRelatorio === "desempenho") && (
            <div className="filtro-campo">
              <label htmlFor="agencia">Agência</label>
              <input
                id="agencia"
                name="agencia"
                value={filtros.agencia}
                onChange={handleFiltro}
                placeholder="Número da agência"
              />
            </div>
          )}
          {tipoRelatorio === "desempenho" && (
            <div className="filtro-campo">
              <label htmlFor="funcionario">Funcionário</label>
              <input
                id="funcionario"
                name="funcionario"
                value={filtros.funcionario}
                onChange={handleFiltro}
                placeholder="Nome ou matrícula"
              />
            </div>
          )}
          <button type="submit">Buscar</button>
        </form>
      ) : (
        <div className="placeholder-relatorio">
          <p>Selecione o tipo de relatório acima para exibir os filtros.</p>
        </div>
      )}

      <div className="relatorio-metricas">
        {/* Simular métricas aqui */}
      </div>
      <div className="relatorio-tabela">
        {/* Renderizar tabela de resultados aqui */}
      </div>
      <div className="botoes-exportacao">
        <button onClick={() => exportar("Excel")}>Exportar Excel</button>
        <button onClick={() => exportar("PDF")}>Exportar PDF</button>
      </div>
    </div>
  );
}

