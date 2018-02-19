import { Component, OnInit, ChangeDetectionStrategy, Input  } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent  {
  view:  'week';

  viewDate: Date = new Date();
  clickedDate: Date;
  events: CalendarEvent[] = [ 
    {
      title: 'Click me',
      color: colors.yellow,
      start: new Date()
    },
    {
      title: 'Or click me',
      color: colors.blue,
      start: this.getDateFromToday(1)
    }
  ];
  getDateFromToday( inc : number ){
    var temp = new Date();
    temp.setDate(temp.getDate() + inc );
    return temp;
  }
  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

}

export const colors: any = {
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
};
