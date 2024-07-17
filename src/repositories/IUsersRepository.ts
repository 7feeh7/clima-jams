import { User } from '../entities/User'

export interface IUsersRepository {
  findByEmail(email: string): Promise<User>
  create(user: User): Promise<void>
  refreshToken(id: unknown, token: string): Promise<void>
  existUserWithToken(id: string, token: string): Promise<User>
}
