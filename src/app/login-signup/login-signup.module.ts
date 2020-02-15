
import { CoverComponent } from './cover/cover.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../home/NavService/navigation.service';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../home/HttPService/http.service';
import { FCM } from '@ionic-native/fcm/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild([
    
      {
        path: 'cover',
        component: CoverComponent
      },
      {
        path: '',
        component: CoverComponent
      },
      {
        path:'login',
        component:LoginComponent

      },
     
    ])
  ],

  providers: [
    NavigationService,
    HttpService,
    FCM,
  ],
  declarations: [CoverComponent,LoginComponent]
})
export class LoginSignupModule { }
