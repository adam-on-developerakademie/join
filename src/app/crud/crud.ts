import { Component, inject } from '@angular/core';
import { FbService } from '../services/fb-service';
import { FormsModule } from '@angular/forms';
import { IContact } from '../interfaces/i-contact';


@Component({
  selector: 'app-crud',
  imports: [FormsModule],
  templateUrl: './crud.html',
  styleUrl: './crud.scss'
})
export class CRUD {
  db = inject(FbService).db;
  contact: IContact = {} as IContact;
  id: number = 0;

  constructor(public fbService: FbService) {
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
    this.fbService.delContact(this.id);
    console.log("Deleted contact with ID:", this.id);
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
