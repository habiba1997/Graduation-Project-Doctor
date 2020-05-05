import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  FunctionCaller=new EventEmitter<number>();
  Subscribtion:Subscription;
  constructor() { }
  OnComponentCall(state){
    this.FunctionCaller.emit(state);
  }
}

