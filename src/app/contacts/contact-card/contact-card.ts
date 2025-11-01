import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IContact } from '../../interfaces/i-contact';
import { FbService } from '../../services/fb-service';
import { ContactEditDesktopComponent } from '../contact-edit-desktop/contact-edit-desktop';
import { ContactEditMobileComponent } from '../contact-edit-mobile/contact-edit-mobile';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule, ContactEditDesktopComponent, ContactEditMobileComponent],
  templateUrl: './contact-card.html',
  styleUrl: './contact-card.scss',
})
export class ContactCard {
  slide = false;
  currentContactId = -1;

  constructor(private fbService: FbService) { }

  get currentContact(): IContact {
    return this.fbService.currentContact;
  }

  delContact() {
    this.fbService.contactsArray.length > 0 &&
      this.fbService.contactsGroups.length > 0 &&
      this.fbService.contactsArray.length > this.fbService.id
      ? this.fbService.delContact(this.fbService.id)
      : null;
  }

  setEditContact() {
    this.fbService.showEditContact = true;
    return this.fbService.showEditContact;
  }

  showMobile() {
    return this.fbService.showEditContact;
  }

  setSlide() {
    if (this.fbService.id != this.currentContactId) {
      this.slide = true;
      setTimeout(() => {
        this.currentContactId = this.fbService.id;
        this.slide = false;
      }, 100);
    }
    return this.slide;
  }

  closeMobileContactCard() {
    this.fbService.showEditContact = false;
    return this.fbService.showEditContact;
  }

}
