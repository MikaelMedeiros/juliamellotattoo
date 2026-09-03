import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of } from 'rxjs';
import { SocialProofImage } from './social-proof.model';

@Injectable({
  providedIn: 'root'
})
export class SocialProofService {

  private readonly cloudinaryBaseUrl =
    'https://res.cloudinary.com/xlgjkgsg/image/upload';

  private readonly siteSlug = 'julia-mello-tattoo';
  private readonly section = 'social-proof';
  private readonly maxSlots = 12;

  getImages(): Observable<SocialProofImage[]> {
    const requests: Observable<SocialProofImage | null>[] =
      Array.from(
        { length: this.maxSlots },
        (_, index) => {
          const position = index + 1;
          const slot = String(position).padStart(2, '0');

          const src =
            `${this.cloudinaryBaseUrl}/` +
            `${this.siteSlug}/` +
            `${this.section}/` +
            `slot-${slot}`;

          return this.checkImage(src).pipe(
            map((exists): SocialProofImage | null => {
              if (!exists) {
                return null;
              }

              return {
                src,
                alt: `Depoimento de cliente ${position}`
              };
            })
          );
        }
      );

    return forkJoin(requests).pipe(
      map(
        (images): SocialProofImage[] =>
          images.filter(
            (image): image is SocialProofImage => image !== null
          )
      )
    );
  }

  private checkImage(url: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const image = new Image();

      image.onload = () => {
        observer.next(true);
        observer.complete();
      };

      image.onerror = () => {
        observer.next(false);
        observer.complete();
      };

      image.src = url;
    });
  }
}