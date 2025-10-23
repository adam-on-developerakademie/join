import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CRUD } from './crud/crud';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CRUD],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('join');

  constructor( ) {}


}