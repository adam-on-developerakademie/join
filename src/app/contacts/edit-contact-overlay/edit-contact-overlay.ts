import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Contact {
id?: string;
name: string;
email: string;
phone: string;
}

@Component({
selector: 'app-edit-contact-overlay',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './edit-contact-overlay.html',
styleUrls: ['./edit-contact-overlay.scss']
})
export class EditContactOverlayComponent {
@Input() isOpen = false;
@Input() contact: Contact = {
name: '',
email: '',
phone: ''
};

@Output() close = new EventEmitter<void>();
@Output() save = new EventEmitter<Contact>();
@Output() delete = new EventEmitter<void>();

editedContact: Contact = { ...this.contact };

ngOnChanges() {
this.editedContact = { ...this.contact };
}

getInitials(): string {
const names = this.editedContact.name.trim().split('');
if (names.length >= 2) {
return (names[0][0] + names[names.length - 1][0]).toUpperCase();
}
return this.editedContact.name.substring(0, 2).toUpperCase();
}

onClose() {
this.close.emit();
}

onSave() {
this.save.emit(this.editedContact);
}

onDelete() {
this.delete.emit();
}
}