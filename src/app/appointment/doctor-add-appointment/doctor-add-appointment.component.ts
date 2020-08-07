import { Component, OnInit } from '@angular/core';
// import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ActionSheetController } from '@ionic/angular';
import { NavigationService } from 'src/app/home/NavService/navigation.service';
import { HttpService } from 'src/app/home/HttPService/http.service';
import { InteractionService } from 'src/app/services/datacommunication/interaction.service';
import { DateFormatService } from 'src/app/services/dateFormatService/date-format.service';
import { addAappointment } from 'src/app/model/doctor/appointmnet';
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';


@Component({
  selector: 'app-doctor-add-appointment',
  templateUrl: './doctor-add-appointment.component.html',
  styleUrls: ['./doctor-add-appointment.component.scss'],
})
export class DoctorAddAppointmentComponent  {


cards;
today;
  constructor(
    private data : DatastreamingService,
    public actionSheetController: ActionSheetController,
    private navigate: NavigationService,
    private http: HttpService,
    private comm: InteractionService,
    private format: DateFormatService) { 

      this.doctor = this.data.doctor;
      this.today = new Date().toJSON();
    }
    

    ionViewDidEnter()
    {
      this.cards=new Array<addAappointment>();
      this.oneMore();

    }

    oneMore()
    {
      console.log(this.today);
      let card = new addAappointment(this.today,15,"2020-06-30T10:00:00.544Z",
                                                   "2020-06-30T11:00:00.544Z"
      ,null);
      this.cards.push(card);
    }
  
    doctor;
    close(card)
    {
      console.log("index:: " ,this.cards.indexOf(card));
      this.cards = this.cards.slice(this.cards.indexOf(card),1); 
    }
    
  async presentActionSheet() {
  
   
    const actionSheet = await this.actionSheetController.create({
      header: 'Are you sure? ',
      cssClass: 'my-custom-class',
      buttons: [
      {
        text: 'Yes',
        icon: 'happy-outline',
        handler: () => {        
        let cards = this.createAcopyOfCardsObject();
        this.addappointment(cards);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  
  createAcopyOfCardsObject(){
    let cards=[];
   
          this.cards.forEach(card => {
            let newcard = new addAappointment( 
              card.date.slice(0,10),
              card.slot_duration,
              this.format.formatTimetoJSONADDSeconds(this.format.formatAMPM(card.start_time)),
              this.format.formatTimetoJSONADDSeconds(this.format.formatAMPM(card.end_time)), 
              this.data.doctor.doctor_id
                            );
           cards.push(newcard);
          });
       
        return cards;
  }
  // click()
  // {
  //    this.datePicker.show({
  //   date: new Date(),
  //   mode: 'date',
  //   androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
  // }).then(
  //   date => console.log('Got date: ', date),
  //   err => console.log('Error occurred while getting date: ', err)
  // );
  // }
  



  addappointment(cards)
  {
    let scheduleIds =[];
    console.log(JSON.stringify(cards));
    this.http.postDoctorAppointmnets(cards).subscribe(
    (scheduleId)=>
      {
        scheduleIds.push(scheduleId);
      },
    async (error)=>
      {
        console.log("Error: ", error);        
        

      },
    ()=>
      {
        console.log(scheduleIds); 
        this.comm.sendScheduleIds(scheduleIds);
        // this.navigate.navigateTo('/home/doctor-appointment');
        this.navigate.navigateTo('/home/doctor-added-appointment')
      });
  }

}
