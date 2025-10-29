import { Component } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IContact } from '../../interfaces/i-contact';
import { FbService } from '../../services/fb-service';
import { EditContactOverlayComponent } from '../edit-contact-overlay/edit-contact-overlay';
import { OverlayEditContactComponent } from '../overlay-edit-contact/overlay-edit-contact';
import { EditContactOverlayComponent } from '../edit-contact-overlay/edit-contact-overlay';
import { OverlayEditContactComponent } from '../overlay-edit-contact/overlay-edit-contact';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule, EditContactOverlayComponent, OverlayEditContactComponent],
  imports: [CommonModule, EditContactOverlayComponent, OverlayEditContactComponent],
  templateUrl: './contact-card.html',
  styleUrls: ['./contact-card.scss']
})
export class ContactCard {

  constructor(public fbService: FbService) {}

  get currentContact(): IContact {
    return this.fbService.currentContact;
  }

  // Desktop-Edit
  setEditContact() {
    this.fbService.showEditContact = true;
  }

  // Desktop-Delete
  delContact() {
    const idx = this.fbService.id;
    if (typeof idx === 'number') {
      this.fbService.delContact(idx);
    }
  }

  // Helper: simple breakpoint
  get isMobile(): boolean {
    return window.innerWidth <= 1439;
  }
}
