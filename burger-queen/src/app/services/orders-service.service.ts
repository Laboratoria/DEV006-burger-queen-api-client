import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../interfaces/menuInterface';
import { Order } from '../interfaces/orderInterface';
import { OrderPending } from '../interfaces/orderInterface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {

  private ordersUrl = 'http://localhost:8080/orders';
  
  constructor(private http: HttpClient, private storage: LocalStorageService) { }

enviarOrden(order: Order, token: string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token
  });
  return this.http.post(this.ordersUrl, order, {headers})
}

getOrderById(orderId: number): Observable<Order> {
  const token = this.storage.getToken();
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  })
  return this.http.get<Order>(`${this.ordersUrl}/${orderId}`, { headers })
}

getPendingOrders(): Observable<Order[]> {
  const token = this.storage.getToken();
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token
  })
  return this.http.get<Order[]>(this.ordersUrl, { headers })
}


updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
  const token = this.storage.getToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer' + token
  });
  const body = { status: newStatus };
  const url = `${this.ordersUrl}/${orderId}`;
  return this.http.patch(url, body, {headers})
}

}
