import { Component, OnInit,ViewChild } from '@angular/core';
import { NavigationService } from '../NavService/navigation.service';
import { timer } from 'rxjs';
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';
import { HttpService } from '../HttPService/http.service';
import {AlertController, IonContent, IonSegment} from '@ionic/angular';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private mobile:String;
  private myName:String;
  private doctorName:String;
  private years_experience:number;
  private myYears:number;
  private notEnable: boolean;
  private code :any;
  private showSplash: boolean;
  private FreeTimes:number[]=[0,1,2,4,5,6,7,8];
  public showLeftButton: boolean;
  public showRightButton: boolean;
  @ViewChild(IonSegment,{static:false}) ionSegment: IonSegment;
  constructor(private navigation:NavigationService,
    private datastream: DatastreamingService,
    private editPatientService: HttpService,
    private savedata:AlertController


) {
      console.log(this.FreeTimes);

  }

  ngOnInit() {
    this.notEnable=true;

    this.doctorName =this.datastream.getDoctorName();
   
    this.years_experience=this.datastream.getDoctorYearsOfExperience();
    this.mobile = this.datastream.getDoctorMobile();
    this.code="patient1";
  
    console.log("name  "+this.doctorName)
    console.log("myName "+ this.myName);

  }
  backClick(){
    console.log("must navigate to patient list")
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
  console.log("Years "+ this.myYears);
  console.log("myName "+ this.myName);

 }
 
async save(name: String, years_experience:number){
  
  const alert =this.savedata.create({
    header: 'Are you sure you want to save edits?',
    animated :true,
  
    buttons:
    
     [ {text:'Cancel',
    
     handler: async data => {
       this.doctorName="";
      this.years_experience=null;
      this.myName = this.datastream.getDoctorName();
     this.myYears=this.datastream.getDoctorYearsOfExperience();
     this.notEnable=true;
 
     }
      },
       {
      text:'Save',
      
      handler: async data => {
         
        this.notEnable=true;
        const token = this.datastream.getToken();
        console.log("myName "+ name);
        console.log("myYears "+ years_experience);
      
    this.editPatientService.editDoctorProfile(name,years_experience,token).subscribe(
       response=>{
      // this.datastream.setToken(response.token);
      console.log("http request to Change patient Data: "+ JSON.stringify(response));
      this.datastream.changeDoctorData(name,years_experience);
      

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

 changeExp(){
  this.years_experience=null;

  
 }
    // Method that shows the next slide
    public slideNext(): void {
        console.log("scrolling value ",this.ionSegment.value);
    }

    // Method that shows the previous slide
    public slidePrev(): void {
        this.ionSegment.scrollable.valueOf()
    }

}
