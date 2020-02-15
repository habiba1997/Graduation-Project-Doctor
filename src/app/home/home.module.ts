import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
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


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild([
    
      
      {
        path:'doctorList',
        component: PatientListComponent

      }, 
      {
        path:'Myprofile',
        component:ProfileComponent
      } ,   
      {
        path: '',
        component: HomePage
      },
      {
        path: 'message',
        component: MessageComponent
      }

      
    ])
  ],
  providers: [
    NavigationService,
    HttpService, 
  ],
  declarations: [HomePage,PatientListComponent,TabComponent,FabComponent,ProfileComponent,MessageComponent]
})
export class HomePageModule {}
