import { Request, Response } from "express"
import { container } from "tsyringe"
import { ProfilerUserUseCase } from "./ProfileUserUseCase"

class ProfilerUserController {
 async handle(request: Request, response: Response): Promise<Response> {
  const { id } = request.user
  const profileUserUseCase = container.resolve(ProfilerUserUseCase)

  const user = await profileUserUseCase.execute(id)

  return response.json(user)
 }
}
export { ProfilerUserController }