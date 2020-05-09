import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/home/NavService/navigation.service';
import { HttpService } from 'src/app/home/HttPService/http.service';
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showSplash: boolean=false;

  constructor(
    private nav:NavigationService,
     private http: HttpService,
     private datastream : DatastreamingService,
     private men:MenuController,
     
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
       
      tokenObj=>{    
        this.showSplash = true;

         // timer
        // timer
        // timer(10000).subscribe(()=> this.showSplash = false);
        //recieveing Token For Development Only FOR NOW
        console.log("Token: ",tokenObj.token);
        this.datastream.setToken(tokenObj.token);
        this.http.editFCMToken();
        
        this.http.getDoctorUsingToken().subscribe(
            doctordata =>
            {
                that.datastream.setDoctor(doctordata.mydoctor);
                this.datastream.clearPatientList();
                doctordata.patientArrayList.forEach(element => {
                      this.datastream.addToPatientList(element);
                    }); 
      
            that.nav.navigateTo('home');
          },
          err => {
            this.showSplash = false;
             alert('HTTP Doctor Data Error: ' + err.error.message);
            
          },
          () => {
            this.showSplash = false;
            console.log('HTTP get patient data request completed.');
            console.log("patientData.doctorsArrayList: ",that.datastream.getPatientList());
            console.log("patientData.myPatient Name: ",that.datastream.getDoctorName());
            that.nav.navigateTo('home');
          }

        )
      }, 
      err =>alert('HTTP Login Error: '+ err.error.message),
      () => console.log('HTTP Login request completed.')
      
     );
   }

    backClick(){
      this.nav.navigateTo('cover');
  
    }
}
