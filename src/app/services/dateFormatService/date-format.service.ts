import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  constructor() { }

  // Monday, June 15, 2020 
  formateJSONDateToDayMonthYear(myDate)
  {

    return moment(myDate).format('dddd, MMMM DD, YYYY');  

  }
  formateDateToJSON(myDate)
  {
    let date = moment(myDate).format();
    return date.slice(0,10);
  }


  formatJSONTimetoRemoveSeconds(myTime)
  {
    var splitted = myTime.split(" ", 2); 
    let time=splitted[0].slice(0,5);
    return time + " " +splitted[1];
  }

  formatTimetoJSONADDSeconds(myTime)
  {
    var splitted = myTime.split(" ", 2); 
    return splitted[0]+":00" +" "+ splitted[1];
  }
  
  
  formatTime24(time) {
    return moment(time).format('HH:mm');
  }

  getTime(time)
  {
    return moment(time).format();
  }
  convertTime12to24(time12h)  {
    let [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}:${minutes}`;
  }

  formatAMPM(time) {
    return moment(time).format('hh:mm A');  

	  // var hours = date[0];
	  // var minutes = date[1];
	  // var ampm = hours >= 12 ? 'PM' : 'AM';
	  // hours = hours % 12;
	  // hours = hours ? hours : 12;
	  // minutes = minutes < 10 ? '0'+minutes : minutes;
	  // var strTime = hours + ':' + minutes + ' ' + ampm;
	  // return strTime;
}
returnStringDescripingCurrentSituation(time,num)
{
  let now = new Date();

  time= new Date(this.getTime(now.toJSON().slice(0,10)+" "+time));

  // let hours = time.getHours();
  // let nowHours = now.getHours();

  // get total seconds between the times

  var delta = Math.abs(now.getTime() - time.getTime()) / 1000;

  var sign = Math.sign(now.getTime() - time.getTime());

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;



  if(Math.abs(hours)<num)
  {
    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    // delta -= minutes * 60;
    if(minutes<10)
    {
      return "0"+hours+":0"+minutes+(sign<0? ' left': ' passed');

    }
    return "0"+hours+":"+minutes+(sign<0? ' left': ' passed');
  }
  return null;
  // // what's left is seconds
  // var seconds = delta % 60;  
  
  console.log(hours);
  console.log(minutes);
  console.log('');
}
OldReturnStringDescripingCurrentSituation(time,num)
{
  time= new Date(this.getTime("2020-06-01 "+time))
  let now = new Date();
 
  let hours = time.getHours();
  let nowHours = now.getHours();

  if(Math.abs(nowHours-hours)<num)
  {
    let minutes = time.getMinutes()
    let nowMinutes = now.getMinutes();
   
    return "0"+Math.abs(nowHours-hours)+":"+Math.abs(nowMinutes-minutes)+(nowHours-hours<0? ' left': ' passed');
  }
  return null;
}
compareDate(date1, date2): number
{
  
  // With Date object we can compare dates them using the >, <, <= or >=.
  // The ==, !=, ===, and !== operators require to use date.getTime(),
  // so we need to create a new instance of Date with 'new Date()'
  let d1 =  moment(date1).format();;
  let d2 =  moment(date2).format();;

  // console.log(d1);
  // console.log(d2);
  // console.log(" ");
  // Check if the dates are equal
  let same = d1=== d2;
  if (same) return 0;

  // Check if the first is greater than second
  if (d1 > d2) return 1;
 
  // Check if the first is less than second
  if (d1 < d2) return -1;
}
}
