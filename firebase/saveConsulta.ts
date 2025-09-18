import { db } from './firebaseConfig'
import { collection, getDocs, query, where, addDoc, doc, deleteDoc, setDoc, updateDoc, getDoc } from 'firebase/firestore'



// Definindo o tipo de dados da consulta
interface ConsultaData {
  id: string
  nome: string
  email: string
  telefone: string
  tipoConsulta: string
  sintomas: string
  data: string
  horario: string
}



// Função para salvar a consulta no banco de dados
export async function saveConsulta(consulta: Omit<ConsultaData, 'id'>): Promise<void> {
  try {
    console.log("Iniciando o processo para salvar a consulta.")
    
    // Adiciona a consulta à coleção "consultas" no Firestore
    const consultasRef = collection(db, "consultas")
    const docRef = await addDoc(consultasRef, consulta)
    
    console.log(`Consulta salva com sucesso! ID: ${docRef.id}`)
  } catch (error) {
    console.error("Erro ao salvar consulta:", error)
    throw new Error("Erro ao salvar consulta.")
  }
}

// Função para buscar todas as consultas agendadas
export async function fetchConsultas(): Promise<ConsultaData[]> {
  try {
    console.log("Iniciando a busca por todas as consultas.")

    const consultasRef = collection(db, "consultas")
    const querySnapshot = await getDocs(consultasRef)

    const consultasList = querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<ConsultaData, 'id'>
      console.log(`Consulta encontrada: ${doc.id}`)
      return {
        id: doc.id,
        ...data,
      } as ConsultaData
    })

    console.log(`Total de consultas encontradas: ${consultasList.length}`)
    return consultasList
  } catch (error) {
    console.error("Erro ao buscar consultas:", error)
    throw new Error("Erro ao buscar consultas.")
  }
}

// Função para atualizar o status da consulta
export async function updateConsultaStatus(id: string, status: string): Promise<void> {
  try {
    console.log(`Iniciando atualização do status da consulta. ID: ${id}, Novo Status: ${status}`)
    
    const consultaRef = doc(db, "consultas", id)
    await updateDoc(consultaRef, {
      status: status,
    })

    console.log(`Status da consulta atualizado com sucesso! ID: ${id}, Novo Status: ${status}`)
  } catch (error) {
    console.error("Erro ao atualizar status da consulta:", error)
    throw new Error("Erro ao atualizar status da consulta.")
  }
}

// Função para mover paciente para histórico
export async function moveToHistoricalPatient(id: string): Promise<void> {
  try {
    console.log(`Iniciando o processo de mover o paciente para o histórico. ID: ${id}`)
    
    const consultaRef = doc(db, "consultas", id)
    const consultaDoc = await getDoc(consultaRef)

    if (consultaDoc.exists()) {
      const consultaData = consultaDoc.data()

      // Mover o paciente para a coleção "historico"
      const historicoRef = doc(db, "historico", id)
      await setDoc(historicoRef, consultaData)

      // Após mover, excluir o paciente da coleção "consultas"
      await deleteDoc(consultaRef)

      console.log(`Paciente movido para histórico com sucesso! ID: ${id}`)
    } else {
      console.log(`Paciente não encontrado na coleção 'consultas'. ID: ${id}`)
    }
  } catch (error) {
    console.error("Erro ao mover paciente para histórico:", error)
    throw new Error("Erro ao mover paciente para histórico.")
  }
}

// Função para salvar observações no Firebase
export async function saveObservationsToFirebase(id: string, observations: string): Promise<void> {
  try {
    console.log(`Iniciando o processo para salvar observações. ID: ${id}, Observações: ${observations}`)
    
    const consultaRef = doc(db, "consultas", id)
    await updateDoc(consultaRef, {
      observacoes: observations,
    })

    console.log(`Observações salvas com sucesso! ID: ${id}`)
  } catch (error) {
    console.error("Erro ao salvar observações:", error)
    throw new Error("Erro ao salvar observações.")
  }
}

// Função para restaurar paciente atendido de volta para "consultas"
export async function restaurarPacienteAtendido(id: string): Promise<void> {
  try {
    console.log(`Iniciando a restauração do paciente para 'consultas'. ID: ${id}`)
    
    const historicoRef = doc(db, "historico", id)
    const historicoDoc = await getDoc(historicoRef)

    if (historicoDoc.exists()) {
      const historicoData = historicoDoc.data()

      // Mover o paciente de volta para a coleção "consultas"
      const consultaRef = doc(db, "consultas", id)
      await setDoc(consultaRef, historicoData)

      // Após restaurar, excluir o paciente da coleção "historico"
      await deleteDoc(historicoRef)

      console.log(`Paciente restaurado para 'consultas' com sucesso! ID: ${id}`)
    } else {
      console.log(`Paciente não encontrado na coleção 'historico'. ID: ${id}`)
    }
  } catch (error) {
    console.error("Erro ao restaurar paciente atendido:", error)
    throw new Error("Erro ao restaurar paciente atendido.")
  }
}

// Função para restaurar paciente de volta para a coleção original
export async function restaurarPaciente(id: string): Promise<void> {
  try {
    console.log(`Iniciando a restauração do paciente para 'consultas'. ID: ${id}`)
    
    const pacienteRef = doc(db, "consultas", id)
    const pacienteDoc = await getDoc(pacienteRef)

    if (pacienteDoc.exists()) {
      const pacienteData = pacienteDoc.data()

      // Restaurar o paciente para a coleção 'consultas'
      const restaurarRef = doc(db, "consultas", id)
      await setDoc(restaurarRef, pacienteData)

      console.log(`Paciente restaurado com sucesso! ID: ${id}`)
    } else {
      console.log(`Paciente não encontrado na coleção 'consultas'. ID: ${id}`)
    }
  } catch (error) {
    console.error("Erro ao restaurar paciente:", error)
    throw new Error("Erro ao restaurar paciente.")
  }
}

// Função para buscar todos os pacientes no histórico
export async function fetchHistoricoPacientes(): Promise<ConsultaData[]> {
  try {
    const historicoRef = collection(db, "historico")
    const querySnapshot = await getDocs(historicoRef)

    const historicoList = querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<ConsultaData, 'id'>
      return {
        id: doc.id,
        ...data,
      } as ConsultaData
    })

    return historicoList
  } catch (error) {
    console.error("Erro ao buscar pacientes no histórico:", error)
    throw new Error("Erro ao buscar pacientes no histórico.")
  }
}


// Função para buscar todos os pacientes atendidos
export async function fetchAtendidos(): Promise<ConsultaData[]> {
  try {
    const consultasRef = collection(db, "consultas")
    const querySnapshot = await getDocs(consultasRef)

    const atendidosList = querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<ConsultaData, 'id'>
      return {
        id: doc.id,
        ...data,
      } as ConsultaData
    })

    return atendidosList
  } catch (error) {
    console.error("Erro ao buscar pacientes atendidos:", error)
    throw new Error("Erro ao buscar pacientes atendidos.")
  }
}


// Função para verificar se o horário está disponível
export async function verificarHorarioDisponivel(data: string, horario: string): Promise<boolean> {
  try {
    console.log(`Verificando disponibilidade para o horário ${horario} na data ${data}.`)
    
    const consultasRef = collection(db, "consultas")
    
    // Consultar o banco de dados para verificar se já existe uma consulta na mesma data e horário
    const q = query(
      consultasRef,
      where("data", "==", data),
      where("horario", "==", horario)
    )

    const querySnapshot = await getDocs(q)

    // Se houver algum documento que corresponda, o horário não está disponível
    return querySnapshot.empty
  } catch (error) {
    console.error("Erro ao verificar horário disponível:", error)
    return false // Caso haja erro, retornamos false (horário não disponível)
  }
}
