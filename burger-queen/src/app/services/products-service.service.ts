import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuObjects } from '../interfaces/menuInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  private url:string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllProducts():Observable<any>{
    const productsUrl = this.url + '/orders'
    return this.http.get<any>(productsUrl)
  }
}
