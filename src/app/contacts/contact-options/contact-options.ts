// src/app/contacts/contact-options/contact-options.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbService } from '../../services/fb-service';

@Component({
  selector: 'app-contact-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-options.html',
  styleUrls: ['./contact-options.scss'],
})
export class ContactOptionsComponent {
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
