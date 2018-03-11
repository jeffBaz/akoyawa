import { EventsService } from './services/events.service';
import { ICalendarEvent } from './utils/mycalendarevent';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    console.log("loading...");
    this.eventService.events$ = this.db.list('/events').valueChanges() as Observable<ICalendarEvent[]>; 
    this.eventService.events$.subscribe((queriedItems: ICalendarEvent[])=> {
        queriedItems.forEach(function (value : ICalendarEvent) {
          let stDate = new Date();
          stDate.setTime(value.startTime);
          let endDate = new Date();
          endDate.setTime(value.endTime);
          value.end = endDate;
          value.start = stDate;
         
        });
      this.eventService.events = [...queriedItems];
      this.eventService.loadsIndex++;
      console.log("loaded");
      });
  }
  
  constructor(private eventService:EventsService,  private db: AngularFireDatabase) { }

  title = 'app';
 
}
