import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-options.html',
  styleUrl: './contact-options.scss'
})
export class ContactOptionsComponent {
  /** Inline = ohne Vollbild-Overlay, Panel wird am Parent positioniert */
  @Input() inline = false;

  @Output() close  = new EventEmitter<void>();
  @Output() edit   = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onBackdropClick(e: MouseEvent){
    if (this.inline) return;          // im Inline-Modus kein Backdrop
    const t = e.target as HTMLElement;
    if (t.classList.contains('overlay')) this.close.emit();
  }

  onEdit(){ this.edit.emit(); }
  onDelete(){ this.delete.emit(); }
}
