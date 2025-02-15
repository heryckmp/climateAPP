import { NextResponse } from 'next/server'

interface CityResponse {
  msg: string
  code: number
  data: string[]
}

interface City {
  id: string
  name: string
  englishName: string
  country: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  
  if (!query) {
    return NextResponse.json({ msg: 'Query is required', code: 1 }, { status: 400 })
  }

  try {
    const timestamp = Date.now()
    const response = await fetch(
      `https://weather.cma.cn/api/autocomplete?q=${encodeURIComponent(query)}&limit=10&timestamp=${timestamp}`
    )
    const data: CityResponse = await response.json()

    if (data.code === 0 && Array.isArray(data.data)) {
      const cities: City[] = data.data.map((city: string) => {
        const [id, name, englishName, country] = city.split('|')
        return { id, name, englishName, country }
      })
      return NextResponse.json({ msg: 'success', code: 0, data: cities })
    }

    return NextResponse.json({ msg: 'Invalid response format', code: 1 }, { status: 500 })
  } catch (error) {
    console.error('Error fetching cities:', error)
    return NextResponse.json({ msg: 'Failed to fetch cities', code: 1 }, { status: 500 })
  }
}
