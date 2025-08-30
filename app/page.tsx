import Image from "next/image"
import Link from "next/link"
import { Phone, Clock, MapPin, CheckCircle, ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import VideoGallery from "@/components/index"
import FormularioConsulta from "@/components/form"



export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
                    <Image
                      src="/lgo1.png"
                      alt="Logo"
                      width={250}
                      height={42}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#inicio" className="text-sm text-green-600 font-medium hover:text-green-900 transition-colors ">
              Início
            </Link>
            <Link href="#sobre" className="text-sm text-green-600 font-medium hover:text-green-700 transition-colors">
              Sobre
            </Link>
            <Link href="#servicos" className="text-sm text-green-600 font-medium hover:text-green-700 transition-colors">
              Serviços
            </Link>
            <Link href="#depoimentos" className="text-sm text-green-600 font-medium hover:text-green-700 transition-colors">
              Depoimentos
            </Link>
            <Link href="#contato" className="text-sm text-green-600 font-medium hover:text-green-700 transition-colors">
              Contato
            </Link>
          </nav>
          <div>
              <a
                href="https://wa.me/5581982670833"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 px-1 py-0.2 text-[7px] md:px-6 md:py-1 md:text-base flex items-center rounded text-white"
              >
                <Phone className="mr-1 h-3 w-3 md:h-5 md:w-5" />
                Agendar Consulta
              </a>


          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="inicio" className="relative bg-gradient-to-r from-green-50 to-green-100 py-20">
          <div className="container flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">
                Terapias Naturais PICS
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-green-800">
                Enfermeira Intervencionista da Dor
              </h1>
              <p className="text-xl text-gray-600">
                Cuidado técnico, acolhimento e resultados reais no tratamento da dor sem uso de medicamentos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/5581982670833?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="bg-green-600 hover:bg-green-700">
                      Agende sua Consulta
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                    <Link href="#servicos">
                  <Button variant="outline" size="lg" className="border-green-600 text-green-700 hover:bg-green-50">
                    Conheça os Tratamentos
                  </Button>
                </Link>
              </div>
            </div>
           <div className="flex-1 relative flex justify-center">
              <div className="relative w-full max-w-[350px] h-[400px] sm:h-[450px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/logo3.png"
                  alt="Iara Cavalcante - Enfermeira Especialista"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caixa de status */}
              <div className="hidden sm:flex absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-green-500">Atendimento Disponível</span>
              </div>
            </div>

          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Tratamento Natural</h3>
                <p className="text-gray-600">
                  Abordagem terapêutica sem uso de medicamentos, focada em técnicas naturais e comprovadas.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Atendimento Personalizado</h3>
                <p className="text-gray-600">
                  Cada paciente recebe um plano de tratamento único, adaptado às suas necessidades específicas.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Resultados Comprovados</h3>
                <p className="text-gray-600">
                  Métodos terapêuticos com eficácia comprovada no alívio da dor e melhoria da qualidade de vida.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="sobre" className="py-16 bg-green-50">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 relative">
              <div className="relative w-full max-w-[350px] h-[400px] sm:h-[450px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/foto1.jpeg"
                  alt="Iara Cavalcante - Enfermeira Especialista"
                  className="w-full h-full object-cover"
                />
              </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-green-700 font-bold">+8 anos de experiência</p>
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">CONHEÇA A DRA.</div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-green-800">Iara Cavalcante</h2>
                <p className="text-lg text-gray-600">
                  Iara Cavalcante, baiana de origem, carrega consigo o charme, a leveza e a delicadeza que marcam sua essência. Formou-se em Enfermagem em Recife – Pernambuco, onde também se especializou em Urgência, Emergência e Terapia Intensiva (UTI). 
                  Hoje, dedica-se com paixão à Intervenção da Dor, atuando através das Práticas Integrativas e Complementares em Saúde (PICS).
                </p>
                <p className="text-lg text-gray-600">
                  Com mais de 8 anos de experiência na área da saúde, desenvolveu um olhar atento, humanizado e integrado, 
                  proporcionando alívio e qualidade de vida para pessoas que convivem com diferentes tipos de dor.
                </p>
                <p className="text-sm text-gray-600">
                  Escolheu Piedade, Jaboatão dos Guararapes – PE como seu lar e foi aqui que fundou o consultório, um espaço pensado para acolher, cuidar e promover o alívio da dor de forma natural, segura e personalizada.
                  Seu propósito é cuidar de pessoas, aliviar dores e prevenir crises, oferecendo terapias que respeitam o tempo, as particularidades e as necessidades de cada paciente.

                  Ao chegar à clínica, você encontrará um ambiente de paz, aconchego e aromas terapêuticos cuidadosamente preparados com o auxílio da aromaterapia. Desde o primeiro contato, você já sentirá o cuidado, o equilíbrio e o alívio começando a fazer parte da sua jornada.

                  Público Atendido
                  Adolescentes a partir de 16 anos, adultos e idosos.
                </p>
                <div className="pt-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Saiba Mais
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="servicos" className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 mb-4">
                Nossos Serviços
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-green-800">
                Tratamentos Especializados
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Oferecemos uma variedade de terapias naturais para o tratamento da dor, sem uso de medicamentos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Alívio da Dor Muscular e Articular",
                  description:
                    "Técnicas especializadas para reduzir inflamação e aliviar dores musculares e articulares.",
                },
                {
                  title: "Tratamento para Fibromialgia",
                  description:
                    "Abordagem integrada para manejo dos sintomas da fibromialgia e melhoria da qualidade de vida.",
                },
                {
                  title: "Controle da Ansiedade",
                  description:
                    "Técnicas de relaxamento e terapias naturais para redução da ansiedade e seus efeitos físicos.",
                },
                {
                  title: "Tratamento de Enxaqueca",
                  description: "Métodos eficazes para prevenção e alívio de crises de enxaqueca e dores de cabeça.",
                },
                {
                  title: "Alívio da Dor na Coluna",
                  description: "Terapias específicas para problemas na coluna vertebral, hérnias e dores crônicas.",
                },
                {
                  title: "Manejo do Estresse",
                  description: "Técnicas para redução do estresse e seus impactos negativos no corpo e na saúde.",
                },
                {
                  title: "Controle de Pressão Arterial",
                  description: "Métodos naturais complementares para auxiliar no controle da pressão arterial.",
                },
                {
                  title: "Controle de Glicemia",
                  description: "Abordagens complementares para ajudar no equilíbrio dos níveis de açúcar no sangue.",
                },
               
              ].map((service, index) => (
                <Card key={index} className="border-green-100 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <CheckCircle className="h-5 w-5 text-green-700" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-green-800">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="depoimentos" className="py-16 bg-green-50">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 mb-4">
                Depoimentos
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-green-800">
                O que dizem nossos pacientes
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Conheça as histórias de quem já experimentou nossos tratamentos e obteve resultados reais.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Marcos Lopes",
                  condition: "",
                  testimonial:
                    "Ambiente super agradável com o melhor atendimento e muito profissionalismo. Super indico.",
                },
                {
                  name: "João Santos",
                  condition: "",
                  testimonial:
                    "Tinha dores crônicas na coluna que me impediam até de trabalhar. Com o tratamento natural, consegui retomar minhas atividades normais.",
                },
                {
                  name: "Ana Oliveira",
                  condition: "",
                  testimonial:
                    "Sofria com enxaquecas frequentes que não respondiam a medicamentos. As técnicas aplicadas pela Iara reduziram drasticamente a frequência e intensidade das crises.",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="border-green-100">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-green-200 flex items-center justify-center">
                          <span className="text-green-800 font-bold">{testimonial.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-bold">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">{testimonial.condition}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">"{testimonial.testimonial}"</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="h-5 w-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

      <VideoGallery />
 
        {/* CTA */}
        <section className="py-16 bg-green-700 text-white">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <h2 className="text-3xl font-bold">Pronto para viver sem dor?</h2>
                <p className="text-green-100 text-lg">
                  Agende sua consulta hoje mesmo e dê o primeiro passo para uma vida com mais qualidade.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="https://wa.me/5581982670833" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                  <Phone className="mr-2 h-4 w-4" />
                  Agendar Consulta
                </Button>
                </Link>
                <Link href="https://wa.me/5581982670833" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="border-white text-green-700 hover:bg-green-600">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
     <section id="contato" className="py-16 bg-white">
  <div className="container">
    <div className="text-center mb-12">
      <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 mb-4">Contato</div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-green-800">Entre em contato</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Estamos à disposição para esclarecer suas dúvidas e agendar sua consulta.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* 📋 Formulário */}
      <div>
        <FormularioConsulta />
      </div>

      {/* 🗺️ Mapa */}
      <div className="h-full">
        <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.685647608474!2d-34.9212352!3d-8.1862322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7aae1006718bae5%3A0xba728893a95e7eba!2sConsult%C3%B3rio%20Dra.%20Iara%20Cavalcante!5e0!3m2!1spt-BR!2sbr!4v1718064461375!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Localização"
          />
        </div>
      </div>
    </div>
  </div>
</section>

      </main>

      

      {/* WhatsApp Floating Button */}
      <Link
        href="https://wa.me/5581982670833"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-105"
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </Link>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Iara Cavalcante</h3>
              <p className="text-green-100">
                Especialista em Urgência, Emergência e UTI 
                <br />
                Atuando com as Práticas Integrativas e Complementares a Saúde-PICS 
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contato</h3>
              <p className="text-green-100">
                Av. Ayrton Senna, 3990
                <br />
                Jaboatão, PE - CEP: 54420-700
                <br />
                81 98267-0833
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horário</h3>
              <p className="text-green-100">
                Segunda a Sexta: 9h às 18h
                <br />
                Sábado: 8h às 14h
              </p>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-100">
            <p>&copy; {new Date().getFullYear()} DevSitee - Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
