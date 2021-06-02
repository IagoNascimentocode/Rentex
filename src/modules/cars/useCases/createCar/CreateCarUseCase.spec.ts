import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);

    })

    it("should be able to create an new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Descripton Car",
            daily_rate: 100,
            license_plate: "ABC-2234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"

        })

        expect(car).toHaveProperty("id")
    })

    it("should not be able to create a car with exists license plate", async () => {
        await createCarUseCase.execute({
            name: "Name Car",
            description: "description Car",
            daily_rate: 100,
            license_plate: "ABC-1134",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"

        })
        await expect(createCarUseCase.execute({
            name: "Name Car duplicate",
            description: "description Car duplicate",
            daily_rate: 100,
            license_plate: "ABC-1134",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"

        })
        ).rejects.toEqual(new AppError("Car already Exists!"))
    })

    it("should not be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Available",
            description: "description Car",
            daily_rate: 100,
            license_plate: "ABCD-8934",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"
        });

        expect(car.available).toBe(true)
    })
})