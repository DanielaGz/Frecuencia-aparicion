import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesInterSegComponent } from './tables-inter-seg.component';

describe('TablesInterSegComponent', () => {
  let component: TablesInterSegComponent;
  let fixture: ComponentFixture<TablesInterSegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesInterSegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesInterSegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
