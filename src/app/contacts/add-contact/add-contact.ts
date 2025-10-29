import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { FbService } from '../../services/fb-service';
import { IContact } from  '../../interfaces/i-contact';

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
    this.addContact();
    this.created.emit();
    this.closeOverlay();
  }

  /** Prüft ob der erste Buchstabe eines Namens klein geschrieben ist */
  hasInvalidCapitalization(name: string | undefined): boolean {
    if (!name || name.length === 0) {
      return false; // Leer ist kein Kapitalisierungsfehler
    }
    return name.charAt(0) !== name.charAt(0).toUpperCase();
  }

  /** Erweiterte Email-Validierung: Domain gefolgt von Punkt und Top-Level-Domain */
  hasInvalidEmailFormat(email: string | undefined): boolean {
    if (!email || email.length === 0) {
      return false; // Leer ist kein Format-Fehler (wird durch required behandelt)
    }
    
    // Prüfe ob Email mit Punkt endet
    if (email.endsWith('.')) {
      return true;
    }
    
    // Erweiterte Regex: mindestens 1 Zeichen vor @, dann @, dann Domain (min. 2 Buchstaben), dann Punkt, dann TLD (min. 2 Buchstaben)
    const emailRegex = /^[^\s@]+@[^\s@]{1,}\.[a-zA-Z]{2,}$/;
    return !emailRegex.test(email);
  }

  /** Phone-Validierung: Muss numerisch sein, mindestens 6 Ziffern, optional + am Anfang */
  hasInvalidPhoneFormat(phone: string | undefined): boolean {
    if (!phone || phone.length === 0) {
      return false; // Leer ist kein Format-Fehler (Phone ist optional)
    }
    
    // Regex: Optional + am Anfang, dann mindestens 6 Ziffern
    const phoneRegex = /^\+?[0-9]{6,}$/;
    return !phoneRegex.test(phone);
  }

  /** Schließt bei Klick auf dunklen Hintergrund */
  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeOverlay();
    }
  }

  /** Prüft ob das gesamte Formular gültig ist, inkl. custom phone validation */
  isFormValid(form: any): boolean {
    // Standard Form-Validierung
    if (form.invalid) {
      return false;
    }
    
    // Custom Phone-Validierung
    if (this.hasInvalidPhoneFormat(this.contact.phone)) {
      return false;
    }
    
    // Custom Name/Surname-Kapitalisierung
    if (this.hasInvalidCapitalization(this.contact.name) || 
        this.hasInvalidCapitalization(this.contact.surname)) {
      return false;
    }
    
    // Custom Email-Format
    if (this.hasInvalidEmailFormat(this.contact.email)) {
      return false;
    }
    
    return true;
  }
}
