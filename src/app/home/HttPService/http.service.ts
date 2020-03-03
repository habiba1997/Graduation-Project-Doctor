import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpVitals } from '../DataModels';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
 
  Java_Host_Port = "http://cbacea72.ngrok.io";

  Node_host ="http://ec2-3-15-156-222.us-east-2.compute.amazonaws.com:3000/";
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
 

}





 








