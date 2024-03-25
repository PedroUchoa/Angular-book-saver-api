import { Component } from '@angular/core';

import { CardsContainerComponent } from '../../components/cards-container/cards-container.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent,CardsContainerComponent,FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
