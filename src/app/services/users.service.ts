import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  BASE_URL = signal('http://localhost:8080');
  private readonly JWT_TOKEN = 'token';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  login(form: any): Observable<any> {
    return this.http
      .post(`${this.BASE_URL()}/auth/login`, form)
      .pipe(
        tap((response: any) => this.doLoginUser(form.login, response.token))
      );
  }

  private doLoginUser(login: string, tokens: any) {
    console.log('testee')
    this.loggedUser = login;
    this.storeJwtToken(tokens);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
  }

  getUSerByTokenJwt(token:string | null) {
    return this.http.get(`${this.BASE_URL()}/users/userJwt`, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${token}`
      ),
    });
  }
}
