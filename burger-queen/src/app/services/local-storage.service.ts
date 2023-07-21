import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getEmail(): string | null {
    return localStorage.getItem('user-email')
  }

  getIdUser(): string | null{
    return localStorage.getItem('user-id')
  }

  getRoleUser(): string | null {
    return localStorage.getItem('user-rol')
  }

  // getToken(): string | null {
  //   return localStorage.getItem('token')
  // }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : ''
  }
}
