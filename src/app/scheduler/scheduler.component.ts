import { Component, OnInit, ChangeDetectionStrategy, Input  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CalendarEvent } from 'angular-calendar';
import { map } from 'rxjs/operators/map';
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
  endOfDay
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
  events$: Observable<Array<CalendarEvent>>;
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
  constructor(private http: HttpClient) {}
  fetchEvents(){
    let params = null;
    this.events$ = this.http
      .get('https://api.themoviedb.org/3/discover/movie', { params })
      .pipe(
        map(({ results }: { results: CalendarEvent[] }) => {
          return results;
        })
      );
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }
  validateEvent( event : any ){
  
  }
   createEvent( event : any ): void {
    if( this.view == 'day'){
      let e = {};
      e.title = 'Click me to validate';
      e.color = this.colors.yellow;
      e.start =  event.date;
      e.end = addHours(event.date, 1);
      this.validateEvent(e);
      this.events.push(e);
      this.viewDate = event.date;
    }else{
      console.log('clickedDate :', this.viewDate);
      this.view = 'day';
      this.viewDate = event.day.date;
    }
  }
}

