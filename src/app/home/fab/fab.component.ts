import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../NavService/navigation.service';
import {DatastreamingService} from "../../services/datastream/datastreaming.service";

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
})
export class FabComponent implements OnInit {

  constructor(private navigation:NavigationService,    private datastream : DatastreamingService,) { }

  ngOnInit() {}
  // vitalClick(){
  //   this.navigation.navigateTo('home/vitals');

  // }
  homeClick(){
    this.navigation.navigateTo('home/Myprofile');

  }
  dlistClick(){
    this.navigation.navigateTo('home/profile');

  }
  tlistClick(){
    this.navigation.navigateTo('home/profile');
    console.log("trainer list")
  }

  outClick(){
    this.datastream.clearData();
    this.navigation.navigateTo('cover');
    console.log("trainer list")
  }
  
}
