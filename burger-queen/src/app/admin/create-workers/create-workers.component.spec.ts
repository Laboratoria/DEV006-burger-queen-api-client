import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkersComponent } from './create-workers.component';

describe('CreateWorkersComponent', () => {
  let component: CreateWorkersComponent;
  let fixture: ComponentFixture<CreateWorkersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateWorkersComponent]
    });
    fixture = TestBed.createComponent(CreateWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
