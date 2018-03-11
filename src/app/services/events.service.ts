import { ICalendarEvent } from '../utils/mycalendarevent';
import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs';

@Injectable()
export class EventsService  {
  eventSelected : ICalendarEvent;
  loadsIndex : number = 0;
  events : ICalendarEvent[];
  events$ : Observable<ICalendarEvent[]>;
  
  constructor() { }

}
