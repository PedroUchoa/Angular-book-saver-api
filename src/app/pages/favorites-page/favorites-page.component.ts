import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject, Inject, OnInit, signal } from '@angular/core';

import { CardsContainerComponent } from '../../components/cards-container/cards-container.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ICards } from '../../interface/ICards.interface';
import { UsersService } from '../../services/users.service';
import { error } from 'node:console';

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

  constructor() {

  }

  ngOnInit(): void {
    this.userService.getUSerByTokenJwt().subscribe(
      (data)=>console.log(data),
      (error)=>console.log(error)
    )
  }


}
