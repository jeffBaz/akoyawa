import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Injectable()
export class EventsService {
  eventSelected : CalendarEvent;
  constructor() { }

}
