import { ICalendarEvent } from '../utils/mycalendarevent';
import { Injectable, EventEmitter } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs';

@Injectable()
export class EventsService  {
  eventSelected : ICalendarEvent;
  loadsIndex : number = 0;
  events : ICalendarEvent[];
  eventsLoaded: EventEmitter<boolean> = new EventEmitter();
  events$ : Observable<ICalendarEvent[]>;
  transactionStatus: string;
  constructor() { }

}
