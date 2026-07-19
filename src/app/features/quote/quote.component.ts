import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-quote',
  imports: [ButtonModule, CardModule],
  templateUrl: './quote.component.html',

  styleUrl: './quote.component.css'
})
export class QuoteComponent {

  openPage(): void {
    window.open('https://orctattoo.com.br/', '_blank');
  }
}
