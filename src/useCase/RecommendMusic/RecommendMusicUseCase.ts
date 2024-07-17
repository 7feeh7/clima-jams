import { ISpotifyAPI } from '../../service/ISpotifyAPI'
import { IWeatherAPI } from '../../service/IWeatherAPI'

export class RecommendMusicUseCase {
  constructor(
    private weatherAPI: IWeatherAPI,
    private spotifyAPI: ISpotifyAPI,
  ) {}

  async execute(city: string): Promise<any> {
    const response = await this.weatherAPI.getWeather(city)

    const temperatureCelsius = parseInt(
      (response.main.temp - 273.15).toFixed(2),
    )

    console.log(temperatureCelsius)

    // adicionar verificação na temperatura, tratar erros da API

    let genre

    // adicionar generos por Enum
    if (temperatureCelsius < 10) {
      // adicionar genero randomicamente
      genre = 'classical'
    } else if (temperatureCelsius < 20) {
      genre = 'pop'
    } else {
      genre = 'rock'
    }

    const responseSpotify = await this.spotifyAPI.searchTracksByGenre(genre)

    console.log(responseSpotify)

    // adicionar validação, { album } = responseSpotify
    const music_name = responseSpotify[0].album.name
    const artist_name = responseSpotify[0].artists[0].name
    const link_music_spotify = responseSpotify[0].external_urls.spotify

    return {
      temperature: `${temperatureCelsius} °C`,
      genre,
      music_name,
      artist_name,
      link_music_spotify,
    }
  }
}
