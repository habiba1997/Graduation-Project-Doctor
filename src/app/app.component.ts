import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatastorageService } from './services/datastorage/datastorage.service';
import { NavigationService } from './home/NavService/navigation.service';
import { DatastreamingService } from './services/datastream/datastreaming.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { HttpService } from './home/HttPService/http.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  myName: String;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, 
    private datastore: DatastorageService,
    private nav : NavigationService,
    private datastream : DatastreamingService,
    public fcm : FCM,
    private http: HttpService,

  ) {
    this.initializeApp();
  }
  navigate =
  [
    {
      title : "Home",
      url   : "home",
      icon  : "home"
    },
    {
      title : "Chat",
      url   : "home/profile",
      icon  : "chatboxes"
    },
    {
      title : "Contacts",
      url   : "/contacts",
      icon  : "contacts"
    },
  ]

   initializeApp() {
    this.platform.ready().then( () => {
      
      let that = this;
       this.datastore.isTokenExpired().then(async isTokenExpired =>
        {
          console.log("isTokenExpired: "+ isTokenExpired);
          if(!isTokenExpired)
          {
            console.log(" app compoennt :: Token isnot expired:  "+isTokenExpired);
            await this.datastore.getDoctorData().then((doctor)=>{
               that.datastream.SetDoctorforLogin(doctor);
               this.myName =this.datastream.getDoctorName();
               console.log("menu name",this.myName)
            })
            await this.datastore.getDoctorToken().then((token)=>{
               that.datastream.setToken(token);
               
                //recieveing Token For Development Only FOR NOW
                this.fcm.getToken().then((fcmtoken)=>{
                  this.http.editFCMToken(fcmtoken, token).subscribe((data)=>
                  {
                    console.log(JSON.stringify(data));
                  }, 
                  err=>{
                    alert("Haven't Updated FCM Token");

                  });

                },
                (err)=>{
                  alert("ERROR in getting FCM token: "+JSON.stringify(err));
                });
            })
            await this.datastore.getPatientList().then((doctorList)=>{
               that.datastream.restoreStreamDatalist(doctorList); 
            })
            this.nav.navigateTo('home');
            
          }

       });
     
       this.statusBar.styleLightContent();
       this.splashScreen.hide();

      

      //recieveing notification
      this.fcm.onNotification().subscribe((data)=>
      {
        if (data.wasTapped) 
        {
          alert("Data Tapped Message:"+ data.body);
          console.log("Tapped: "+ JSON.stringify(data));
        }
        else
        {
          alert("Data Message:"+ data.body);
          console.log(JSON.stringify(data));
        }
      });

      
    

     });
  }
  // vitalClick(){
  //   this.nav.navigateTo('home/vitals');

  // }
  homeClick(){
    this.nav.navigateTo('home/Myprofile');

  }
  dlistClick(){
    this.nav.navigateTo('home/doctorList');

  }
  homClick(){
    this.nav.navigateTo('home');
    console.log("trainer list")
  }
  outClick(){
    this.nav.navigateTo('cover');

  }
  
}
