import { Component, OnInit } from '@angular/core';
import {InteractionService} from "../../services/datacommunication/interaction.service";
import {patientData} from "../../model/patientData";
import {AlertController} from "@ionic/angular";
import {NavigationService} from "../NavService/navigation.service";
import {HttpService} from "../HttPService/http.service";

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent implements OnInit {
  private patientData:patientData;
  private spinnerState:boolean=true;
  private patientVitals:any[];
  constructor( private  dataShare:InteractionService,
               private addController: AlertController,
               private navigation:NavigationService,
               private httpService:HttpService,
  ) { }



  ngOnInit() {
    console.log("Profile component Initiated");
    new Promise((resolve, reject) => {
      this.patientData=this.dataShare.getPatientData();
      console.log("patient data ",this.patientData);
      if(this.patientData==undefined){
        // this.presentAlert('Data Interaction Error','doctor data undefined');
        reject('patient data undefined');
      }
      else {
        resolve()
      }

    }).then(()=>{this.spinnerState=false;
    console.log("patient data from profile",this.patientData);
    this.httpService.getPatientVitals(this.patientData.patientId).subscribe(vitals=>{
      // this.patientVitals=vitals;
      console.log(this.patientVitals);
      this.patientVitals=[{
        label:"Weight",
        place_holder:"Add Weight",
        isDisabled:true,
        icon:"assets/Iconawesome-weight.png",
        name:"weight",
        input:vitals[0].weight},
        {

          label:"Height",
          place_holder:"Add Height",
          isDisabled:true,
          icon:"assets/Iconawesome-tape.png",name:"height",
          input:vitals[0].height},

        {

          label:"BMI",
          place_holder:"Add BMI",
          isDisabled:true,
          icon:"assets/Iconawesome-dumbbell.png",
          name:"BMI",
          input:vitals[0].BMI},
        {

          label:"Body Fats Ratio",
          place_holder:"Body Fats Ratio",
          isDisabled:true,
          icon:"assets/Iconawesome-tape.png",
          name:"body_fats_ratio",
          input:vitals[0].body_fats_ratio},
        {

          label:"Body Water Ratio",
          place_holder:"Body Water Ratio",
          isDisabled:true,
          icon:"assets/Iconawesome-heartbeat.png",
          name:"body_water_ratio",
          input:vitals[0].body_water_ratio},
        {

          label:"Stomach Area Fats",
          place_holder:"Stomach Area Fats",
          isDisabled:true,
          icon:"assets/Iconawesome-heartbeat.png",
          name:"stomic_area_fats",
          input:vitals[0].stomic_area_fats},
        {

          label:"Bone Density",
          place_holder:"Bone Density",
          isDisabled:true,
          icon:"assets/Iconawesome-heartbeat.png",
          name:"bone_desity",
          input:vitals[0].bone_desity},
        {

          label:"Muscle Density",
          place_holder:"Muscle Density",
          isDisabled:true,
          icon:"assets/Iconawesome-heartbeat.png",
          name:"muscle_desity",
          input:vitals[0].muscle_desity}
      ];
      console.log("patient vitals from profile",this.patientVitals);
    });
          }
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
