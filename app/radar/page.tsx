'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

// Carregando o componente do mapa de forma dinâmica para evitar problemas com SSR
const RadarMap = dynamic(() => import('../../components/RadarMap'), { ssr: false })

export default function RadarPage() {
  return (
    <div className="relative min-h-screen bg-gray-800">
      <header className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-black bg-opacity-50">
        <Link href="/">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Início
          </button>
        </Link>
        <h1 className="text-white text-xl font-bold">Radar Meteorológico</h1>
      </header>
      <main className="pt-20">
        <RadarMap />
      </main>
    </div>
  )
} 