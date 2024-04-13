import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ICards } from '../interface/ICards.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);

  BASE_URL = signal('http://localhost:8080');

  getPosts(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL()}/books`);
  }
}
