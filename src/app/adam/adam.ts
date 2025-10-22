import { Component, inject } from '@angular/core';
import { FbService } from '../services/fb-service';

@Component({
  selector: 'app-adam',
  imports: [],
  templateUrl: './adam.html',
  styleUrl: './adam.scss'
})
export class Adam {
  db = inject(FbService).db;

  constructor(public fbService: FbService) {
  }

  getContacts() {    
    return this.fbService.contacts;
  }

  getData() {
    return this.fbService.data;
  }


}
