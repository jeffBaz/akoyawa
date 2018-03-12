import { EventsService } from '../services/events.service';
import { ICalendarEvent } from '../utils/mycalendarevent';
import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { AngularFireDatabase } from 'angularfire2/database';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventform',
  templateUrl: './eventform.component.html',
  styleUrls: ['./eventform.component.css'],
   animations: [
  trigger('toggleState', [
    state('show', style({
      opacity: '1'
    })),
    state('hide',   style({
      opacity: '0',
      display:'none'
    })),
    
    transition('show <=> hide', animate('500ms ease-in')),
    //transition('hide => show', animate('1000ms ease-out'))
  ])
]
})
export class EventformComponent implements OnInit {
  event : ICalendarEvent;
  transactionStatus: string;
  toggleForm: String;
  toggleSuccess: String;
   logoPath= '/assets/images/spaakoyawa_logoh_1.png';
  
  constructor(private router:Router, private eventsService: EventsService, private db: AngularFireDatabase) { }

  ngOnInit() {
    if(this.eventsService.loadsIndex==0){
      this.router.navigate(['/']);
   }
    this.toggleSuccess='hide';
    this.toggleForm='show';
    this.event = this.eventsService.eventSelected;
  }

   onSubmit() {
     let database = this.db;
     let eventToInsert = this.event;
     let _this = this;
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_niEgiR12PfJwRB5D9yvwKIGw',
      locale: 'auto',
      token: function (token: any) {
        console.log(token);
        database.list('/events').push(eventToInsert);
        _this.transactionStatus = "success";
        _this.toggleSuccess='show';
        _this.toggleForm='hide';
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