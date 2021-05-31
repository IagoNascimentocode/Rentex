import dayjs from "dayjs"



import { AppError } from "@shared/errors/AppError"

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "../createRental/CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsProvider: DayjsDateProvider;

describe("Create Rental", () => {

 const dayAdd24Hours = dayjs().add(1, "day").toDate()

 beforeEach(() => {
  rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
  carsRepositoryInMemory = new CarsRepositoryInMemory()
  dayjsProvider = new DayjsDateProvider()
  createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsProvider, carsRepositoryInMemory);
 })

 it("Should be able to create a new rental", async () => {
  const car = await carsRepositoryInMemory.create({
   name: "Test",
   description: "Car test",
   daily_rate: 100,
   license_plate: "test",
   fine_amount: 40,
   category_id: "1234",
   brand: "brand",
  })

  console.log(car)

  const rental = await createRentalUseCase.execute({
   user_id: "12345",
   car_id: car.id,
   expected_return_date: dayAdd24Hours
  })

  expect(rental).toHaveProperty("id");
  expect(rental).toHaveProperty("start_date");
 })

 it("Should not be able to create a new rental if there is another open to the same user", async () => {

  expect(async () => {
   await createRentalUseCase.execute({
    user_id: "12345",
    car_id: "54321",
    expected_return_date: dayAdd24Hours
   })

   await createRentalUseCase.execute({
    user_id: "12345",
    car_id: "54321",
    expected_return_date: dayAdd24Hours
   })
  }).rejects.toBeInstanceOf(AppError)
 })

 it("Should not be able to create a new rental if there is another open to the same car", async () => {

  expect(async () => {
   await createRentalUseCase.execute({
    user_id: "123",
    car_id: "test",
    expected_return_date: dayAdd24Hours
   })

   await createRentalUseCase.execute({
    user_id: "321",
    car_id: "test",
    expected_return_date: dayAdd24Hours
   })
  }).rejects.toBeInstanceOf(AppError)
 })

 it("Should not be able to create a new rental with invalid return time", async () => {

  expect(async () => {
   await createRentalUseCase.execute({
    user_id: "123",
    car_id: "test",
    expected_return_date: dayjs().toDate()
   })
  }).rejects.toBeInstanceOf(AppError)
 })
})