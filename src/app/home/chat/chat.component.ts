import {Component, OnInit, ViewChild, Input, ChangeDetectorRef} from '@angular/core';
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
import { ActionSheetController, ToastController, Platform } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Camera,CameraOptions, PictureSourceType} from'@ionic-native/camera/ngx';
import { File ,FileEntry } from '@ionic-native/file/ngx';
import {WebView} from'@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import {NetworkService} from "../../services/Network/network.service";
import {ImagePath} from "../DataModels";

const STORAGE_KEY = 'my_images';


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
             private camera: Camera,
             private file: File,
             private webview: WebView,
             private actionSheetController: ActionSheetController,
             private toastController: ToastController,
             private storage: Storage,
             private plt: Platform,
             private ref: ChangeDetectorRef,
             private filePath: FilePath,private network:NetworkService
    ) { }


    url:string;
    private images = [];
    private img=new ImagePath();
    private newMessages : any[]=[];
    private newMsgs:any;
    private replyContent:string;
    private currentUser:number;
    private data :Reply;
    private patientArray = new Array<patientData>();
    private patName:string;
    private userToRecieve:patientData;
    private dId:number;
    private thread:any;
    private image:any;
    private thread_id:number;
    showSplash: boolean=false;

  
  
    ngOnInit(){ this.plt.ready().then(() => {
        this.loadStoredImages();
    });}
    loadStoredImages() {
        this.storage.get(STORAGE_KEY).then(images => {
            if (images) {
                let arr = JSON.parse(images);
                this.images = [];
                for (let img of arr) {
                    let filePath = this.file.dataDirectory + img;
                    let resPath = this.pathForImage(filePath);
                    this.images.push({ name: img, path: resPath, filePath: filePath });
                }
            }
        });
    }
    ionViewWillEnter() {
        new Promise((resolve, reject) => {
            this.dId = this.dataStream.getDoctorId();
            if (this.dId == undefined) {
                reject('patient undefined');
            } else {
                resolve();
            }

        }).then(() => {
            this.patientArray = this.dataStream.getPatientList();
            console.log("chat doctor list ",this.patientArray);
            this.communication.msg.subscribe(
                (massagesFromMessageOrConvList)=> {
                    console.log("replies in chat: " ,massagesFromMessageOrConvList);
                    this.newMessages=massagesFromMessageOrConvList.newMessages;
                    this.thread=massagesFromMessageOrConvList.thread;
                    this.thread_id=massagesFromMessageOrConvList.thread_id;
                    this.showSplash=true;
                    console.log("msg received  "+massagesFromMessageOrConvList);
                    this.setMessege();
                });

        });
    }
    
    ////////////////////

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
       console.log("newMsgs.sender_id"+this.newMsgs.sender_id);
       console.log("sender",this.dId);    
    }
  
  
    back(){
      this.navigation.navigateTo('home');
     }
  
     sendReplyFun()
     {
       this.sendReply(this.thread_id );
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
                thread_subject:this.thread.msg_subject,
                fcm_token:this.userToRecieve.fcmtoken
            };
            console.log("Data  for reply: ", this.data);
              this.httpService.postReply(this.data,threadId).subscribe((res)=>{
                console.log("posted",res);
                this.newMessages.push(this.data);
              });

               this.replyContent="";
   
              this.bigContent.scrollToBottom(200);
              ////////////////////////////////////////////////////////////////////////////////////
             
  
  
    }
  
    goConv(){
  
     this.navigation.navigateTo("home/conversation");
  
    }
    async selectImage() {
        const actionSheet = await this.actionSheetController.create({
            header: "Select Image source",
            buttons: [{
                text: 'Load from Library',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }
    takePicture(sourceType: PictureSourceType) {

        var options: CameraOptions = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        this.camera.getPicture(options).then(imagePath => {
            if(this.network.NetworkStateGetter())
            {
                if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                    this.filePath.resolveNativePath(imagePath)
                        .then(filePath => {
                            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                            this.img = {
                                path: correctPath + currentName,
                                currentName: currentName,
                                correctPath: correctPath
                            };
                            this.startUpload(this.img.path);
                            // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                        });
                } else {
                    var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                    var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                    this.img = {
                        path: correctPath + currentName,
                        currentName: currentName,
                        correctPath: correctPath
                    };
                    this.startUpload(this.img.path);
                    // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

                }
            }
            else {
                alert("you are Offline");
            }
        });

    }
    pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            let converted = this.webview.convertFileSrc(img);
            return converted;
        }
    }
    createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpg";
        return newFileName;
    }
    copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
            this.updateStoredImages(newFileName);
        }, error => {
            this.presentToast('Error while storing file.');
        });
    }
    updateStoredImages(name) {
        this.storage.get(STORAGE_KEY).then(images => {
            let arr = JSON.parse(images);
            if (!arr) {
                let newImages = [name];
                this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
            } else {
                arr.push(name);
                this.storage.set(STORAGE_KEY, JSON.stringify(arr));
            }

            let filePath = this.file.dataDirectory + name;
            let resPath = this.pathForImage(filePath);

            let newEntry = {
                name: name,
                path: resPath,
                filePath: filePath
            };
            console.log("newEntry"+newEntry);
            this.images = [newEntry, ...this.images];
            this.image={
                sender_id:this.dId,
                reciever_id:this.userToRecieve.patientId,
                msg_body:"",
                created_date:new Date().toLocaleString(),
                thread_subject:this.thread.msg_subject,
                fcm_token:this.userToRecieve.fcmtoken,
                media:resPath,
            };
            this.newMessages.push(this.image);
            this.ref.detectChanges();
        });
    }
    startUpload(imgEntry) {
        console.log("upload"+JSON.stringify(imgEntry));


        this.file.resolveLocalFilesystemUrl(imgEntry)
            .then(entry => {
                ( < FileEntry > entry).file(file => this.readFile(file))
            })
            .catch(err => {
                this.presentToast('Error while reading file.');
            });
    }
    json()
    {
        return {
            "thread_id":this.thread_id,
            "sender_id":this.dId,
            "reciever_id":this.userToRecieve.patientId,
            "msg_body":"",
            "fcm_token":this.userToRecieve.fcmtoken
        };}
    readFile(file: any) {
        const that = this;
        const reader = new FileReader();

        reader.onloadend = () => {

            console.log("ressssssss"+reader.result);
            const formData = new FormData();
            const imgBlob = new Blob([reader.result], {type: file.type });
            console.log("blob"+JSON.stringify(imgBlob));
            formData.append('file', imgBlob, file.name);
            formData.append('data',  JSON.stringify(this.json()));
            this.httpService.bgrb(formData).subscribe(
                (data)=>{
                    console.log(" allData ", data);
                    that.url = data.url;
                    // this.image={
                    //     sender_id:this.pId,
                    //     reciever_id:this.doctor.doctorId,
                    //     msg_body:"",
                    //     created_date:new Date().toLocaleString(),
                    //     thread_subject:this.thread.thread.msg_subject,
                    //     fcm_token:this.doctor.fcmtoken,
                    //     media:data.url,
                    //
                    // };
                    //   // this.http.postReply(this.data,this.thread.thread_id).subscribe((res)=>{
                    //   //   console.log("posted",res);


                    // });
                    this.showSplash=false;
                    console.log("Data Came: ", that.url );
                    // that.newMessages.push(this.image);
                    this.showSplash=true;

                    that.setMessege();
                    this.bigContent.scrollToBottom(500);
                    this.copyFileToLocalDir(this.img.correctPath, this.img.currentName, this.createFileName());


                },
                (err)=>{
                    console.log("ERROR Occured will sending your msg");
                },
                ()=>
                {
                    console.log("Completed");
                    console.log("Data Came3: ", that.newMessages );
                    console.log("Data Came:2 ", this.image);

                }
            )

            console.log("form  "+JSON.stringify(formData.getAll('file')));

        };
        reader.readAsArrayBuffer(file);
        console.log("Data Came:2 ", that.url );
        console.log("Data Came:2 ", this.image);


    }
    async presentToast(text) {
        const toast = await this.toastController.create({
            message: text,
            position: 'bottom',
            duration: 3000
        });
        toast.present();
    }









  }
