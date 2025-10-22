import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adam } from './adam';

describe('Adam', () => {
  let component: Adam;
  let fixture: ComponentFixture<Adam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
