"use client"

import { useState } from "react"

interface FormData {
  nome: string
  email: string
  telefone: string
  tipoConsulta: string
  sintomas: string
  observacoes: string
  horarioPreferido: string
}

export default function FormularioConsulta() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    tipoConsulta: "",
    sintomas: "",
    observacoes: "",
    horarioPreferido: "",
  })

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { nome, email, telefone, tipoConsulta, sintomas, observacoes, horarioPreferido } = formData

    const mensagem = `
*Agendamento de Consulta*
👤 *Nome:* ${nome}
📧 *E-mail:* ${email}
📱 *Telefone:* ${telefone}
📋 *Tipo de Consulta:* ${tipoConsulta}
🕒 *Preferência de horário:* ${horarioPreferido || "Indiferente"}
🩺 *Sintomas:* ${sintomas}
📝 *Observações:* ${observacoes || "Nenhuma"}
    `.trim()

    const whatsappNumber = "558182670833" // <- ALTERE AQUI
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`

    window.open(whatsappLink, "_blank")

    setFormData({
      nome: "",
      email: "",
      telefone: "",
      tipoConsulta: "",
      sintomas: "",
      observacoes: "",
      horarioPreferido: "",
    })
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 bg-white shadow-md rounded-lg border">
     <h2 className="text-center text-xl md:text-2xl font-bold tracking-tight text-green-800">Agendar Consulta</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-black">Nome completo *</label>
          <input
            type="text"
            required
            className="w-full border p-2 rounded bg-white text-sm text-black autofill:bg-white"
            value={formData.nome}
            onChange={(e) => handleChange("nome", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black">E-mail *</label>
          <input
            type="email"
            required
            className="w-full border p-2 rounded bg-white text-sm text-black autofill:bg-white"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black">Telefone / WhatsApp *</label>
          <input
            type="tel"
            required
            className="w-full border p-2 rounded bg-white text-sm text-black autofill:bg-white"
            value={formData.telefone}
            onChange={(e) => handleChange("telefone", e.target.value)}
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-black">Preferência de horário</label>
          <select
            className="w-full border p-2 rounded bg-white text-sm text-black"
            value={formData.horarioPreferido}
            onChange={(e) => handleChange("horarioPreferido", e.target.value)}
          >
            <option value="">Indiferente</option>
            <option value="Manhã">Manhã</option>
            <option value="Tarde">Tarde</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-black">Sintomas / Motivo *</label>
          <textarea
            required
            className="w-full border p-2 rounded bg-white text-sm text-black"
            rows={2}
            value={formData.sintomas}
            onChange={(e) => handleChange("sintomas", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black">Observações adicionais</label>
          <textarea
            className="w-full border p-2 rounded bg-white text-sm text-black"
            rows={1}
            value={formData.observacoes}
            onChange={(e) => handleChange("observacoes", e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 rounded mt-2"
        >
          Enviar 
        </button>
      </form>
    </div>
  )
}
