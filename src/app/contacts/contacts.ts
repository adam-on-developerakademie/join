import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbService } from '../services/fb-service';
import { FormsModule } from '@angular/forms';
import { IContact } from '../interfaces/i-contact';


type Contact = {
  name: string;
  email: string;
  color: string;   // Badge-Farbe
  initials?: string;
  letter?: string;
};

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss'
})
export class Contacts {
  db = inject(FbService).db;
  contact: IContact = {} as IContact;
  id: number = 0;

  topbarTitle = 'Kanban Project Management Tool';
   constructor(public fbService: FbService) {/*  this.prepare(); */ }

/* 
  contacts: Contact[] = [
    { name: 'Anton Mayer',      email: 'antonm@gmail.com',     color: '#FF7A00' },
    { name: 'Anja Schulz',      email: 'schulz@hotmail.com',   color: '#9327FF' },
    { name: 'Benedikt Ziegler', email: 'benedikt@gmail.com',   color: '#6E52FF' },
    { name: 'David Eisenberg',  email: 'davidberg@gmail.com',  color: '#FC71FF' },
    { name: 'Eva Fischer',      email: 'eva@gmail.com',        color: '#FFBB2B' },
    { name: 'Emmanuel Mauer',   email: 'emmanuelm@gmail.com',  color: '#1FD7C1' },
    { name: 'Tajiana Weiß',     email: 'tajiana@gmail.com',    color: '#FF4646' },
  ];

  grouped = new Map<string, Contact[]>();

 

  private prepare() {
    const addInitials = (c: Contact) => {
      const parts = c.name.trim().split(' ');
      c.initials = (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase();
      c.letter = c.name[0].toUpperCase();
      return c;
    };
    const enriched = this.contacts.map(addInitials).sort((a, b) => a.name.localeCompare(b.name));
    this.grouped = enriched.reduce((m, c) => {
      if (!m.has(c.letter!)) m.set(c.letter!, []);
      m.get(c.letter!)!.push(c);
      return m;
    }, new Map<string, Contact[]>());
  }
   */

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
  
}
