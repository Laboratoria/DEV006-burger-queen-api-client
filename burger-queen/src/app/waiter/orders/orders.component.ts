import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { MenuItem } from 'src/app/interfaces/menuInterface';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import { Order } from 'src/app/interfaces/orderInterface';
import { Router } from '@angular/router';
import { OrdersFnService } from 'src/app/services/orders-fn.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [DatePipe]
})

export class OrdersComponent {

  menuItems: MenuItem[] = [];
  orderItems: MenuItem[] = [];
  clientName: string = '';
  mesaNumber: string = '';
  hasProduct: boolean = false;
  
  constructor(
    public products: ProductsServiceService,
    private authService: AuthServiceService,
    private date: DatePipe,
    private storage: LocalStorageService,
    private ordersService: OrdersServiceService,
    private totalCalculator: OrdersFnService,
    private router: Router,
    ) { }

showMenu(type: string) {
  this.products.getAllProducts().subscribe((data: MenuItem[]) => {
    this.menuItems = data.filter(item => item.type === type);
  })
}

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
  this.hasProduct = this.orderItems.length > 0;
}

deleteProduct(item: MenuItem) {
  console.log('se borro')
  const existingItem = this.orderItems.find(orderItem => orderItem.name === item.name);
  if(existingItem) {
    if(existingItem.quantity && existingItem.quantity > 1) {
      existingItem.quantity--;
    } else {
      const index = this.orderItems.indexOf(existingItem);
      this.orderItems.splice(index, 1)
    }
  }
  this.hasProduct = this.orderItems.length > 0;
  }
  
  addProduct(item: MenuItem) {
    console.log('uno mas')
    const existingItem = this.orderItems.find(orderItem => orderItem.name === item.name);
    if(existingItem) {
      if(existingItem.quantity) {
        existingItem.quantity++;
      } else {
        existingItem.quantity=1;
      }
    } else {
      this.orderItems.push({...item, quantity: 1 });
    }
    this.hasProduct = this.orderItems.length > 0;
  }

  calcularTotal() {
    return this.totalCalculator.calcularTotal(this.orderItems);
  }
  

cancelarOrden(){
console.log('hiciste click en cancelar')
Swal.fire({
  title: 'Seguro que deseas cancelar esta orden?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si',
  cancelButtonText: 'No'
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
  if(!this.hasProduct) {
    console.error('No hay productos');
    Swal.fire('No es posible enviar una orden vacia');
    return;
  }
  if(!this.clientName || !this.mesaNumber) {
    console.error('No se agrego al cliente');
    Swal.fire('Necesitas ingresar el nombre del cliente y numero de mesa');
    return;
  }
  const order: Order = {
    client: this.clientName,
    mesa: this.mesaNumber,
    id: 0,
    products: this.orderItems.map(item => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        type: item.type,
        dateEntry: item.dateEntry,
        quantity: item.quantity
      };
    }),
    status: 'pending',
    dateEntry: this.date.transform(new Date(), 'yyyy-MM-dd HH:mm:ss') ?? '',
    currentTime: ''
  };

  this.ordersService.enviarOrden(order).subscribe(
    (res) => {
      console.log('Orden enviada', res);
      this.orderItems = [];
      this.clientName = '';
      this.mesaNumber = '';
      order.dateEntry = res.dateEntry;
      Swal.fire('Éxito', 'La orden ha sido enviada.', 'success');
    },
    (error) => {
      console.error('Error al enviar la orden:', error);
      Swal.fire('Error', 'No se pudo enviar la orden.', 'error');
    }
  )
}

getElapsedTime(order: Order): string {
  const timeObj = this.totalCalculator.calculateTime(order.dateEntry, order.currentTime ?? '');

  // Formatear los valores para mostrarlos en la interfaz
  const days = timeObj.days > 0 ? timeObj.days + 'd ' : '';
  const hours = timeObj.hours > 0 ? timeObj.hours + 'h ' : '';
  const minutes = timeObj.minutes > 0 ? timeObj.minutes + 'm ' : '';
  const seconds = timeObj.seconds > 0 ? timeObj.seconds + 's' : '';

  return days + hours + minutes + seconds;
}

verPedidos() {
  console.log('aqui van los pedidos')
  this.router.navigate(['./waiter/pending'])
}

logout() {
  this.authService.logOut();
}
}
