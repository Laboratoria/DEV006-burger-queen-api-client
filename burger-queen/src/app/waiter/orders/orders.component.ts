import { Component } from '@angular/core';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { MenuItem } from 'src/app/interfaces/menuInterface';
import Swal from 'sweetalert2';
import { OrderProducts } from 'src/app/interfaces/order-products';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent {

  menuItems: MenuItem[] = [];
  
  constructor(public products: ProductsServiceService, private authService: AuthServiceService) { }

showMenu(type: string) {
  this.products.getAllProducts().subscribe((data: MenuItem[]) => {
    this.menuItems = data.filter(item => item.type === type);
  })
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
}

enviarOrden(){
  console.log('se envio la orden')
}

logout() {
  this.authService.logOut();
}
}
