export class addAappointment{
    date:string;
    slot_duration:number;
    start_time: string;
    end_time:string;
    doc_id:number;
   

    constructor(date?:string,
      slot_duration?:number,
      start_time?: string,
      end_time?:string,
      doc_id?:number
      ) {    
      this.date = date ;
      this.slot_duration=slot_duration;
      this.start_time=start_time;
      this.end_time=end_time;
      this.doc_id=doc_id;
    } 
}