import { Component } from '@angular/core';
import { IContact } from '../../interfaces/i-contact';
import { FbService } from '../../services/fb-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overlay-edit-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './overlay-edit-contact.html',
  styleUrls: ['./overlay-edit-contact.scss'],
})
export class OverlayEditContactComponent {
  constructor(private fbService: FbService) { this.getCurrentContact(); }

  contact: IContact = { name: '', surname: '', email: '', phone: '' };
  editedContact: IContact = { ...this.contact };

  onClose() {
    this.fbService.showEditContact = false;
  }

  delContact() {
    const i = this.fbService.id ?? -1;
    if (i >= 0 && i < this.fbService.contactsArray.length) {
      this.fbService.delContact(i);
    }
    this.fbService.showEditContact = false;
  }

  async upContact() {
    if (!this.editedContact.name || !this.editedContact.surname || !this.editedContact.email) {
      alert('Please fill in Name, Surname and Email.');
      return;
    }
    const i = this.fbService.id ?? -1;
    if (i >= 0 && i < this.fbService.contactsArray.length) {
      await this.fbService.updateContact(i, this.editedContact);
      this.fbService.setCurrentContact(i);
    }
    this.fbService.showEditContact = false;
  }

  getCurrentContact() {
    this.editedContact = { ...this.fbService.currentContact };
  }
}
