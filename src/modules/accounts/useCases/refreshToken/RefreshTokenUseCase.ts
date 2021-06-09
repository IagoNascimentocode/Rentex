import auth from "@config/auth"
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositores/UsersTokensRepository"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { verify, sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"


interface IPayload {
 sub: string;
 email: string;
}

interface ITokenResponse {
 token: string
 refresh_token: string
}

@injectable()
class RefreshTokenUseCase {

 constructor(
  @inject("UsersTokensRepository")
  private usersTokensRepository: UsersTokensRepository,
  @inject("DayjsDateProvider")
  private dayjsDateProvider: DayjsDateProvider
 ) { }

 async execute(token: string): Promise<ITokenResponse> {

  const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

  const user_id = sub;

  const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

  if (!userToken) {
   throw new AppError("Refresh Token does not exists!");
  }

  await this.usersTokensRepository.deleteById(userToken.id);

  const expires_date = this.dayjsDateProvider.addDays(auth.expires_refresh_token_days)

  const refresh_token = sign({ email }, auth.secret_refresh_token, {
   subject: sub,
   expiresIn: auth.expires_in_refresh_token
  });

  await this.usersTokensRepository.create({
   expires_date,
   refresh_token,
   user_id
  })

  const newToken = sign({}, auth.secret_token, {
   subject: user_id,
   expiresIn: auth.expires_id_token
  })

  return {
   refresh_token,
   token: newToken
  }
 }
}

export { RefreshTokenUseCase }