import { NextResponse } from 'next/server'

const METEOBLUE_API_KEY = process.env.METEOBLUE_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const name = searchParams.get('name')
  const state = searchParams.get('state')
  const country = searchParams.get('country')

  console.log('Recebendo requisição com:', { lat, lon, apiKey: METEOBLUE_API_KEY?.slice(0, 5) })

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Latitude e longitude são necessárias' }, { status: 400 })
  }

  if (!METEOBLUE_API_KEY) {
    console.error('API key não encontrada')
    return NextResponse.json({ error: 'Configuração da API inválida' }, { status: 500 })
  }

  try {
    const url = `https://my.meteoblue.com/packages/basic-day?apikey=${METEOBLUE_API_KEY}&lat=${lat}&lon=${lon}&asl=0&format=json&tz=America%2FSao_Paulo&temperature=C&windspeed=kmh&precipitationamount=mm&winddirection=degree`
    
    console.log('Fazendo requisição para:', url.replace(METEOBLUE_API_KEY, 'XXXXX'))
    
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
    
    // Log detalhado dos dados de localização
    console.log('Dados brutos de localização:', {
      metadataName: data.metadata?.name,
      locationParts: data.metadata?.name?.split(',').map(part => part.trim()),
      location: data.location,
      metadata: data.metadata
    })

    // Verificando se os dados têm a estrutura esperada
    if (!data.data_day) {
      console.error('Dados inválidos recebidos:', data)
      throw new Error('Formato de dados inválido')
    }

    // Extraindo informações de localização de forma mais segura
    let locationName, state, country;

    if (data.metadata?.name) {
      const locationParts = data.metadata.name.split(',').map(part => part.trim())
      locationName = locationParts[0]
      state = locationParts[3]
      country = locationParts[locationParts.length - 1]
    } else if (data.location) {
      locationName = data.location.name
      state = data.location.state || data.location.region
      country = data.location.country
    }

    // Usando valores padrão se nenhum dado for encontrado
    locationName = locationName || "Local não encontrado"
    state = state || ""
    country = country || "Brasil"

    console.log('Dados de localização processados:', { locationName, state, country })

    const formattedData = {
      code: "0",
      data: {
        location: {
          name: name || "Local não encontrado",
          path: `${name}, ${state}, ${country}`,
          timezone: "America/Sao_Paulo"
        },
        now: {
          temperature: data.data_day.temperature_mean?.[0] || 0,
          humidity: data.data_day.relativehumidity_mean?.[0] || 0,
          pressure: data.data_day.pressure_mean?.[0] || 0,
          windDirection: (data.data_day.winddirection?.[0] || 0).toString(),
          windDirectionDegree: data.data_day.winddirection?.[0] || 0,
          windSpeed: data.data_day.windspeed_mean?.[0] || 0,
          windScale: (data.data_day.windspeed_mean?.[0] || 0).toString(),
          precipitation: data.data_day.precipitation?.[0] || 0,
          text: getWeatherText(data.data_day.pictocode?.[0] || 0),
          code: (data.data_day.pictocode?.[0] || 0).toString()
        },
        daily: (data.data_day.time || []).map((date, index) => ({
          date,
          dayText: getWeatherText(data.data_day.pictocode?.[index] || 0),
          nightText: getWeatherText(data.data_day.pictocode?.[index] || 0),
          dayCode: (data.data_day.pictocode?.[index] || 0).toString(),
          nightCode: (data.data_day.pictocode?.[index] || 0).toString(),
          high: data.data_day.temperature_max?.[index] || 0,
          low: data.data_day.temperature_min?.[index] || 0,
          dayWindDirection: (data.data_day.winddirection?.[index] || 0).toString(),
          dayWindScale: (data.data_day.windspeed_max?.[index] || 0).toString(),
          nightWindDirection: (data.data_day.winddirection?.[index] || 0).toString(),
          nightWindScale: (data.data_day.windspeed_min?.[index] || 0).toString()
        })),
        lastUpdate: new Date().toISOString(),
        alarm: []
      }
    }

    console.log('Dados formatados:', JSON.stringify(formattedData, null, 2))
    return NextResponse.json(formattedData)
  } catch (error) {
    console.error('Erro completo:', error)
    return NextResponse.json(
      { error: 'Falha ao obter dados meteorológicos', details: error.message },
      { status: 500 }
    )
  }
}

function getWeatherText(pictocode: number): string {
  const weatherCodes = {
    1: "Ensolarado",
    2: "Parcialmente nublado",
    3: "Nublado",
    4: "Nublado com chuva",
    5: "Chuva",
    6: "Tempestade",
    7: "Neve",
    8: "Nevoeiro",
    9: "Chuva congelada",
    10: "Chuva com neve",
    11: "Chuva fraca",
    12: "Chuva moderada",
    13: "Chuva forte",
    14: "Trovoada",
    15: "Granizo",
    16: "Neve fraca",
    17: "Neve moderada",
    18: "Neve forte",
    19: "Tempestade de raios",
    20: "Ventania",
    21: "Neblina",
    22: "Garoa",
    23: "Geada",
    24: "Céu limpo",
    25: "Parcialmente ensolarado"
  }
  return weatherCodes[pictocode] || "Tempo variável"
}
