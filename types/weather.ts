export interface WeatherData {
  code: string
  data: {
    location: {
      name: string
      id: string
      path: string
      timezone: string
      timezone_offset: string
    }
    now: {
      temperature: number
      humidity: number
      pressure: number
      windDirection: string
      windDirectionDegree: number
      windSpeed: number
      windScale: string
      precipitation: number
      text: string
      code: string
    }
    lastUpdate: string
    daily: Array<{
      date: string
      dayText: string
      nightText: string
      dayCode: string
      nightCode: string
      high: number
      low: number
      dayWindDirection: string
      dayWindScale: string
      nightWindDirection: string
      nightWindScale: string
    }>
    alarm: Array<{
      id: string
      title: string
      signaltype: string
      signallevel: string
      severity: string
      effective: string
    }>
  }
}

