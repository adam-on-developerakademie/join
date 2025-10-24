import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { HeaderComponent } from './shared/header/header';
//import { SidenavComponent } from './shared/sidenav/sidenav';
import { FigmaHeader } from './shared/layout/figma-header/figma-header';
import { FigmaSidenav } from './shared/layout/figma-sidenav/figma-sidenav';
//
import { FbService } from './services/fb-service';
import { Contacts } from './contacts/contacts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FigmaHeader, FigmaSidenav, Contacts],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('join');

  constructor( ) {}


}
