import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/home/NavService/navigation.service';
import { HttpService } from 'src/app/home/HttPService/http.service';
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';
import { MenuController } from '@ionic/angular';
import { AlertController} from '@ionic/angular';
import { timer } from 'rxjs';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showSplash: boolean;

  constructor(
    private nav:NavigationService,
     private http: HttpService,
     private datastream : DatastreamingService,
     private men:MenuController,
     private addController : AlertController,
     private fcm: FCM,
     
    ) { }
 

    ngOnInit() {
      this.men.enable(false);
    }


   login(mobile,password)
    {
 
    let that = this;
    console.log(mobile,password);
    mobile = mobile.replace(/^0+/, '');
    mobile= "+20"+mobile;
    this.http.Login(mobile, password).subscribe( 
       
       res=>{
         // timer
        this.showSplash = true;
        // timer
        timer(10000).subscribe(()=> this.showSplash = false);

        //recieveing Token For Development Only FOR NOW
        this.fcm.getToken().then((fcmtoken)=>{
          this.http.editFCMToken(fcmtoken, res.token).subscribe((data)=>
          {
            console.log(JSON.stringify(data));
          }, 
          err=>{
            alert("ERROR in updating FCM token: "+JSON.stringify(err));

          });

        },
        (err)=>{
          alert("ERROR in getting FCM token: "+JSON.stringify(err));
        });

        //Use Token To get Doctor Data
        console.log("Token: "+res.token);
        this.datastream.setToken(res.token);
        
        this.http.getDoctorUsingToken(res.token).subscribe(
            doctordata =>
            {
                console.log("doctor: "+JSON.stringify(doctordata));
                that.datastream.setDoctor(doctordata.mydoctor);
                this.datastream.clearPatientList();
                doctordata.patientArrayList.forEach(element => {
                      this.datastream.addToPatientList(element);
                    }); 
      
            that.nav.navigateTo('home');
          },
          err => {
             this.presentAlert('HTTP Doctor Data Error: ', err.error.message);
            
          },
          () => console.log('HTTP get Doctor data request completed.')

        )
      }, 
      err =>{
        this.presentAlert('HTTP Login Error: ', err.error.message);
        
      },
      () => console.log('HTTP Login request completed.')
      
     );
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

    backClick(){
      this.nav.navigateTo('cover');
  
    }
}
