import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditContactOverlayComponent, Contact } from '../edit-contact-overlay/edit-contact-overlay';

@Component({
selector: 'app-test-edit-contact',
standalone: true,
imports: [CommonModule, EditContactOverlayComponent],
templateUrl: './test-edit-contact.html',
styleUrls: ['./test-edit-contact.scss']
})
export class TestEditContactComponent {
isOverlayOpen = true; 

testContact: Contact = {
id: '1',
name: 'Anton Mayer',
email: 'antonm@gmail.com',
phone: '+49 1111 11 111 1'
};

openOverlay() {
this.isOverlayOpen = true;
}

closeOverlay() {
this.isOverlayOpen = false;
}

saveContact(contact: Contact) {
console.log('Contact saved:', contact);
this.testContact = contact;
this.closeOverlay();
alert('Kontakt gespeichert!');
}

deleteContact() {
console.log('Contact deleted');
this.closeOverlay();
alert('Kontakt gelöscht!');
}
}