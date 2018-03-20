import { EventsService } from '../services/events.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  miniLogoSrc: string ="assets/images/logo.png";
  cartImgSrc:  string ="assets/images/cart.png";
  nbArticle:number=0;
  view='month';
  locale: string = 'fr';
  viewDate: Date = new Date();
  isCalendarDisplayed:boolean =false;
  constructor(private eventService:EventsService) { }

  ngOnInit() {
    this.eventService.prestationLoaded.subscribe(bool=>{
      if(bool){
        this.nbArticle = this.eventService.panier.prestation.length;
      }
    });
   
  }

}
