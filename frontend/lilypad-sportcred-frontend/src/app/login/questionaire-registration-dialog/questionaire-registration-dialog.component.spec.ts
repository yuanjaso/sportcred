import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionaireRegistrationDialogComponent } from './questionaire-registration-dialog.component';

describe('QuestionaireRegistrationDialogComponent', () => {
  let component: QuestionaireRegistrationDialogComponent;
  let fixture: ComponentFixture<QuestionaireRegistrationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionaireRegistrationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionaireRegistrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
