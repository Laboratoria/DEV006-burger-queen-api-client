import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersFnService } from 'src/app/services/orders-fn.service';
import { Order } from 'src/app/interfaces/orderInterface';
import { MenuItem } from 'src/app/interfaces/menuInterface';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order?: Order;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersFn: OrdersFnService,
    private ordersService: OrdersServiceService,
    private storage: LocalStorageService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      // const orderId = Number(params.get('id'));
      const state = window.history.state;
      this.order = state.order;
    });
  }

  calcularTotal(orderItems: MenuItem[]) {
    return this.ordersFn.calcularTotal(orderItems);
  }

  // marcarEntregado(order: Order) {
  //   const token = this.storage.getToken();
  //   this.ordersService.updateOrderStatus(order.id, 'delivered', token).subscribe(() => {
  //     this.router.navigate(['./waiter/pending'])
  //   },
  //   (error) => {
  //     console.error('Error al marcar el pedido como entregado:', error);
  //     Swal.fire('Error', 'No se pudo marcar el pedido como entregado.', 'error');
  //   }
  //   )
  // }

  marcarEntregado(order: Order) {
    this.ordersService.updateOrderStatus(order.id, 'delivered')
    .subscribe(
      () => {
        this.ordersFn.removeOrder(order.id);
        this.router.navigate(['/waiter/pending'])
      },
      (error) => {
        console.error('Error al marcar el pedido como entregado:', error);
        Swal.fire('Error', 'No se pudo marcar el pedido como entregado.', 'error');
      }
    )
  }
}
