import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { InteractionService } from 'src/app/services/datacommunication/interaction.service';
import { newMessage } from 'src/app/model/newMessage';
import { NavigationService } from '../NavService/navigation.service';
import {AutosizeModule} from 'ngx-autosize';
import { IonContent } from '@ionic/angular';
import { Reply, Iconvs } from 'src/app/model/conv';
import { HttpService } from '../HttPService/http.service';
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';
import { patientData } from 'src/app/model/patientData';
import { timer } from 'rxjs';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})


export class ChatComponent implements OnInit {
  // private newMessages : newMessage[]=[];
 @ViewChild(IonContent, {static: false})   bigContent : IonContent
  
 
 constructor(private intComp: InteractionService,
    private navigation:NavigationService,
    private httpService:HttpService,
    private dataStream:DatastreamingService,
    private communication:InteractionService,
    ) { }



    private newMessages : any[]=[];
    private newMsgs:any;
    private replyContent:string;
    private currentUser:number;
    private data :Reply;
    private patientArray = new Array<patientData>();
    private patName:string;
    private userToRecieve:patientData;
    private dId:number;
    private thread:Iconvs;

  
  
    ngOnInit(){}
    ionViewWillEnter() {
      
      this.communication.getId.subscribe(
        (thread)=>{
          this.dId =this.dataStream.getDoctorId();
          this.thread =thread;
          console.log("id "+this.thread.thread_id)
          this.patientArray = this.dataStream.getPatientList(); 
         console.log("This PatientArray: ", this.patientArray);
       });
    
    
  
    const that=this;
    this.intComp.msg.subscribe(
    (massagesFromMessageOrConvList)=> { 
      console.log("replies in chat: " ,massagesFromMessageOrConvList);
      that.newMessages=massagesFromMessageOrConvList;
      
      
      console.log("tpe msg  "+that.newMessages);
      
  
      that.setMessege();
    });
    
  
     }
    
    setMessege(){
      this.newMsgs=this.newMessages[0];
      
      console.log("newMsgs: ",this.newMsgs) ; 
      
      if (this.newMsgs.sender_id==undefined){
        this.newMsgs.sender_id=this.dId;
        console.log("newMsgs.sender_id"+this.newMsgs.sender_id)   
        console.log("newMsgs if denderid is undefined"+this.newMsgs)   
  
      }
     
        console.log("myMsgs",this.newMsgs);

        console.log("mypatientArray: ", this.patientArray);
        for(let row of this.patientArray){
          console.log("this.newMsgs.sender_id"+this.newMsgs.sender_id);
          console.log("row.patientId"+row.patientId);
          
          if(this.newMsgs.sender_id==row.patientId || this.newMsgs.reciever_id==row.patientId){
            console.log("row of patient",row);
            this.userToRecieve=row;
            console.log(this.userToRecieve+" id == "+row.patientId);
            this.patName=row.name;
           
          }
        }
       console.log("newMsgs.sender_id"+this.newMsgs.sender_id)   
       console.log("sender",this.dId);    
    }
  
  
    back(){
      this.navigation.navigateTo('home');
     }
  
     sendReplyFun()
     {
       this.sendReply(this.thread.thread_id );
     }
     sendReply(threadId){
       console.log("this.tId: ",threadId);
       console.log(this.newMessages);
       console.log("userToRecieve in send reply"+this.userToRecieve);
  
         //////////////////////////////////
         this.data={
                sender_id:this.dId,
                reciever_id:this.userToRecieve.patientId,
                msg_body:this.replyContent,
                created_date:new Date().toLocaleString(),
                thread_subject:this.thread.msg_subject,
                fcm_token:this.userToRecieve.fcmtoken
            }
            console.log("Data  for reply: ", this.data);
              this.httpService.postReply(this.data,threadId).subscribe((res)=>{
                console.log("posted",res);
                this.newMessages.push(this.data);
              });
              
              
              //  this.httpService.getReplies(threadId,0).subscribe((res)=>{
              //   // this.intComp.sendMSG(res);
              //   console.log("replies",res);
              //   this.newMessages=res;  
              //   this.newMsgs=this.newMessages[0];
              //  });
               this.replyContent="";
   
              this.bigContent.scrollToBottom(200);
              ////////////////////////////////////////////////////////////////////////////////////
             
  
  
    }
  
    goConv(){
  
     this.navigation.navigateTo("home/conversation/convList");
  
    }
  }