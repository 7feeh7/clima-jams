import { Request, Response } from 'express'
import { RecommendMusicUseCase } from './RecommendMusicUseCase'

export class RecommendMusicController {
  constructor(private recommendMusicUseCase: RecommendMusicUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { city } = request.params

      const musicRecommend = await this.recommendMusicUseCase.execute(city)

      return response.json(musicRecommend)
    } catch (err: unknown) {
      return response.status(200).json({
        message:
          'External services are temporarily unavailable. Please try again later.',
      })
    }
  }
}
