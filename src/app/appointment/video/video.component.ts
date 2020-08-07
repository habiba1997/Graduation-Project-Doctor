import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NavigationService } from 'src/app/home/NavService/navigation.service';


declare var OT:any;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})


export class VideoComponent implements OnDestroy {


  ngOnDestroy() {
console.log("onDestroy");

  }

  session: any;
  publisher: any;
  apiKey: any;
  sessionId: string;
  token: string;

  speaker:boolean = true;
  mute:boolean = false;
  videoToggleVariable:boolean = true;
  subscriber:any;

  isAudio:boolean=false;
  
  constructor(
    private androidPermissions: AndroidPermissions,
    private route : ActivatedRoute,
    private navigate: NavigationService) {
    this.apiKey = "46767002";
    this.sessionId = "1_MX40Njc2NzAwMn5-MTU5MjMwNTM4ODgwNn41eHlaT1N0YlhQcS9aRTlkakNXZDhIak5-UH4";
    this.token = "T1==cGFydG5lcl9pZD00Njc2NzAwMiZzaWc9YzA3ZGJkOTA2Y2JmYTc0NjA5MGFkNjgyZDIwOTQ2NmFmOWUyNTc2YTpzZXNzaW9uX2lkPTFfTVg0ME5qYzJOekF3TW41LU1UVTVNak13TlRNNE9EZ3dObjQxZUhsYVQxTjBZbGhRY1M5YVJUbGtha05YWkRoSWFrNS1VSDQmY3JlYXRlX3RpbWU9MTU5NjYxODg3NiZub25jZT0wLjkzNzIzMTM0MTI0NTUxMTEmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU5NjYyMjQ3NSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";  
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


  ionViewDidEnter()
  {
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

