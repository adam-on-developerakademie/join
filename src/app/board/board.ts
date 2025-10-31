import { Component } from '@angular/core';
import { BoardCard } from './board-card/board-card';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

interface Task {
  id: string;
  label: string;
  labelColor: 'blue' | 'green' | 'cyan';
  title: string;
  text: string;
  progress: number;
  subtasksText: string;
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [BoardCard, CommonModule, CdkDropList, CdkDrag, CdkDropListGroup],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  todoTasks: Task[] = [
    {
      id: '1',
      label: 'User Story',
      labelColor: 'blue',
      title: 'Contact Form & Imprint',
      text: 'Create a contact form and imprint page…',
      progress: 0,
      subtasksText: '0/2 Subtasks',
    },
  ];

  inProgressTasks: Task[] = [
    {
      id: '2',
      label: 'User Story',
      labelColor: 'blue',
      title: 'Kochetwelt Page & Recipe Recommender',
      text: 'Build start page with recipe recommendation…',
      progress: 50,
      subtasksText: '1/2 Subtasks',
    },
  ];

  awaitFeedbackTasks: Task[] = [
    {
      id: '3',
      label: 'Technical Task',
      labelColor: 'green',
      title: 'HTML Base Template Creation',
      text: 'Create reusable HTML base template…',
      progress: 0,
      subtasksText: '',
    },
  ];

  doneTasks: Task[] = [
    {
      id: '4',
      label: 'Technical Task',
      labelColor: 'cyan',
      title: 'CSS Architecture Planning',
      text: 'Define CSS naming conventions and structure…',
      progress: 100,
      subtasksText: '2/2 Subtasks',
    },
  ];

  // #region methods

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // #endregion methods
}
