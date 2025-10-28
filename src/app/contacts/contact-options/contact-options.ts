import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-options.html',
  styleUrl: './contact-options.scss'
})
export class ContactOptionsComponent {
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onEdit(){ this.edit.emit(); }
  onDelete(){ this.delete.emit(); }
  onBackdrop(e: MouseEvent){
    const t = e.target as HTMLElement;
    if (t.classList.contains('overlay')) this.close.emit();
  }
}
