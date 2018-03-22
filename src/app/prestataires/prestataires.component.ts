import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Panier, Prestation, Prestataire } from '../utils/panier';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
@Component({
  selector: 'app-prestataires',
  templateUrl: './prestataires.component.html',
  styleUrls: ['./prestataires.component.scss']
})
export class PrestatairesComponent implements OnInit {
  prestations: Prestation[] ;
  modalTitle:string='Informations:';
  modalMsg:string='Sélectionner une date puis un créneau horaire.';
  msgValidationPrestation:string = "Choisissez un créneau"
  selectedId: string = '';
  fullMode: boolean = false;
  @Input() prestationsInput : Prestation[];
  @ViewChild("template") private modal: TemplateRef<any>;
  isPanierEmpty: boolean = true;
  modalRef: BsModalRef;
  mode:string 
  constructor(private eventService:EventsService, private router:Router, private modalService: BsModalService) { }

  ngOnInit() {
    if(this.prestationsInput && this.prestationsInput.length>0){
      this.prestations = this.prestationsInput;
      this.mode="panier";
    }else{
    	this.prestations = this.eventService.prestations;
      this.mode="catalogue";
    }
    this.eventService.prestationLoaded.subscribe((bool)=>{this.selectedId='';
     this.modalTitle='Informations:';
        if(this.eventService.panier && this.eventService.panier.prestation.length>0){
          this.isPanierEmpty = false;
          this.modalMsg='Votre sélection a été ajouté à votre panier. Continuer vos achats ou passer directement au paiement.';
        }
       
        if(this.eventService.panier.prestation.length<=1){
          this.openModal(this.modal);
        }     
    
    });
    this.eventService.errorMsg.subscribe((errorMsg)=>{
      this.modalTitle = "Erreur:"; 
      this.modalMsg = errorMsg;
      this.openModal(this.modal);
    });
  }
  addPanier(prestation, template){
    if(!this.eventService.panier) this.eventService.panier = {'prestation':[]};
    this.selectedId=prestation.idPrestation;
    this.eventService.selectedPrestation = Object.assign({}, prestation) ;
     this.modalTitle='Informations:';
   
     if(this.eventService.panier && this.eventService.panier.prestation.length==0){
       this.modalMsg='Sélectionner une date puis un créneau horaire';
       this.openModal(template);
    }
  }
  suivant(){
  	 this.router.navigate(['calendar']);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  removeFromPanier(prestation:Prestation){
    this.eventService.remove(prestation);
  }
}
