import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getEmail(): string {
    const email = localStorage.getItem('user-email')
    return email ? email : ''
  }

  getIdUser(): string {
    const idUser = localStorage.getItem('user-id')
    return idUser ? idUser : ''
  }

  getRoleUser(): string {
    const roleUser = localStorage.getItem('user-rol')
    return roleUser ? roleUser : ''
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : ''
  }

}
