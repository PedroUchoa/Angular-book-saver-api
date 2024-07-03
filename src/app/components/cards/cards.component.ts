import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';

import { ICards } from '../../interface/ICards.interface';
import { UsersService } from './../../services/users.service';
import { SharedService } from '../../services/shared.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

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

  constructor(
    private sharedService: SharedService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getValues();
  }

  addBook() {
    this.getValues();
    const hasBook = this.userBooksFavorites()?.some(
      (item) => item.id === this.cards.id
    );

    if (!hasBook) {
      this.usersService.addBookToUser(this.cards.id, this.userId, this.token);
      this.toastr.success('Livro Favoritado Com Sucesso', '', {
        timeOut: 2000,
      });
      return;
    }
    this.toastr.warning('Livro já está favoritado');
  }

  removeBook() {
    if (this.token != null && this.userId != '') {
      this.usersService
        .removeBookToUser(this.cards.id, this.userId, this.token)
        .subscribe({
          next: (data) => {
            this.toastr.error('Livro Removido Com Sucesso');
            this.reloadEmit();
          },
          error: (error) => {
            alert('There was a error: ' + error.message);
          },
        });
    }
  }

  getValues() {
    if (this.token != null) {
      this.usersService.getUSerByTokenJwt(this.token).subscribe((data) => {
        this.userBooksFavorites.set(data.books);
        this.userId = data.id;
      });
    }
  }

  showModal() {
    this.sharedService.showModal(this.cards);
  }

  reloadEmit() {
    this.reloadFavorites.emit();
  }
}
