import { DialogComponent } from '../dialog/dialog.component';
import { Component, OnInit, ChangeDetectionStrategy, Input  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CalendarEvent } from 'angular-calendar';
import { map } from 'rxjs/operators/map';
import { AngularFireDatabase } from 'angularfire2/database'; 
import {
  addHours,
  subMonths,
  addMonths,
  addDays,
  addWeeks,
  subDays,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import { Subject, Observable } from 'rxjs';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent  {
  view = 'week';
  viewDate: Date = new Date();
  clickedDate: Date;
  eventsFromFb: Observable<Array<CalendarEvent>>;
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  }
 ngOnInit(): void {
    this.fetchEvents();
  }

  events: CalendarEvent[] = [ 
   /* {
      title: 'Click me',
      color: colors.yellow,
      start: new Date()
    },
    {
      title: 'Or click me',
      color: colors.blue,
      start: addDays(new Date(), 1)
    }*/
  ];
  constructor(private http: HttpClient, private db: AngularFireDatabase) {}
  fetchEvents(){
    
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }
  validateEvent( eventDate : CalendarEvent ){
  return this.db.list('/events', ref => ref.startAt(eventDate.start.getTime()).endAt(eventDate.end.getTime())).valueChanges();
  }
   createEvent( event : any ): void {
    if( this.view == 'day'){
      let e: CalendarEvent<any> = {
      title :  "Event " + Math.random,
      color : this.colors.yellow,
      start :  event.date,
      end : addHours(event.date, 1)
      }
      this.eventsFromFb = this.validateEvent(e);
            // subscribe to changes
      this.eventsFromFb.subscribe((queriedItems)=> {
              if(queriedItems.length==0){
                this.db.list('/events').push({e});
                this.events.push(e);
                this.viewDate = event.date;
                
              }else{
                alert("Ce créneau est pris veuillez en sélectionner un autre");
              }
       });
     
    }else{
      console.log('clickedDate :', this.viewDate);
      this.view = 'day';
      this.viewDate = event.day.date;
    }
  }
}

