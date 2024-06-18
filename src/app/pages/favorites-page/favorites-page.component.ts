import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { CardsContainerComponent } from '../../components/cards-container/cards-container.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ICards } from '../../interface/ICards.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [
    HeaderComponent,
    CardsContainerComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css',

})
export class FavoritesPageComponent implements OnInit {
  cards = signal<ICards[] | null>(null);
  userService = inject(UsersService);
  router = inject(Router);
  currentPage = 0;
  totalPages = 0;
  limit = 12;

  ngOnInit(): void {
    this.getValue();
  }


  getValue() {
    const token = localStorage.getItem('token');
    if (token != null) {
      this.userService.getUSerByTokenJwt(token).subscribe((data) => {
        this.getBooksFavorites(data.id);
      });
    }
  }

  getBooksFavorites(userId: string) {
    this.userService
      .getBooksFavorites(this.currentPage, this.limit, userId)
      .subscribe((data) => {
        this.cards.set(data.content);
        this.totalPages = data.totalPages;
      });
  }

  previousPage() {
    if (this.currentPage >= 1) {
      this.currentPage--;
      this.getValue();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getValue();
    }
  }
}
