import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Panier, Prestation, Prestataire } from '../utils/panier';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-prestataires',
  templateUrl: './prestataires.component.html',
  styleUrls: ['./prestataires.component.scss']
})
export class PrestatairesComponent implements OnInit {
  prestations: Prestation[] ;
  success:boolean = false;
  modalTitle:string='Informations:';
  modalMsg:string='Sélectionner une date puis un créneau horaire.';
  msgValidationPrestation:string = "Choisissez un créneau"
  selectedId: string = '';
  fullMode: boolean = false;
  @Input() prestationsInput : Prestation[];
  @ViewChild("template") private modal: TemplateRef<any>;
  isPanierEmpty: boolean = true;
  modalRef: BsModalRef;
  mode:string ;
  addToCart:string ="assets/images/cart.png";
  @Input() fixedSquared:string='false';
  constructor(private eventService:EventsService, private router:Router, private modalService: BsModalService) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.addToCart = "assets/images/cart.png";
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
        }
       this.success=true;
      setTimeout(()=>{
        this.success=false;
      }, 2000);
    
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
  showPrestation(prestation : Prestation){
      this.eventService.selectedPrestation = prestation;
      this.router.navigate(['/prestation']);
  }
}
