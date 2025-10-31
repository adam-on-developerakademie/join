import { Routes } from '@angular/router';
import { Board } from './components/board/board';
import { BoardCard } from './board/board-card/board-card';

export const routes: Routes = [
  //REMEMBER: hier später NUR HAUPTKOMPONENTEN. Wohin mit board card?

  { path: 'board', component: Board },
  { path: 'board-card', component: BoardCard },
];
