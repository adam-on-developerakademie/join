import { Component } from '@angular/core';
import { BoardCard } from './board-card/board-card';

@Component({
  selector: 'app-board',
  imports: [BoardCard],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {}
