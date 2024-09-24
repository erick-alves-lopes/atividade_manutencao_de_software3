import React, { createElement, useState } from 'react';
import './App.css';

function App() {
  const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

  // Inicializa o estado dos estudos
  const [estudos, setEstudos] = useState(() =>
    diasDaSemana.reduce((acc, dia) => {
      acc[dia] = { manha: '', tarde: '', noite: '' };
      return acc;
    }, {})
  );
  const [atividade, setAtividade] = useState('');
  const [tempo, setTempo] = useState('');
  const [diaSelecionado, setDiaSelecionado] = useState('Segunda-feira');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('manha');
  const [anotacao, setAnotacao] = useState({});

  // Adiciona a atividade ao estado
  const adicionarAtividade = () => {
    if (!atividade) return;

    setEstudos(prevEstudos => ({
      ...prevEstudos,
      [diaSelecionado]: {
        ...prevEstudos[diaSelecionado],
        [periodoSelecionado]: atividade + tempo,
      },
    }));

    setAnotacao(prevAnotacao => ({
      ...prevAnotacao,
      [diaSelecionado]: {
        ...prevAnotacao[diaSelecionado],
        [periodoSelecionado]: true, 
      }
    }));

    setAtividade('');
    setTempo(''); // Limpa o campo de atividade após adicionar
  };

  const removerAtividade = (dia, periodo) => {
    setEstudos(prevEstudos => ({
      ...prevEstudos,
      [dia]: {
        ...prevEstudos[dia],
        [periodo]: '',
      },
    }));

    setAnotacao(prevAnotacao => ({
      ...prevAnotacao,
      [dia]: {
        ...prevAnotacao[dia],
        [periodo]: false, 
      }
    }));
  };

  return (
    <div className="app-container">
      <h1>Gerenciador de Estudos 2024</h1>

      <div className="input-container">
        <label>Dia:</label>
        <select value={diaSelecionado} onChange={(e) => setDiaSelecionado(e.target.value)}>
          {diasDaSemana.map(dia => (
            <option key={dia} value={dia}>{dia}</option>
          ))}
        </select>

        <label>Período:</label>
        <select value={periodoSelecionado} onChange={(e) => setPeriodoSelecionado(e.target.value)}>
          <option value="manha">Manhã</option>
          <option value="tarde">Tarde</option>
          <option value="noite">Noite</option>
        </select>

        <label>O que estudar:</label>
        <input
          type="text"
          value={atividade}
          onChange={(e) => setAtividade(e.target.value)}
          placeholder="Ex: Matemática"
        />
        <label>Hora(s) de estudo:</label>
        <input
          type="text"
          value={tempo}
          onChange={(e) => {
            const valorRecebido = e.target.value;
            const valorFinal = " " + valorRecebido + " hora(s)";
            setTempo(valorFinal);
          }}
        />
        <button onClick={adicionarAtividade}>Adicionar Estudo</button>
      </div>

      {diasDaSemana.map(dia => (
        <div key={dia} className="dia-container">
          <h2>{dia}</h2>
          {['manha', 'tarde', 'noite'].map(periodo => (
            <div key={periodo} className="periodo-container">
              <strong>{periodo.charAt(0).toUpperCase() + periodo.slice(1)}:</strong>
              {estudos[dia][periodo]}
              {estudos[dia][periodo] && (
                <>
                  <button onClick={() => removerAtividade(dia, periodo)}>-</button>
                  {anotacao[dia] && anotacao[dia][periodo] && (
                    <div>
                      <input type="text" placeholder="Tópicos específicos; Pontos a revisar; Referências bibliográficas." />
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
