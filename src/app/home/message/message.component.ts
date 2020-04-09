import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/datacommunication/interaction.service';
import { NavigationService } from '../NavService/navigation.service';
import { newMessage } from 'src/app/model/newMessage';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../HttPService/http.service';
import { Reply } from 'src/app/model/conv';
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';
import { patientData } from 'src/app/model/patientData';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {


  constructor(
  private navigation:NavigationService,
  // private docList:ActionSheetController,
  private addController : AlertController,
  private interactiveCommunication:InteractionService,
  private httpService:HttpService,
  private doctorDataStream:DatastreamingService,
  ) {

   }


  private Subject_from_input:string;
  private Content_from_text_area:string;
  private Reciever_from_pat_list:string;
  private newMessages :  newMessage[]=[];
  private data :Reply;
  private doctorId:number;
  private thread:newMessage;
  
  private patientRow : patientData;
  private doctorName : String;

    ngOnInit()
    {
      
    
    this.doctorId = this.doctorDataStream.getDoctorId();
    this.doctorName = this.doctorDataStream.getDoctorName();

    const that=this;
    this.interactiveCommunication.data.subscribe(
      (docData)=> { 
        that.patientRow=docData;
        console.log("doc data ",docData)

        console.log(this.patientRow)
        that.setDocList();

      }
    );

    // this.Reciever_from_dr_list="Dr.Mahmoud"
    this.Content_from_text_area="";
    this.Subject_from_input="";
    // this.Reciever_from_dr_list="";
    
  }
  setDocList(){
    // this.eachDoctorData=this.doctorRow;
    console.log("type each patient data is "+typeof(this.patientRow));
    console.log("Name: "+this.patientRow.name);
    this.Reciever_from_pat_list=this.patientRow.name;
    console.log("Reciever_from_pat_list: "+this.Reciever_from_pat_list);
    

  }

  
  async presentAlert(subtitleString:string,messageString:string) {
    const alert = await this.addController.create({
      header: 'ERROR',
      subHeader: subtitleString,
      message: messageString,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  send(){
    if(this.Reciever_from_pat_list==""||this.Content_from_text_area==""||this.Subject_from_input==""){
        this.presentAlert('Can not send message', "Make sure you typed your Subject, Message and choose your Patient.");
    }
    else{
      this.thread={
        reciever_id :this.patientRow.patientId,
        msg_subject :this.Subject_from_input,
        created_date:new Date().toLocaleString(),
        is_readed:0,
        reciever_name:this.Reciever_from_pat_list,
        sender_name:this.doctorName,
        msg_body:this.Content_from_text_area
    
       }
    this.newMessages.push(this.thread);
    console.log(this.Content_from_text_area);
    console.log(this.newMessages);


   
   
  //post new message in data base
   this.data={
    sender_id:this.doctorId,
    reciever_id:this.thread.reciever_id,
    msg_body:this.thread.msg_body,
    created_date:new Date().toLocaleString(),
    thread_subject:this.Subject_from_input,
    fcm_token:this.patientRow.fcmtoken
   
   };


  //  console.log("tthread"+this.thread.reciever_name)
  //  console.log("data"+this.data.sender_id)
   this.httpService.postThread(this.thread,this.doctorId).subscribe((res)=>{
    console.log("new thread data",res);
     
    this.interactiveCommunication.getThreadIdfromMessageorConvListtoChat(res.insertId);
     

     console.log("hey tehre:", this.data);
   this.httpService.postReply(this.data,res.insertId).subscribe((msg)=>{
    console.log("heyyyyloo");
    console.log("first thread message",msg);
    console.log("NAVIGATIOM11");

  this.navigation.navigateTo('home/chat');

    });

    
   });

  //send message content to chat component
  this.interactiveCommunication.sendMSG(this.newMessages);
  console.log("NAVIGATIOM");

  }
 console.log(this.Content_from_text_area);
}


// async chooseDoctor() {
//   const actionSheet = await this.docList.create({
//     header: 'You want to send message to:',
//     buttons: [{
//       text: 'Dr.Mahmoud',//get doctor list
//       icon: 'person',
//       handler: () => {
//         // this.navigation.navigateTo("home/message");
//         this.Reciever_from_dr_list="Dr.Mahmoud";
//         //must be getten from database
//       }
//     },
//      {
//       text: 'Dr.Medhat',
//       icon: 'person',
//       // icon: 'camera',
//       handler: () => {
        
//         this.Reciever_from_dr_list="Dr.Medhat";
        

//         // this.navigation.navigateTo("home/schedule");
//       }
//     }
//     ]
//   });
//   await actionSheet.present();
// }
// <ion-button class ="docButton" (click)="chooseDoctor()" slot="end" color="sub.severityLevel" style="color:black">
//          choose your doctor first
//      </ion-button>
}
