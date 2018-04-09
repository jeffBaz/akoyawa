import { EventsService } from '../services/events.service';
import { Prestation } from '../utils/panier';
import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
  trigger('toggleState', [
    state('show', style({
      opacity: '1'
    })),
    state('hide',   style({
      opacity: '0',
      display:'none'
    })),
    
    transition('show <=> hide', animate('2000ms ease-in')),
    //transition('hide => show', animate('1000ms ease-out'))
  ])
]
})
export class HomeComponent implements OnInit {
  logoPath= '/assets/images/logo.png';
  logo2Path= '/assets/images/spaakoyawa_logoh_1.png';
   @Input() toggleLogo : string;
   @Input() toggleLoader : string;
  constructor(private router:Router,  private db: AngularFireDatabase,private eventsService: EventsService) { }

  ngOnInit() {
    let $this = this;
     this.db.list('/prestations').valueChanges().subscribe((prestations:Prestation[]) =>{
      console.log("import Prestations");
      $this.eventsService.prestations = [];
        prestations.forEach(function (value : Prestation) {
          console.log("waiting for loading... index: " + value);
          $this.eventsService.prestations.push(value);
        });
        this.toggleLoader = 'hide';
    });
    this.toggleLogo = 'hide';
     this.toggleLoader = 'show';
     this.eventsService.events$.subscribe(()=>{
        while(this.eventsService.loadsIndex==0){
          console.log("waiting for loading... index: "+ this.eventsService.loadsIndex);
        }
       
     });
    /*setTimeout(()=>{    //<<<---    using ()=> syntax
       
        this.toggleLoader = 'hide';
     },500);*/
    
    
  }
  loaderHidden(e){
    console.log(e);
    if(e.element.id == "preloader" && e.toState=='hide'){
      this.toggleLogo = 'show';// this.router.navigate(['/calendar']);
    }
    
  }
  
  start(){
     this.router.navigate(['calendar']);
    }
    
}
