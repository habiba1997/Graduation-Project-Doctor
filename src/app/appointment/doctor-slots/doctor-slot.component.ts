import { Component } from '@angular/core';
import { HttpService } from 'src/app/home/HttPService/http.service';
import { NavigationService } from 'src/app/home/NavService/navigation.service';
import { InteractionService } from 'src/app/services/datacommunication/interaction.service';
import { DateFormatService } from 'src/app/services/dateFormatService/date-format.service';
import { doctor_appointment } from 'src/app/model/doctor/doctor_appointment';

@Component({
  selector: 'app-doctor-slot',
  templateUrl: './doctor-slot.component.html',
  styleUrls: ['./doctor-slot.component.scss'],
})

export class DoctorSlotComponent {
  appointments=[];
  toggleState=true;
  array:Array<any>=[];
  num:number=2;
  today;
  constructor(
      private http :HttpService,
      public navigate: NavigationService,
      private comm: InteractionService,
      private format: DateFormatService) {

         }

    
  async ionViewWillEnter()
  {
    this.today= this.format.formateJSONDateToDayMonthYear(new Date().toJSON().slice(0,10)); 
    this.array=[];
    this.appointments=[];
    var that = this;
    this.comm.observableForAppointment.subscribe(
      (app: doctor_appointment)=>{

          this.http.getDoctorAppointmentSLots(app.id, app.date, app.slot_duration).subscribe(
            (appointment)=>{
              console.log(appointment)
              let app = JSON.parse(JSON.stringify(appointment));
              app.date = this.format.formateJSONDateToDayMonthYear(app.date);
              that.array.push(app);
            },(error)=>{
              console.log("error: ", error);
              this.navigate.navigateTo('/home/doctor-schedule-1');
            },
            ()=>
            {
              this.appointments = this.array;        
            this.tabClick(this.num);
            });

      },
      (error)=>{
        this.navigate.navigateTo('/home/doctor-schedule-1');
      },
      ()=>{

      }
    )
    
   
  }

  checkOnSoon(booked,date, time)
  {
    if(booked && date==this.today)
    {    
      return this.format.returnStringDescripingCurrentSituation(time,3);
    }  
    return null;
  }
 
  sendAndNavigate(app)
  {
    this.comm.sendAppointment(app);
    this.navigate.navigateTo('/home/doctor-appointment')
  }  
  
  checkIfEqualToday(num)
  {
    if(this.num==num) return true;
    else return false;
  }
  tabClick(num)
  {
    this.num=num;
    this.getAppointments(num);
  }

  getAppointments(num)
  {   
    this.appointments=[];

    this.array.forEach(element => {
      if(this.switch(num,element.booked))
      {
        this.appointments.push(element);
      }
    });
  }
  switch(num,booked)
  {
    switch(num) { 
      case 2: { 
         return true;
      } 
      case 1: { 
        return booked; 
     } 
     case 0: { 
       return !booked; 
   } 
      default: { 
         break; 
      } 
   } 
  }

  toggleContent(event)
  {
    this.toggleState = event;
  }

  
}
