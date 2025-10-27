import { Component } from '@angular/core';
import { AddContactComponent } from '../contacts/add-contact/add-contact';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [AddContactComponent],
  templateUrl: './test.html',
  styleUrl: './test.scss'
})
export class TestComponent {
  show = false;

  openOverlay() {
    this.show = true;
  }

  onAdded(contact: any) {
    console.log('Contact hinzugefügt:', contact);
    alert('Erfolgreich erstellt:\n' + JSON.stringify(contact, null, 2));
    this.show = false;
  }

  onClose() {
    this.show = false;
  }
}