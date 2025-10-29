import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IContact } from '../../interfaces/i-contact';
import { FbService } from '../../services/fb-service';
import { EditContactOverlayComponent } from '../edit-contact-overlay/edit-contact-overlay';
import { OverlayEditContactComponent } from '../overlay-edit-contact/overlay-edit-contact';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule, EditContactOverlayComponent, OverlayEditContactComponent],
  templateUrl: './contact-card.html',
  styleUrl: './contact-card.scss',
})
export class ContactCard {
  slide = false;
  currentContactId = -1;
  onEdit(): void {
    console.log('Edit contact clicked');
    // Implement edit functionality
  }

  constructor(public fbService: FbService) {}

  onDelete(): void {
    console.log('Delete contact clicked');
    // Implement delete functionality
  }

  get currentContact(): IContact {
    return this.fbService.currentContact;
  }

  delContact() {
    console.log(
      this.fbService.contactsGroups.length,
      this.fbService.id,
      this.fbService.addContact.length
    );
    this.fbService.contactsArray.length > 0 &&
    this.fbService.contactsGroups.length > 0 &&
    this.fbService.contactsArray.length > this.fbService.id
      ? this.fbService.delContact(this.fbService.id)
      : null;
  }

  setEditContact() {
    this.fbService.showEditContact = true;
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

  // Desktop-Delete
  // delContact() {
  //   const idx = this.fbService.id;
  //   if (typeof idx === 'number') {
  //     this.fbService.delContact(idx);
  //   }
  // }

  // Helper: simple breakpoint
  get isMobile(): boolean {
    return window.innerWidth <= 1439;
  }
}
