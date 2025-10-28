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
  onEdit(): void {
    console.log('Edit contact clicked');
    // Implement edit functionality
  }

  constructor(private fbService: FbService) { }

  currentContactIndex = this

  onDelete(): void {
    console.log('Delete contact clicked');
    // Implement delete functionality
  }

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

}
