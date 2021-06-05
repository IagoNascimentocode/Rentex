import auth from "@config/auth"
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositores/UsersTokensRepository"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { verify, sign } from "jsonwebtoken"
import { inject } from "tsyringe"


interface IPayload {
 sub: string;
 email: string;
}

class RefreshTokenUseCase {

 constructor(
  @inject("UsersTokensRepository")
  private usersTokensRepository: UsersTokensRepository,
  @inject("DayjsDateProvider")
  private dayjsDateProvider: DayjsDateProvider
 ) { }

 async execute(token: string): Promise<string> {

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
   expiresIn: auth.secret_refresh_token
  });

  await this.usersTokensRepository.create({
   expires_date,
   refresh_token,
   user_id
  })

  return refresh_token
 }
}

export { RefreshTokenUseCase }