import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './CreateUserDTO'
import { User } from '../../entities/User'
import bcrypt from 'bcrypt'
import { bcryptSettings } from '../../config/auth'

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    // const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    // if(userAlreadyExists) {
    //     throw new Error('User already exists.');
    // }

    console.log('data', data)

    const hashedPassword = await bcrypt.hash(
      data.password,
      bcryptSettings.salts,
    )

    const user = new User(data.name, data.email, data.phone, hashedPassword)

    console.log('user', user)

    await this.usersRepository.create(user)
  }
}
