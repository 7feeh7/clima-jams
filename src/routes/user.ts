import { Router } from 'express'
import { createUserController } from '../useCase/CreateUser'

const userRouter = Router()

userRouter.post('/', (request, response) => {
  return createUserController.handle(request, response)
})

export { userRouter }
