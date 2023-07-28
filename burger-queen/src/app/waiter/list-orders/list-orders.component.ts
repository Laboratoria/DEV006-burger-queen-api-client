import { Component, OnInit } from '@angular/core';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import { Order } from 'src/app/interfaces/orderInterface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {

  pendingOrders: Order[] = [];
  isPending: boolean = true;

  constructor(
    public ordersService: OrdersServiceService,
    private storage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPendingOrders();
  }

  loadPendingOrders() { //card
    const userRole = this.storage.getRoleUser();

    this.ordersService.getPendingOrders().subscribe(
      (orders: Order[]) => {

        this.pendingOrders = orders.filter(order => order.status === 'ready');

        // if (userRole === 'waiter') {
        //   const pendingOrders = orders.filter(order => order.status === 'pending');
        //   const readyOrders = orders.filter(order => order.status === 'ready');
        //   this.pendingOrders = [...pendingOrders, ...readyOrders]
        // } else if (userRole === 'admin') {
        //   const pendingOrders = orders.filter(order => order.status === 'pending');
        //   const readyOrders = orders.filter(order => order.status === 'ready');
        //   const deliveredOrders = orders.filter(order => order.status === 'delivered');
        //   this.pendingOrders = [...pendingOrders, ...readyOrders, ...deliveredOrders]
        // }
      },
      (error) => {
        console.error('Error al obtener las órdenes pendientes:', error);
        Swal.fire('Error', 'No se pudieron cargar las órdenes pendientes.', 'error');
      }
    );
  }

  marcarEntregado(orderId: number) { //waiter
    Swal.fire({
      title: 'Se entregó esta orden?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordersService.updateOrderStatus(orderId, 'delivered').subscribe(
          (response) => {
            console.log(response, 'La orden se ha marcado como entregada con éxito en el servidor.');
            this.loadPendingOrders();
            Swal.fire(
              'Listo!',
              'La orden se ha entregado.',
              'success'
            );
          },
          error => {
            console.error('Error al marcar la orden como entregada en el servidor:', error);
            // Manejar el error o mostrar un mensaje al usuario en caso de fallo.
          }
        );
      }
    });
  }

  volver() { //waiter
    console.log('menu')
    this.router.navigate(['./waiter'])
  }
}

