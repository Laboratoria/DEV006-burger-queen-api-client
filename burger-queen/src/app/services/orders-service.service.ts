import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../interfaces/menuInterface';
import { Order } from '../interfaces/orderInterface';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {

  private ordersUrl = 'http://localhost:8080/orders';
  
  constructor(private http: HttpClient) { }

enviarOrden(order: Order, token: string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token
  });
  return this.http.post(this.ordersUrl, order, {headers})
}

}
