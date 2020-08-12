import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { newMessage } from 'src/app/model/newMessage';
import {map, flatMap, reduce, defaultIfEmpty} from 'rxjs/operators';
import {Iconvs, Reply} from 'src/app/model/conv'
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { TokenClass } from 'src/app/model/token';
import { patientData } from 'src/app/model/patientData';
import {inboxThread} from "../../model/ConsultationModel";
import { doctor_appointment } from 'src/app/model/doctor/doctor_appointment';
import { PostReturnIdAndDate } from 'src/app/model/doctor/id_date';
import { returnedDoctorSlotsSohaila } from 'src/app/model/doctor/returnedAppointmentSlotSohaila';
import { DateFormatService } from 'src/app/services/dateFormatService/date-format.service';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

    Node_host ="http://ec2-3-87-1-35.compute-1.amazonaws.com:3000/";
    // Node_host="http://dbea70375c2c.ngrok.io/";
    // Java_Host_Port ="http://986b7152e0e7.ngrok.io";
    Java_Host_Port = 'http://ec2-54-166-181-90.compute-1.amazonaws.com:8080';



  constructor(private http:HttpClient,
    private dataStream: DatastreamingService,
    private format: DateFormatService,
        private fcm: FCM,){

  }



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin' :'*'
 
    })
  };


  gethttpOption() {
    return {
     headers: this.httpGetTokenOptions(this.dataStream.getToken())
   };
  }


  addPatient(mobile):Observable<any>
  {

    const url =this.Java_Host_Port+"/addPatient";
    return this.http.post<any>( url,
      {
        "mobile":mobile
      }
    ,this.gethttpOption());

  } 
  

Login(email,pass):Observable<any>
{
  console.log(email,pass);

  const url =this.Java_Host_Port+"/signIn";
  return this.http.post<any>(url,
    {
      "username": email,
      "password": pass
    },this.httpOptions).pipe(
      map((token)=>
      {
        return new TokenClass(token.token);
      })
    );

}


httpGetTokenOptions(accessToken) {

  return new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin' :'*',
    "Authorization": "Bearer " + accessToken

  })
};


getDoctorUsingToken(): Observable<any>
 {
    const url =this.Java_Host_Port+"/doctor/getCurrentDoctorData";
    return this.http.get<any>(url,this.gethttpOption());
 }



  getPatientList(): Observable<any>
  {
    const url =this.Java_Host_Port+"/DoctorPatient/getMyPatientList/";
    return this.http.get<any>(url,this.gethttpOption()).pipe(
      flatMap(doctors => doctors),
      map((patient)=>
      {
        console.log("patient inside htpp get service: ", patient);
        return new patientData(patient[0], patient[1], patient[2],
          patient[3], patient[4],patient[5], patient[6],patient[7]);
      })
    );;
  }

  editDoctorProfile(name,experience){
     console.log(name,experience,this.dataStream.getToken())

     const url =this.Java_Host_Port+"/doctor/updateProfile";
     return this.http.post<any>(
      url,
      {
        "name":name, 
        "years_experience": experience
      } ,this.gethttpOption());
  }

  
  editFCMToken(){
    console.log("EDIT FCM TOKEN ");
    const url =this.Java_Host_Port+"/doctor/updateToken";
    this.fcm.getToken().then((fcmtoken)=>{
      this.http.post<any>( url,
      {
        "fcmtoken":fcmtoken
      } ,this.gethttpOption()).subscribe(
        (error)=>{
          console.log("error in fcm: ", error);
        },
      ()=>{
        console.log("fcm changed");
      }
    )});
  }

 //-----------------------------------------------------------------------------
    getSent(user_id,offset):Observable<any[]>{
        const Url =this.Node_host+"api/users/threads/sent/"+user_id+"/"+offset;
        console.log("URL",Url);
        return this.http.get<any>(Url, this.httpOptions);
    }


    getInbox(user_id,offset):Observable<any[]>{
        const Url =this.Node_host+"api/users/threads/inbox/"+this.dataStream.getDoctorId()+"/"+offset;
        console.log("URL",Url);
        return this.http.get<Iconvs[]>(Url, this.httpOptions).pipe(
            flatMap((consult) => {console.log("consult",consult);return consult})
            ,map((consult)=>{
                console.log("map",consult);
                console.log("patients",this.dataStream.getPatientList());
                return new inboxThread(consult.sender_id, consult.receiver_id, consult.thread_id,
                    consult.msg_subject, consult.created_date,consult.is_readed,consult.sender_name,consult.receiver_name,consult.msg_body,
                    this.dataStream.getPatientList().find(patientData=>patientData.patientId==consult.sender_id).user_img)
            } ),reduce<any>((consults,consult)=>{
                if (consults.length ) {
                    return [...consults,consult];
                } else {
                    console.log("consults,consult",[consults,consult]);
                    return [consults, consult];

                }

            }), defaultIfEmpty([])
        )

    }

    postThread(data:newMessage,sender_id:number){
  const Url =this.Node_host+"api/users/threads/"+sender_id;
  let thread=JSON.stringify(data);
  console.log("JSON Thread_data",thread);
  console.log("URL",Url);
  return this.http.post<any>(Url, thread, this.httpOptions);

 }
 postReply(data:Reply,id:number){
  const Url =this.Node_host+"api/users/threads/msg/"+id;
  let reply=JSON.stringify(data);
  console.log("JSON Thread_data",reply);
  console.log("URL",Url);
  return this.http.post<any>(Url, reply, this.httpOptions);
 }
 getReplies(thread_id,offset){
  const Url =this.Node_host+"api/users/threads/replies/"+thread_id+"/"+offset;
  console.log("URL",Url);
  return this.http.get<any>(Url, this.httpOptions);

 }
    ProfilegethttpOption() {
        return {
            headers: this.ProfilehttpGetTokenOptions(this.dataStream.getToken())
        };
    }

    ProfilehttpGetTokenOptions(accessToken) {

        return new HttpHeaders({
            "Authorization": "Bearer " + accessToken

        })

    }
    postProfileImage(image:any): Observable<any>{
        console.log("image file data inside http: ", image.getAll('file'));
        const Url =this.Java_Host_Port+"/user/uploadImage";
        console.log("URL",Url);
        let data=JSON.stringify(image.getAll('file'));
        console.log("data",data);
        let auth=this.ProfilegethttpOption();
        console.log(auth);
        return this.http.post<any>(Url, image,auth);

    }
    UplaodingMediaMsg(file,thread)
    {
        console.log("entered");
        console.log("My File is formData:  "+JSON.stringify(file));
        let url = this.Node_host+"api/users/threads/msg/media/"+thread;
        console.log("url: ", url);
        console.log("file of formdata");
        console.log(file.getAll('file'));
        console.log("data of formdata  "+file.getAll('data'));

        return this.http.post<any>(url,
            file);
    }

// appointmemt 


getSlotsAfterDoctorPostApps(id,date)
{
  let url = "http://ec2-3-87-1-35.compute-1.amazonaws.com:3000/api/users/doctor/slots/"+id;
  return this.http.get<any>(url,this.httpOptions).pipe(
    flatMap(appointments => appointments),
    map((app:doctor_appointment)=>
    {
        return new doctor_appointment(app.id,this.dataStream.doctor.doctor_id, app.schedule_id,
          app.slot_duration,app.start_time, app.end_time, date, null, null, false ); 
    })
  );
}


    getPatientVitals(patient_id):Observable<any[]>{
        const Url =this.Node_host+"api/users/vitals/"+patient_id;
        console.log("URL",Url);
        return this.http.get<any>(Url, this.httpOptions);
    }



// appointment

getSlotsAfterDoctorPostApps(id,date)
{
  let url = "http://ec2-3-87-1-35.compute-1.amazonaws.com:3000/api/users/doctor/slots/"+id;
  return this.http.get<any>(url,this.httpOptions).pipe(
    flatMap(appointments => appointments),
    map((app:doctor_appointment)=>
    {
        return new doctor_appointment(app.id,this.dataStream.doctor.doctor_id, app.schedule_id,
          app.slot_duration,app.start_time, app.end_time, date, null, null, false ); 
    })
  );
}


postDoctorAppointmnets(appointments){
  let url = "http://ec2-3-87-1-35.compute-1.amazonaws.com:3000/api/users/doctor/schedule/";
  // let scheduleIds =[];
  return this.http.post<any>(url, appointments).pipe(
    flatMap(appointments => appointments),
    map((appointmentObject: PostReturnIdAndDate)=>
    {   
      return new PostReturnIdAndDate(appointmentObject.id,  appointmentObject.date.split(" ", 2)[0]);
        
    })
  );
  
}
public getDoctorSchedule(){
  let url="http://ec2-3-87-1-35.compute-1.amazonaws.com:3000/api/users/doctor/schedule/"+this.dataStream.doctor.doctor_id;
// =======
//   let url="http://ec2-3-87-1-35.compute-1.amazonaws.com:3000/api/users/doctor/schedule/"+
//   this.dataStream.doctor.doctor_id;
// >>>>>>> master
  return this.http.get<any>(url, this.httpOptions).pipe(
    flatMap(appointments => appointments),
    map((appointment:doctor_appointment)=>
    {
        
      let app = JSON.parse(JSON.stringify(appointment));

// <<<<<<< appointment

//       app.date = this.format.formateJSONDateToDayMonthYear("2020-08-07");
//        // console.log(app.date)
// =======
//      console.log(app.date);
     
     
     app.date = this.format.formateJSONDateToDayMonthYear(app.date);
  
     console.log(app.date);
      // app.start_time = this.format.formatJSONTimetoRemoveSeconds(app.start_time);
      // app.end_time = this.format.formatJSONTimetoRemoveSeconds(app.end_time);
      // console.log("app after change", app);
      // console.log(app);

        // let split = app.start_time.split(" ");
        // app.date= split[0];
        // app.start_time = split[1]+" "+ split[2];
        // split= app.end_time.split(" ",3);
        // app.end_time= split[1]+" "+ split[2];
        // console.log(app);
        return app;
      
    })
  );
}


public getDoctorAppointmentSLots(id,date, slot_duration){
  let url = "http://ec2-3-87-1-35.compute-1.amazonaws.com:3000/api/users/doctor/slots/"+id;
  let bool = false;
  return this.http.get<any>(url, this.httpOptions).pipe(
    flatMap(slots => slots),
    map((slot:returnedDoctorSlotsSohaila)=>
    {
      //slot.year+"-"+(slot.month<10?"0"+slot.month:slot.day)+"-"+ (slot.day<10?"0"+slot.day:slot.day)
      if(slot.patient_id)
      {
       
        let patientIndex = this.dataStream.patientList.findIndex((x)=>x.patientId ===slot.patient_id);
        return new doctor_appointment(
          slot.id,
          this.dataStream.doctor.doctor_id,
          slot.schedule_id,
          slot_duration,slot.start_time, slot.end_time, 
          date,slot.patient_id,
          this.dataStream.patientList[patientIndex],
          slot.booked.data[0]==0 ? false : true); 
      }
      else{
        return new doctor_appointment(
          slot.id,this.dataStream.doctor.doctor_id,
          slot.schedule_id,
          slot_duration,slot.start_time, slot.end_time, date,null,null,
          slot.booked.data[0]==0 ? false : true); 
      }
      
    })
  );
}

}





 








