import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateDiscussionDialogComponent } from './debate-discussion-dialog.component';

describe('DebateDiscussionDialogComponent', () => {
  let component: DebateDiscussionDialogComponent;
  let fixture: ComponentFixture<DebateDiscussionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebateDiscussionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebateDiscussionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
