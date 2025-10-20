import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firestore, collectionData, collection, doc, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  //protected readonly title = signal('join');
 public db=inject(Firestore);
}

