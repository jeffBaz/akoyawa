import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Router } from '@angular/router';
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
      opacity: '0'
    })),
    
    transition('show <=> hide', animate('2000ms ease-in')),
    //transition('hide => show', animate('1000ms ease-out'))
  ])
]
})
export class HomeComponent implements OnInit {
  logoPath= '/assets/images/logo.png';
   @Input() toggleLogo : string;
   @Input() toggleLoader : string;
  constructor(private router:Router) { }

  ngOnInit() {
    this.toggleLogo = 'hide';
    this.toggleLoader = 'show';
    setTimeout(()=>{    //<<<---    using ()=> syntax
        this.toggleLogo = 'show';
        this.toggleLoader = 'hide';
     },500);
    
    
  }
  loaderHidden(e){
    console.log(e);
    if(e.element.id == "logo" && e.toState=='show'){
       this.router.navigate(['/calendar']);
    }
  }
}
