import { Component, OnInit } from '@angular/core';
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
export class CardComponent implements OnInit {
 @Input() order!: Order;
pendingOrders: Order[] = [];
readyOrders: Order[] = [];

 @Output() markReady: EventEmitter<number> = new EventEmitter<number>();
 @Output() seeOrders: EventEmitter<number> = new EventEmitter<number>();
 @Output() orderDelivered: EventEmitter<number> = new EventEmitter<number>();

 constructor(
  private totalCalculator: OrdersFnService,
  public ordersService: OrdersServiceService,
  private storage: LocalStorageService) { }
  
  ngOnInit(): void {
    
  }
  loadOrders() {
    this.seeOrders
  }
  
  markOrderReady(orderId: number) {
    this.markReady.emit(orderId);
  }
  
  
  markOrderDelivered(orderId: number) {
    this.orderDelivered.emit(orderId)
  }
  
  calcularTotal(orderItems: MenuItem[]) {
   return this.totalCalculator.calcularTotal(orderItems);
  }
}
