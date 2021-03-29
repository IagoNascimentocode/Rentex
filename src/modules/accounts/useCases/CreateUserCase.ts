import { inject, injectable } from 'tsyringe';
import { hash } from "bcrypt"

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUsersRepository } from '../repositories/IUsersRepository'

@injectable()
class CreateUserCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(data: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = this.usersRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error("User already exists")
        }

        const passwordHash = await hash(data.password, 8)

        await this.usersRepository.create({
            name: data.name,
            email: data.email,
            password: passwordHash,
            driver_license: data.driver_license
        });
    }
}
export { CreateUserCase }