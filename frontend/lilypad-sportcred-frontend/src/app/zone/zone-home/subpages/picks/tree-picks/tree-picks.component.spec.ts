import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreePicksComponent } from './tree-picks.component';

describe('TreePicksComponent', () => {
  let component: TreePicksComponent;
  let fixture: ComponentFixture<TreePicksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreePicksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreePicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
