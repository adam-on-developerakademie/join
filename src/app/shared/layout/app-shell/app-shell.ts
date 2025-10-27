import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FigmaHeader } from '../figma-header/figma-header';
import { FigmaSidenav } from '../figma-sidenav/figma-sidenav';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FigmaHeader, FigmaSidenav],
  templateUrl: './app-shell.html',
  styleUrls: ['./app-shell.scss'],
})
export class AppShell {}
