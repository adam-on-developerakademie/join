import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FbService } from '../services/fb-service';
import { IContact } from '../interfaces/i-contact';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-contact.html',     
  styleUrls: ['./add-contact.scss']      
})
export class AddContactComponent {
  @Output() close = new EventEmitter<void>();
  //@Output() contactAdded = new EventEmitter<any>();

  db = inject(FbService).db;
  contact: IContact = {} as IContact;
  id: number = 0;

  constructor(public fbService: FbService) {
  }

    addContact() {
    this.fbService.addContact(this.contact);
    console.log(this.contact);
    this.clearInput();
  }

  clearInput() {
    this.contact.name = "";
    this.contact.surname = "";
    this.contact.email = "";
    this.contact.phone = "";
  }


  closeOverlay() {  // ← Hier von onClose() zu closeOverlay() ändern
    this.close.emit();
  }

  onSubmit() {
    if (this.contact.name && this.contact.email) {
      // this.contactAdded.emit(this.contact);
      this.addContact()
      this.closeOverlay();  // ← Hier auch ändern
    }
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeOverlay();  // ← Hier auch ändern
    }
  }
}