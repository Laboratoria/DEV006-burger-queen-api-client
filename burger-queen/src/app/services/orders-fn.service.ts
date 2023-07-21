import { Injectable } from '@angular/core';
import { Order } from '../interfaces/orderInterface';
import { MenuItem } from '../interfaces/menuInterface';

@Injectable({
  providedIn: 'root'
})
export class OrdersFnService {
private pendingORders: Order[] = [];

  constructor() { }

  calcularTotal(items: MenuItem[]): number {
    return items.reduce((total, item) => {
      if (item.quantity) {
        return total + item.price * item.quantity;
      } else {
        return total;
      }
    }, 0);
  }

  removeOrder(orderId: number): void {
    this.pendingORders = this.pendingORders.filter(order => order.id !== orderId)
  }
}
