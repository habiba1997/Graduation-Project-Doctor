import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { patientData } from 'src/app/model/patientData';
import { MyDoctor } from 'src/app/model/MyData';

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {

  constructor(
    private storage: Storage,
    ){}

    getPatientList()
    {
      return this.storage.get('patientList');
    }
    savePatientList(patientList : Array<patientData>)
    {
      this.storage.set('patientList',patientList);
    }

    saveDoctprLocally(doctor:MyDoctor)
    {  
      this.storage.set('doctor',doctor);
    }
    getDoctorData()
    {
      return  this.storage.get('doctor');
    }
    
    saveTokenLocally(token:String)
    {  
      console.log("data store save token locally");
      this.storage.set('token', token);
    }
    
    getDoctorToken():Promise<any>
    {
      return  this.storage.get('token');
    }

    async isTokenExpired()
    {
      let bool = true;
      console.log("is token expired");
      let that = this;
      await this.getDoctorToken().then(token=>
        {
          if(token!=null)
            {
                let obj = that.parseJwt(token);
                if(obj.exp > Date.now()/1000)
                {
                  bool= false;
                  console.log("obj.exp > Date.now()/1000 || "+ bool);

                }
            }
            
        });
      return bool;
    }
    parseJwt (token) {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
  }

 

  clear()
  {
    this.storage.set('token',null);
    this.storage.set('doctor',null);
    this.storage.set('patientList',null);
  }
}


  

