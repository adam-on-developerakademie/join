import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-contact.html',     
  styleUrls: ['./add-contact.scss']      
})
export class AddContactComponent {
  @Output() close = new EventEmitter<void>();
  @Output() contactAdded = new EventEmitter<any>();

  contact = {
    name: '',
    email: '',
    phone: ''
  };

  closeOverlay() {  // ← Hier von onClose() zu closeOverlay() ändern
    this.close.emit();
  }

  onSubmit() {
    if (this.contact.name && this.contact.email) {
      this.contactAdded.emit(this.contact);
      this.closeOverlay();  // ← Hier auch ändern
    }
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeOverlay();  // ← Hier auch ändern
    }
  }
}