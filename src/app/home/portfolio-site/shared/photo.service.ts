import { Injectable, inject } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { ImageExtensionService } from '../../../shared/image-extension.service';

export interface PortfolioImage {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private readonly imageExtensionService =
    inject(ImageExtensionService);

  private readonly siteSlug =
    'julia-mello-tattoo';

  private readonly section =
    'portfolio';

  private readonly maxSlots =
    12;


  getImages() {

    const requests = Array.from(
      { length: this.maxSlots },
      (_, index) => {

        const position = index + 1;

        const slot =
          String(position).padStart(2, '0');

        const path =
          `/${this.siteSlug}/` +
          `${this.section}/` +
          `slot-${slot}`;

        return this.imageExtensionService.findImageUrl(path).pipe(
          map(url => url ? this.createImage(url, position) : null)
        );
      }
    );

    return forkJoin(requests).pipe(
      map(images =>
        images.filter(
          (
            image
          ): image is PortfolioImage =>
            image !== null
        )
      )
    );
  }


  private createImage(
    url: string,
    position: number
  ): PortfolioImage {

    return {

      itemImageSrc:
        url,

      thumbnailImageSrc:
        url,

      alt:
        `Tatuagem ${position}`,

      title:
        `Tatuagem ${position}`
    };
  }
}