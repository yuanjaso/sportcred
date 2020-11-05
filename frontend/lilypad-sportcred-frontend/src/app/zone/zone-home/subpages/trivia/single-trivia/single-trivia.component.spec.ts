import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTriviaComponent } from './single-trivia.component';

describe('SingleTriviaComponent', () => {
  let component: SingleTriviaComponent;
  let fixture: ComponentFixture<SingleTriviaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleTriviaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTriviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
