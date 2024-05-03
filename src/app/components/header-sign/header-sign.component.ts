import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-sign',
  standalone: true,
  imports: [],
  templateUrl: './header-sign.component.html',
  styleUrl: './header-sign.component.css'
})
export class HeaderSignComponent {
  @Input() type:string = ''
}
