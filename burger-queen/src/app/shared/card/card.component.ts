import { Component } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { Order } from 'src/app/interfaces/orderInterface';
import { OrdersFnService } from 'src/app/services/orders-fn.service';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import Swal from 'sweetalert2';
import { MenuItem } from 'src/app/interfaces/menuInterface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
 @Input() order!: Order;
 @Input() showReadyButton: boolean = false;

 @Output() markReady: EventEmitter<number> = new EventEmitter<number>();

 constructor(private totalCalculator: OrdersFnService, public ordersService: OrdersServiceService,) { }

 calcularTotal(orderItems: MenuItem[]) {
  return this.totalCalculator.calcularTotal(orderItems);
 }

 verPedido(order: Order) {
  this.ordersService.getOrderById(order.id).subscribe(
    (fullOrder: Order) => {
      // this.router.navigate(['./waiter/pending/details', order.id], { state: { order: fullOrder }});
    },
    (error) => {
      console.error('Error al obtener el pedido completo:', error);
      Swal.fire('Error', 'No se pudo cargar el pedido completo.', 'error');
    }
  )
}

markOrderReady() {
  this.markReady.emit(this.order.id);
}
}
