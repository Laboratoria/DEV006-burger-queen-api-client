import { Component } from '@angular/core';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import { Order } from 'src/app/interfaces/orderInterface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-standby-orders',
  templateUrl: './standby-orders.component.html',
  styleUrls: ['./standby-orders.component.css']
})
export class StandbyOrdersComponent {

  pendingOrders: Order[] = [];
  isPending: boolean = true;

  constructor(
    public ordersService: OrdersServiceService,
  ) { }

  ngOnInit(): void {
    this.loadPendingOrders();
  }

  loadPendingOrders() { //card

    this.ordersService.getPendingOrders().subscribe(
      (orders: Order[]) => {
          this.pendingOrders = orders.filter(order => order.status === 'pending');
      },
      (error) => {
        console.error('Error al obtener las órdenes pendientes:', error);
        Swal.fire('Error', 'No se pudieron cargar las órdenes pendientes.', 'error');
      }
    );
  }

  marcarPedidoListo(orderId: number) { //chef
    Swal.fire({
      title: 'El pedido está listo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {

        console.log('El pedido esta listo')
        this.ordersService.updateOrderStatus(orderId, 'ready').subscribe(
          (res) => {
            console.log(res)
            this.loadPendingOrders();
            Swal.fire(
              'Listo!',
              'La orden esta lista para entregar.',
              'success'
            );
          },
          (error) => {
            console.error(`Error marking the order as ready with id ${orderId}:`, error);
          }
        )
      }
    })
  }

  

}