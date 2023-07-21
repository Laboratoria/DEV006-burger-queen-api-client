import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/menuInterface';

@Injectable({
  providedIn: 'root'
})
export class OrdersFnService {

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

  // calcularTotal() {

  //   return this.orderItems.reduce((total, item) => {
  //     if(item.quantity) {
  //       return total + (item.price * item.quantity);
  //     } else {
  //       return total;
  //     }
  //   }, 0)
  // }
}
