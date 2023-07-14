import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentials } from '../interfaces/userInterfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url:string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  logIn(body: UserCredentials):Observable<any> {
    const loginURL = this.url + '/login'
    return this.http.post(loginURL, body)
  }
}