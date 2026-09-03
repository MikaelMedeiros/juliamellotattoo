import {
  Component,
  OnInit
} from '@angular/core';

import { GalleriaModule } from 'primeng/galleria';

import {
  PortfolioImage,
  PhotoService
} from './shared/photo.service';

declare var fbq: any;

@Component({
  selector: 'app-portfolio-site',
  imports: [
    GalleriaModule
  ],
  templateUrl: './portfolio-site.component.html',
  styleUrl: './portfolio-site.component.css'
})
export class PortfolioSiteComponent
  implements OnInit {

  images: PortfolioImage[] = [];

  private galeriaInteragida = false;

  constructor(
    private readonly imageService:
    PhotoService
  ) {}


  ngOnInit(): void {

    this.imageService
      .getImages()
      .subscribe(
        images => {
          this.images = images;
        }
      );

  }


  trackInteracaoGaleria(): void {

    if (
      !this.galeriaInteragida
    ) {

      if (
        typeof fbq !== 'undefined'
      ) {

        fbq(
          'trackCustom',
          'InteracaoGaleria'
        );
      }

      this.galeriaInteragida = true;
    }
  }
}