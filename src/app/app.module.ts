import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpService } from './home/HttPService/http.service';
import { DatastreamingService } from './services/datastream/datastreaming.service';
import { DatastorageService } from './services/datastorage/datastorage.service';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';
import { FCM } from '@ionic-native/fcm/ngx';
import { HttpClientModule } from '@angular/common/http';
import { Network } from '@ionic-native/network/ngx';
import { Camera } from 'node_modules/@ionic-native/camera/ngx';
import { File } from 'node_modules/@ionic-native/file/ngx';
import { WebView } from 'node_modules/@ionic-native/ionic-webview/ngx';
import { FilePath } from 'node_modules/@ionic-native/file-path/ngx';
import {MediaCapture} from "@ionic-native/media-capture/ngx";



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    HttpService,
    DatastreamingService,
    DatastorageService,
    FCM,
    HttpService,
    Camera,
    File,
    WebView,
    FilePath,
    Network,
    MediaCapture,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
