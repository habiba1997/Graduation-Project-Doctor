import { Component, OnInit } from '@angular/core';

import { NavigationService } from './NavService/navigation.service';
import { DatastreamingService } from '../services/datastream/datastreaming.service';
import { AlertController, ActionSheetController} from '@ionic/angular';
import { HttpService } from './HttPService/http.service';
import { timer } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  doctorName: String;
  val: string;
  // timer
  showSplash 
  constructor(
    private navigation:NavigationService, 
    private datastream: DatastreamingService, 
    private http: HttpService,
    private addController : AlertController,
    private docList:ActionSheetController
    ) {
    }


    ngOnInit()
    {
      this.doctorName =this.datastream.getDoctorName();
      if(this.doctorName==undefined )
      {
        this.presentAlert('HTTP DataStream Error: ', "My Doctor Name is Null");
        this.navigation.navigateTo('cover');
      }  
      this.getDocList();
    }

getDocList()
{
  const token = this.datastream.getToken();
  console.log("Token to get patient list in home page: ",token);
}
    
  clear()
  {
        this.datastream.clearData();
        this.navigation.navigateTo('cover');
  }

    
  NavigateMe(path:string){
    
    this.navigation.navigateTo(path);
    console.log("navigate to ", path);

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

  


  async addPatient(){
  
    const alert =this.addController.create({
      header: 'Add your Patient',
      animated :true,
      message: 'Enter patient mobile number',
      inputs:[{
      type: "text",
      name:'val',
      value :""
      
      
      }],
      cssClass: "Dark",
      buttons:
      
       [{
        text:'Add',
        
        handler: async data => {
        
        let token = this.datastream.getToken();
        console.log("Phone Number: " + data.val);
        let  mobile = data.val.replace(/^0+/, '');
        mobile= "+20"+mobile;
        await this.http.addPatient(mobile,token)
        .subscribe(
          async response=>{
            console.log("http request to add patinet responce: "+ JSON.stringify(response));
                // timer
               this.showSplash = true;
                // timer
               timer(10000).subscribe(()=> this.showSplash = false);
               this.datastream.clearPatientList();
               response.forEach(element => {
                   this.datastream.addToPatientList(element);
                   
                 }); 
               await this.datastream.savePatientListToDataStore();
               console.log('HTTP request completed.');
               this.navigation.navigateTo('home/doctorList'); 
          }, 
          err =>
          {
            this.presentAlert('HTTP Add Patient Error: ', err.error.message);
          },
          async () => 
          {
            console.log('HTTP to ADD Patient request completed.');
  
          }
        );
        }
    },
      
      {text:'Cancel',
      role: 'cancel'
       }
    ]
    });
  
     (await alert).present();
    }
    async newMessage() {
      const actionSheet = await this.docList.create({
        header: 'Message Type',
        buttons: [{
          text: 'Text',
          // role: 'destructive',
           icon: 'chatbubbles',
          handler: () => {
            console.log('Delete clicked');
            this.navigation.navigateTo("home/message");
          }
        }, {
          text: 'Voice Call',
          icon: 'call',
          handler: () => {
            console.log('Share clicked');
          }
        }, {
          text: 'Video Call',
          icon: 'camera',
          handler: () => {
            console.log('Play clicked');
          }
        }
        ]
      });
      await actionSheet.present();
    }
  
  

}
