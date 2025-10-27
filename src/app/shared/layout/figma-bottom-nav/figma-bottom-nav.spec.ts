import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigmaBottomNav } from './figma-bottom-nav';

describe('FigmaBottomNav', () => {
  let component: FigmaBottomNav;
  let fixture: ComponentFixture<FigmaBottomNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FigmaBottomNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FigmaBottomNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
