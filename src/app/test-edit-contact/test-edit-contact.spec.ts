import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEditContact } from './test-edit-contact';

describe('TestEditContact', () => {
  let component: TestEditContact;
  let fixture: ComponentFixture<TestEditContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestEditContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestEditContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
