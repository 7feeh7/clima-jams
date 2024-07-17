import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'
import MongooseUser from './schemas/User'

export class MongoUserRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<any> {
    return MongooseUser.findOne({ email }).exec()
  }

  async create(user: User): Promise<void> {
    await MongooseUser.create(user)
  }

  async refreshToken(userId: string, token: string): Promise<void> {
    await MongooseUser.updateOne({ id: userId }, { token }).exec()
  }

  async existUserWithToken(id: string, token: string): Promise<any> {
    return MongooseUser.findOne({ id, token }).exec()
  }
}
