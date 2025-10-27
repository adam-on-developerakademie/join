import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FbService } from '../services/fb-service';
import { IContact } from '../interfaces/i-contact';
import { AddContactComponent } from './add-contact/add-contact';
import { EditContactOverlayComponent } from './edit-contact-overlay/edit-contact-overlay';
import { ContactCreatedToast } from './contact-created-toast/contact-created-toast';
import { ContactOptionsComponent } from './contact-options/contact-options';
import { OverlayEditContactComponent } from './overlay-edit-contact/overlay-edit-contact';
import { OverlayEditContact2Component } from './overlay-edit-contact-2/overlay-edit-contact-2';
import { ContactSuccessToastComponent } from './contact-success-toast/contact-success-toast';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AddContactComponent,
    EditContactOverlayComponent,
    ContactCreatedToast,
  ],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.scss']
})
export class Contacts {

  topbarTitle = 'Kanban Project Management Tool';

  contact: IContact = {} as IContact;
  id = 0;
  

  showAddContact = false;
  showEditContact = true;
  toastOpen = false;
  private toastTimer?: ReturnType<typeof setTimeout>;

  constructor(private fbService: FbService) {}

  getContactsGroups() {
    return this.fbService.contactsGroups;
  }

  getContacts() {
    return this.fbService.contactsArray;
  }

  addContact() {
    this.fbService.addContact(this.contact);
    this.clearInput();

    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastOpen = true;
    this.toastTimer = setTimeout(() => (this.toastOpen = false), 800);
  }

  upContact() {
    this.fbService.updateContact(this.id, this.contact);
    console.log('Updated contact with ID:', this.id);
    this.clearInput();
  }

  delContact() {
    if (this.fbService.contactsArray.length > this.id) {
      this.fbService.delContact(this.id);
    }
  }

  getData() {
    return this.fbService.data;
  }

  clearInput() {
    this.contact.name = '';
    this.contact.surname = '';
    this.contact.email = '';
    this.contact.phone = '';
  }

  showContactOverlay() {
    this.showAddContact = !this.showAddContact;
  }

  onCloseOverlay() {
    this.showAddContact = false;
  }

  onContactCreated() {
    // Overlay schließen
    this.showAddContact = false;

  // Toast zeigen
  if (this.toastTimer) clearTimeout(this.toastTimer);
  this.toastOpen = true;
  this.toastTimer = setTimeout(() => (this.toastOpen = false), 2000);
}

showContact(id: number) {
  this.fbService.id=id;
  this.fbService.setCurrentContact(id); 
}

  // === NEU für Optionen + Edit Overlays ===
  optionsOpen = false;
  editContactOpen = false;
  editContact2Open = false;

  openOptions() {
    this.optionsOpen = true;
  }

  closeOptions() {
    this.optionsOpen = false;
  }

  onEdit() {
    this.optionsOpen = false;
    this.editContactOpen = true;
  }

  onEditAnton() {
    this.optionsOpen = false;
    this.editContact2Open = true;
  }

  onDelete() {
    this.optionsOpen = false;
    alert('Contact deleted (Demo)');
  }

  closeAllOverlays() {
    this.showAddContact = false;
    this.editContactOpen = false;
    this.editContact2Open = false;
    this.toastOpen = false;
    this.optionsOpen = false;
  }
}
