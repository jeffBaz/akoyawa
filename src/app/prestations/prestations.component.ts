import { EventsService } from '../services/events.service';
import { Prestation } from '../utils/panier';
import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-prestations',
  templateUrl: './prestations.component.html',
  styleUrls: ['./prestations.component.scss']
})
export class PrestationsComponent implements OnInit {

  prestation: Prestation;
  success:boolean = false;
  modalTitle:string='Informations:';
  modalMsg:string='Sélectionner une date puis un créneau horaire.';
  msgValidationPrestation:string = "Choisissez un créneau"
  selectedId: string = '';
  fullMode: boolean = false;
  @Input() prestationsInput : Prestation;
 
  isPanierEmpty: boolean = true;
  modalRef: BsModalRef;
  mode:string ;
  addToCart:string ="assets/images/cart.png";
  
  constructor(private eventService:EventsService, private router:Router, private modalService: BsModalService) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.addToCart = "assets/images/cart.png";
    if(this.prestationsInput ){
      this.prestation = this.prestationsInput;
      this.mode="panier";
    }else{
      this.prestation = this.eventService.selectedPrestation;
      this.mode="catalogue";
    }
    this.eventService.prestationLoaded.subscribe((bool)=>{this.selectedId='';
     this.modalTitle='Informations:';
        if(this.eventService.panier && this.eventService.panier.prestation.length>0){
          this.isPanierEmpty = false;
        }
       this.success=true;
     
    });
   
  }
  addPanier(prestation, template){
    if(!this.eventService.panier) this.eventService.panier = {'prestation':[]};
      this.selectedId=prestation.idPrestation;
      this.eventService.selectedPrestation = Object.assign({}, prestation) ;
     /*this.modalTitle='Informations:';
   
     if(this.eventService.panier && this.eventService.panier.prestation.length==0){
       this.modalMsg='Sélectionner une date puis un créneau horaire';
       this.openModal(template);
    }*/
  }
  suivant(){
     this.router.navigate(['calendar']);
  }
  
  removeFromPanier(prestation:Prestation){
    this.eventService.remove(prestation);
  }

}
