// src/app/contacts/contact-edit-mobile-menu/contact-edit-mobile-menu.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbService } from '../../services/fb-service';

@Component({
  selector: 'app-contact-edit-mobile-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-edit-mobile-menu.html',
  styleUrls: ['./contact-edit-mobile-menu.scss'],
})
export class ContactEditMobileMenuComponent {
  constructor(public fbService: FbService) { }


  @Input() contactId!: string;
  @Input() inline = false;
  /** Events für Parent */
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  onEdit(): void {
    this.edit.emit(this.contactId ?? '');
  }

  onDelete(): void {
    this.delete.emit(this.contactId ?? '');
    this.fbService.contactlistHidden = false;
  }

  onBackdropClick(ev: MouseEvent): void {
    const target = ev.target as HTMLElement;
    if (target.classList.contains('overlay')) {
      this.close.emit();
    }
  }
}
