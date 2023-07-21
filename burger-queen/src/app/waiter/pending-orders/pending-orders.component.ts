import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import { Order } from 'src/app/interfaces/orderInterface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { OrdersFnService } from 'src/app/services/orders-fn.service';
import { MenuItem } from 'src/app/interfaces/menuInterface';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent implements OnInit {

  pendingOrders: Order[] = [];

  constructor(
    private authService: AuthServiceService,
    public ordersService: OrdersServiceService,
    private totalCalculator: OrdersFnService,
    private router: Router
    ) { }

    ngOnInit(): void {
      this.loadPendingOrders();
    }
 
    loadPendingOrders() {
      this.ordersService.getPendingOrders().subscribe(
        (orders: Order[]) => {
          this.pendingOrders = orders;
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

      marcarEntregado() {
        console.log('Se entrego')
      }
    }
