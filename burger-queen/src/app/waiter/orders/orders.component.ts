import { Component } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menuInterface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

menuItems: MenuItem[] = [
  {
    nombre: 'Cafe americano',
    img: 'cafe.png',
    precio: 5,
  },
  {
    nombre: 'Cafe con leche',
    img: 'cafe.png',
    precio: 7,
  },
  {
    nombre: 'Sandwich de jamon y queso',
    img: 'sandwich.png',
    precio: 10,
  },
  {
    nombre: 'Jugo de frutas natural',
    img: 'burgerwithCat.png',
    precio: 7,
  }
];

orderItems: MenuItem[] = [];

addToOrderList(item: MenuItem){
  const existingItem = this.orderItems.find(orderItem => orderItem.nombre === item.nombre);
  if (existingItem) {
    if(existingItem.cantidad){
      existingItem.cantidad++;
    } else {
      existingItem.cantidad=1;
    }
  } else {
    this.orderItems.push({...item, cantidad: 1 });
  }
}

calcularTotal() {
  return this.orderItems.reduce((total, item) => {
    if(item.cantidad) {
      return total + (item.precio * item.cantidad);
    } else {
      return total;
    }
  }, 0)
}
//  products?: any[];

//  constructor(private menuProducts: ProductsServiceService) {}

//  ngOnInit() {
//   this.fetchProducts();
//  }

//  fetchProducts() {
//   this.menuProducts.getProducts().subscribe(products => {
//     this.products = products;
//   });
//  }
}
