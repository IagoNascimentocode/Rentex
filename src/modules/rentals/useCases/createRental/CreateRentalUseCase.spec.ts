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
   brand: "brand",
   category_id: "1234",
  })


  const rental = await createRentalUseCase.execute({
   user_id: "123456",
   car_id: car.id,
   expected_return_date: dayAdd24Hours
  })


  expect(rental).toHaveProperty("id");
  expect(rental).toHaveProperty("start_date");
 })

 it("Should not be able to create a new rental if there is another open to the same user", async () => {
  const car = await carsRepositoryInMemory.create({
   name: "Name car",
   description: "Description car",
   daily_rate: 100,
   license_plate: "ABC-1234",
   fine_amount: 60,
   brand: "Brand",
   category_id: "category",
  });

  await createRentalUseCase.execute({
   user_id: "1212",
   car_id: car.id,
   expected_return_date: dayAdd24Hours,
  });

  await expect(createRentalUseCase.execute({
   user_id: "1212",
   car_id: "54321",
   expected_return_date: dayAdd24Hours
  })
  ).rejects.toEqual(new AppError("There's a rental in progress for user!"))
 })

 it("Should not be able to create a new rental if there is another open to the same car", async () => {
  const car = await carsRepositoryInMemory.create({
   name: "Name car",
   description: "Description car",
   daily_rate: 100,
   license_plate: "ABC-1234",
   fine_amount: 60,
   brand: "Brand",
   category_id: "category",
  });

  await createRentalUseCase.execute({
   user_id: "1212",
   car_id: car.id,
   expected_return_date: dayAdd24Hours,
  });
  await expect(createRentalUseCase.execute({
   user_id: "321",
   car_id: car.id,
   expected_return_date: dayAdd24Hours
  })
  ).rejects.toEqual(new AppError("Car is unavailable"))
 })

 it("Should not be able to create a new rental with invalid return time", async () => {

  const car = await carsRepositoryInMemory.create({
   name: "Name car",
   description: "Description car",
   daily_rate: 100,
   license_plate: "ABC-1234",
   fine_amount: 60,
   brand: "Brand",
   category_id: "category",
  });

  await expect(createRentalUseCase.execute({
   user_id: "123",
   car_id: car.id,
   expected_return_date: dayjs().toDate()
  })
  ).rejects.toEqual(new AppError("Invalid return time."))
 })
})