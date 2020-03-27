import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from '../NavService/navigation.service';
import { HttpService } from '../HttPService/http.service';
import { InteractionService } from 'src/app/services/datacommunication/interaction.service';
import { IonContent, ActionSheetController } from '@ionic/angular';
import { patientData } from 'src/app/model/patientData';
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
})
export class ConversationsComponent implements OnInit {

  constructor(private navigation: NavigationService
     , private httpService:HttpService
     ,private dataInteraction:InteractionService
     ,private patList:ActionSheetController,
     private datastream: DatastreamingService, 
     ) { }
     
     private patientsArray = new Array<patientData>();
     private reciever:String;




  ngOnInit() {
    this.dataInteraction.sendConversationState(0);
    this.patientsArray = this.datastream.getPatientList(); 
    console.log("pat: ",this.patientsArray[0]);
    this.navigation.navigateTo('home/conversation/convList');
  }

  ngAfterViewInit(){
    this.dataInteraction.sendConversationState(0);
    this.patientsArray = this.datastream.getPatientList(); 
    console.log("pat: ",this.patientsArray[0]);
    this.navigation.navigateTo('home/conversation/convList');
  }
  
 inbox(){
  console.log("inbox");
  this.dataInteraction.sendConversationState(0);
 
 }
 sent(){
   console.log("sent");
   this.dataInteraction.sendConversationState(1);

}
back(){
  this.navigation.navigateTo('home');
}
async CreateNew(){
  let actionSheetButtons = [];
   
  for(let row of this.patientsArray){
  actionSheetButtons.push({
      text:  row.name, //get doctor list
      icon: 'person',
      handler: () => {
        
         this.reciever= row.name;
         console.log("Patient: "+this.reciever);
     
        this.dataInteraction.sendDoctorNamefromconvtoMessage(row);
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
