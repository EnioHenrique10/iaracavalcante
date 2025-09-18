"use client"

import { useEffect, useState } from "react"
import { saveConsulta, verificarHorarioDisponivel } from '../firebase/saveConsulta'

interface FormData {
  nome: string
  email: string
  telefone: string
  tipoConsulta: string
  sintomas: string
  data: string
  horario: string
}

export default function FormularioConsulta() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    tipoConsulta: "",
    sintomas: "",
    data: "",
    horario: "",
  })

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "horario-indisponivel">("idle")
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([])

  // Atualiza o estado do formulário
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const horarioDisponivel = await verificarHorarioDisponivel(formData.data, formData.horario)
      if (!horarioDisponivel) {
        setStatus("horario-indisponivel")
        return
      }
      await saveConsulta(formData)
      setStatus("success")
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        tipoConsulta: "",
        sintomas: "",
        data: "",
        horario: "",
      })
      setHorariosDisponiveis([]) // Resetando os horários
    } catch (error) {
      console.error("Erro ao salvar consulta:", error)
      setStatus("error")
    }
  }

// Gera todos os horários possíveis entre 08:00 e 18:00, com intervalos de 1 hora
const gerarHorarios = (): string[] => {
  const horarios: string[] = []
  for (let hora = 8; hora <= 18; hora++) {
    horarios.push(`${String(hora).padStart(2, '0')}:00`)
  }
  return horarios
}


  // Busca horários disponíveis sempre que a data for alterada
  useEffect(() => {
    const buscarHorarios = async () => {
      if (!formData.data) {
        setHorariosDisponiveis([])
        return
      }

      setStatus("loading")  // Status de carregando enquanto busca os horários

      const todosHorarios = gerarHorarios()
      const horariosLivres: string[] = []

      for (const horario of todosHorarios) {
        const disponivel = await verificarHorarioDisponivel(formData.data, horario)
        if (disponivel) horariosLivres.push(horario)
      }

      setHorariosDisponiveis(horariosLivres)
      setStatus("idle")  // Resetando o status de loading após buscar os horários

      // Reseta horário selecionado ao mudar a data
      setFormData((prev) => ({ ...prev, horario: "" }))
    }

    buscarHorarios()
  }, [formData.data])

  // Data mínima para o campo data (hoje)
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 bg-white shadow-md rounded-lg border">
      <h2 className="text-center text-xl md:text-2xl font-bold tracking-tight text-green-800">Agendar Consulta</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-black">Nome completo *</label>
          <input
            type="text"
            required
            placeholder="Ex: João da Silva"
            className="w-full border p-2 rounded bg-white text-sm text-black"
            value={formData.nome}
            onChange={(e) => handleChange("nome", e.target.value)}
          />
        </div>

        {/* E-mail */}
        <div>
          <label className="block text-sm font-medium text-black">E-mail *</label>
          <input
            type="email"
            required
            placeholder="Ex: joao@email.com"
            className="w-full border p-2 rounded bg-white text-sm text-black"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-medium text-black">Telefone / WhatsApp *</label>
          <input
            type="tel"
            required
            placeholder="Ex: (11) 91234-5678"
            className="w-full border p-2 rounded bg-white text-sm text-black"
            value={formData.telefone}
            onChange={(e) => handleChange("telefone", e.target.value)}
          />
        </div>

        {/* Tipo de Consulta */}
        <div>
          <label className="block text-sm font-medium text-black">Tipo de Consulta *</label>
          <select
            required
            className="w-full border p-2 rounded bg-white text-sm text-black"
            value={formData.tipoConsulta}
            onChange={(e) => handleChange("tipoConsulta", e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="Primeira consulta">Primeira consulta</option>
            <option value="Retorno">Retorno</option>
            <option value="Urgência">Urgência</option>
            <option value="Preventiva">Preventiva</option>
            <option value="Avaliação de exames">Avaliação de exames</option>
          </select>
        </div>

        {/* Data */}
        <div>
          <label className="block text-sm font-medium text-black">Data da Consulta *</label>
          <input
            type="date"
            required
            min={today}
            className="w-full border p-2 rounded bg-white text-sm text-black"
            value={formData.data}
            onChange={(e) => handleChange("data", e.target.value)}
          />
        </div>

        {/* Horário */}
        <div>
          <label className="block text-sm font-medium text-black">Horário da Consulta *</label>
          <select
            required
            disabled={!formData.data || horariosDisponiveis.length === 0}
            className="w-full border p-2 rounded bg-white text-sm text-black"
            value={formData.horario}
            onChange={(e) => handleChange("horario", e.target.value)}
          >
            {!formData.data && <option>Selecione uma data primeiro</option>}
            {formData.data && horariosDisponiveis.length === 0 && <option>Nenhum horário disponível</option>}
            {horariosDisponiveis.map((hora) => (
              <option key={hora} value={hora}>{hora}</option>
            ))}
          </select>
        </div>

        {/* Sintomas */}
        <div>
          <label className="block text-sm font-medium text-black">Sintomas / Motivo *</label>
          <textarea
            required
            placeholder="Descreva brevemente os sintomas ou motivo da consulta"
            rows={3}
            className="w-full border p-2 rounded bg-white text-sm text-black"
            value={formData.sintomas}
            onChange={(e) => handleChange("sintomas", e.target.value)}
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 rounded mt-2"
        >
          {status === "loading" ? "Enviando..." : "Agendar Consulta"}
        </button>

        {/* Mensagens */}
        {status === "success" && <p className="mt-2 text-green-600 font-semibold">✅ Consulta agendada com sucesso!</p>}
        {status === "error" && <p className="mt-2 text-red-600 font-semibold">❌ Erro ao agendar consulta. Tente novamente.</p>}
        {status === "horario-indisponivel" && <p className="mt-2 text-orange-600 font-semibold">⚠️ Horário já está ocupado. Escolha outro.</p>}
      </form>
    </div>
  )
}
