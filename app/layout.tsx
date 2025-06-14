import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Iara Cavalcante | Enfermeira Intervencionista da Dor",
  description:
    "Tratamento especializado para dor sem uso de medicamentos. Terapias naturais PICS com resultados comprovados para dor muscular, fibromialgia, ansiedade e mais.",
  keywords:
    "enfermeira da dor, terapias naturais, PICS, tratamento sem medicamentos, dor muscular, fibromialgia, ansiedade, enxaqueca, dor na coluna, estresse, pressão arterial, glicemia",
    generator: 'DevSitee'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.iaracavalcante.com.br" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
