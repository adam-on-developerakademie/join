import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-card.html',
  styleUrl: './contact-card.scss'
})
export class ContactCard {
onEdit(): void {
    console.log('Edit contact clicked');
    // Implement edit functionality
  }
  
  onDelete(): void {
    console.log('Delete contact clicked');
    // Implement delete functionality
  }
}
