import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Panier, Prestation, Prestataire } from '../utils/panier';
import { Router } from '@angular/router';
@Component({
  selector: 'app-prestataires',
  templateUrl: './prestataires.component.html',
  styleUrls: ['./prestataires.component.scss']
})
export class PrestatairesComponent implements OnInit {
  prestations: Prestation[] ;
  isPanierEmpty: boolean = true;
  constructor(private eventService:EventsService, private router:Router) { }

  ngOnInit() {
  	this.prestations = this.eventService.prestations;
    this.eventService.prestationLoaded.subscribe((bool)=>{this.isPanierEmpty=false;});
  }
  addPanier(prestation){
   	this.eventService.addPrestationToPanier(prestation);
  }
  suivant(){
  	 this.router.navigate(['calendar']);
  }
}
