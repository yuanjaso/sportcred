import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneHomeComponent } from './zone-home.component';

describe('ZoneHomeComponent', () => {
  let component: ZoneHomeComponent;
  let fixture: ComponentFixture<ZoneHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
