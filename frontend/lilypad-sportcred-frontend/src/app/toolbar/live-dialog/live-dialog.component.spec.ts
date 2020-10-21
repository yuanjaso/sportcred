import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveDialogComponent } from './live-dialog.component';

describe('LiveDialogComponent', () => {
  let component: LiveDialogComponent;
  let fixture: ComponentFixture<LiveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
