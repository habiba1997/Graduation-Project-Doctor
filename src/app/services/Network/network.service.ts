import {Injectable, OnDestroy} from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NetworkService implements OnDestroy {
  private disconnectSubscription:Subscription;
  private connectSubscription:Subscription;
  private NetworkState:Boolean;



  constructor(private network: Network){

    this.NetworkSubscription();
  }
  NetworkStateSetter(state:Boolean){
    this.NetworkState=state;
    console.log("Network State",this.NetworkState);
  }
  NetworkStateGetter():Boolean{
    return this.NetworkState;
  }

  NetworkSubscription(){
    console.log("network check subscription");
    // watch network for a disconnection
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.NetworkStateSetter(false);
    });
// watch network for a connection
    this.connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.NetworkStateSetter(true);
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

  }

  Unsubscribe(){
    console.log("network check Unsubscription");

    // stop connect watch
    this.connectSubscription.unsubscribe();

    // stop disconnect watch
    this.disconnectSubscription.unsubscribe();

  }

  networkCheck():Boolean{
    console.log("network check");
    console.log("network state in service",this.NetworkState);
    return this.NetworkState;



  }

  ngOnDestroy(): void {
    this.Unsubscribe();
  }
}

