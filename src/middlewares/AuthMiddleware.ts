import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { auth } from '../config/auth'
import { MongoUserRepository } from '../repositories/mongodb/MongoUserRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'

interface TokenPayload {
  id: string
  iat: number
  exp: number
}

export class AuthMiddleware {
  constructor(private usersRepository: IUsersRepository) {}
  async handle(request: Request) {
    const { authorization } = request.headers

    if (!authorization) {
      throw new Error('Access Denied')
    }

    const token = authorization.replace('Bearer', '').trim()

    console.log('eae', auth.secretKey)

    const data = jwt.verify(token, auth.secretKey)

    const { id } = data as TokenPayload

    const user = await this.usersRepository.existUserWithToken(id, token)

    if (!user) throw new Error('Access Denied')

    return {
      statusCode: 200,
      headers: { userLoggerIn: user },
    }
  }
}

export function makeAuthMiddleware(): any {
  const mongoUserRepository = new MongoUserRepository()
  const ensureAuthMiddleware = new AuthMiddleware(mongoUserRepository)
  return ensureAuthMiddleware
}
