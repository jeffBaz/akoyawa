import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { AppComponent } from './app.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { CalendarheaderComponent } from './scheduler/calendarheader/calendarheader.component';



@NgModule({
  declarations: [
    AppComponent,
    SchedulerComponent,
    CalendarheaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot() 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
