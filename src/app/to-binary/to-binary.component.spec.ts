import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToBinaryComponent } from './to-binary.component';

describe('ToBinaryComponent', () => {
  let component: ToBinaryComponent;
  let fixture: ComponentFixture<ToBinaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToBinaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToBinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
