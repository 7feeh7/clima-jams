import axios from 'axios'
import { IWeatherAPI } from './IWeatherAPI'
import 'dotenv/config'

export class WeatherService implements IWeatherAPI {
  private apiKey: string
  private apiUrl: string = process.env.WEATHER_API_URL

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async request(endpoint: string, params: object = {}): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/${endpoint}`, {
        params: {
          appid: this.apiKey,
          ...params,
        },
      })
      return response.data
    } catch (err: any) {
      throw new Error(`Erro na chamada da API de clima: ${err.message}`)
    }
  }

  async getWeather(city: string): Promise<any> {
    const response = await this.request('weather', { q: city })
    return response
  }
}
