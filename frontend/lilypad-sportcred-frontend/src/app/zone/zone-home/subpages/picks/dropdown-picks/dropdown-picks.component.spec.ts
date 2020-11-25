import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPicksComponent } from './dropdown-picks.component';

describe('DropdownPicksComponent', () => {
  let component: DropdownPicksComponent;
  let fixture: ComponentFixture<DropdownPicksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownPicksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
