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
  currentContact: IContact = {} as IContact;
  currentContactInitials = '';
  id = 0;
  showAddContact = false;
  contactlistHidden = false;
  myWidth = window.innerWidth;
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
    this.currentContact = this.fbService.setCurrentContact(index);
    this.currentContactInitials =
      this.currentContact.name.substring(0, 1).toUpperCase() + this.currentContact.surname.substring(0, 1).toUpperCase();
    this.myWidth < 1100 ? this.contactlistHidden = true : null;

  }


  showEditContact() { return this.fbService.showEditContact; }

  showContactOverlay() { this.showAddContact = true; }

  onCloseOverlay() { this.showAddContact = false; }

  closeMobileContact() {
    this.contactlistHidden = false;
  }

  onContactCreated() {
    this.showAddContact = false;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastOpen = true;
    this.toastTimer = setTimeout(() => (this.toastOpen = false), 2000);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.myWidth = window.innerWidth;
    if (this.myWidth > 1100) {
      this.contactlistHidden = false;
    }
  }
  ngOnInit() {
    this.myWidth = window.innerWidth;
  }
}
