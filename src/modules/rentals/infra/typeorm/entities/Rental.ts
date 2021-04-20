import { v4 as uuidV4 } from 'uuid'

class Rental {

 id: string;

 car_id: string;

 user_id: string;

 start_date: Date;

 end_date: Date;

 expected_return_date: Date;

 total: number;

 create_at: Date;

 update_at: Date;

 constructor() {
  if (!this.id) {
   this.id = uuidV4();
   this.create_at = new Date();
  }
 }
}

export { Rental }