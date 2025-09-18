"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchConsultas, updateConsultaStatus, moveToHistoricalPatient, saveObservationsToFirebase } from "../../firebase/saveConsulta";

interface ConsultaData {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  tipoConsulta: string;
  sintomas: string;
  data: string;
  horario: string;
  observacoes?: string;
}

export default function Dashboard() {
  const [consultas, setConsultas] = useState<ConsultaData[]>([]);
  const [filteredConsultas, setFilteredConsultas] = useState<ConsultaData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPatient, setSelectedPatient] = useState<ConsultaData | null>(null);
  const [currentMonthConsultas, setCurrentMonthConsultas] = useState<ConsultaData[]>([]);
  const [currentWeekConsultas, setCurrentWeekConsultas] = useState<ConsultaData[]>([]);

  useEffect(() => {
    const loadConsultas = async () => {
      try {
        const dadosConsultas = await fetchConsultas();
        setConsultas(dadosConsultas);
        setFilteredConsultas(dadosConsultas);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar consultas.");
        setLoading(false);
      }
    };

    loadConsultas();
  }, []);

  useEffect(() => {
    const getWeekNumber = (date: Date) => {
      const firstDay = new Date(date.getFullYear(), 0, 1);
      const days = Math.floor((date.getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000));
      return Math.ceil((days + firstDay.getDay() + 1) / 7);
    };

    const getConsultasNoMes = () => {
      const currentMonth = new Date().getMonth();
      return consultas.filter((consulta) => {
        const consultaDate = new Date(consulta.data);
        return consultaDate.getMonth() === currentMonth;
      });
    };

    const getConsultasNaSemana = () => {
      const currentWeek = getWeekNumber(new Date());
      return consultas.filter((consulta) => {
        const consultaDate = new Date(consulta.data);
        return getWeekNumber(consultaDate) === currentWeek;
      });
    };

    setCurrentMonthConsultas(getConsultasNoMes());
    setCurrentWeekConsultas(getConsultasNaSemana());
  }, [consultas]);

  const filterConsultas = useCallback(
    (term: string) => {
      if (!term) {
        setFilteredConsultas(consultas);
      } else {
        const lowerTerm = term.toLowerCase();
        const filtered = consultas.filter(
          (consulta) =>
            consulta.nome.toLowerCase().includes(lowerTerm) || consulta.email.toLowerCase().includes(lowerTerm)
        );
        setFilteredConsultas(filtered);
      }
    },
    [consultas]
  );

  const handlePatientClick = (consulta: ConsultaData) => {
    setSelectedPatient(consulta);
  };

  const closePatientDetails = () => {
    setSelectedPatient(null);
  };

  const handleFilterMonth = () => {
    setFilteredConsultas(currentMonthConsultas);
  };

  const handleFilterWeek = () => {
    setFilteredConsultas(currentWeekConsultas);
  };

  const handleClearFilters = () => {
    setFilteredConsultas(consultas);
    setSearchTerm("");
  };

  const handleMarkAsAttended = async (id: string) => {
    try {
      await updateConsultaStatus(id, "atendido");
      setConsultas(consultas.filter((consulta) => consulta.id !== id));
    } catch (err) {
      setError("Erro ao marcar como atendido.");
    }
  };

  const handleDeletePatient = async (id: string) => {
    try {
      // Move para o histórico
      await moveToHistoricalPatient(id);

      // Atualiza a lista de consultas removendo o paciente excluído
      setConsultas((prevConsultas) => prevConsultas.filter((consulta) => consulta.id !== id));
      setFilteredConsultas((prevConsultas) => prevConsultas.filter((consulta) => consulta.id !== id));

      console.log("Paciente excluído com sucesso!");
    } catch (err) {
      setError("Erro ao excluir paciente.");
    }
  };

  const handleSaveObservations = async () => {
    if (selectedPatient) {
      try {
        await saveObservationsToFirebase(selectedPatient.id, selectedPatient.observacoes || "");
        alert("Observações salvas com sucesso!");
      } catch (err) {
        setError("Erro ao salvar observações.");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-green-600">Dashboard de Consultas</h1>
          <a href="/" className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md">
            Voltar para Início
          </a>
        </div>

        {loading && <div className="text-center text-gray-500">Carregando consultas...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}

        <div className="mb-6 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              filterConsultas(e.target.value);
            }}
            className="p-2 rounded-lg border border-gray-300 w-1/3"
          />
          <button
            onClick={handleFilterMonth}
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Consultas no Mês
          </button>
          <button
            onClick={handleFilterWeek}
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Consultas na Semana
          </button>
          <button
            onClick={handleClearFilters}
            className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
          >
            Limpar Filtros
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Consultas Totais</h2>
            <p className="text-2xl font-bold text-gray-900">{consultas.length}</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Consultas no Mês</h2>
            <p className="text-2xl font-bold text-gray-900">{currentMonthConsultas.length}</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Consultas na Semana</h2>
            <p className="text-2xl font-bold text-gray-900">{currentWeekConsultas.length}</p>
          </div>
        </div>

        <div className="overflow-hidden shadow-lg rounded-lg mb-6">
          <table className="min-w-full table-auto bg-white">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase text-white">Nome</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase text-white">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase text-white">Tipo</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase text-white">Data</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase text-white">Horário</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase text-white">Ações</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredConsultas.map((consulta) => (
                <tr key={consulta.id} className="border-b hover:bg-green-50 cursor-pointer">
                  <td className="px-6 py-4 text-black">{consulta.nome}</td>
                  <td className="px-6 py-4 text-black">{consulta.email}</td>
                  <td className="px-6 py-4 text-black">{consulta.tipoConsulta}</td>
                  <td className="px-6 py-4 text-black">{consulta.data}</td>
                  <td className="px-6 py-4 text-black">{consulta.horario}</td>
                  <td className="px-6 py-4 text-black">
                    <button
                      onClick={() => handleMarkAsAttended(consulta.id)}
                      className="text-white bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg"
                    >
                      Marcar como Atendido
                    </button>
                    <button
                      onClick={() => handleDeletePatient(consulta.id)}
                      className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg ml-2"
                    >
                      Excluir
                    </button>
                    <a
                      href={`https://wa.me/${consulta.telefone}`}
                      target="_blank"
                      className="text-blue-600 ml-2"
                    >
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedPatient && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full">
              <h2 className="text-2xl font-semibold text-green-600 mb-4">Detalhes da Consulta</h2>
              <p className="text-black"><strong>Nome:</strong> {selectedPatient.nome}</p>
              <p className="text-black"><strong>Email:</strong> {selectedPatient.email}</p>
              <p className="text-black"><strong>Telefone:</strong> {selectedPatient.telefone}</p>
              <p className="text-black"><strong>Tipo de Consulta:</strong> {selectedPatient.tipoConsulta}</p>
              <p className="text-black"><strong>Sintomas:</strong> {selectedPatient.sintomas}</p>
              <p className="text-black"><strong>Data:</strong> {selectedPatient.data}</p>
              <p className="text-black"><strong>Horário:</strong> {selectedPatient.horario}</p>

              <div className="mt-4">
                <h3 className="font-semibold text-lg">Observações:</h3>
                <textarea
                  value={selectedPatient.observacoes || ""}
                  onChange={(e) => setSelectedPatient({ ...selectedPatient, observacoes: e.target.value })}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                  rows={4}
                  placeholder="Adicionar observações..."
                />
              </div>

              <button
                onClick={handleSaveObservations}
                className="mt-4 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
              >
                Salvar Observações
              </button>

              <button
                onClick={closePatientDetails}
                className="mt-4 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
