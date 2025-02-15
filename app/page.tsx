'use client'

import { useState, useEffect } from 'react'
import { Clock, Github, Sun, Cloud, CloudRain, Navigation2, Compass, Wind } from 'lucide-react'
import WeatherApp from "../components/weather-app"
import { CitySearch } from "../components/CitySearch"
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Carrega o globo dinamicamente apenas no cliente
const InteractiveGlobe = dynamic(() => import('../components/Globe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] flex items-center justify-center">
      <div className="text-white/60">Carregando globo...</div>
    </div>
  )
})

export default function Page() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    // Atualiza o horário a cada segundo
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })
      setCurrentTime(timeString)
    }

    updateTime() // Primeira atualização
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleWeatherData = (data) => {
    console.log('Dados recebidos na página:', data)
    if (data.error) {
      setError(data.error)
      return
    }
    setWeatherData(data)
    setError(null)
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="rounded-lg bg-red-500/10 p-4 text-red-500 backdrop-blur-sm">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
      {/* Efeito de partículas flutuantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `-${Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-50">
        <nav className="px-4">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center gap-1.5">
              <a 
                href="https://github.com/heryckmp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-1.5 py-0.5 bg-white/10 rounded-full 
                          hover:bg-purple-500/50 hover:text-white transition-all duration-300
                          border border-white/20 hover:border-purple-400 text-sm"
              >
                <span className="text-white/70">Created by</span>
                <span className="text-white">Erick Moreira</span>
                <Github className="h-3.5 w-3.5 text-white" />
              </a>
              <div className="h-5 w-px bg-white/20 mx-1.5" /> {/* Divisor vertical */}
              <div className="flex items-center gap-1">
                <Compass className="h-5 w-5 text-white" />
                <span className="text-lg font-bold text-white">ClimateAPP</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/radar" 
                className="flex items-center gap-2 px-4 py-2 text-white bg-white/10 rounded-full 
                          hover:bg-white/20 transition-all duration-300 backdrop-blur-sm
                          border border-white/10 hover:border-white/30"
              >
                <Navigation2 className="h-5 w-5" />
                <span>Radar</span>
              </Link>
              <div className="flex items-center gap-2 px-4 py-2 text-white bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
                <Clock className="h-5 w-5" />
                <span className="text-lg font-light">{currentTime}</span>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-40 max-w-7xl mx-auto px-4 pt-8">
        <div className="flex justify-center mb-16">
          <CitySearch onCitySelect={handleWeatherData} isLoading={loading} />
        </div>

        {loading ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-lg text-white/80">Carregando...</div>
          </div>
        ) : weatherData ? (
          <WeatherApp data={weatherData} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-white px-4">
            {/* Hero Section */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center filter blur-3xl opacity-30">
                <div className="w-48 h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
              </div>
              
              <div className="relative flex gap-6 mb-12 animate-float">
                <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 transform hover:scale-110 transition-transform duration-300">
                  <Sun className="h-12 w-12 text-yellow-300 animate-pulse" />
                </div>
                <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 transform hover:scale-110 transition-transform duration-300">
                  <Cloud className="h-12 w-12 text-white/80 animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 transform hover:scale-110 transition-transform duration-300">
                  <Wind className="h-12 w-12 text-blue-300 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 animate-fade-in">
              ClimateAPP
            </h1>
            
            <p className="text-xl md:text-2xl text-center text-white/80 max-w-2xl mb-12 animate-fade-in-up leading-relaxed">
              Descubra o clima em tempo real de qualquer cidade do Brasil com previsões precisas e atualizadas
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-16">
              <div className="p-6 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                <Sun className="h-8 w-8 text-yellow-300 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Previsão Detalhada</h3>
                <p className="text-white/70">Informações precisas sobre temperatura, umidade e condições climáticas.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                <Navigation2 className="h-8 w-8 text-blue-300 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Radar em Tempo Real</h3>
                <p className="text-white/70">Visualize a precipitação e movimentação das nuvens em tempo real.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                <Wind className="h-8 w-8 text-purple-300 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Alertas Meteorológicos</h3>
                <p className="text-white/70">Receba alertas sobre condições climáticas severas na sua região.</p>
              </div>
            </div>

            <div className="text-center text-white/60 animate-fade-in-up-delay">
              <p className="text-xl mb-4">☝️</p>
              <p className="mb-8 text-lg">Digite o nome de uma cidade na barra de pesquisa acima</p>
            </div>

            <div className="mt-16 w-full">
              <InteractiveGlobe />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}