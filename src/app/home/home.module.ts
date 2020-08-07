import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ActionSheetController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { NavigationService } from './NavService/navigation.service';
import { HttpService } from './HttPService/http.service';
import { HttpClientModule } from '@angular/common/http';
import { TabComponent } from './tab/tab.component';
import { FabComponent } from './fab/fab.component';
import { ProfileComponent } from './profile/profile.component';
import { PatientListComponent } from './patientList/patient-list.component';
import { MessageComponent } from './message/message.component';
import { ChatComponent } from './chat/chat.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { ConvListComponent } from './conv-list/conv-list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AutosizeModule } from 'ngx-autosize';
import {PatientProfileComponent} from "./patient-profile/patient-profile.component";
import {NetworkService} from "../services/Network/network.service";
import { VideoComponent } from '../appointment/video/video.component';
import { DoctorSlotComponent } from '../appointment/doctor-slots/doctor-slot.component';
import { DoctorScheduleComponent } from '../appointment/doctor-schedule/doctor-schedule-1.component';
import { DoctorAppointmentsComponent } from '../appointment/doctor-appointments/doctor-appointments.component';
import { DoctorAddedAppointmentsComponent } from '../appointment/doctor-added-appointments/doctor-added-appointments.component';
import { DoctorAddAppointmentComponent } from '../appointment/doctor-add-appointment/doctor-add-appointment.component';
import { InteractionService } from '../services/datacommunication/interaction.service';

import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    AutosizeModule,
    RouterModule.forChild([
    
      
      {
        path:'doctorList',

        component: PatientListComponent

      }, 
      {
        path:'profile',
        component:ProfileComponent
      } ,   
      {
        path: '',
        component: HomePage
      },
      {
        path: 'message',
        component: MessageComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      } 
      ,
      {
        path: 'schedule',
        component: ScheduleComponent
      } 
      ,
      {
        path: 'conversation',
        component: ConversationsComponent,
        children:[
          {
            path: '',
            component: ConvListComponent
          }
         ]  
      },
      {
        path:'patient-profile',
        component:PatientProfileComponent
      },
      {
        path:'video/:id', 
        component:VideoComponent
      },
      {
        path:'doctor-slots', 
        component:DoctorSlotComponent
      },
      {
        path:'doctor-schedule-1', 
        component:DoctorScheduleComponent
      },
      {
        path:'doctor-appointment', 
        component:DoctorAppointmentsComponent
      },
      {
        path:'doctor-added-appointment', 
        component:DoctorAddedAppointmentsComponent
      },
      {
        path:'doctor-schedule/add-appointment', 
        component:DoctorAddAppointmentComponent
      } , 
      

    ])
  ],
  providers: [
    NavigationService,
    HttpService,
    NetworkService,
    InteractionService,
    DatePicker,
    NavigationService,
    ActionSheetController,
    AndroidPermissions,

  ],
  declarations: [HomePage,
    PatientListComponent,
    TabComponent,
    FabComponent,
    ProfileComponent,
    MessageComponent,
    ChatComponent,
    ConversationsComponent,
    ConvListComponent,
    ScheduleComponent,
    PatientProfileComponent,
    VideoComponent,
    DoctorAppointmentsComponent,
    DoctorScheduleComponent,
    DoctorSlotComponent,
    DoctorAddAppointmentComponent, 
    DoctorAddedAppointmentsComponent,
  
  ]
})
export class HomePageModule {}
