import { Component, inject, Input, OnInit, signal } from '@angular/core';

import { ICards } from '../../interface/ICards.interface';
import { BooksService } from '../../services/books.service';
import { CardsComponent } from '../cards/cards.component';


@Component({
  selector: 'app-cards-container',
  standalone: true,
  imports: [CardsComponent],
  templateUrl: './cards-container.component.html',
  styleUrl: './cards-container.component.css',
})
export class CardsContainerComponent implements OnInit {
  bookService = inject(BooksService);

  @Input() arrayCards = signal<ICards[] | null>(null);

  ngOnInit(): void {
    this.getCards();
  }

  getCards() {
    this.bookService.getPosts().subscribe((res) => {
      this.arrayCards.set(res.content);
    });
  }
}
