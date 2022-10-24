import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoQuantityComponent } from './info-quantity.component';

describe('InfoQuantityComponent', () => {
  let component: InfoQuantityComponent;
  let fixture: ComponentFixture<InfoQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
