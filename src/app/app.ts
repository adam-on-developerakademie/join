import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Adam } from './adam/adam';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Adam],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('join');

  constructor( ) {}


}