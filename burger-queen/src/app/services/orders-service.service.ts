import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/orderInterface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {

  private url: string = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService) { }

  private getHeaders(): HttpHeaders {
    const token = this.storage.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    })
  }

  enviarOrden(order: Order): Observable<any> {
    const ordersUrl = this.url + '/orders'
    const headers = this.getHeaders();
    return this.http.post(ordersUrl, order, { headers })
  }

  getOrderById(orderId: number): Observable<Order> {
    const ordersUrl = this.url + '/orders'
    const headers = this.getHeaders();
    return this.http.get<Order>(`${ordersUrl}/${orderId}`, { headers })
  }

  getPendingOrders(): Observable<Order[]> {
    const ordersUrl = this.url + '/orders'
    const headers = this.getHeaders();
    return this.http.get<Order[]>(ordersUrl, { headers })
  }


  updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
    const ordersUrl = this.url + '/orders'
    const headers = this.getHeaders();
    const body = { status: newStatus };
    const url = `${ordersUrl}/${orderId}`;
    return this.http.patch(url, body, { headers })
  }

  updateOrder(order: Order): Observable<any> {
    const ordersUrl = this.url + '/orders'
    const headers = this.getHeaders();
    const url = `${ordersUrl}/${order.id}`;
    return this.http.put(url,order, {headers});
  }
}
