import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FbService } from './services/fb-service';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('join');

  db = inject(FbService).db;

  constructor( public fbService: FbService) {

  }

  getTestSammlung() {
    return this.fbService.testSammlungArray;
  }

  getData() {
    return this.fbService.dataArray;
  }

}