import { Component } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { patientData } from 'src/app/model/patientData';
import { InteractionService } from 'src/app/services/datacommunication/interaction.service';
import { DateFormatService } from 'src/app/services/dateFormatService/date-format.service';
import { NavigationService } from 'src/app/home/NavService/navigation.service';
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';


@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.scss'],
})
export class DoctorAppointmentsComponent  {

  appointment ;
  patient: patientData;
  today;
  
  constructor(
    private communication: InteractionService, 
    private route : ActivatedRoute,
    private format: DateFormatService,
    private data: DatastreamingService,
    private router: Router,
    private navigate: NavigationService
  ) { 
  }
ionViewDidEnter()
{
  let that = this;
      this.today= this.format.formateJSONDateToDayMonthYear(new Date().toJSON().slice(0,10));
          this.communication.observableForAppointment.subscribe(
          (app)=> { 
          that.appointment = app;
          console.log(that.appointment.patient);
          that.timeLeft=that.format.returnStringDescripingCurrentSituation(
                that.appointment.start_time,1);
          });      
  
  }
  video()
  {
    this.data.appointment= this.appointment;
    this.router.navigate(['home/video', 1]);
  }
  audio()
  {
    this.data.appointment= this.appointment;
    this.router.navigate(['home/video', 2]);
  }

  isdisabled(time)
  {
    if(this.timeLeft)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

timeLeft;

isToday(booked,date)
{

  return booked && date == this.today;
}


close()
{
  this.navigate.navigateTo('/home')
}



}
