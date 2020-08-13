import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NavigationService } from 'src/app/home/NavService/navigation.service';
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';
import { HttpService } from 'src/app/home/HttPService/http.service';
import { InteractionService } from 'src/app/services/datacommunication/interaction.service';


declare var OT:any;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})


export class VideoComponent implements OnDestroy,OnInit {


  ngOnDestroy() {
console.log("onDestroy");

  }

  session: any;
  publisher: any;
  apiKey: any;
  sessionId: String;
  token: string;

  speaker:boolean = true;
  mute:boolean = false;
  videoToggleVariable:boolean = true;
  subscriber:any;

  doctor;
  isAudio:boolean=false;
  appointment;
  constructor(
    private androidPermissions: AndroidPermissions,
    private route : ActivatedRoute,
    private datastream: DatastreamingService,
    private http:HttpService,
    private navigate: NavigationService) {
    this.apiKey = "46767002";

      this.sessionId = this.datastream.doctor.sessionId;
      console.log("session: ", this.sessionId);

      if (OT.checkSystemRequirements() == 1) {
          this.session = OT.initSession(this.apiKey, this.sessionId);
      } else {
        this.handleError("Your mobile doesn't support webrtc , please use a different mobile");
      }


  }


  publishOptions;
  Subscripetoptions;

  audioComponent()
  {
      this.publishOptions = {
          
        insertMode: 'append',
        width: '100%',
        height:'100%',
        showControls: false,
        // usePreviousDeviceSelection: true,
        publishAudio:true, 
        publishVideo:false
      };
      this.Subscripetoptions = {
        insertMode: 'append',
        width: '100%',
        height:'100%',
        showControls: false,
        publishAudio:true, 
        publishVideo:false

      };
  }
  videoComponent()
  {

      this.publishOptions = {
          
        insertMode: 'append',
        width: '100%',
        height:'100%',
        showControls: false,
        // usePreviousDeviceSelection: true,
        // style: {
        //   buttonDisplayMode: "auto",}
      };

      this.Subscripetoptions = {
        insertMode: 'append',
        width: '100%',
        height:'100%',
        showControls: false,
      
      };
  }


  disableVideo:boolean;


  ngOnInit()
  {

    
     this.http.getSessionToken().subscribe(
      (tokenObj)=>{

          this.token = tokenObj.token;
      },
      (error)=>{
        console.log("Error: ", error);
      },
      ()=>
      {
        console.log("token came");
        console.log(this.token);

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO)
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.RECORD_AUDIO, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);


    this.route.paramMap.subscribe((param:ParamMap)=> {
      let id =parseInt(param.get('id'))
      if(id==1)
      {
        this.isAudio=false;
        this.videoComponent();
      }
      else{
        this.isAudio=true;
        this.audioComponent();

      }
    });
    this.startCall();
    this.disableVideo = false;
      }
    )
    
  }

  ionViewDidLeave()
  {
    this.ngOnDestroy();
  }


  startCall()
  {
    if (this.publisher) {
      this.session.unpublish(this.publisher);
    }
    this.publisher = null;




    this.publisher = OT.initPublisher('publisher', this.publishOptions);
    // this.publisher.on({
    //   accessDialogOpened: function (event) {
    //     console.log("The Allow/Deny dialog box is opened");
        
    //   },
    //   accessDialogClosed: function (event) {
    //     console.log("The Allow/Deny dialog box is closed.");
    //   }
    // });
    let that = this;

    // this.myCondition=false;


    this.session.on({
      streamCreated: (event: any) => {
        that.subscriber = this.session.subscribe(event.stream, 'subscriber', this.Subscripetoptions);
      },
      streamDestroyed: (event: any) => {
        // if(this.mute)
        // {
        //   this.mute=false;
        // }
        // if(event.stream.channel[0].active) //true when diconnected , false when unpublish
        // {
             this.handleError(`Stream ${event.stream.name} ended because ${event.reason}`);

        // }
        // this.myCondition=true;;

      },
      sessionConnected: (event: any) => {
        this.session.publish(this.publisher);
      }
    });


    this.session.connect(this.token, (error: any) => {
      if (error) {
        console.log(`There was an error connecting to the session ${error}`);
        if(error.code==1004)
        {
          this.handleError("Your Session has expired");
        }
      }
     
    });
  }

  cameraCycle()
  {
    if (this.publisher) this.publisher.cycleVideo().then(console.log);
  }
  diconnect()
  {
    // this.myCondition=true;
    this.session.disconnect();
    this.navigate.navigateTo('/home');
  }
  videoToggle()
  {    
    // if(this.videoToggleVariable)
    // {
          this.publisher.publishVideo(false);
          this.videoToggleVariable=false;
          this.disableVideo=true;
          // this.session.unpublish(this.publisher);
    // }
    // else{
      this.disableVideo=true;
      // this.publisher.publishVideo(true);
      // this.session.publish(this.publisher);
      // this.videoToggleVariable=true;
    
      // var pubOptions = {publishAudio:true, publishVideo:false};
    // if (this.publisher) {
    //   console.log("publisher exist");
    //   this.session.unpublish(this.publisher);
    // }
    // this.publisher = null;

    // this.publisher = OT.initPublisher('publisher', this.publishOptions);
    // this.session.publish(this.publisher);
    // if(this.mute)
    // {
    //   this.publisher.publishAudio(false);
    // }
    // if(this.speaker)
    // {
    //   this.subscriber.setAudioVolume(1); //(silent)
    // }
    // else{
    //   this.subscriber.setAudioVolume(100); 
    // }
    // this.videoToggleVariable=true;
    // }
  }

  muteToggle()
  {

    if(this.mute)
    {
      this.publisher.publishAudio(true);
      this.mute=false;
    }
    else{
      this.publisher.publishAudio(false);
      this.mute=true;
    }

  }

  


  speakerToggle()
  {

   if(this.speaker)
   {
     // After you create a Subscriber object, you can set its volume by 
  //calling its setAudioVolume() method, passing in a value from 0 (silent) to 100 (full volume):

    this.subscriber.setAudioVolume(1); //(silent)
    // this.subscriber.subscribeToAudio(false); // audio off
    this.speaker = false;
   }
   else{
    this.subscriber.setAudioVolume(100);
    // this.subscriber.subscribeToAudio(true); // audio off
    this.speaker = true;
   }
  
  }

   handleError(error) {
    if (error) {
    console.error(error);
    alert(error);
    // this.myCondition=true;

    }
    }
}

// Setting an image to display in audio-only mode

// You can use the backgroundImageURI style of a Subscriber to set the image to be displayed when there is no video. The value you set can be the URL of an image on the web. It can also be a data: URL, such as one that you obtain using the getImgData() method of the Subscriber object (see the previous section).

// The following code sets the background image of the Subscriber. When the call to Session.subscribe() completes successfully, the background image is set. If there is a video stream, the background is set to a static image captured from the subscriber video; otherwise it is set to an image loaded from a web URL:

// var subscriber = session.subscribe(event.stream, 'subscriberElement', function(error) {
//   if (error) {
//     console.log(error.message)'
//     return;
//   }
//   if (subscriber.stream.hasVideo) {
//     var imgData = subscriber.getImgData();
//     subscriber.setStyle('backgroundImageURI', imgData);
//   } else {
//     subscriber.setStyle('backgroundImageURI',
//       'https://tokbox.com/img/styleguide/tb-colors-cream.png'
//     );
//   }
// });

