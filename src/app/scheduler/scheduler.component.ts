import { DialogComponent } from '../dialog/dialog.component';
import { EventsService } from '../services/events.service';
import { ICalendarEvent } from '../utils/mycalendarevent';
import { Component, OnInit, ChangeDetectionStrategy, Input,  ViewChild,
  TemplateRef, ElementRef, ViewEncapsulation  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CalendarEvent,CalendarEventAction, CalendarDateFormatter,
  DAYS_OF_WEEK,
  CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';
import { map } from 'rxjs/operators/map';
import { AngularFireDatabase } from 'angularfire2/database'; 
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import * as _ from 'lodash';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { CustomDateFormatter } from '../utils/customdateformatter';
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
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ],
  styleUrls: ['./scheduler.component.css'],
   encapsulation: ViewEncapsulation.None,
 animations: [
  trigger('toggleState', [
    state('show', style({
      opacity: '1'
    })),
    state('hide',   style({
      opacity: '0'
    })),
    
    transition('show <=> hide', animate('500ms ease-in')),
    //transition('hide => show', animate('1000ms ease-out'))
  ])
 ]
})
export class SchedulerComponent implements OnInit {
  view = 'month';
  
  refresh: Subject<any> = new Subject();
  @Input() toggleCalendar: string;
  viewDate: Date = new Date();
  smallscreen: boolean = false;
  clickedDate: Date;
  locale: string = 'fr';
  eventsFromFb: Observable<Array<any>>;
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#f5f5f5'
    },
    blueAko: {
      primary: '#4da7d9',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  }
  
 filteredEvents: ICalendarEvent[] = []; 
  filters = {};
  allEvents: Observable<Array<ICalendarEvent<any>>>;
  events: ICalendarEvent[] = [];
  excludeDays: number[] = [0];
  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    var yesterday = new Date();

    yesterday.setDate(new Date().getDate() - 1);
    body.forEach(day => {
      if (day.date.getTime()<yesterday.getTime()) {
        day.cssClass = 'odd-cell';
      }
       if(day.events.length>=12){
          day.cssClass = 'full-cell';
       }
    });
  }
 ngOnInit(): void {
   this.eventsService.displayCalendarHeader();
   if(this.elRef.nativeElement.clientWidth<= 400){
     this.smallscreen = true;
   }
  /* if(this.eventsService.loadsIndex==0){
      this.router.navigate(['/']);
   }*/
 
   this.toggleCalendar = 'show';
   this.events = this.eventsService.events;
   this.eventsService.eventsLoaded.subscribe((e)=>{
     
     if(e){
      this.events = this.eventsService.events;
      this.refresh.next();
     }
   
   });
  // this.fetchEvents();
   //this.refresh.subscribe(value => {console.log(value)});
   /* setTimeout(()=>{    //<<<---    using ()=> syntax
        this.toggleCalendar = 'show';
     },3000);*/
    
  }
  
  constructor(private http: HttpClient, private db: AngularFireDatabase, private eventsService: EventsService, private router: Router, private elRef: ElementRef ) {}
  
  fetchEvents(){
  this.eventsService.events$.subscribe((queriedItems: ICalendarEvent[])=> {
        this.events = [];
        queriedItems.forEach(function (value : ICalendarEvent) {
          let stDate = new Date();
          stDate.setTime(value.startTime);
          let endDate = new Date();
          endDate.setTime(value.endTime);
          value.end = endDate;
          value.start = stDate;
         
        });
         this.events = [...queriedItems];
         this.refresh.next();
       
      });
  }

  eventClicked({ event }: { event: ICalendarEvent }): void {
    console.log('Event clicked', event);
  }
  validateEvent( eventDate : ICalendarEvent ){
    return this.db.list('/events').valueChanges();
  }
   applyFilters( ){
     console.log(this.events);
     this.filteredEvents = _.filter(this.events, _.conforms(this.filters) );
   
   }
  
   filterDateStartBefore(property: string, rule: any) {
    this.filters['start'] = val => val > rule;
    this.applyFilters();
  }
     
  isAvailable(event: ICalendarEvent, valueTime: number) {
   return event.startTime;
  }
  
   createEvent( event : any ): void {
      var yesterday = new Date();

    yesterday.setDate(new Date().getDate() - 1);
    if( this.view == 'day'){
      let e: ICalendarEvent<any> = {
      title : this.eventsService.selectedPrestation.titre,
      color : this.colors.blueAko,
      start :  event.date,
      startTime :  event.date.getTime(),
      end : addHours(event.date, 1),
      endTime : addHours(event.date, 1).getTime()
      }
      this.eventsFromFb = this.validateEvent(e);
            // subscribe to changes
      this.filteredEvents = _.filter(this.eventsService.events, function(o) {
        let flag = o.startTime<=e.startTime && o.endTime>e.startTime ;
         return  flag;
      });
      if (this.filteredEvents.length == 0) {
        this.viewDate = event.date;
        this.eventsService.eventSelected = e;
        this.eventsService.events.push(e);
        this.events=[...this.eventsService.events];
        this.refresh.next();
        setTimeout(()=>{    //<<<---    using ()=> syntax
         this.eventsService.addPrestationToPanier();
       },1500);
        //this.router.navigate(['/rdv']);
        //this.db.list('/events').push(e);
        
        
      }else{
        this.eventsService.errorMsg.emit("Ce créneau est déja réservé. Veuillez en sélectionner un autre.")
      }
       
     
    }else if (event.day.date.getTime()>=yesterday.getTime()) {
      if(event.day.events.length<12){
        console.log('clickedDate :', this.viewDate);
        this.view = 'day';
        this.viewDate = event.day.date;
      }else{
        this.eventsService.errorMsg.emit("Désolé, cette journée est maleureusement complète.")
      }
    }
  }

  skipWeekends(direction: 'back' | 'forward'): void {
    if (this.view === 'day') {
      if (direction === 'back') {
        while (this.excludeDays.indexOf(this.viewDate.getDay()) > -1) {
          this.viewDate = subDays(this.viewDate, 1);
        }
      } else if (direction === 'forward') {
        while (this.excludeDays.indexOf(this.viewDate.getDay()) > -1) {
          this.viewDate = addDays(this.viewDate, 1);
        }
      }
    }
  }
}


