import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-created-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-created-toast.html',
  styleUrls: ['./contact-created-toast.scss'],
})
export class ContactCreatedToast {
  @Input() show = false; // Sichtbarkeit durch [show]="toastOpen"
}
