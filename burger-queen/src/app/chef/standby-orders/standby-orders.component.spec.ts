import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandbyOrdersComponent } from './standby-orders.component';

describe('StandbyOrdersComponent', () => {
  let component: StandbyOrdersComponent;
  let fixture: ComponentFixture<StandbyOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StandbyOrdersComponent]
    });
    fixture = TestBed.createComponent(StandbyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
