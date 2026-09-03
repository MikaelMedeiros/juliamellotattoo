import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, of } from 'rxjs';

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

  private readonly http = inject(HttpClient);

  private readonly cloudinaryBaseUrl =
    'https://res.cloudinary.com/xlgjkgsg/image/upload';

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

        const url =
          `${this.cloudinaryBaseUrl}/` +
          `${this.siteSlug}/` +
          `${this.section}/` +
          `slot-${slot}`;

        return this.http
          .head(url, {
            observe: 'response'
          })
          .pipe(
            map(() => this.createImage(
              url,
              position
            )),

            // 404, erro de rede etc.
            // simplesmente significa que o slot está vazio.
            catchError(() => of(null))
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