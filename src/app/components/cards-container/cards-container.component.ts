import { Component, signal } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';
import { ICards } from '../../interface/ICards.interface';

@Component({
  selector: 'app-cards-container',
  standalone: true,
  imports: [CardsComponent],
  templateUrl: './cards-container.component.html',
  styleUrl: './cards-container.component.css',
})
export class CardsContainerComponent {
  public arrayCards = signal<ICards[]>([
    {
      id: 'dae558f6-10c1-462d-b451-e68bf761decd',
      name: 'Duna: livro 1',
      author: 'Frank Herbert',
      description:
        'Uma estonteante mistura de aventura e misticismo, ecologia e política, este romance ganhador dos prêmios Hugo e Nebula deu início a uma das mais épicas histórias de toda a ficção científica. Duna é um triunfo da imaginação, que influenciará a literatura para sempre.Esta edição inédita, com introdução de Neil Gaiman, apresenta ao leitor o universo fantástico criado por Herbert e que será adaptado ao cinema por Denis Villeneuve, diretor de A chegada e de Blade Runner 2049.',
      image: 'https://m.media-amazon.com/images/I/81zN7udGRUL._SY466_.jpg',
      categories: ['SCI_FI', 'FANTASIA'],
    },
  ]);
}
