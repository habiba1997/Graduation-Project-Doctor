import { patientData } from '../patientData';


export class doctor_appointment {
    id:number;
    doc_id:number;

    schedule_id: number;

    start_time:string;
    end_time: string;
    date: string;
    

    slot_duration: number;
    patient_id: number;
    patient: patientData;
    booked:boolean;
  token: string;
    
   

    constructor(
      id?:number,
      doc_id?:number,
      schedule_id?: number,
      slot_duration?: number,
      start_time?:string,
      end_time?: string,
      date?: string,
      patient_id?: number,
      patient?:patientData,
      booked?:boolean)
      {

      this.id=id;
      this.doc_id=doc_id;
      this.schedule_id = schedule_id;
      this.slot_duration = slot_duration;
      this.start_time=start_time;
      this.end_time= end_time;
      this.date= date;
    
      this.patient_id = patient_id;
      this.patient=patient;

      this.booked=booked;
    } 
}

