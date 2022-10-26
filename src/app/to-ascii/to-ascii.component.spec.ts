import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToAsciiComponent } from './to-ascii.component';

describe('ToAsciiComponent', () => {
  let component: ToAsciiComponent;
  let fixture: ComponentFixture<ToAsciiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToAsciiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToAsciiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
