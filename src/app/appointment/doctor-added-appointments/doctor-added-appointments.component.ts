import { Component } from '@angular/core';
import { InteractionService } from 'src/app/services/datacommunication/interaction.service';
import { NavigationService } from 'src/app/home/NavService/navigation.service';
import { HttpService } from 'src/app/home/HttPService/http.service';

@Component({
  selector: 'app-added-appointments',
  templateUrl: './doctor-added-appointments.component.html',
  styleUrls: ['./doctor-added-appointments.component.scss'],
})
export class DoctorAddedAppointmentsComponent  {

  cards;
  dates;

  constructor(
    private communication: InteractionService, 
    private navigate: NavigationService, 
    private http: HttpService
  ) { 
  }
ionViewDidEnter()
{
  this.cards = [];
  this.dates =[];
  let that = this;
  this.communication.observableForScheduleIds.subscribe(
      (ids)=> { 
      ids.forEach(id => {
        if(this.dates.some(id => id.id === id)){
          console.log("Object found inside the dates.");
  
      } else{
  
                 this.dates.push(id.date);


  
      }

          that.http.getSlotsAfterDoctorPostApps(id.id,id.date).subscribe(
            (appointmentSlots)=>{
              that.cards.push(appointmentSlots);
          },
          (error)=>{
            console.log("Error: " , error);
          },
          ()=>{
            console.log("cards: ", this.cards);
            console.log(JSON.stringify(this.cards));

          });

      });
      });  
  }

  close()
  {
    this.navigate.navigateTo('/home')
  }
}
