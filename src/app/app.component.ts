import { Component } from '@angular/core';
import {MenuController, Platform, ToastController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatastorageService } from './services/datastorage/datastorage.service';
import { NavigationService } from './home/NavService/navigation.service';
import { DatastreamingService } from './services/datastream/datastreaming.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { HttpService } from './home/HttPService/http.service';
import {timer} from "rxjs";

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
    private menu_controller:MenuController,
    private toastController: ToastController,


  ) {
    this.initializeApp();
  }
  showSplash:boolean=true;
  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.menu_controller.enable(true);
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
  ];

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
              console.log("calling set doctor for login",doctor);
               this.datastream.SetDoctorforLogin(doctor);
               this.myName =this.datastream.getDoctorName();
               console.log("menu name",this.myName)
            });
            await this.datastore.getDoctorToken().then((token)=>{
               that.datastream.setToken(token);
               
                //receiving Token For Development Only FOR NOW
                this.http.editFCMToken();
            });
            await this.datastore.getPatientList().then((doctorList)=>{
               this.datastream.restoreStreamDatalist(doctorList);
            });
            this.nav.navigateTo('home');
            
          }

       });
     
       this.statusBar.styleLightContent();
       this.splashScreen.hide();
      timer(3000).subscribe(()=>this.showSplash=false);



      //recieveing notification
      this.fcm.onNotification().subscribe((data)=>
      {
        if (data.wasTapped)
        {
          this.presentToast("Tapped Message:"+ data.body);
          console.log("Tapped: "+ JSON.stringify(data));
        }
        else
        {

          this.presentToast("Message:"+ data.body);
          console.log("tapping",JSON.stringify(data));
        }
      });






    });
  }
  async presentToast(text) {
    const toast = await this.toastController.create({
      header:"Consultation Answer Just Arrived",
      message: text,
      position: 'top',
      duration: 3000,
      color:'light',
      showCloseButton: true,
      closeButtonText: 'hide',
    });
    await toast.present();
    toast.onDidDismiss().then((val) => {
      console.log('Toast Dismissed');
    });

  }
  async  openMenu() {
     console.log("open menu");
    this.menu_controller.enable(true, 'first');
    this.menu_controller.open('first');


  }

  // vitalClick(){
  //   this.nav.navigateTo('home/vitals');

  // }
  profileClick(){
    this.nav.navigateTo('home/profile');

  }
  dlistClick(){
    this.nav.navigateTo('home/doctorList');

  }
  homClick(){
    this.nav.navigateTo('home');
    console.log("trainer list")
  }

  outClick(){
    this.datastream.clearData();
    this.nav.navigateTo('cover');


  }
  ConsultClick(){
    this.nav.navigateTo('home/conversation');

  }
  
}
