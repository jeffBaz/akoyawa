import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Panier, Prestation, Prestataire } from '../utils/panier';
@Component({
  selector: 'app-prestataires',
  templateUrl: './prestataires.component.html',
  styleUrls: ['./prestataires.component.scss']
})
export class PrestatairesComponent implements OnInit {
  prestations: Prestation[] ;
  constructor(private eventService:EventsService) { }

  ngOnInit() {
  	this.prestations = this.eventService.prestations;
  
  }
  addPanier(prestation){
   if(!this.eventService.panier){
   	let panier = {"prestation":[]};
   	this.eventService.panier = panier;
   	this.eventService.panier.prestation=[prestation];
   }else{
    this.eventService.panier.prestation.push(prestation); 
   }
  }
  suivant(){
  	 this.router.navigate(['calendar']);
  }
}
