import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CreateProduct } from 'src/app/interfaces/menuInterface';

@Component({
  selector: 'app-create-products-modal',
  templateUrl: './create-products-modal.component.html',
  styleUrls: ['./create-products-modal.component.css']
})
export class CreateProductsModalComponent {
  @Output() addProductEvent = new EventEmitter<CreateProduct>();
  @Output() closeModalEvent = new EventEmitter<void>()

  newProduct: CreateProduct = {
    id:0,
    name:'',
    image:'',
    price:'',
    type:'',
  }

  addProduct() {
    this.addProductEvent.emit(this.newProduct);
    console.log('abrio el modal')
  }

  closeModal(): void {
    this.closeModalEvent.emit();
    console.log('cerro el modal')
  }
}
