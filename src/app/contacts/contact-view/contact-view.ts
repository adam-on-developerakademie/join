// src/app/contacts/contact-view/contact-view.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

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
  private router = inject(Router);
  private store = inject(ContactsStoreService);
  private fb = inject(FbService);

  contact: ContactItem | null = null;
  showOptions = false;

  ngOnInit() {
    const idx = Number(this.route.snapshot.paramMap.get('id') ?? -1);

    // 1) Versuch: aus Store (entweder Index aus URL oder letzte Auswahl)
    let fromStore = this.store.getByIndex(idx)?.item ?? this.store.getSelected()?.item ?? null;

    // 2) Fallback: direkt aus FbService.contactsArray (z. B. bei Direktaufruf/Reload)
    if (!fromStore) {
      const arr = this.fb.contactsArray || [];
      if (idx >= 0 && idx < arr.length) {
        fromStore = arr[idx] as unknown as ContactItem;
      }
    }

    // 3) Optionaler Fallback: falls du im FbService ein currentContact Feld setzt
    if (!fromStore && (this.fb as any).currentContact) {
      fromStore = (this.fb as any).currentContact as ContactItem;
    }

    this.contact = fromStore;

    // wenn gar nichts da ist -> zurück
    if (!this.contact) this.goBack();
  }

  goBack() { history.back(); }
  toggleOptions() { this.showOptions = !this.showOptions; }
  onEdit()  { this.showOptions = false; /* TODO: Edit-Overlay öffnen */ }
  onDelete(){ this.showOptions = false; /* TODO: Delete-Flow */ }

  initials(c: ContactItem | null) {
    if (!c) return '';
    const n = (c.name || '').trim();
    const s = (c.surname || '').trim();
    return (n[0] || '').toUpperCase() + (s[0] || '').toUpperCase();
  }
}
