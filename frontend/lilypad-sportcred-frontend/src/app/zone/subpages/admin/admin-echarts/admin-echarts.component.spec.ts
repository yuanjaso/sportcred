import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEchartsComponent } from './admin-echarts.component';

describe('AdminEchartsComponent', () => {
  let component: AdminEchartsComponent;
  let fixture: ComponentFixture<AdminEchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEchartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
