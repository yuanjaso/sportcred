import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicRegistrationDialogComponent } from './basic-registration-dialog.component';

describe('BasicRegistrationDialogComponent', () => {
  let component: BasicRegistrationDialogComponent;
  let fixture: ComponentFixture<BasicRegistrationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicRegistrationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicRegistrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
