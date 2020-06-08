import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private _router: Router,
    private route : ActivatedRoute,
    private addController: AlertController,
    ) { }
    
  navigateTo(path:string)
    {
        this._router.navigate([path])
        .then(() => console.log("navigated to " + path))
        .catch(err => 
          {
            console.log("error navigating to "+path +" + err");
            this.presentAlert('Navigation Error: ', err);


        });
    }

    
       async presentAlert(subtitleString:string,messageString:string) {
      const alert = await this.addController.create({
        header: 'ERROR',
        subHeader: subtitleString,
        message: messageString,
        buttons: ['OK']
      });
  
      await alert.present();
    }

    
}
