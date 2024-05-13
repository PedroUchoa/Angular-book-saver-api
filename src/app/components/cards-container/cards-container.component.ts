import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';

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
  @Input() totalPages = 0;
  @Input() currentPage = 0;
  @Output() nextPage: EventEmitter<any> = new EventEmitter();
  @Output() previousPage: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {

  }

  emitNextPage() {
    this.nextPage.emit('');
  }

  emitPreviousPage() {
    this.previousPage.emit('');
  }
}
