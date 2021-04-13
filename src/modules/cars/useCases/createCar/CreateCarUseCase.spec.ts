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
            license_plate: "ABC-1134",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"

        })

        expect(car).toHaveProperty("id")
    })

    it("shound not be able to create a car with exists license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Name Car",
                description: "Descripton Car",
                daily_rate: 100,
                license_plate: "ABC-1134",
                fine_amount: 60,
                brand: "Brand",
                category_id: "Category"

            })
            await createCarUseCase.execute({
                name: "Name Car",
                description: "Descripton Car",
                daily_rate: 100,
                license_plate: "ABC-1134",
                fine_amount: 60,
                brand: "Brand",
                category_id: "Category"

            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it("shound not be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Available",
            description: "Descripton Car",
            daily_rate: 100,
            license_plate: "ABCD-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"
        });

        expect(car.available).toBe(true)
    })
})