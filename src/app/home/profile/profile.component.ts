import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../NavService/navigation.service';
import { timer } from 'rxjs';
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';
import { HttpService } from '../HttPService/http.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private myAge:number;
  private mobile:String;
  private myName:String;
  private patientAge:number;
  private patientName:String;
  private patientAddress:String;
  private myAddress:String;
  private notEnable: boolean;
  private code :any;
  private showSplash: boolean; 

  constructor(private navigation:NavigationService,
    private datastream: DatastreamingService,
    private editPatientService: HttpService,
    private savedata:AlertController
    ) { }

  ngOnInit() {
    this.notEnable=true;
    // this.showSplash = true;
    // timer(3000).subscribe(()=> this.showSplash = false);
    // this.patientName =this.datastream.getPatientName();
    this.patientName =this.datastream.getPatientName();
    this.patientAge =this.datastream.getPatientAge();
    this.patientAddress=this.datastream.getPatientAddress();
    this.mobile = this.datastream.getPatientMobile();
    this.code="patient1";
  
    console.log("name  "+this.patientName)
    console.log("myAge "+ this.patientAge);
    console.log("myName "+ this.myName);

  }
  backClick(){
    console.log("must navigate to patient list")
    this.navigation.navigateTo('home');

  }
 vitalClick(){
  this.navigation.navigateTo('home/vitals');

 }
 edit(){
  this.notEnable=false;
  // this.patientName="";
  // this.patientAge=null;
  // this.patientAddress="";
  // this.myAddress="";
  // this.myAge=null;
  // this.myName="";
  console.log("myAge "+ this.myAge);
  console.log("myName "+ this.myName);

 }
 
async save(name: String,age: number, address:String, token: String){
  
  const alert =this.savedata.create({
    header: 'Are you sure you want to save edits?',
    animated :true,
  
    buttons:
    
     [ {text:'Cancel',
    
     handler: async data => {
       this.patientName="";
      this.patientAge=null;
      this.patientAddress="";
      this.myName = this.datastream.getPatientName();
     this.myAge = this.datastream.getPatientAge();
     this.myAddress=this.datastream.getPatientAddress();
     this.notEnable=true;
 
     }
      },
       {
      text:'Save',
      
      handler: async data => {
         
        this.notEnable=true;
        token = this.datastream.getToken();
       console.log("myAge "+ age);
        console.log("myName "+ name);
        console.log("myAddress "+ address);
         this.editPatientService.editPatientProfile(name,age,address,token).subscribe(
       response=>{
      // this.datastream.setToken(response.token);
      console.log("http request to Change patient Data: "+ JSON.stringify(response));
      // this.datastream.changePatientData(response);
      

    }, 
    err =>
    {
      console.log('HTTP Edit profile Error: ', err.error.message);
    });

  }
      
   
  }
    
   
  ]
  });

   (await alert).present();
  }

 changeName(){
  this.patientName="";
  
 }
 changeAge(){
  this.patientAge=null;
  
 }
 changeAddress(){
  this.patientAddress="";

  
 }

}
