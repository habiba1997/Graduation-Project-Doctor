import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { newMessage } from 'src/app/model/newMessage';
import { Iconvs } from 'src/app/model/conv';
import {patientData} from "../../model/patientData";

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
 private intComp= new BehaviorSubject<any>([]);
 msg =this.intComp.asObservable();

 private getDocData= new BehaviorSubject<any>({});
 data =this.getDocData.asObservable();

 private CoversationState = new BehaviorSubject(1);
 currentStateConversation = this.CoversationState.asObservable();

 private Edit= new BehaviorSubject<number>(0);
 getName =this.Edit.asObservable();
 private patient =new BehaviorSubject<patientData>(null);

  constructor() { }
  
  UpdateName(name){

    this.Edit.next(name);
    console.log(name);
  }
  sendMSG(message){
  this.intComp.next( message);
  console.log(message);
  }
  sendConversationState(state){
    this.CoversationState.next(state);
    console.log(state);
  }
  sendPatientNamefromconvtoMessage(patientListfromconv){
    this.getDocData.next(patientListfromconv);
    console.log(patientListfromconv);

  }

  sendPatientData(data:patientData){
      this.patient.next(data);
  }
  getPatientData(){
      return this.patient.getValue();
  }
}
