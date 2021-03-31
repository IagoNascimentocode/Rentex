import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {

    // Adicionar coluna avatar na tabela de users.
    // Refatorar usuario com a coluna avatar.
    // configuração upload multe.
    // Criar regra de negocio do upload.
    // Criar controller.

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    async execute({ user_id, avatar_file }: IRequest): Promise<void> {

        const user = await this.usersRepository.findById(user_id);

        user.avatar = avatar_file;

        await this.usersRepository.create(user);
    }
}
export { UpdateUserAvatarUseCase }