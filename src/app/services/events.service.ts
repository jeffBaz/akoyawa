import { ICalendarEvent } from '../utils/mycalendarevent';
import { Panier, Prestation, Prestataire } from '../utils/panier';
import { Injectable, EventEmitter } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs';

@Injectable()
export class EventsService  {
  eventSelected: ICalendarEvent;
  panier: Panier;
   selectedPrestation: Prestation;
  prestations: Prestation[]=[{"idPrestation":"aojijfoij1","prestataire":{"idPrestataire":"aojijfoij1",  "nom":"Prestion", "prenom":"Martine"},"titre":"Massage", "duree":2, "desc":"massage de deux heures", "prix":14.5, "datePrestation":new Date()}]/*,
  {"idPrestation":"aojijfoij2","prestataire":{"idPrestataire":"aojijfoij2",  "nom":"Prestion", "prenom":"Martine"},"titre":"Massage", "desc":"massage de 3 heures", "prix":14.5, "datePrestation":new Date()},{"idPrestation":"aojijfoij6","prestataire":{"idPrestataire":"aojijfoij6",  "nom":"Prestion", "prenom":"Martine"},"titre":"Massage", "desc":"massage de deux heures", "prix":14.5, "datePrestation":new Date()},
  {"idPrestation":"aojijfoij3","prestataire":{"idPrestataire":"aojijfoij3",  "nom":"Prestion", "prenom":"Martine"},"titre":"Massage", "desc":"massage de 3 heures", "prix":14.5, "datePrestation":new Date()},{"idPrestation":"aojijfoij7","prestataire":{"idPrestataire":"aojijfoij7",  "nom":"Prestion", "prenom":"Martine"},"titre":"Massage", "desc":"massage de deux heures", "prix":14.5, "datePrestation":new Date()},
  {"idPrestation":"aojijfoij4","prestataire":{"idPrestataire":"aojijfoij4",  "nom":"Prestion", "prenom":"Martine"},"titre":"Massage", "desc":"massage de 3 heures", "prix":14.5, "datePrestation":new Date()},
 {"idPrestation":"aojijfoij5","prestataire":{"idPrestataire":"aojijfoij5",  "nom":"Prestion", "prenom":"Martine"},"titre":"Massage", "desc":"massage de 3 heures", "prix":14.5, "datePrestation":new Date()}];*/
  loadsIndex: number = 0;
  events: ICalendarEvent[];
  isCalendarDisplayed: boolean = false;
  calendarDisplayed: EventEmitter<boolean> = new EventEmitter();
  eventsLoaded: EventEmitter<boolean> = new EventEmitter();
  prestationLoaded: EventEmitter<boolean> = new EventEmitter();
  errorMsg: EventEmitter<string> = new EventEmitter();
  events$ : Observable<ICalendarEvent[]>;
  transactionStatus: string;
  constructor() { }
  addPrestationToPanier(prest?:Prestation){
    if(!this.panier){
      let panier = {"prestation":[]};
      this.panier = panier;
    }
    if(prest==null)prest = this.selectedPrestation;
    if(prest){
      prest.datePrestation = this.eventSelected.start;
      this.panier.prestation.push(prest);
      this.prestationLoaded.emit(true);
    }else{
      this.errorMsg.emit("Aucune prestation n'a été sélectionnée.");
    }
  }
  displayCalendarHeader(){
     this.isCalendarDisplayed = true;
    this.calendarDisplayed.emit( this.isCalendarDisplayed );
  }
  hideCalendarHeader(){
     this.isCalendarDisplayed = false;
    this.calendarDisplayed.emit( this.isCalendarDisplayed);
   
  }
}
