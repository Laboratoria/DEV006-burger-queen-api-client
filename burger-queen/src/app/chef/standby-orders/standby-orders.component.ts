import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OrdersFnService } from 'src/app/services/orders-fn.service';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import { Order } from 'src/app/interfaces/orderInterface';
import { MenuItem } from 'src/app/interfaces/menuInterface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-standby-orders',
  templateUrl: './standby-orders.component.html',
  styleUrls: ['./standby-orders.component.css']
})
export class StandbyOrdersComponent {

  isChef: boolean =false;
  pendingOrders: Order[] = [];
  isPending: boolean = true;
  userRole: string = '';
  slectedOrderId: number = -1;

  constructor(
    private totalCalculator: OrdersFnService,
    public ordersService: OrdersServiceService,
    private storage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPendingOrders();
    this.checkUserRole();
  }

  private checkUserRole() {
    const userRole = this.storage.getRoleUser()
    this.isChef = userRole === 'chef'
  }

  marcarPedidoListo(orderId: number) {
    console.log('El pedido esta listo')
    const now = new Date();
    this.ordersService.updateOrderStatus(orderId, 'ready').subscribe(
      () => {
        this.loadPendingOrders();
        Swal.fire('Listo', 'El pedido ha sido marcado como listo para entregar.', 'success');
      },
      (error) => {
        console.error('Error al marcar el pedido como listo:', error);
        Swal.fire('Error', 'No se pudo marcar el pedido como listo.', 'error');
      }
    )
  }

  loadPendingOrders() {
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

    calcularTotal(orderItems: MenuItem[]) {
      return this.totalCalculator.calcularTotal(orderItems);
    }

  volver() {
    console.log('menu')
    this.router.navigate(['./waiter'])
  }
}
