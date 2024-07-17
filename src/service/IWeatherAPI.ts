export interface IWeatherAPI {
  getWeather(city: string): Promise<any>
}
