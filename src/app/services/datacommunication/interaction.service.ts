import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { newMessage } from 'src/app/model/newMessage';
import { Iconvs } from 'src/app/model/conv';

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

 private communication= new BehaviorSubject<Iconvs>(null);
 getId =this.communication.asObservable();

 private Edit= new BehaviorSubject<number>(0);
 getName =this.Edit.asObservable();
 

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
  sendDoctorNamefromconvtoMessage(doctorListfromconv){
    this.getDocData.next(doctorListfromconv);
    console.log(doctorListfromconv);

  }
  async getThreadIdfromMessageorConvListtoChat(id){
    this.communication.next(id);
    console.log(id);
  }
}
