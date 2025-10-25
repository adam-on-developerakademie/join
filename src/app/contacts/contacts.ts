import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FbService } from '../services/fb-service';
import { IContact } from '../interfaces/i-contact';
import { AddContactComponent } from '../add-contact/add-contact';
import { ContactCreatedToast } from './contact-created-toast/contact-created-toast';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule, AddContactComponent, ContactCreatedToast],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.scss']
})
export class Contacts {

  db = inject(FbService).db;

  topbarTitle = 'Kanban Project Management Tool';

  contact: IContact = {} as IContact;
  id = 0;

  showAddContact = false;
  toastOpen = false;
  private toastTimer?: ReturnType<typeof setTimeout>;

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
    // @ts-ignore falls surname im Interface fehlt
    this.contact.surname = '';
    this.contact.email = '';
  }

  showContactOverlay() {
    this.showAddContact = !this.showAddContact;
  }

  onCloseOverlay() {
    this.showAddContact = false;
  }

  onContactCreated() {
  // Overlay schließen (optional – wenn du offen lassen willst, Zeile entfernen)
  this.showAddContact = false;

  // Toast zeigen
  if (this.toastTimer) clearTimeout(this.toastTimer);
  this.toastOpen = true;
  this.toastTimer = setTimeout(() => (this.toastOpen = false), 800);
}

}
