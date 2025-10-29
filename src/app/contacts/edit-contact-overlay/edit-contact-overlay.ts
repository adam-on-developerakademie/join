import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IContact } from '../../interfaces/i-contact';
import { FbService } from '../../services/fb-service';


@Component({
    selector: 'app-edit-contact-overlay',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './edit-contact-overlay.html',
    styleUrls: ['./edit-contact-overlay.scss']
})


export class EditContactOverlayComponent {
    showEditContact: boolean = false;

    constructor(private fbService: FbService) { this.getCurrentContact() }

    contact: IContact = { name: '', surname: '', email: '', phone: '' };

    editedContact: IContact = { ...this.contact };

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
        this.fbService.showEditContact = false;
    }

    delContact() {
        this.fbService.contactsArray.length > 0 && this.fbService.contactsGroups.length > 0 &&
            this.fbService.contactsArray.length > this.fbService.id ? this.fbService.delContact(this.fbService.id) : null;
        this.fbService.showEditContact = false;
    }

    getShowEditContact() {
        return this.fbService.showEditContact;
    }

    upContact() {
        if (!this.editedContact.name || !this.editedContact.surname || !this.editedContact.email) {
            alert('Please fill in all required fields: Name, Surname, and Email.');
            return;
        } else {
            this.fbService.updateContact(this.fbService.id, this.editedContact);
            this.fbService.showEditContact = false;
        }
    }

    getCurrentContact() {
        this.editedContact = { ...this.fbService.currentContact };
    }
}