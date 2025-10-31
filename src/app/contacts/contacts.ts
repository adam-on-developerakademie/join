import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FbService } from '../services/fb-service';
import { IContact } from '../interfaces/i-contact';
import { AddContactComponent } from './add-contact/add-contact';
import { ContactEditDesktopComponent } from './contact-edit-desktop/contact-edit-desktop';
import { ContactCreatedToast } from './contact-created-toast/contact-created-toast';

import { ContactEditMobileComponent } from './contact-edit-mobile/contact-edit-mobile';
import { ContactEditActivationComponent } from './contact-edit-activation/contact-edit-activation';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AddContactComponent,
    ContactEditDesktopComponent,   // Desktop-Edit
    ContactEditMobileComponent,   // Mobile-Edit
    ContactCreatedToast,
    ContactEditActivationComponent          // Mobile-Contact-Edit-Activation (Overlay)
  ],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.scss']
})
export class Contacts {
  topbarTitle = 'Kanban Project Management Tool';

  contact: IContact = {} as IContact;
  id = 0;

  showAddContact = false;
  toastOpen = false;
  private toastTimer?: ReturnType<typeof setTimeout>;

  /** Index des ausgewählten Kontakts für die mobile Karte */
  selectedContactIndex: number | null = null;

  /** Desktop-Edit / Mobile-Edit Overlays */
  editContactOpen = false;
  editContact2Open = false;

  /** Responsive-Schalter: true = Mobile */
  isMobile = window.innerWidth <= 950;

  constructor(public fbService: FbService) {}

  // ========= Responsive =========
  @HostListener('window:resize')
  onResize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 950;
    // Wenn von Mobile → Desktop gewechselt: mobile Overlays schließen
    if (wasMobile && !this.isMobile) {
      this.selectedContactIndex = null;
      this.editContact2Open = false;
    }
  }

  // ========= Daten =========
  getContactsGroups() { return this.fbService.contactsGroups; }
  getContacts()       { return this.fbService.contactsArray; }
  getData()           { return this.fbService.data; }

  // ========= Add =========
  addContact() {
    this.fbService.addContact(this.contact);
    this.clearInput();
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastOpen = true;
    this.toastTimer = setTimeout(() => (this.toastOpen = false), 800);
  }

  upContact() {
    this.fbService.updateContact(this.id, this.contact);
    this.clearInput();
  }

  delContact() {
    if (this.fbService.contactsArray.length > this.id) {
      this.fbService.delContact(this.id);
    }
  }

  clearInput() {
    this.contact.name = '';
    this.contact.surname = '';
    this.contact.email = '';
    this.contact.phone = '';
  }

  // ========= Add-Overlay =========
  showContactOverlay() { this.showAddContact = !this.showAddContact; }
  onCloseOverlay()     { this.showAddContact = false; }
  onContactCreated() {
    this.showAddContact = false;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastOpen = true;
    this.toastTimer = setTimeout(() => (this.toastOpen = false), 2000);
  }

  // ========= Kontakt-Auswahl =========
  showContact(index: number) {
    this.fbService.id = index;
    this.fbService.setCurrentContact(index);

    if (this.isMobile) {
      this.selectedContactIndex = index;   // Mobile-Karte öffnen
    } else {
      this.selectedContactIndex = null;    // sicherstellen, dass keine mobile Karte offen ist
    }
  }

  closeContactOverlay() { this.selectedContactIndex = null; }

  // ========= Events AUS der mobilen Kontaktkarte (⋮ → Edit/Delete) =========
  onEditFromView() {
    const idx = this.fbService.id ?? -1;
    if (idx < 0) return;

    // Desktop
    if (!this.isMobile) {
      this.editContactOpen = true;
      return;
    }

    // Mobile → Overlay öffnen
    this.fbService.setCurrentContact(idx);
    this.fbService.showEditContact = true;
  }

  onDeleteFromView() {
    const idx = this.fbService.id ?? -1;
    if (idx >= 0) {
      this.fbService.delContact(idx);
    }
    this.selectedContactIndex = null;
  }

  showEditContact() { return this.fbService.showEditContact; }

  // ========= Globales Schließen =========
  closeAllOverlays() {
    this.showAddContact = false;
    this.editContactOpen = false;
    this.editContact2Open = false;
    this.toastOpen = false;
    this.selectedContactIndex = null;
  }
}
