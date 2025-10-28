import { Injectable } from '@angular/core';

export interface ContactItem {
  name: string;
  surname: string;
  email: string;
  phone: string;
  color: string;
}

@Injectable({ providedIn: 'root' })
export class ContactsStoreService {
  private list: ContactItem[] = [];
  private selectedIndex: number | null = null;

  // Liste setzen (z.B. aus Contacts-Liste)
  setList(arr: ContactItem[]) { this.list = arr; }

  // Auswahl merken
  selectByIndex(i: number) { this.selectedIndex = i; }

  // Aus Store holen
  getSelected() {
    if (this.selectedIndex === null) return null;
    return { item: this.list[this.selectedIndex], index: this.selectedIndex };
  }

  // Fallback per Index (aus URL)
  getByIndex(i: number) {
    if (i < 0 || i >= this.list.length) return null;
    return { item: this.list[i], index: i };
  }
}
