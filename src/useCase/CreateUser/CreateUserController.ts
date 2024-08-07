import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, password } = request.body

    try {
      // adicionar validação para email, telefone e regras para cadastrar senha
      await this.createUserUseCase.execute({
        name,
        email,
        phone,
        password,
      })

      return response.status(201).send()
    } catch (err: unknown) {
      // tratar erro
      // loggar o err.message no console e devolve um erro generico
      return response.status(400).json({
        message: (err as Error).message || 'Unexpected error.',
      })
    }
  }
}
