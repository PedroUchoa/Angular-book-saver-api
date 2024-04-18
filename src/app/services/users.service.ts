import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  BASE_URL = signal('http://localhost:8080');

  constructor() {}

  createUser(form: any): Observable<any> {
    return this.http.post(`${this.BASE_URL()}/auth/login`, form);
  }
}
