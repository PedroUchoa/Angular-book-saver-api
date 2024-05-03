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
  arrayCards = signal<ICards[] | null>(null);

  userService = inject(UsersService);

  router = inject(Router);

  constructor() {
    let token = localStorage.getItem('token');
    if(token != null){
      this.userService.getUSerByTokenJwt(token).subscribe(
        (data: any) => this.arrayCards.set(data.books),
        (error) => {
          alert(error)
        }
      );
    }
  }

  ngOnInit(): void {}

}
