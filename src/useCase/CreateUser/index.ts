import { MongoUserRepository } from '../../repositories/mongodb/MongoUserRepository'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'

const mongoUserRepository = new MongoUserRepository()

const createUserUseCase = new CreateUserUseCase(mongoUserRepository)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, createUserController }
