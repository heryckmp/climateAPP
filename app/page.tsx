'use client'

import { useState, useEffect } from 'react'
import { Clock, Github, Sun, Cloud, CloudRain } from 'lucide-react'
import WeatherApp from "../components/weather-app"
import { CitySearch } from "../components/CitySearch"

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
    <div className="relative min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 relative z-50">
        <div className="flex justify-between items-center pt-8">
          <div className="flex-1 flex justify-center relative">
            <CitySearch onCitySelect={handleWeatherData} isLoading={loading} />
          </div>
          <div className="flex items-center gap-2 text-2xl font-light text-white/90">
            <Clock className="h-6 w-6" />
            {currentTime}
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-lg text-white/80">Carregando...</div>
        </div>
      ) : weatherData ? (
        <WeatherApp data={weatherData} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-white px-4">
          <div className="flex gap-4 mb-8 animate-float">
            <Sun className="h-12 w-12 text-yellow-300 animate-pulse" />
            <Cloud className="h-12 w-12 text-white/80 animate-bounce" style={{ animationDelay: '0.2s' }} />
            <CloudRain className="h-12 w-12 text-blue-300 animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 animate-fade-in">
            Bem-vindo ao ClimateAPP
          </h1>
          
          <p className="text-xl md:text-2xl text-center text-white/80 max-w-2xl mb-8 animate-fade-in-up">
            Descubra o clima em tempo real de qualquer cidade do Brasil
          </p>
          
          <div className="text-center text-white/60 animate-fade-in-up-delay">
            <p className="text-lg mb-2">☝️</p>
            <p className="mb-8">Digite o nome de uma cidade na barra de pesquisa acima</p>
            
            <div className="flex items-center justify-center gap-2 text-sm pt-4 border-t border-white/10">
              <span className="text-white/70">Created by</span>
              <a 
                href="https://github.com/heryckmp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full 
                          hover:bg-purple-500/50 hover:text-white transition-all duration-300
                          border border-white/20 hover:border-purple-400"
              >
                Erick Moreira
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
      
      {weatherData && (
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <div className="text-sm text-white/70">
            Última atualização: {weatherData?.data?.lastUpdate || '2025-02-15T01:03:09.911Z'}
          </div>
        </div>
      )}
    </div>
  )
}