import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ICards } from '../../interface/ICards.interface';


@Component({
  selector: 'app-cards-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './cards-modal.component.html',
  styleUrl: './cards-modal.component.css',
})
export class CardsModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ICards) {

  }


}


