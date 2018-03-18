import { ICalendarEvent } from '../utils/mycalendarevent';
import { Panier, Prestation, Prestataire } from '../utils/panier';
import { Injectable, EventEmitter } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs';

@Injectable()
export class EventsService  {
  eventSelected : ICalendarEvent;
  panier: Panier;
  prestations : Prestation[]=[{"prestataire":{"idPrestataire":"aojijfoij",  "nom":"Prestion", "prenom":"Martine"},"titre":"Massage", "desc":"massage de deux heures", "prix":14.5, "datePrestation":new Date()},
  {"prestataire":{"idPrestataire":"aojijfoij",  "nom":"Prestion", "prenom":"Martine"},"titre":"Massage", "desc":"massage de 3 heures", "prix":14.5, "datePrestation":new Date()},{"prestataire":{"idPrestataire":"aojijfoij",  "nom":"Prestion", "prenom":"Martine"},"titre":"Massage", "desc":"massage de deux heures", "prix":14.5, "datePrestation":new Date()},
  {"prestataire":{"idPrestataire":"aojijfoij",  "nom":"Prestion", "prenom":"Martine"},"titre":"Massage", "desc":"massage de 3 heures", "prix":14.5, "datePrestation":new Date()},{"prestataire":{"idPrestataire":"aojijfoij",  "nom":"Prestion", "prenom":"Martine"},"titre":"Massage", "desc":"massage de deux heures", "prix":14.5, "datePrestation":new Date()},
  {"prestataire":{"idPrestataire":"aojijfoij",  "nom":"Prestion", "prenom":"Martine"},"titre":"Massage", "desc":"massage de 3 heures", "prix":14.5, "datePrestation":new Date()}];
  loadsIndex : number = 0;
  events : ICalendarEvent[];
  eventsLoaded: EventEmitter<boolean> = new EventEmitter();
  prestationLoaded: EventEmitter<boolean> = new EventEmitter();
  events$ : Observable<ICalendarEvent[]>;
  transactionStatus: string;
  constructor() { }
  addPrestationToPanier(prest:Prestation){
    if(!this.panier){
      let panier = {"prestation":[]};
      this.panier = panier;
    }
    this.panier.prestation.push(prest);
    this.prestationLoaded.emit(true);
  }
}
