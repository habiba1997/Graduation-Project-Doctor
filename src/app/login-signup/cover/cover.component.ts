import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/home/NavService/navigation.service';
import { DatastorageService } from 'src/app/services/datastorage/datastorage.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
})
export class CoverComponent implements OnInit {

  constructor(
    private men:MenuController,
    private nav:NavigationService,

  ){
  }

  ngOnInit() {
    this.men.enable(false);
  }
  
 
  login()
  {
    this.nav.navigateTo('/cover/login');
  }

}
