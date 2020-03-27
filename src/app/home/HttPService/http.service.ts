import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { newMessage } from 'src/app/model/newMessage';

import { Reply } from 'src/app/model/conv'
@Injectable({
  providedIn: 'root'
})
export class HttpService {

 
  Java_Host_Port = "http://ec2-52-91-212-167.compute-1.amazonaws.com:8080";

  Node_host ="http://ec2-3-20-227-97.us-east-2.compute.amazonaws.com:3000/";
  constructor(private http:HttpClient) { 
    
  }


 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin' :'*'
 
    })
  };
  addPatient(mobile,token):Observable<any>
  {
    const httpOption = {
      headers: this.httpGetTokenOptions(token)
    };  

    const url =this.Java_Host_Port+"/addPatient";
    return this.http.post<any>(
      url,
      {
      "mobile":mobile
      }
    ,httpOption);

  } 
  



Login(email,pass):Observable<any>
{
 console.log("d5lt")

 const url =this.Java_Host_Port+"/signIn";
return this.http.post<any>(url,
  {
    "username": email,
    "password": pass
  },this.httpOptions);

}


httpGetTokenOptions(accessToken) {

  return new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin' :'*',
    "Authorization": "Bearer " + accessToken

  })
};


getDoctorUsingToken(token): Observable<any>
 {
  const httpOption = {
    headers: this.httpGetTokenOptions(token)
  };
  const url =this.Java_Host_Port+"/doctor/getCurrentDoctorData";
  
  return this.http.get<any>(url,httpOption);

 }

  getPatientList(token): Observable<any>
  {
  const httpOption = {
    headers: this.httpGetTokenOptions(token)
  };
  const url =this.Java_Host_Port+"/DoctorPatient/getMyPatientList/";
  return this.http.get<any>(url,httpOption);

  }
//----------------------
  editDoctorProfile(name,experience,token){
     console.log(name,experience,token) 
     const httpOption = {
     headers: this.httpGetTokenOptions(token)
    };  
     const url =this.Java_Host_Port+"/doctor/updateProfile";
     return this.http.post<any>(
      url,
      {
        "name":name, 
        "years_experience": experience
      } ,httpOption);
  }

  //----------------------

  
  editFCMToken(fcmtoken, token){
    const httpOption = {
    headers: this.httpGetTokenOptions(token)
   };  
    const url =this.Java_Host_Port+"/doctor/updateToken";
    return this.http.post<any>(
     url,
     {
       "fcmtoken":fcmtoken
     } ,httpOption);

     

 }
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





 








