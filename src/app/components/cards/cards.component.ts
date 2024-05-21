import { Component, inject, Input, OnInit } from '@angular/core';
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
  userBooksFavorites: ICards[] = [];
  @Input() buttonValue = "";
  @Input() cards: ICards = {
    id: '',
    name: '',
    author: '',
    description: '',
    image: '',
    categories: [],
  }

  token: string | null = localStorage.getItem('token');

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getValues();
  }

  addBook() {
    this.getValues();
    const hasBook = this.userBooksFavorites.some(
      (item) => item.id === this.cards.id
    );

    if (hasBook) return alert('Livro já está favoritado');

    if (this.token != null && this.userId != '') {
      this.usersService.addBookToUser(this.cards.id, this.userId, this.token);
      alert('Livro favoritado com sucesso');
    }
  }

  getValues() {
    if (this.token != null) {
      this.usersService.getUSerByTokenJwt(this.token).subscribe((data) => {
        this.userId = data.id;
        this.userBooksFavorites = data.books;
      });
    }
  }

  openDialog(){
    this.dialog.open(CardsModalComponent, {
      width: '600px',
      height: '500px',
      data: this.cards,
    });
  }

}
