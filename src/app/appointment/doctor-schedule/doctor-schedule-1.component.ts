import { Component, OnInit } from '@angular/core';

import { ActionSheetController } from '@ionic/angular';
import { HttpService } from 'src/app/home/HttPService/http.service';
import { NavigationService } from 'src/app/home/NavService/navigation.service';
import { InteractionService } from 'src/app/services/datacommunication/interaction.service';
import { DateFormatService } from 'src/app/services/dateFormatService/date-format.service';

@Component({
  selector: 'app-doctor-schedule-1',
  templateUrl: './doctor-schedule-1.component.html',
  styleUrls: ['./doctor-schedule-1.component.scss'],
})
export class DoctorScheduleComponent {
  appointments;
  // toggleState=true;
  array:Array<any>=[];
  num:number=0;
  today;
  constructor(
      private http :HttpService,
      public navigate: NavigationService,
      public actionSheetController: ActionSheetController,
      private comm: InteractionService,
      private format: DateFormatService
      ) {

    }


    
  async ionViewWillEnter()
  {
    this.today= this.format.formateJSONDateToDayMonthYear(new Date().toJSON().slice(0,10));    
    this.array=[];
    this.appointments=[];
    var that = this;

    
    await this.http.getDoctorSchedule().subscribe((appointment)=>{
        that.array.push(appointment);
    },(error)=>{
      console.log("error: ", error);
    },
    ()=>
    {
      this.appointments = this.array;
      this.tabClick(this.num);  
     
    });

  
  }
  checkIfEqualToday(num)
  {
    if(this.num==num) return true;
    else return false;
  }

  sendAndNavigate(app)
  {
    this.comm.sendAppointment(app);
    this.navigate.navigateTo('/home/doctor-slots')
  }
  tabClick(num)
  {
    this.num=num;
    this.getAppointmentsOfTheDay(num);
  }

  getAppointmentsOfTheDay(num)
  {   
    this.appointments=[];

    this.array.forEach(element => {
      if(this.switch(num,element.date))
      {
        this.appointments.push(element);
      }
    });
  }

  checkOnSoon(date, time)
  {
    if(date==this.today)
    {
      return this.format.returnStringDescripingCurrentSituation(time,3);
    }  
    return null;
  }
  switch(num,date)
  {
    let mynum = this.format.compareDate(this.today, date);
    return num == mynum;
  }
 
  
  
}
