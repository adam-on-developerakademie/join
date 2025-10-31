import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FbService } from '../services/fb-service';
import { IContact } from '../interfaces/i-contact';
import { AddContactComponent } from './add-contact/add-contact';
import { ContactCreatedToast } from './contact-created-toast/contact-created-toast';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule, AddContactComponent, ContactCreatedToast],
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

  constructor(public fbService: FbService) { }

  getContactsGroups() { return this.fbService.contactsGroups; }
  getContacts() { return this.fbService.contactsArray; }
  getData() { return this.fbService.data; }


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

  showContact(index: number) {
    this.fbService.id = index;
    this.fbService.setCurrentContact(index);
  }

  showEditContact() { return this.fbService.showEditContact; }

  showContactOverlay() { this.showAddContact = true; }

  onCloseOverlay() { this.showAddContact = false; }
  
  onContactCreated() {
    this.showAddContact = false;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastOpen = true;
    this.toastTimer = setTimeout(() => (this.toastOpen = false), 2000);
  }

}
