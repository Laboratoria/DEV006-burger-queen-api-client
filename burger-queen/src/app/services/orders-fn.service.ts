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

  calculateTime(date1: string, date2: string) {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const difMs = secondDate.getTime() - firstDate.getTime();

    const sec = Math.floor(difMs / 1000);
    const min = Math.floor(sec / 60);
    const hrs = Math.floor(min / 60);
    const days = Math.floor(hrs / 24);

    const totalSec = sec % 60;
    const totalMin = min % 60;
    const totalHrs = hrs % 24;

    return {
      days: days,
      hours: totalHrs,
      minutes: totalMin,
      seconds: totalSec
    }
  }

}
