import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateCarDTO {
    brand: string;
    category_id: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    name: string;
    specifications?: Specification[];
    id?: string;
}
export { ICreateCarDTO }