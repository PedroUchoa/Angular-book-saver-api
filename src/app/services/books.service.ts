import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);

  BASE_URL = signal('http://localhost:8080');



  getPosts(page:number, limit: number): Observable<any> {
    const params = {page:page.toString(), limit: limit.toString()}
    return this.http.get<any>(`${this.BASE_URL()}/books`, {params});
  }


}
