import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.scss'],
  encapsulation: ViewEncapsulation.None, // 🔥 globales CSS zulassen
})
export class SidenavComponent {}
