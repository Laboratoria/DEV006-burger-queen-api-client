import { Component } from '@angular/core';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { Observable } from 'rxjs';
import { MenuItem } from 'src/app/interfaces/menuInterface';
import Swal from 'sweetalert2';
import { OrderProducts } from 'src/app/interfaces/order-products';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent {

menuItems: MenuItem[] = [
  {
    id: 0,
    dateEntry: '',
    name: 'Cafe americano',
    image: 'cafe.png',
    type: 'Desayuno',
    price: 5,
  },
  {
    id: 0,
    dateEntry: '',
    name: 'Cafe con leche',
    image: 'cafe.png',
    type: 'Desayuno',
    price: 7,
  },
  {
    id: 0,
    dateEntry: '',
    name: 'Sandwich de jamon y queso',
    image: 'sandwich.png',
    type: 'Desayuno',
    price: 10,
  },
  {
    id: 0,
    dateEntry: '',
    name: 'Jugo de frutas natural',
    image: 'jugoImg.png',
    type: 'Desayuno',
    price: 7,
  },
  {
    id: 0,
    dateEntry: '',
    name: 'Hamburguesa Simple',
    image: 'hamburguesa.png',
    type: 'Almuerzo',
    price: 10,
  },
  {
    id: 0,
    dateEntry: '',
    name: 'Hamburguesa Doble',
    image: 'hamburguesa.png',
    type: 'Almuerzo',
    price: 15,
  },
  {
    id: 0,
    dateEntry: '',
    name: 'Papas Fritas',
    image: 'papas.png',
    type: 'Almuerzo',
    price: 5,
  },
  {
    id: 0,
    dateEntry: '',
    name: 'Aros de Cebolla',
    image: 'aros-de-cebolla.png',
    type: 'Almuerzo',
    price: 5,
  },
  {
    id: 0,
    dateEntry: '',
    name: 'Agua 500ml',
    image: 'agua.png',
    type: 'Almuerzo',
    price: 5,
  },
  {
    id: 0,
    dateEntry: '',
    name: 'Agua 750ml',
    image: 'agua.png',
    type: 'Almuerzo',
    price: 7,
  },
  {
    id: 0,
    dateEntry: '',
    name: 'Bebida Gaseosa 500ml',
    image: 'soda.png',
    type: 'Almuerzo',
    price: 7,
  },
  {
    id: 0,
    dateEntry: '',
    name: 'Bebida Gaseosa 750ml',
    image: 'soda.png',
    type: 'Almuerzo',
    price: 10,
  },
  
];

filteredItems: MenuItem[] = [];

showMenu(type: string) {
  this.filteredItems = this.menuItems.filter(item => item.type === type);
}

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

cancelarOrden(){
console.log('hiciste click en cancelar')
Swal.fire({
  title: 'Seguro que deseas cancelar esta orden?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, la quiero cancelar',
  cancelButtonText: 'No, no quiero cancelarla'
}).then((result) => {
  if (result.isConfirmed) {
    this.orderItems = [];
    Swal.fire(
      'Listo!',
      'La orden ha sido eliminada.',
      'success'
    )
  }
})
    // Swal.fire({
    //   title: 'Seguro que deseas cancelar la orden?',
    //   showCancelButton: true,
    //   confirmButtonText: 'Sí, cancelar',
    //   cancelButtonText: 'No, seguir ordenando',
    //   icon: 'warning',
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
    //     this.orderItems = []; // Vaciar el arreglo orderItems
    //     Swal.fire('Orden cancelada', '', 'success');
    //   } else {
    //     Swal.fire('La orden no fue cancelada', '', 'info');
    //   }
    // })
}

enviarOrden(){
  console.log('se envio la orden')
}
}
