import { Component, inject, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbService } from '../services/fb-service';
import { FormsModule } from '@angular/forms';
import { IContact } from '../interfaces/i-contact';
import { AddContactComponent } from '../add-contact/add-contact'; 
import { ContactCreatedToast } from './contact-created-toast/contact-created-toast';
type Contact = {
  name: string;
  email: string;
  color: string;
  initials?: string;
  letter?: string;
  phone?: string;
};

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule, AddContactComponent, ContactCreatedToast],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss'
})
export class Contacts {
  
  db = inject(FbService).db;
  contact: IContact = {} as IContact;
  id: number = 0;
  showAddContact: boolean = false;
  private toastTimer?: any;
   @Output() close = new EventEmitter<void>();


  topbarTitle = 'Kanban Project Management Tool';
  constructor(public fbService: FbService) {}

  onAddContactClick() {
    alert('Add new contact (Dialog/Firebase kommt später).');
  }

  getContactsGroups() {
    return this.fbService.contactsGroups;
  }

  getContacts() {
    return this.fbService.contactsArray;
  }

  addContact() {
    this.fbService.addContact(this.contact);
    console.log(this.contact);
    this.clearInput();
    clearTimeout(this.toastTimer);
    this.toastOpen = true;
    this.toastTimer = setTimeout(() => this.toastOpen = false, 800);
  }

  upContact() {
    this.fbService.updateContact(this.id, this.contact);
    console.log("Updated contact with ID:", this.id);
    this.clearInput();
  }

  delContact() {
    console.log(this.fbService.contactsGroups.length, this.id, this.fbService.addContact.length);
    this.fbService.contactsArray.length > 0 && this.fbService.contactsGroups.length > 0 &&
      this.fbService.contactsArray.length > this.id ? this.fbService.delContact(this.id) : null;
  }

  getData() {
    return this.fbService.data;
  }

  clearInput() {
    this.contact.name = "";
    this.contact.surname = "";
    this.contact.email = "";
  }

  showContactOverlay() {
    this.showAddContact == false ? this.showAddContact = true : this.showAddContact = false;
  }

    onCloseOverlay() {
    this.showAddContact = false;
  }

}