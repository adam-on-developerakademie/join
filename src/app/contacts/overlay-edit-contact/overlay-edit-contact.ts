import { Component } from '@angular/core';
import { IContact } from '../../interfaces/i-contact';
import { FbService } from '../../services/fb-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-overlay-edit-contact',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './overlay-edit-contact.html',
  styleUrls: ['./overlay-edit-contact.scss'],
})
export class OverlayEditContactComponent {


  constructor(private fbService: FbService) { this.getCurrentContact() }

  contact: IContact = { name: '', surname: '', email: '', phone: '' };

  editedContact: IContact = { ...this.contact };


  onClose() {
    this.fbService.showEditContact = false;
  }

  delContact() {
    this.fbService.contactsArray.length > 0 && this.fbService.contactsGroups.length > 0 &&
      this.fbService.contactsArray.length > this.fbService.id ? this.fbService.delContact(this.fbService.id) : null;
    this.fbService.showEditContact = false;
  }

  getShowEditContact() {
    return this.fbService.showEditContact;
  }

  upContact() {
    if (!this.editedContact.name || !this.editedContact.surname || !this.editedContact.email) {
      alert('Please fill in all required fields: Name, Surname, and Email.');
      return;
    } else {
      this.fbService.updateContact(this.fbService.id, this.editedContact);
      this.fbService.showEditContact = false;
    }
  }

  getCurrentContact() {
    this.editedContact = { ...this.fbService.currentContact };
  }





}


