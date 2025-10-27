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
  @Output() close = new EventEmitter<void>();     // Overlay schließen
  @Output() created = new EventEmitter<void>();   // Toast triggern (Parent)

  db = inject(FbService).db;
  contact: IContact = {} as IContact;
  id = 0;

  constructor(public fbService: FbService) {}

  /** Kontakt speichern */
  addContact() {
    this.fbService.addContact(this.contact);
    console.log('Contact added:', this.contact);
    this.clearInput();
  }

  /** Formularfelder zurücksetzen */
  clearInput() {
    this.contact.name = '';
    this.contact.surname = '';
    this.contact.email = '';
    this.contact.phone = '';
  }

  /** Overlay schließen */
  closeOverlay() {
    this.close.emit();
  }

  /** Submit-Handler für Create Contact Button */
  onSubmit() {
    if (this.contact.name && this.contact.email) {
      this.addContact();

      // Parent informieren → Toast anzeigen
      this.created.emit();

      // Overlay schließen
      this.closeOverlay();
    } else {
      console.warn('Name und Email sind Pflichtfelder');
    }
  }

  /** Schließt bei Klick auf dunklen Hintergrund */
  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeOverlay();
    }
  }
}
