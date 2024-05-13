import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUser } from '../interface/IUsers.interface';

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

  createUser(form: any) {
    return this.http.post(`${this.BASE_URL()}/users/register`, form, {
      responseType: 'text',
    });
  }

  getUSerByTokenJwt(token: string | null): Observable<IUser> {
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        });
        let options = { headers: headers };
    return this.http.get<IUser>(`${this.BASE_URL()}/users/userJwt`, options);
  }

  addBookToUser(bookId: string, userId: string, token: string | null) {
    var bookJson = { bookId: bookId };
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    let options = { headers: headers };
    this.http
      .post(`${this.BASE_URL()}/users/add/${userId}`, bookJson, options)
      .subscribe();
  }

  private doLoginUser(login: string, tokens: any) {
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

  getBooksFavorites(page: number, limit: number, userId: string | null) {
    const params = { page: page.toString(), limit: limit.toString() };
    return this.http.get<any>(`${this.BASE_URL()}/users/favorites/${userId}`,{params});
  }
}
