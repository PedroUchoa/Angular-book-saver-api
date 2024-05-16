import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatDialogModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
}
