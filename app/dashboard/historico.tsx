"use client"

import { useState, useEffect } from 'react'
import { fetchHistoricoPacientes } from '../../firebase/saveConsulta' // Ajuste o caminho

interface HistoricoPaciente {
  id: string
  nome: string
  email: string
  telefone: string
  tipoConsulta: string
  sintomas: string
  data: string
  horario: string
}

export default function Historico() {
  const [historico, setHistorico] = useState<HistoricoPaciente[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadHistorico = async () => {
      try {
        const pacientesHistorico = await fetchHistoricoPacientes()
        setHistorico(pacientesHistorico)
        setLoading(false)
      } catch (err) {
        console.error('Erro ao carregar histórico', err)
        setError('Erro ao carregar histórico. Tente novamente mais tarde.')
        setLoading(false)
      }
    }

    loadHistorico()
  }, [])

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-green-600 mb-6">Histórico de Pacientes Excluídos</h1>
        
        {/* Exibição de erro se existir */}
        {error && <div className="text-center text-red-600 mb-4">{error}</div>}

        {/* Carregamento de pacientes */}
        {loading ? (
          <div className="text-center text-gray-500">Carregando histórico...</div>
        ) : (
          <>
            {historico.length === 0 ? (
              <div className="text-center text-gray-500">Nenhum paciente no histórico.</div>
            ) : (
              <div className="overflow-hidden shadow-lg rounded-lg">
                <table className="min-w-full table-auto bg-white">
                  <thead className="bg-green-600 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase">Nome</th>
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase">Tipo</th>
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase">Data</th>
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {historico.map((paciente) => (
                      <tr key={paciente.id} className="border-b hover:bg-green-50">
                        <td className="px-6 py-4 text-black">{paciente.nome}</td>
                        <td className="px-6 py-4 text-black">{paciente.email}</td>
                        <td className="px-6 py-4 text-black">{paciente.tipoConsulta}</td>
                        <td className="px-6 py-4 text-black">{paciente.data}</td>
                        <td className="px-6 py-4 text-black">
                          <button
                            className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                          >
                            Restaurar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
