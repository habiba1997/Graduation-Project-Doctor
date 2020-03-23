import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { InteractionService } from 'src/app/services/datacommunication/interaction.service';
import { newMessage } from 'src/app/model/newMessage';
import { NavigationService } from '../NavService/navigation.service';
import {AutosizeModule} from 'ngx-autosize';
import { IonContent } from '@ionic/angular';
import { Reply } from 'src/app/model/conv';
import { HttpService } from '../HttPService/http.service';
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';
import { patientData } from 'src/app/model/patientData';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})


export class ChatComponent implements OnInit {
  private newMessages : newMessage[]=[];
 @ViewChild(IonContent, {static: false})   bigContent : IonContent
  
 
 constructor(private intComp: InteractionService,
    private navigation:NavigationService,
    private httpService:HttpService,
    private dataStrem:DatastreamingService,
    private communication:InteractionService,
    ) { }



    
    private tId:number;
    private newMsgs:any;
    private currentUser:number;
    // private currentUser2:number;
    private replyContent:String;
    private data :Reply;
    // private newReply:newMessage;
    private patientArray = new Array<patientData>();
    private recievername:String;


   ngOnInit() {
    // this.isRendered=false;
    // this.communication.getId.subscribe(
    //     (id)=>{
    //       this.tId =id;
    //       console.log("id "+this.tId)
    //     }
    // )
    // const that=this;
    // this.intComp.msg.subscribe(
    // (massage)=> { 
    //   console.log(massage);
    //   that.newMessages=massage;
    //   console.log("tpe msg  "+that.newMessages);
    //   // that.Messages.push(massage);
    //   // console.log("arra "+that.Messages);

    //   that.setMessege();
          
    // });
    
     
   }
  ngAfterViewInit(){
    this.communication.getId.subscribe(
      (id)=>{
        this.tId =id;
        console.log("id "+this.tId)
      }
  );


  this.patientArray = this.dataStrem.getPatientList(); 
  console.log(this.patientArray);
  const that=this;
  this.intComp.msg.subscribe(
  (massage)=> { 
    console.log(massage);
    that.newMessages=massage;
    console.log("tpe msg  "+that.newMessages);
    // that.Messages.push(massage);
    // console.log("arra "+that.Messages);

    that.setMessege();
        
  });
  

  
  }
  setMessege(){
    this.newMsgs=this.newMessages[0];
    // this.isRendered=true;
    // *ngIf="isRendered"
    

    console.log("type myMsgs is "+typeof(this.newMsgs));

    console.log("myMsgs",this.newMsgs);
    for(let row of this.patientArray){
      if(this.newMsgs.reciever_id==row.patientId){
        this.recievername=row.name;
        // this.currentUser2=dRow.doctorId;
      }
    }
    this.currentUser=this.newMsgs.sender_id;
     
    console.log("curr ",this.currentUser);
    console.log("sender",this.newMsgs.sender_id);

    // {{newMsgs.reciever_name}}
    // <p class ="Sspace">{{newMsgs.sender_name}} </p>
    // <p class ="Sspace">{{newMsgs.reciever_name}} </p>


    
  }
  back(){
    console.log("must navigate to patient list")
    this.navigation.navigateTo('home');

  }
   sendReply(threadId){
     console.log("sendRep"+threadId)
    //  this.newMessages.push({
    //   reciever_id :this.newMsgs.reciever_id,
    //   msg_subject :this.newMsgs.msg_subject,
    //   created_date:this.newMsgs.created_date,
    //   is_readed:this.newMsgs.is_readed,
    //   reciever_name:this.newMsgs.reciever_name,
    //   sender_name:this.newMsgs.sender_name,
    //   msg_body:this.replyContent
    // });
    

      console.log(this.newMessages)
       //////////////////////////////////
       this.data={
              sender_id:this.newMsgs.sender_id,
              reciever_id:this.newMsgs.reciever_id,
              msg_body:this.replyContent,
              created_date:new Date().toLocaleString(),
      
          }
            this.httpService.postReply(this.data,threadId).subscribe((res)=>{
              console.log("posted",res);
            });
            this.replyContent="";
             this.httpService.getReplies(threadId,0).subscribe((res)=>{
              this.intComp.sendMSG(res);
              console.log("replies",res);
              this.newMessages=res;  
              this.newMsgs=this.newMessages[0];
              this.currentUser=this.newMsgs.sender_id;
              console.log("from repl ",this.currentUser);     
             }); 
            this.bigContent.scrollToBottom(200);
            ////////////////////////////////////////////////////////////////////////////////////
           


  }
  goConv(){

    // this.intComp.sendMSG(this.newMessages)
    this.navigation.navigateTo("home/conversation/convList");

  }
}