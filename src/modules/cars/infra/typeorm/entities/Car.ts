import { v4 as uuidV4 } from "uuid";

class Car {

    id: string;

    name: string;

    description: string;

    daily_rate: number;

    avaliable: boolean;

    license_plate: string;

    fine_amount: number;

    brand: string;

    category_id: string;

    create_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.avaliable = true;
            this.create_at = new Date()
        }
    }
}
export { Car }