import { Component } from '@angular/core';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { Observable } from 'rxjs';
import { MenuItem, MenuObjects } from 'src/app/interfaces/menuInterface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  // constructor(private products: ProductsServiceService) { }

  // ngOnInit(): void {
  //   this.products.getAllProducts().subscribe(data => {
  //     console.log(data)
  //   })
  // }

menuItems: MenuItem[] = [
  {
    name: 'Cafe americano',
    image: 'cafe.png',
    type: 'Desayuno',
    price: 5,
  },
  {
    name: 'Cafe con leche',
    image: 'cafe.png',
    type: 'Desayuno',
    price: 7,
  },
  {
    name: 'Sandwich de jamon y queso',
    image: 'sandwich.png',
    type: 'Desayuno',
    price: 10,
  },
  {
    name: 'Jugo de frutas natural',
    image: 'burgerwithCat.png',
    type: 'Desayuno',
    price: 7,
  }
];

orderItems: MenuItem[] = [];

addToOrderList(item: MenuItem){
  const existingItem = this.orderItems.find(orderItem => orderItem.name === item.name);
  if (existingItem) {
    if(existingItem.quantity){
      existingItem.quantity++;
    } else {
      existingItem.quantity=1;
    }
  } else {
    this.orderItems.push({...item, quantity: 1 });
  }
}

calcularTotal() {
  return this.orderItems.reduce((total, item) => {
    if(item.quantity) {
      return total + (item.price * item.quantity);
    } else {
      return total;
    }
  }, 0)
}
}
