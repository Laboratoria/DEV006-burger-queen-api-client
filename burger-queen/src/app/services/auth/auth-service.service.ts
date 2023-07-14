import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentials } from '../../interfaces/userInterfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // private backendURL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  logIn(body: UserCredentials):Observable<any> {
    // const loginURL = `${this.backendURL}/login`;
    return this.http.post('http://localhost:8080/login', body)
  }
}