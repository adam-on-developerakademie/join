import { Component, inject } from '@angular/core';
import { FbService } from '../services/fb-service';
import { FormsModule } from '@angular/forms';
import { IContact } from '../interfaces/i-contact';


@Component({
  selector: 'app-adam',
  imports: [FormsModule],
  templateUrl: './adam.html',
  styleUrl: './adam.scss'
})
export class Adam {
  db = inject(FbService).db;
  contact: IContact = {} as IContact;
  id: number = 0;

  constructor(public fbService: FbService) {
  }

  addContact() {
    this.fbService.addContact(this.contact);
    console.log(this.contact);
    this.clearInput();

  }

  getContacts() {
    return this.fbService.contactsArray;
  }

  delContact(id: number = 0) {
    this.fbService.delContact(id);
    console.log("Deleted contact with ID:", id);
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
