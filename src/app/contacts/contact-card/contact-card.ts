import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IContact } from '../../interfaces/i-contact';
import { FbService } from '../../services/fb-service';


@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-card.html',
  styleUrl: './contact-card.scss'
})
export class ContactCard {

  adamTestOn = false;
  currentContactId = -1;
  constructor(private fbService: FbService) { }


  get currentContact(): IContact {
    return this.fbService.currentContact;
  }

  delContact() {
    console.log(this.fbService.contactsGroups.length, this.fbService.id, this.fbService.addContact.length);
    this.fbService.contactsArray.length > 0 && this.fbService.contactsGroups.length > 0 &&
      this.fbService.contactsArray.length > this.fbService.id ? this.fbService.delContact(this.fbService.id) : null;
  }


  setEditContact() {
    this.fbService.showEditContact = true;
  }

  setSlide() {

    if (this.fbService.id != this.currentContactId) {
      this.adamTestOn = true
      setTimeout(() => {
        this.currentContactId = this.fbService.id;
        this.adamTestOn = false
      }, 100);
    }
    return this.adamTestOn;

  }
}
