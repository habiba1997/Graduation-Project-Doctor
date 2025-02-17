import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from '../NavService/navigation.service';
import { HttpService } from '../HttPService/http.service';
import { InteractionService } from 'src/app/services/datacommunication/interaction.service';
import { IonContent, ActionSheetController } from '@ionic/angular';
import { patientData } from 'src/app/model/patientData';
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';
import {EventEmitterService} from "../../services/EventEmitterService/event-emitter.service";

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
})
export class ConversationsComponent  {

    constructor(private navigation: NavigationService
        , private httpService:HttpService
        ,private dataInteraction:InteractionService
        ,private patList:ActionSheetController,
                private datastream: DatastreamingService,
                private  eventEmitterService:EventEmitterService,

    ) {
        console.log("conversations component constructor");
    }
     
     private patientsArray = new Array<patientData>();
     private receiver:String;
    private state:number=0;



    async ionViewDidEnter() {

        console.log("conversation component ion view did enter ");
        this.patientsArray = this.datastream.getPatientList();
        console.log("doctors array"+this.patientsArray[0]);


    }



    inbox(){
        this.state=0;

        console.log("inbox");
        this.eventEmitterService.OnComponentCall(0);
        console.log("inbox button triggered the state Function");


    }
    sent(){
        this.state=1;
        console.log("sent");
        this.eventEmitterService.OnComponentCall(1);
        console.log("sent button triggered the state Function ");


    }
async CreateNew(){
  let actionSheetButtons = [];
   
  for(let row of this.patientsArray){
  actionSheetButtons.push({
      text:  row.name, //get doctor list
      icon: 'person',
      handler: () => {
        
         this.receiver= row.name;
         console.log("Patient: "+this.receiver);
     
        this.dataInteraction.sendPatientNamefromconvtoMessage(row);
        console.log("row"+row);
        this.navigation.navigateTo("home/message");
      }
  });
}

    
  const actionSheet = await this.patList.create({
    header: 'You want to send message to:',
     buttons:  actionSheetButtons 

      //buttons: [{
    //     //  text :'Dr.Mahmoud',  
    //    text: 'Dr.'+ dRow.name, //get doctor list
    //   icon: 'person',
    //   handler: () => {
        
    //       // this.Reciever="Dr.Mahmoud";
    //      this.Reciever= dRow.name;
    //      console.log("docM"+this.Reciever);
     
    //     this.intComp.sendDoctorNamefromHometoMessage(this.doctorRow);
    //     this.navigation.navigateTo("home/message");
        

    //     //must be getten from database
    //   }
    // }
    // ,
    //  {
    //     // text:'Dr.Medhat',
    //     text: 'Dr.'+ this.doctorRow[1].name,
    //    icon: 'person',
    //   // icon: 'camera',
    //   handler: () => {
        
    //     //  this.Reciever="Dr.Medhat";
    //      this.intComp.sendDoctorNamefromHometoMessage(this.doctorRow);
    //    this.Reciever= this.doctorRow[1].name;    
    //      this.navigation.navigateTo("home/message");
    //   }
    // }
    // ]
  
  });
  await actionSheet.present();
}

}
