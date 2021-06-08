import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {

 beforeEach(() => {
  usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  dayjsDateProvider = new DayjsDateProvider()
  mailProvider = new MailProviderInMemory()

  sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
   usersRepositoryInMemory,
   usersTokensRepositoryInMemory,
   dayjsDateProvider,
   mailProvider
  )
 })

 it("Should be bale to send a forgot password mail to user", async () => {
  const sendMail = spyOn(mailProvider, "sendMail")

  await usersRepositoryInMemory.create({
   driver_license: "25946616",
   email: "gatsatag@leri.ne",
   name: "Benjamin Gill",
   password: "1234"
  })

  await sendForgotPasswordMailUseCase.execute("gatsatag@leri.ne")

  expect(sendMail).toHaveBeenCalled();
 })

 it("Should not be able to send an email if user does not exists", async () => {
  await expect(
   sendForgotPasswordMailUseCase.execute("ahno@datleh.tl")
  ).rejects.toEqual(new AppError("Users does not exists!"))
 })

 it("Should be able to create an users token", async () => {
  const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create")

  usersRepositoryInMemory.create({
   driver_license: "30050110",
   email: "ab@mihlaon.bz",
   name: "Ethel Graves",
   password: "12345"
  })

  await sendForgotPasswordMailUseCase.execute("ab@mihlaon.bz")

  expect(generateTokenMail).toBeCalled();
 })
})