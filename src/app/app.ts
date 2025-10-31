import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { HeaderComponent } from './shared/header/header';
//import { SidenavComponent } from './shared/sidenav/sidenav';
import { FigmaHeader } from './shared/layout/figma-header/figma-header';
import { FigmaSidenav } from './shared/layout/figma-sidenav/figma-sidenav';
import { FbService } from './services/fb-service';
import { Contacts } from './contacts/contacts';
import { ContactCard } from './contacts/contact-card/contact-card';
import { FigmaBottomNav } from './shared/layout/figma-bottom-nav/figma-bottom-nav';
import { BoardCard } from './board/board-card/board-card';
import { Board } from './board/board';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FigmaHeader, FigmaSidenav, Contacts, FigmaBottomNav, Board, BoardCard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('join');

  constructor() {}
}
