import { Injectable } from '@angular/core';
import { DatastorageService } from '../datastorage/datastorage.service';
import { MyDoctor } from 'src/app/model/MyData';
import { patientData } from 'src/app/model/patientData';

@Injectable({
  providedIn: 'root'
})
export class DatastreamingService {
 
   doctor = new MyDoctor;
   token: string;
   patientList = new Array<patientData>();

   constructor(
     private dataStore: DatastorageService,){}

  clearPatientList()
  {
    this.patientList=[];
  }
  addToPatientList(element)
  {
    const patient = new patientData;
    patient.patientId = element[0];
    patient.name = element[1];
    patient.fcmtoken=element[2];
    patient.mobile = element[3];
    patient.age = element[4];
    patient.address = element[5];
    patient.relationId=element[6];
    
    this.patientList.push(patient);
  }
  savePatientListToDataStore()
  {
    console.log("save patient List in datastore from login: ", JSON.stringify(this.patientList));
    this.dataStore.savePatientList(this.patientList);
  }

  async restoreStreamDatalist(patientList)
  {
    (await patientList).forEach(element => {
      this.patientList.push(element);
    });;
  }
   getPatientList()
   {
    return this.patientList;
   }
   getToken()
   {
     return this.token;
   }
   getDoctorId()
   {
     return this.doctor.doctor_id;
   }
   setDoctor(doctorData)
   {
     
     this.doctor.doctor_id =doctorData.id;
     this.doctor.name = doctorData.user.name;
     this.doctor.mobile = doctorData.user.mobile;
     this.doctor.user_id = doctorData.user.id;
    //  this.doctor.email = doctorData.user.email;
     this.doctor.password = doctorData.user.password,
     this.doctor.type = doctorData.user.type;
     this.doctor.timestamp = doctorData.user.timestamp;
     this.doctor.years_experience = doctorData.years_experience;

     this.dataStore.saveDoctprLocally(this.doctor);
   }
   SetDoctorforLogin(mydoc)
   {
     this.doctor.doctor_id =mydoc.doctor_id;
     this.doctor.mobile = mydoc.mobile;
     this.doctor.name = mydoc.name;
     this.doctor.user_id = mydoc.user_id;
    //  this.doctor.email = mydoc.email;
     this.doctor.password = mydoc.password,
     this.doctor.type = mydoc.type;
     this.doctor.timestamp = mydoc.timestamp;
     this.doctor.years_experience = mydoc.years_experience;
     this.dataStore.saveDoctprLocally(this.doctor);
   }

    setToken(token)
    {
      console.log("data stream set Token");
      this.token = token;
      this.dataStore.saveTokenLocally(token);
    }
   getDoctorName()
    {
      return this.doctor.name;
    }
 
   clearData(){
     this.dataStore.clear();
    } 
   getDoctorPassword(){
     return this.doctor.password;
   }
   getDoctorYearsOfExperience()
   {
     return this.doctor.years_experience;
   }
 
   getDoctorMobile(){
    return this.doctor.mobile;
   }
   
   changeDoctorData(name,years_experience) {
    this.doctor.years_experience = years_experience;
    this.doctor.name = name;
    this.dataStore.saveDoctprLocally(this.doctor);

  }

}
