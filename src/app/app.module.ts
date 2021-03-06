import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { AppComponent } from './app.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { CalendarheaderComponent } from './scheduler/calendarheader/calendarheader.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDialogModule, MatDialog , MatDialogRef , MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from './../environments/environment';
import { EventformComponent } from './eventform/eventform.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { EventsService } from './services/events.service';
import { RouterModule, Routes } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { PrestationsComponent } from './prestations/prestations.component';
import { PrestatairesComponent } from './prestataires/prestataires.component';
import { HeaderComponent } from './header/header.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome/dist';
import { ModalModule } from 'ngx-bootstrap';




export const firebaseConfig = {
      apiKey: 'AIzaSyB8efztwXl-AKhdQKqfdpbqSwmNtrpnulo',
      authDomain: 'akoyawa-a05c3.firebaseapp.com',
      databaseURL: 'https://akoyawa-a05c3.firebaseio.com',
      projectId: 'akoyawa-a05c3',
      storageBucket: '',
      messagingSenderId: '380558604887'
};
const appRoutes: Routes = [
  { path: 'calendar', component: SchedulerComponent },
  { path: 'prestations', component: PrestatairesComponent },
  { path: 'prestation', component: PrestationsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'rdv',      component: EventformComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: ErrorComponent }
];

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    SchedulerComponent,
    CalendarheaderComponent,
    DialogComponent,
    EventformComponent,
    ErrorComponent,
    HomeComponent,
    PrestationsComponent,
    PrestatairesComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ModalModule.forRoot(), 
    CalendarModule.forRoot() , 
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
    // other imports here 
  ],
  providers: [HttpClientModule,{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}, EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
