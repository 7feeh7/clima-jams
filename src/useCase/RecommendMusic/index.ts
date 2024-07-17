// import { PostgresExpenseRepository } from "../../repositories/implementations/PostgresExpenseRepository";
import { RecommendMusicController } from './RecommendMusicController'
import { RecommendMusicUseCase } from './RecommendMusicUseCase'
import { SpotifyService } from '../../service/SpotifyService'
import { WeatherService } from '../../service/WeatherService'
import 'dotenv/config'

const weatherService = new WeatherService(`${process.env.WEATHER_API_KEY}`)

const spotifyService = new SpotifyService(
  `${process.env.SPOTIFY_API_CLIENT_ID}`,
  `${process.env.SPOTIFY_API_CLIENT_SECRET}`,
)

const recommendMusicUseCase = new RecommendMusicUseCase(
  weatherService,
  spotifyService,
)

const recommendMusicController = new RecommendMusicController(
  recommendMusicUseCase,
)

export { recommendMusicUseCase, recommendMusicController }
