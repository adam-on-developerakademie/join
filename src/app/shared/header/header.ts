import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  encapsulation: ViewEncapsulation.None, // 🔥 globales CSS zulassen
})
export class HeaderComponent {
  userInitial = 'Y';
  dropdownOpen = signal(false);

  constructor(private router: Router) {}

  toggle() { this.dropdownOpen.set(!this.dropdownOpen()); }
  logout() { this.router.navigate(['/login']); }
}
