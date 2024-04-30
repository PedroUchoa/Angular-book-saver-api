import { IUser } from './../../interface/IUsers.interface';
import { Component, inject, Input, OnInit } from '@angular/core';

import { UsersService } from './../../services/users.service';
import { ICards } from '../../interface/ICards.interface';

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
  userBooks: ICards[] = [];
  @Input() imgSrc: string = '';
  @Input() title: string = '';
  @Input() bookId: string = '';
  token: string | null = localStorage.getItem('token');

  ngOnInit(): void {
    this.getValues();
  }

  addBook() {
    this.getValues();
    console.log(this.userBooks)
    const hasBook = this.userBooks.some((item) => item.id === this.bookId);

    if(hasBook) return alert('Livro já está favoritado')

    if (this.token != null && this.userId != '') {
      this.usersService.addBookToUser(this.bookId, this.userId, this.token);
      alert('Livro favoritado com sucesso');
    }
  }

  getValues(){
        if (this.token != null) {
          this.usersService.getUSerByTokenJwt(this.token).subscribe((data) => {
            this.userId = data.id;
            this.userBooks = data.books;
          });
        }
  }

}
