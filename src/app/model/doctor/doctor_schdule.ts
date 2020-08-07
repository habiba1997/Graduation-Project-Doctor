import { patientData } from '../patientData';


export class doctorSchedule {
    id:number;
    date: string;


    start_time:string;
    end_time: string;
    slot_duration:number;

    
   

    constructor(id?:number,
      start_time?:string,
      end_time?: string,
      date?: string,
      slot_duration?:number)     
      {

      this.id=id;
      this.start_time=start_time;
      this.end_time= end_time;
      this.date= date;
    
      this.slot_duration=slot_duration;

    } 
}

