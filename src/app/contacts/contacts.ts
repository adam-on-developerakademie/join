import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Contact = {
  name: string;
  email: string;
  color: string;   // Badge-Farbe
  initials?: string;
  letter?: string;
};

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss'
})
export class Contacts {
  topbarTitle = 'Kanban Project Management Tool';

  contacts: Contact[] = [
    { name: 'Anton Mayer',      email: 'antonm@gmail.com',     color: '#FF7A00' },
    { name: 'Anja Schulz',      email: 'schulz@hotmail.com',   color: '#9327FF' },
    { name: 'Benedikt Ziegler', email: 'benedikt@gmail.com',   color: '#6E52FF' },
    { name: 'David Eisenberg',  email: 'davidberg@gmail.com',  color: '#FC71FF' },
    { name: 'Eva Fischer',      email: 'eva@gmail.com',        color: '#FFBB2B' },
    { name: 'Emmanuel Mauer',   email: 'emmanuelm@gmail.com',  color: '#1FD7C1' },
    { name: 'Tajiana Weiß',     email: 'tajiana@gmail.com',    color: '#FF4646' },
  ];

  grouped = new Map<string, Contact[]>();

  constructor() { this.prepare(); }

  private prepare() {
    const addInitials = (c: Contact) => {
      const parts = c.name.trim().split(' ');
      c.initials = (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase();
      c.letter = c.name[0].toUpperCase();
      return c;
    };
    const enriched = this.contacts.map(addInitials).sort((a, b) => a.name.localeCompare(b.name));
    this.grouped = enriched.reduce((m, c) => {
      if (!m.has(c.letter!)) m.set(c.letter!, []);
      m.get(c.letter!)!.push(c);
      return m;
    }, new Map<string, Contact[]>());
  }

  onAddContactClick() {
    alert('Add new contact (Dialog/Firebase kommt später).');
  }
}
