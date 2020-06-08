import { Component, OnInit } from '@angular/core';
import {InteractionService} from "../../services/datacommunication/interaction.service";
import {patientData} from "../../model/patientData";
import {AlertController} from "@ionic/angular";
import {NavigationService} from "../NavService/navigation.service";

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent implements OnInit {
  private patientData:patientData;
  private spinnerState:boolean=true;
  constructor( private  dataShare:InteractionService,
               private addController: AlertController,
               private navigation:NavigationService
  ) { }



  ngOnInit() {
    console.log("Profile component Initiated");
    new Promise((resolve, reject) => {
      this.patientData=this.dataShare.getPatientData();
      if(this.patientData==undefined){
        // this.presentAlert('Data Interaction Error','doctor data undefined');
        reject('patient data undefined');
      }
      else {
        resolve()
      }

    }).then(()=>{this.spinnerState=false; console.log("patient data from profile",this.patientData);}
    ).catch((err) => this.presentAlert('data stream error', err));

  }
  consultDoc(){
    this.dataShare.sendPatientNamefromconvtoMessage(this.patientData);
    console.log("doctor data from profile"+this.patientData);
    this.navigation.navigateTo("home/message");
  }
  ngOnDestroy(){
    console.log(" profile destroyed");

  }
  async presentAlert(subtitleString: string, messageString: string) {
    console.log('alert holding screen ');
    const alert = await this.addController.create({
      header: 'ERROR',
      subHeader: subtitleString,
      message: messageString,
      buttons: [
        {

          text: 'Ok',
          handler: () => {
            this.spinnerState=false;
            this.navigation.navigateTo('home/doctorList');
          }
        },]
    });
    await alert.present();
  }


}
