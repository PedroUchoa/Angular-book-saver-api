import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';

import { ICards } from '../../interface/ICards.interface';
import { BooksService } from '../../services/books.service';
import { SharedService } from '../../services/shared.service';
import { CardsComponent } from '../cards/cards.component';



@Component({
  selector: 'app-cards-container',
  standalone: true,
  imports: [CardsComponent, CommonModule],
  templateUrl: './cards-container.component.html',
  styleUrl: './cards-container.component.css',
})
export class CardsContainerComponent implements OnInit {
  bookService = inject(BooksService);
  @Input() buttonValue = '';
  @Input() arrayCards = signal<ICards[] | null>(null);
  @Input() totalPages = 0;
  @Input() currentPage = 0;
  @Output() nextPage: EventEmitter<any> = new EventEmitter();
  @Output() previousPage: EventEmitter<any> = new EventEmitter();
  @Output() reloadFavorites: EventEmitter<any> = new EventEmitter();
  state: boolean = false;
  book: ICards = {
    id: '',
    name: '',
    author: '',
    description: '',
    image: '',
    categories: [],
  };

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.action$.subscribe((data) => {
      this.showModal(data);
    });
  }

  reloadEmit() {
    this.reloadFavorites.emit('');
  }

  emitNextPage() {
    this.nextPage.emit('');
  }

  emitPreviousPage() {
    this.previousPage.emit('');
  }

  showModal(data: ICards) {
    this.state = true;
    this.book = data;
  }

  closeModal() {
    this.state = false;
    console.log(this.state)
  }
}
