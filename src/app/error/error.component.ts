import { EventsService } from '../services/events.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
modalTitle:string;
  modalMsg:string;
  modalRef: BsModalRef;
   @ViewChild("template") private modal: TemplateRef<any>;
  constructor(private eventService:EventsService,private modalService: BsModalService) { }

  ngOnInit() {
    
    this.eventService.errorMsg.subscribe((errorMsg)=>{
      this.modalTitle = "Erreur:"; 
      this.modalMsg = errorMsg;
      this.openModal(this.modal);
    });
  }
   openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  } 
}
