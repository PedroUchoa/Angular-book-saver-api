import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICards } from '../interface/ICards.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private actionSource = new Subject<any>()
  action$ = this.actionSource.asObservable();

  constructor() { }

  showModal(data:ICards){
    this.actionSource.next(data)
  }

}
