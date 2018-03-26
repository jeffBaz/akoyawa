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
  prestations: Prestation[]=[
  {"idPrestation":"aojijfoij1","prestataire":{"idPrestataire":"aojijfoij1",  "nom":"Prestion", "prenom":"Martine"},"titre":"Massage","url":"https://as1.ftcdn.net/jpg/00/60/75/22/500_F_60752241_VgPMb2KqBwnEtU9PbF35uekSm3TUvCdG.jpg", "duree":2, "desc":"Massage de deux heures", "prix":25, "datePrestation":null},
  {"idPrestation":"aojijfoij2","prestataire":{"idPrestataire":"aojijfoij2",  "nom":"Prestion", "prenom":"Martine"},"titre":"Massage AKO","url":"https://as2.ftcdn.net/jpg/01/29/18/49/500_F_129184958_888q2jBjRjCIkhKKbBmeyfDkpt9HXsmW.jpg", "duree":3, "desc":"Massage AKO de 3 heures", "prix":60, "datePrestation":null},
  {"idPrestation":"aojijfoij6","prestataire":{"idPrestataire":"aojijfoij6",  "nom":"Prestion", "prenom":"Martine"},"titre":"Massage Zen","url":"https://as2.ftcdn.net/jpg/00/68/55/21/500_F_68552198_hyhj1EowLuRVKU795q2H28SVv9yyX0h4.jpg", "duree":2, "desc":"Massage Zen de deux heures", "prix":35, "datePrestation":null},
  {"idPrestation":"aojijfoij3","prestataire":{"idPrestataire":"aojijfoij3",  "nom":"Prestion", "prenom":"Martine"},"titre":"Spa Ako","url":"https://as1.ftcdn.net/jpg/01/49/75/84/500_F_149758419_PyuLgOCvyakGBGFdYpfsdq7Oa39mbKVq.jpg", "duree":1, "desc":"Spa de 1 heures", "prix":40, "datePrestation":null},
  {"idPrestation":"aojijfoij7","prestataire":{"idPrestataire":"aojijfoij7",  "nom":"Prestion", "prenom":"Martine"},"titre":"Soins visages Ako","url":"https://t4.ftcdn.net/jpg/00/56/81/71/240_F_56817152_FZgTN3yPu68zE9LEQwgTzs4Ew0Ep7WwD.jpg", "duree":1, "desc":"Soins visages Ako", "prix":14.5, "datePrestation":null},
  {"idPrestation":"aojijfoij4","prestataire":{"idPrestataire":"aojijfoij4",  "nom":"Prestion", "prenom":"Martine"},"titre":"Coiffure","url":"https://t4.ftcdn.net/jpg/01/01/75/99/240_F_101759983_umTprjVtO6sJb8fn4lHPMnMi5WXjUoeE.jpg", "duree":1, "desc":"Coiffure", "prix":14.5, "datePrestation":null},
 {"idPrestation":"aojijfoij5","prestataire":{"idPrestataire":"aojijfoij5",  "nom":"Prestion", "prenom":"Martine"},"titre":"Manucure/Pédicure","url":"https://t4.ftcdn.net/jpg/00/56/63/53/240_F_56635333_ewHg0dF8TpvoixM1gAkBBc5m1HpFnJjI.jpg", "duree":1, "desc":"Manucure/Pédicure", "prix":25, "datePrestation":null}];
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
      prest.codeValidation = this.eventSelected.codeValidation;
      this.panier.prestation.push(prest);
      this.prestationLoaded.emit(true);
    }else{
      this.errorMsg.emit("Aucune prestation n'a été sélectionné.");
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
  remove(prestation: Prestation){
     let idx = this.panier.prestation.indexOf(prestation);
     if (idx != -1) this.panier.prestation.splice(idx, 1);
     if(prestation.datePrestation){
      for(let event of this.events){
        if (event.start.getTime() == prestation.datePrestation.getTime() && event.codeValidation == prestation.codeValidation){
          let indx = this.events.indexOf(event);
          this.events.splice(indx, 1);
        }
      }
     }
     this.prestationLoaded.emit(false);
  }
  reset(){
    this.panier = {"prestation":[]};
     this.prestationLoaded.emit(true);
  }
}
