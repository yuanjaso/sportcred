import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPageRegistrationComponent } from './first-page-registration.component';

describe('FirstPageRegistrationComponent', () => {
  let component: FirstPageRegistrationComponent;
  let fixture: ComponentFixture<FirstPageRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstPageRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstPageRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
