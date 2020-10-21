import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionairePagesComponent } from './questionaire-pages.component';

describe('QuestionairePagesComponent', () => {
  let component: QuestionairePagesComponent;
  let fixture: ComponentFixture<QuestionairePagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionairePagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionairePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
