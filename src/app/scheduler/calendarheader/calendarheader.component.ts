import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mwl-demo-utils-calendar-header',
  templateUrl: './calendarheader.component.html',
  styleUrls: ['./calendarheader.component.css']
})
export class CalendarheaderComponent {
@Input() view: string;

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

}
