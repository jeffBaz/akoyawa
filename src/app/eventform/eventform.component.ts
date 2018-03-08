import { EventsService } from '../services/events.service';
import { ICalendarEvent } from '../utils/mycalendarevent';
import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-eventform',
  templateUrl: './eventform.component.html',
  providers: [ EventsService ],
  styleUrls: ['./eventform.component.css']
})
export class EventformComponent implements OnInit {
  event : ICalendarEvent;
  constructor( private eventsService: EventsService) { }

  ngOnInit() {
    this.event = this.eventsService.eventSelected;
  }

  onSubmit(){
    
  }
}
