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
  private mobile:String;
  private myName:String;
  private experience : number;
  private doctorName:String;
  private notEnable: boolean;
  private code :any;
  private showSplash: boolean; 

  constructor(private navigation:NavigationService,
    private datastream: DatastreamingService,
    private editProfileDoctor: HttpService,
    private savedata:AlertController
    ) { }

  ngOnInit() {
    this.notEnable=true;
    // this.showSplash = true;
    // timer(3000).subscribe(()=> this.showSplash = false);
    // this.patientName =this.datastream.getPatientName();
    this.doctorName =this.datastream.getDoctorName();
    this.experience =this.datastream.getDoctorYearsOfExperience();
    this.mobile = this.datastream.getDoctorMobile();
    this.code="doctor1";
  
    console.log("name  "+this.doctorName)
    console.log("myAge "+ this.experience);

  }
  backClick(){
    this.navigation.navigateTo('home');

  }

 edit(){
  this.notEnable=false;
  // this.patientName="";
  // this.patientAge=null;
  // this.patientAddress="";
  // this.myAddress="";
  // this.myAge=null;
  // this.myName="";
  // console.log("myAge "+ this.myAge);
  console.log("myName "+ this.myName);

 }
 
async save(name: String,yearsExperience:number, token: String){
  
  const alert =this.savedata.create({
    header: 'Are you sure you want to save edits?',
    animated :true,
  
    buttons:
    
     [ {text:'Cancel',
    
     handler: async data => {
       this.doctorName="";
      this.myName = this.datastream.getDoctorName();
     this.experience = this.datastream.getDoctorYearsOfExperience();
     this.notEnable=true;
 
     }
      },
       {
      text:'Save',
      
      handler: async data => {
         
        this.notEnable=true;
        token = this.datastream.getToken();
      //  console.log("myAge "+ age);
      //   console.log("myName "+ name);
      //   console.log("myAddress "+ address);
         this.editProfileDoctor.editDoctorProfile(name,yearsExperience,token).subscribe(
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
  this.doctorName="";
  
 }
 changeExperience(){
  this.experience=null;
  
 }

}
