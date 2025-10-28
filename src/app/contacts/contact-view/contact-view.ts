// src/app/contacts/contact-view/contact-view.ts
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { ContactsStoreService, ContactItem } from '../../services/contacts-store.service';
import { ContactOptionsComponent } from '../contact-options/contact-options';
import { FbService } from '../../services/fb-service';

@Component({
  selector: 'app-contact-view',
  standalone: true,
  imports: [CommonModule, RouterModule, ContactOptionsComponent],
  templateUrl: './contact-view.html',
  styleUrl: './contact-view.scss',
})
export class ContactViewComponent {
  private route = inject(ActivatedRoute);
  private store = inject(ContactsStoreService);
  private fb = inject(FbService);

  @Output() close = new EventEmitter<void>();  // ← NEU: für Overlay-Schließen

  contact: ContactItem | null = null;
  showOptions = false;

  ngOnInit() {
    const idx = Number(this.route.snapshot.paramMap.get('id') ?? -1);

    let fromStore = this.store.getByIndex(idx)?.item ?? this.store.getSelected()?.item ?? null;
    if (!fromStore) {
      const arr = this.fb.contactsArray || [];
      if (idx >= 0 && idx < arr.length) fromStore = arr[idx] as unknown as ContactItem;
    }
    if (!fromStore && (this.fb as any).currentContact) {
      fromStore = (this.fb as any).currentContact as ContactItem;
    }
    this.contact = fromStore;

    if (!this.contact) this.goBack();
  }

  // ← WICHTIG: innerer Pfeil triggert jetzt dieses Event
  goBack() { this.close.emit(); }

  toggleOptions() { this.showOptions = !this.showOptions; }
  onEdit()  { this.showOptions = false; /* TODO */ }
  onDelete(){ this.showOptions = false; /* TODO */ }

  initials(c: ContactItem | null) {
    if (!c) return '';
    const n = (c.name || '').trim();
    const s = (c.surname || '').trim();
    return (n[0] || '').toUpperCase() + (s[0] || '').toUpperCase();
  }
}
