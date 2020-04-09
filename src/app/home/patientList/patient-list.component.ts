import { Component, OnInit } from '@angular/core';
// import { IDoctor } from '../DataModels';
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';
import { NavigationService } from '../NavService/navigation.service';
import { patientData } from 'src/app/model/patientData';
import { HttpService } from '../HttPService/http.service';
import { AlertController} from '@ionic/angular';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  patientArrayList=new Array<patientData>();
  patientRow = new Array<patientData>();


  constructor(private datastream : DatastreamingService, 
    private navigation : NavigationService, 
    private addController : AlertController,
    private http: HttpService
    ) {
      // this.patientRow = this.datastream.getPatientList();      
     } 
  ngOnInit(){}
  ionViewWillEnter() {
    let that = this;
    let token = this.datastream.getToken();
    this.http.getPatientList(token)
    .subscribe(
      async response=>{
        this.datastream.clearPatientList();
        await response.forEach(element => {
          this.datastream.addToPatientList(element);
        }); 
        this.patientRow = this.datastream.getPatientList();
        this.patientArrayList = this.patientRow;
        console.log("patient list ",this.patientRow);
                        
      }, 
      err =>
      { let errorMessage ="";
        if(err.error.message==null)
        {
          errorMessage   = "Error in Connection";
        }
        else{
          errorMessage=err.error.message;
        }
        console.log('HTTP Patient List Error: ', errorMessage);
        this.presentAlert('HTTP Error: ',errorMessage);
      },
      () => 
      {
        this.datastream.savePatientListToDataStore();
        console.log('HTTP request completed.');
      }
    );



  }


  initializeList(){
    this.patientArrayList = this.patientRow;
  }

  filterList(event) {  
    this.initializeList();

    const searchTerm = event.srcElement.value;
  
    if (!searchTerm) { //if the user didn't input anything
      return;
    }
  
    this.patientArrayList = this.patientArrayList.filter(currentGoal => {
      if (currentGoal.name && searchTerm) {
        if (currentGoal.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  backClick(){
    this.navigation.navigateTo('home');

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
}
