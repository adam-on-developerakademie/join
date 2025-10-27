import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'figma-bottom-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './figma-bottom-nav.html',
  styleUrls: ['./figma-bottom-nav.scss'],
})
export class FigmaBottomNav {}
