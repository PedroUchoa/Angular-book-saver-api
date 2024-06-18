import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

import { ICards } from '../../interface/ICards.interface';
import { UsersService } from './../../services/users.service';
import { CardsModalComponent } from '../cards-modal/cards-modal.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent implements OnInit {
  usersService = inject(UsersService);
  userId: string = '';
  userBooksFavorites = signal<ICards[] | null>(null);
  @Input() buttonValue = '';
  @Input() cards: ICards = {
    id: '',
    name: '',
    author: '',
    description: '',
    image: '',
    categories: [],
  };

  @Output() reloadFavorites: EventEmitter<any> = new EventEmitter();

  token: string | null = localStorage.getItem('token');

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getValues();
  }

  addBook() {
    this.getValues();
    const hasBook = this.userBooksFavorites()?.some(
      (item) => item.id === this.cards.id
    );

    if (hasBook) return alert('Livro já está favoritado');

    if (this.token != null && this.userId != '') {
      this.usersService.addBookToUser(this.cards.id, this.userId, this.token);
      alert('Livro favoritado com sucesso');
    }
  }

  removeBook() {
    if (this.token != null && this.userId != '') {
      this.usersService
        .removeBookToUser(this.cards.id, this.userId, this.token)
        .subscribe({
          next: (data) => {
            alert('Book Removed');
            this.reloadEmit()
          },
          error: (error) => {
            alert('There was a error: ' + error.message);
          },
        });
    }
  }

  getValues() {
    console.log('deu certo aqui patrãozinho');
    if (this.token != null) {
      this.usersService.getUSerByTokenJwt(this.token).subscribe((data) => {
        this.userBooksFavorites.set(data.books);
        this.userId = data.id;
      });
    }
  }

  openDialog() {
    this.dialog.open(CardsModalComponent, {
      width: '600px',
      height: '500px',
      data: this.cards,
    });
  }

  reloadEmit(){
    this.reloadFavorites.emit();
  }
}
