import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../NavService/navigation.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {

  constructor(private navigation:NavigationService) { }

  ngOnInit() {}
  // vitalClick(){
  //   this.navigation.navigateTo('home/vitals');

  // }
  homeClick(){
    this.navigation.navigateTo('home');

  }
  dlistClick(){
    this.navigation.navigateTo('home/profile');

  }
  tlistClick(){
    this.navigation.navigateTo('home/patient');
    console.log("trainer list")
  }


}
