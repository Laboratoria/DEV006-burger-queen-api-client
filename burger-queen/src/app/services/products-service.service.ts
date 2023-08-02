import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from '../interfaces/menuInterface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  private url:string = 'http://localhost:8080';

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  private getHeaders() {
    const token = this.storage.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    })
  }

  getAllProducts():Observable<any> {
    const productsUrl = this.url + '/products';
    const headers = this.getHeaders();
    return this.http.get<MenuItem[]>(productsUrl, {headers})
  }
  // getAllProducts():Observable<any>{
  //   const productsUrl = this.url + '/products'
  //   const headers = this.createAuthorizationHeaders();
  //   return this.http.get<MenuItem[]>(productsUrl, {headers})
  // }

  // private createAuthorizationHeaders(): HttpHeaders {
  //   const token = this.storage.getToken();
  //   if(token) {
  //     return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   }
  //   return new HttpHeaders();
  // }

}
