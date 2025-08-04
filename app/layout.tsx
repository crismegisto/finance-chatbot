import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'FinBot - Tu Asesor Financiero Personal',
  description: 'Chatbot financiero inteligente especializado en presupuestos, ahorros, inversiones y control de gastos. Obtén consejos personalizados para mejorar tu salud financiera.',
  keywords: ['finanzas', 'chatbot', 'presupuesto', 'ahorros', 'inversiones', 'asesor financiero'],
  authors: [{ name: 'FinBot' }],
  creator: 'FinBot',
  openGraph: {
    title: 'FinBot - Tu Asesor Financiero Personal',
    description: 'Chatbot financiero inteligente para mejorar tu salud financiera',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinBot - Tu Asesor Financiero Personal',
    description: 'Chatbot financiero inteligente para mejorar tu salud financiera',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
