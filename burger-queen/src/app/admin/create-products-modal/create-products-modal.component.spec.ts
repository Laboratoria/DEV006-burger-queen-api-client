import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductsModalComponent } from './create-products-modal.component';

describe('CreateProductsModalComponent', () => {
  let component: CreateProductsModalComponent;
  let fixture: ComponentFixture<CreateProductsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProductsModalComponent]
    });
    fixture = TestBed.createComponent(CreateProductsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
