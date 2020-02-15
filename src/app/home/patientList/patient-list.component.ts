import { Component, OnInit } from '@angular/core';
// import { IDoctor } from '../DataModels';
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';
import { NavigationService } from '../NavService/navigation.service';
import { patientData } from 'src/app/model/patientData';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {

  patientRow = new Array<patientData>();
  constructor(private datastream : DatastreamingService, private navigation : NavigationService
    ) {
      this.patientRow = this.datastream.getPatientList();      
     } 
  ngOnInit() {}
  backClick(){
    this.navigation.navigateTo('home');

  }
}
