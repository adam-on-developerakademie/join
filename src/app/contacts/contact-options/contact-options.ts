import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-contact-options',
  standalone: true,
  templateUrl: './contact-options.html',
  styleUrls: ['./contact-options.scss'],
})
export class ContactOptionsComponent {
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
}
