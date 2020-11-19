import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDebateDialogComponent } from './add-debate-dialog.component';

describe('AddDebateDialogComponent', () => {
  let component: AddDebateDialogComponent;
  let fixture: ComponentFixture<AddDebateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDebateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDebateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
