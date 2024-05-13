import { Component, inject, OnInit, signal } from '@angular/core';

import { CardsContainerComponent } from '../../components/cards-container/cards-container.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ICards } from '../../interface/ICards.interface';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, CardsContainerComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {

  arrayCards = signal<ICards[] | null>(null);
  currentPage = 0;
  totalPages = 0;
  limit = 12;

  bookService = inject(BooksService);

  ngOnInit(): void {
    this.getCards();
  }

  getCards() {
    this.bookService.getPosts(this.currentPage,this.limit).subscribe((res) => {
      this.arrayCards.set(res.content);
      this.totalPages = res.totalPages;

    });
  }

  previousPage(){
    if(this.currentPage >= 1){
      this.currentPage--;
      this.getCards();
    }
  }

  nextPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.getCards();
    }
  }

}
