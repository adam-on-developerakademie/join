// auf contact-edit-desktop umstellen

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IContact } from '../../interfaces/i-contact';
import { FbService } from '../../services/fb-service';

@Component({
selector: 'app-contact-edit-desktop',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './contact-edit-desktop.html',
styleUrls: ['./contact-edit-desktop.scss']
})

export class ContactEditDesktopComponent {
constructor(private fbService: FbService) { this.getCurrentContact() }

contact: IContact = { name: '', surname: '', email: '', phone: '' };
editedContact: IContact = { ...this.contact };

onClose() {
this.fbService.showEditContact = false;
}

delContact() {
this.fbService.contactsArray.length > 0 && this.fbService.contactsGroups.length > 0 &&
this.fbService.contactsArray.length > this.fbService.id ? this.fbService.delContact(this.fbService.id) : null;
this.fbService.showEditContact = false;
}

async upContact() {
if (!this.editedContact.name || !this.editedContact.surname || !this.editedContact.email) {
alert('Please fill in all required fields: Name, Surname, and Email.');
return;
} else {
await this.fbService.updateContact(this.fbService.id, this.editedContact);
this.fbService.showEditContact = false;
}
}

getCurrentContact() {
this.editedContact = { ...this.fbService.currentContact };
return this.editedContact;
}

getShowEditContact() {
return this.fbService.showEditContact;
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

/** Prüft ob das gesamte Formular gültig ist, inkl. custom phone validation */
isFormValid(form: any): boolean {
// Standard Form-Validierung
if (form.invalid) {
return false;
}

// Custom Phone-Validierung
if (this.hasInvalidPhoneFormat(this.editedContact.phone)) {
return false;
}

// Custom Name/Surname-Kapitalisierung
if (this.hasInvalidCapitalization(this.editedContact.name) ||
this.hasInvalidCapitalization(this.editedContact.surname)) {
return false;
}

// Custom Email-Format
if (this.hasInvalidEmailFormat(this.editedContact.email)) {
return false;
}

return true;
}
}