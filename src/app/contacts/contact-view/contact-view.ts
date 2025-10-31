// auf contact-edit-activation umstellen

import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactOptionsComponent } from '../contact-options/contact-options';
import { FbService } from '../../services/fb-service';
import { OverlayEditContactComponent } from '../overlay-edit-contact/overlay-edit-contact';
import { EditContactOverlayComponent } from '../edit-contact-overlay/edit-contact-overlay';

@Component({
  selector: 'app-contact-view',
  standalone: true,
  imports: [CommonModule, ContactOptionsComponent, OverlayEditContactComponent, EditContactOverlayComponent],
  templateUrl: './contact-view.html',
  styleUrls: ['./contact-view.scss'],
})
export class ContactViewComponent {
  public fb = inject(FbService);

  @Output() close  = new EventEmitter<void>();
  @Output() edit   = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  contact: any | null = null;
  showOptions = false;

  ngOnInit() {
    const idx = typeof this.fb.id === 'number' ? this.fb.id : -1;
    const arr = this.fb.contactsArray || [];
    let fromService: any | null = null;
    if (idx >= 0 && idx < arr.length) fromService = arr[idx];
    if (!fromService && this.fb.currentContact) fromService = this.fb.currentContact;
    this.contact = fromService ?? null;
    if (!this.contact) this.goBack();
  }

  goBack() { this.close.emit(); }

  toggleOptions() { this.showOptions = !this.showOptions; }

  // Mobile: Edit öffnet den mobilen (bzw. globalen) Edit-Overlay
  onEdit() {
    this.showOptions = false;
    this.fb.showEditContact = true;   // Flag setzen → passende Edit-Komponente wird sichtbar
    this.edit.emit();
  }

  // Mobile: Delete löscht und schließt Karte
  onDelete() {
    this.showOptions = false;
    const idx = this.fb.id;
    if (typeof idx === 'number') {
      this.fb.delContact(idx);
    }
    this.delete.emit();
    this.goBack();
  }

  initials(c: any | null) {
    if (!c) return '';
    const n = (c.name || '').trim();
    const s = (c.surname || '').trim();
    return (n[0] || '').toUpperCase() + (s[0] || '').toUpperCase();
  }
}
