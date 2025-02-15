import { NextResponse } from 'next/server'

const VISUAL_CROSSING_API_KEY = process.env.VISUAL_CROSSING_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const name = searchParams.get('name')
  const state = searchParams.get('state')
  const country = searchParams.get('country')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Latitude e longitude são necessárias' }, { status: 400 })
  }

  if (!VISUAL_CROSSING_API_KEY) {
    console.error('API key não encontrada')
    return NextResponse.json({ error: 'Configuração da API inválida' }, { status: 500 })
  }

  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&include=current,daily,alerts,hours&key=${VISUAL_CROSSING_API_KEY}&contentType=json&lang=pt`
    
    console.log('Fazendo requisição para:', url.replace(VISUAL_CROSSING_API_KEY, 'XXXXX'))
    
    const response = await fetch(url)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Erro na resposta da API:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    // Formatando os dados para o formato esperado pelo nosso app
    const formattedData = {
      code: "0",
      data: {
        location: {
          name: name || "Local não encontrado",
          path: `${name}, ${state}, ${country}`,
          timezone: data.timezone
        },
        now: {
          temperature: data.currentConditions.temp,
          humidity: data.currentConditions.humidity,
          pressure: data.currentConditions.pressure,
          windDirection: data.currentConditions.winddir.toString(),
          windDirectionDegree: data.currentConditions.winddir,
          windSpeed: data.currentConditions.windspeed,
          windScale: data.currentConditions.windspeed.toString(),
          precipitation: data.currentConditions.precip || 0,
          text: getWeatherText(data.currentConditions.icon),
          code: getWeatherCode(data.currentConditions.icon)
        },
        daily: data.days.slice(0, 7).map(day => ({
          date: day.datetime,
          dayText: getWeatherText(day.icon),
          nightText: getWeatherText(day.icon),
          dayCode: getWeatherCode(day.icon),
          nightCode: getWeatherCode(day.icon),
          high: day.tempmax,
          low: day.tempmin,
          dayWindDirection: day.winddir.toString(),
          dayWindScale: day.windspeed.toString(),
          nightWindDirection: day.winddir.toString(),
          nightWindScale: day.windspeed.toString()
        })),
        lastUpdate: new Date().toISOString(),
        alarm: data.alerts ? data.alerts.map(alert => ({
          id: alert.event,
          title: alert.description,
          severity: getSeverityColor(alert.severity),
          signaltype: alert.event,
          signallevel: alert.severity,
          effective: new Date(alert.onset).toLocaleString()
        })) : [],
        hours: data.days[0].hours.map(hour => ({
          datetime: `${data.days[0].datetime} ${hour.datetime}`,
          temp: hour.temp,
          precip: hour.precip || 0,
          conditions: hour.conditions,
          icon: hour.icon
        }))
      }
    }

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error('Erro completo:', error)
    return NextResponse.json(
      { error: 'Falha ao obter dados meteorológicos', details: error.message },
      { status: 500 }
    )
  }
}

// Função para converter os ícones do Visual Crossing para nossos códigos
function getWeatherCode(icon: string): string {
  const iconMap: { [key: string]: string } = {
    'clear-day': '1',
    'clear-night': '24',
    'partly-cloudy-day': '2',
    'partly-cloudy-night': '25',
    'cloudy': '3',
    'rain': '5',
    'showers-day': '4',
    'showers-night': '4',
    'thunder-rain': '6',
    'thunder-showers-day': '6',
    'thunder-showers-night': '6',
    'snow': '7',
    'snow-showers-day': '16',
    'snow-showers-night': '16',
    'sleet': '9',
    'wind': '20',
    'fog': '8',
    'freezing-drizzle': '22',
    'freezing-rain': '9',
    'thunder': '19'
  }
  return iconMap[icon] || '3'
}

// Função para converter os ícones em texto descritivo
function getWeatherText(icon: string): string {
  const textMap: { [key: string]: string } = {
    'clear-day': 'Ensolarado',
    'clear-night': 'Céu Limpo',
    'partly-cloudy-day': 'Parcialmente Nublado',
    'partly-cloudy-night': 'Parcialmente Nublado',
    'cloudy': 'Nublado',
    'rain': 'Chuva',
    'showers-day': 'Pancadas de Chuva',
    'showers-night': 'Pancadas de Chuva',
    'thunder-rain': 'Tempestade',
    'thunder-showers-day': 'Tempestade',
    'thunder-showers-night': 'Tempestade',
    'snow': 'Neve',
    'snow-showers-day': 'Neve Fraca',
    'snow-showers-night': 'Neve Fraca',
    'sleet': 'Chuva Congelada',
    'wind': 'Ventania',
    'fog': 'Nevoeiro',
    'freezing-drizzle': 'Garoa',
    'freezing-rain': 'Chuva Congelada',
    'thunder': 'Tempestade de Raios'
  }
  return textMap[icon] || 'Tempo Variável'
}

// Função para determinar a cor baseada na severidade do alerta
function getSeverityColor(severity: string): string {
  const severityColors: { [key: string]: string } = {
    'extreme': '#ff0000',
    'severe': '#ff4444',
    'moderate': '#ffaa00',
    'minor': '#ffff00',
    'unknown': '#cccccc'
  }
  return severityColors[severity.toLowerCase()] || '#cccccc'
}
