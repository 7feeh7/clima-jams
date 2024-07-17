import { Router } from 'express'
import { adaptMiddleware } from '../adapters/ExpressMiddlewareAdapter'
import { makeAuthMiddleware } from '../middlewares/AuthMiddleware'
import { recommendMusicController } from '../useCase/RecommendMusic'

const recommendRouter = Router()

recommendRouter.use(adaptMiddleware(makeAuthMiddleware()))

recommendRouter.get('/music/:city', (request, response) => {
  return recommendMusicController.handle(request, response)
})

export { recommendRouter }
