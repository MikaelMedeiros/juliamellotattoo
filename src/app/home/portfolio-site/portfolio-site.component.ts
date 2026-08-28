import { Component, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { PhotoService } from './shared/photo.service';

declare var fbq: any;

@Component({
  selector: 'app-portfolio-site',
  imports: [GalleriaModule],
  templateUrl: './portfolio-site.component.html',
  styleUrl: './portfolio-site.component.css',
  providers: [PhotoService]
})
export class PortfolioSiteComponent implements OnInit {
    images: { itemImageSrc: string; thumbnailImageSrc: string; alt: string; title: string; }[] = []

    private galeriaInteragida = false;

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => this.images = images);
    }

    trackInteracaoGaleria(): void {    
        if (!this.galeriaInteragida) {
            if (typeof fbq !== 'undefined') {
                fbq('trackCustom', 'InteracaoGaleria');
            }
            this.galeriaInteragida = true;
        }
    }
}
