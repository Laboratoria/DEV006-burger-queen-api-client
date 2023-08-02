import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateWorker, Worker } from '../interfaces/workers-interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  private url = 'http://localhost:8080/users';

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService) { }

    private getHeaders(): HttpHeaders {
      const token = this.storage.getToken();
      return new HttpHeaders ({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    }

  getWorkers(): Observable<Worker[]>{
    const headers = this.getHeaders();
    return this.http.get<Worker[]>(this.url, {headers});
  }

  addWorker(newWorker: CreateWorker): Observable<CreateWorker> {
    const headers = this.getHeaders();
    return this.http.post<CreateWorker>(this.url, newWorker, { headers });
  }

}
