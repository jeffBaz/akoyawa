import { EventsService } from '../services/events.service';
import { Panier } from '../utils/panier';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  miniLogoSrc: string ="assets/images/logo.png";
  cartImgSrc:  string ="assets/images/cart.png";
  cart: Panier = null; 
  nbArticle:number=0;
  view='month';
  locale: string = 'fr';
  viewDate: Date = new Date();
  isCalendarDisplayed:boolean =false;
  @ViewChild("panier") private modal: TemplateRef<any>;
  modalRef: BsModalRef;
  
  constructor(private eventService:EventsService, private modalService: BsModalService) { }
  openModal(template: TemplateRef<any>) {
    if(this.cart && this.cart.prestation && this.cart.prestation.length>0){
      this.modalRef = this.modalService.show(template);
    }else{
      this.eventService.errorMsg.emit("Votre panier est vide. Veuillez sélectionnez des produits.")
    }
  }
  ngOnInit() {
     this.eventService.prestationLoaded.subscribe(bool=>{
        this.cart = this.eventService.panier;
        this.nbArticle = this.eventService.panier.prestation.length;
    });
   
  }

}
