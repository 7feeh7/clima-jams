import { MongoUserRepository } from '../../repositories/mongodb/MongoUserRepository'
import { LoginController } from './LoginController'
import { LoginUseCase } from './LoginUseCase'

const mongoUserRepository = new MongoUserRepository()

const loginUseCase = new LoginUseCase(mongoUserRepository)

const loginController = new LoginController(loginUseCase)

export { loginUseCase, loginController }
