'use client'

import { AlertTriangle, MapPin, Cloud, CloudSun, Droplets, Gauge, Plane, Sun, Wind, CloudRain, CloudSnow, CloudLightning, CloudFog, Tornado, CloudHail, Thermometer, Snowflake, CloudDrizzle, Github } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { WeatherData } from "../types/weather"
import { SunEffect } from './SunEffect'
import { CloudEffect } from './CloudEffect'
import { RainEffect } from './RainEffect'
import { ThunderstormEffect } from './ThunderstormEffect'
import { RainSnowEffect } from './RainSnowEffect'
import { SnowEffect } from './SnowEffect'
import { FogEffect } from './FogEffect'
import { FreezingRainEffect } from './FreezingRainEffect'
import { SandstormEffect } from './SandstormEffect'
import { HazeEffect } from './HazeEffect'
import { weatherTranslations } from '@/src/translations/weather-pt'
import { WindEffect } from './WindEffect'

export default function WeatherApp({ data }: { data: WeatherData }) {
  const { location, now, daily, alarm } = data.data
  const [city, province] = location.path.split(", ").slice(1)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  const getDayOfWeek = (dateStr: string, index: number) => {
    if (index === 0) return "Hoje"
    if (index === 1) return "Amanhã"
    if (index === 2) return "Depois"
    const date = new Date(dateStr)
    const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    return days[date.getDay()]
  }

  const getWeatherIcon = (code: string) => {
    const weatherCode = parseInt(code)
    switch (weatherCode) {
      case 1: case 24: return <Sun className="h-6 w-6 text-yellow-400" />
      case 2: case 25: return <CloudSun className="h-6 w-6 text-gray-400" />
      case 3: return <Cloud className="h-6 w-6 text-gray-500" />
      case 4: case 11: case 12: return <CloudRain className="h-6 w-6 text-blue-400" />
      case 5: case 13: return <CloudRain className="h-6 w-6 text-blue-500" />
      case 6: case 14: case 19: return <CloudLightning className="h-6 w-6 text-yellow-500" />
      case 7: case 16: case 17: case 18: return <CloudSnow className="h-6 w-6 text-blue-300" />
      case 8: case 21: return <CloudFog className="h-6 w-6 text-gray-400" />
      case 9: return <CloudHail className="h-6 w-6 text-blue-400" />
      case 10: return <CloudSnow className="h-6 w-6 text-blue-300" />
      case 15: return <CloudHail className="h-6 w-6 text-purple-500" />
      case 20: return <Wind className="h-6 w-6 text-blue-400" />
      case 22: return <CloudDrizzle className="h-6 w-6 text-blue-300" />
      case 23: return <Snowflake className="h-6 w-6 text-blue-300" />
      default: return <Cloud className="h-6 w-6 text-gray-400" />
    }
  }

  const getWeatherEffect = (text: string) => {
    const weatherCode = parseInt(text)
    
    switch (weatherCode) {
      case 1: // Ensolarado
      case 24: // Céu limpo
        return <SunEffect />
        
      case 2: // Parcialmente nublado
      case 25: // Parcialmente ensolarado
        return <SunEffect opacity={0.5} />
        
      case 3: // Nublado
        return <HazeEffect />
        
      case 4: // Nublado com chuva
      case 11: // Chuva fraca
      case 12: // Chuva moderada
        return <RainEffect intensity="light" />
        
      case 5: // Chuva
      case 13: // Chuva forte
        return <RainEffect intensity="heavy" />
        
      case 6: // Tempestade
      case 14: // Trovoada
      case 19: // Tempestade de raios
        return <ThunderstormEffect />
        
      case 7: // Neve
      case 16: // Neve fraca
      case 17: // Neve moderada
      case 18: // Neve forte
        return <SnowEffect intensity="light" />
        
      case 8: // Nevoeiro
      case 21: // Neblina
        return <FogEffect />
        
      case 9: // Chuva congelada
        return <FreezingRainEffect />
        
      case 10: // Chuva com neve
        return <RainSnowEffect />
        
      case 15: // Granizo
        return <ThunderstormEffect withHail={true} />
        
      case 20: // Ventania
        return <WindEffect />
        
      case 22: // Garoa
        return <RainEffect intensity="drizzle" />
        
      case 23: // Geada
        return <SnowEffect intensity="frost" />
        
      default:
        return null
    }
  }

  const getWeatherText = (text: string) => {
    const weatherCode = parseInt(text)
    switch (weatherCode) {
      case 1: return "Ensolarado"
      case 2: return "Parcialmente Nublado"
      case 3: return "Nublado"
      case 4: return "Nublado com Chuva"
      case 5: return "Chuva"
      case 6: return "Tempestade"
      case 7: return "Neve"
      case 8: return "Nevoeiro"
      case 9: return "Chuva Congelada"
      case 10: return "Chuva com Neve"
      case 11: return "Chuva Fraca"
      case 12: return "Chuva Moderada"
      case 13: return "Chuva Forte"
      case 14: return "Trovoada"
      case 15: return "Granizo"
      case 16: return "Neve Fraca"
      case 17: return "Neve Moderada"
      case 18: return "Neve Forte"
      case 19: return "Tempestade de Raios"
      case 20: return "Ventania"
      case 21: return "Neblina"
      case 22: return "Garoa"
      case 23: return "Geada"
      case 24: return "Céu Limpo"
      case 25: return "Parcialmente Ensolarado"
      default: return "Tempo Variável"
    }
  }

  // Função para traduzir direção do vento
  const translateWindDirection = (direction: string) => {
    return weatherTranslations.directions[direction] || direction
  }

  // Função para traduzir escala do vento
  const translateWindScale = (scale: string) => {
    return weatherTranslations.windScale[scale] || scale
  }

  // Função para traduzir tipo de alerta
  const translateAlertType = (type: string) => {
    return weatherTranslations.alerts[type] || type
  }

  // Função para traduzir severidade
  const translateSeverity = (severity: string) => {
    return weatherTranslations.severity[severity] || severity
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 relative overflow-hidden">
      <CloudEffect />
      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <div className="text-2xl font-medium">{location.name}</div>
            </div>
            <div className="text-sm text-white/80 pl-7">{location.path}</div>
          </div>
          <div className="text-xl">
            {data.data.lastUpdate.split(" ")[1]}
          </div>
        </div>

        {/* Current Temperature */}
        <div>
          <div className="text-8xl font-light mb-12">
            {now.temperature.toFixed(1)}°C
          </div>
        </div>

        {/* Current Weather Details */}
        <div className="grid grid-cols-5 gap-8 text-center mb-8">
          <div className="flex flex-col items-center gap-1">
            <Plane className="h-5 w-5 rotate-[20deg]" />
            <div className="text-sm">Direção do Vento</div>
            <div className="text-sm">{translateWindDirection(now.windDirection)}</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Droplets className="h-5 w-5" />
            <div className="text-sm">Umidade</div>
            <div className="text-sm">{now.humidity}%</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Plane className="h-5 w-5" />
            <div className="text-sm">Vel. do Vento</div>
            <div className="text-sm">{now.windSpeed}m/s</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Gauge className="h-5 w-5" />
            <div className="text-sm">Pressão</div>
            <div className="text-sm">{now.pressure}hpa</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Droplets className="h-5 w-5" />
            <div className="text-sm">Precipitação</div>
            <div className="text-sm">{now.precipitation}mm</div>
          </div>
        </div>

        {/* Weather Alerts */}
        {alarm.length > 0 && (
          <div className="space-y-3 mt-4">
            {alarm.map((alert) => {
              const severityMatch = alert.title.match(/\[(.*?)\]/);
              const severityLevel = severityMatch ? severityMatch[1] : alert.severity;

              return (
                <Alert 
                  key={alert.id} 
                  className={`border-2`}
                >
                  <AlertTriangle className="h-5 w-5" />
                  <AlertTitle className="flex items-center gap-2 text-base">
                    <span className="font-semibold">Alerta de {translateAlertType(alert.signaltype)} {alert.signallevel}</span>
                    <span className="text-sm px-2 py-0.5 rounded-full bg-black/10" style={{color: alert.severity}}>
                      {translateSeverity(severityLevel)}
                    </span>
                  </AlertTitle>
                  <AlertDescription>
                    <p className="mt-2 text-sm">{alert.title}</p>
                    <div className="flex justify-between text-xs mt-3 text-black/60">
                      <span className="text-white">Emitido em: {alert.effective}</span>
                    </div>
                  </AlertDescription>
                </Alert>
              );
            })}
          </div>
        )}

        {/* Weather Forecast */}
        <div className="grid grid-cols-7 gap-4 text-center pt-4">
          {daily.map((day, index) => (
            <div key={day.date} className="space-y-2">
              <div>{getDayOfWeek(day.date, index)}</div>
              <div className="text-sm">{formatDate(day.date)}</div>
              <div className="flex flex-col items-center gap-1">
                {getWeatherIcon(day.dayCode)}
                {getWeatherIcon(day.nightCode)}
              </div>
              <div>
                {day.high}°/{day.low}°
              </div>
              <div className="text-sm">{getWeatherText(day.dayCode)}</div>
              <div className="text-sm">Vento: {translateWindScale(day.dayWindScale)}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center space-y-2 pt-8">
          <div className="text-sm text-white/70">Última atualização: {data.data.lastUpdate}</div>
          <div className="flex items-center justify-center gap-2 text-sm">
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
    </div>
  )
}
