import { EventsService } from '../services/events.service';
import { ICalendarEvent } from '../utils/mycalendarevent';
import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-eventform',
  templateUrl: './eventform.component.html',
  styleUrls: ['./eventform.component.css']
})
export class EventformComponent implements OnInit {
  event : ICalendarEvent;
  constructor( private eventsService: EventsService,private db: AngularFireDatabase) { }

  ngOnInit() {
    this.event = this.eventsService.eventSelected;
  }

   onSubmit() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_niEgiR12PfJwRB5D9yvwKIGw',
      locale: 'auto',
      token: function (token: any) {
        console.log(token);
        this.db.list('/events').push(this.event);
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: 2000
    });

  }

  
}
