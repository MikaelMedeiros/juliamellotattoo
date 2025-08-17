import { Component, OnInit } from '@angular/core';
import { PaintingService } from './service/painting.service';
import { Painting } from './model/Painting';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-painting-site',
  imports: [CarouselModule, ButtonModule, TagModule],
  templateUrl: './painting-site.component.html',
  styleUrl: './painting-site.component.css'
})
export class PaintingSiteComponent implements OnInit {
  paintings: Painting[] = [];

  responsiveOptions: any[] | undefined;

  constructor(private paintingService: PaintingService) {}

  ngOnInit() {
      this.paintingService.getPaintingSmall().then(data => {
          this.paintings = data.slice(0, 9);
      });

      this.responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '1024px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '768px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }

  getSeverity(status: string) {
      switch (status) {
          case 'INSTOCK':
              return 'success';
          case 'OUTOFSTOCK':
              return 'danger';
          default:
              return undefined;
      }
  }

  buyPainting(painting: Painting) {
  const message = `Oi, Jú. Tudo bem? Gostaria de comprar o quadro:
  - Nome: ${painting.name}
  - Preço: R$ ${painting.price.toFixed(2)}

  Aguardo o retorno.`;

      const encodedMessage = encodeURIComponent(message);
      const phoneNumber = '+5561991425954';
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
  }
}
