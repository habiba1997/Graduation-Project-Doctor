import { booked } from './bookedObject';

export class returnedDoctorSlotsSohaila {
    id:number;
    schedule_id:number;
    patient_id:number;
    start_time:string;
    end_time:string;
    booked: booked;

    constructor(id?:number,patient_id?:number,
        schedule_id?:number,
        start_time?:string,
        end_time?:string,
        booked?:booked) {    
      this.id = id;
      this.patient_id= patient_id;
      this.schedule_id = schedule_id;
      this.start_time = start_time;
      this.end_time = end_time;
      this.booked = booked;
      
    } 
}

