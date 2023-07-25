import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import { Order } from 'src/app/interfaces/orderInterface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { OrdersFnService } from 'src/app/services/orders-fn.service';
import { MenuItem } from 'src/app/interfaces/menuInterface';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {

  pendingOrders: Order[] = [];
  isPending: boolean = true;

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

      marcarEntregado(orderId: number) {
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
              response => {
                console.log('La orden se ha marcado como entregada con éxito en el servidor.');
                // Si la actualización en el servidor es exitosa, ahora actualizamos localmente la variable this.pendingOrders.
                this.pendingOrders = this.pendingOrders.map(order => {
                  if (order.id === orderId) {
                    return { ...order, status: 'delivered' };
                  }
                  this.loadPendingOrders();
                  return order;
                });
                console.log(`Se entregó el pedido con ID: ${orderId}`);
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

      volver() {
        console.log('menu')
        this.router.navigate(['./waiter'])
      }
    }

