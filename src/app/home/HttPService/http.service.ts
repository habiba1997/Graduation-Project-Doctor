import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { newMessage } from 'src/app/model/newMessage';
import { map, flatMap } from 'rxjs/operators';
import { Reply } from 'src/app/model/conv'
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { TokenClass } from 'src/app/model/token';
import { patientData } from 'src/app/model/patientData';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // Java_Host_Port ="http://localhost:8080";
  Java_Host_Port ="http://ec2-3-86-89-133.compute-1.amazonaws.com:8080";

  Node_host ="http://ec2-3-87-1-35.compute-1.amazonaws.com:3000/";
  constructor(private http:HttpClient,
    private dataStream: DatastreamingService, 
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
          patient[3], patient[4],patient[5], patient[6]); 
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
 getInbox(user_id,offset){
  const Url =this.Node_host+"api/users/threads/inbox/"+user_id+"/"+offset;
  console.log("URL",Url);
  return this.http.get<any>(Url, this.httpOptions);

 }
 getSent(user_id,offset){
  const Url =this.Node_host+"api/users/threads/sent/"+user_id+"/"+offset;
  console.log("URL",Url);
  return this.http.get<any>(Url, this.httpOptions);
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
 
}





 








