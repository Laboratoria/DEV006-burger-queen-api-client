import { Component } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { Order } from 'src/app/interfaces/orderInterface';
import { OrdersFnService } from 'src/app/services/orders-fn.service';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import Swal from 'sweetalert2';
import { MenuItem } from 'src/app/interfaces/menuInterface';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
 @Input() order!: Order;
 @Input() showReadyButton: boolean = false;

 @Output() markReady: EventEmitter<number> = new EventEmitter<number>();
//  @Output() orderDelivered: EventEmitter<number> = new EventEmitter<number>();

 userRole: string = '';

 constructor(
  private totalCalculator: OrdersFnService,
  public ordersService: OrdersServiceService,
  private storage: LocalStorageService) { 

  this.userRole = this.storage.getRoleUser() || '';

 }

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
  // this.orderDelivered.emit(this.order.id)
}

markOrderDelivered() {
  this.ordersService.updateOrderStatus(this.order.id, 'delivered').subscribe(
    () => {
      Swal.fire('Entregado', 'El pedido ha sido marcado como entregado.', 'success');
    },
    (error) => {
      console.error('Error al marcar el pedido como entregado:', error);
      Swal.fire('Error', 'No se pudo marcar el pedido como entregado.', 'error');
    }
  )
}

getElapsedTime(dateEntry: string): string {
  const now = new Date();
  const entryTime = new Date(dateEntry);
  const elapsedTime = now.getTime() - entryTime.getTime();
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = ((elapsedTime % 60000) / 1000).toFixed(0);

  return `${minutes} minutos y ${seconds} segundos`;
}

// ngOnDestroy(): void {
//   // Limpiar el intervalo del temporizador cuando el componente se destruye
//   clearInterval(this.timerInterval);
// }
}
