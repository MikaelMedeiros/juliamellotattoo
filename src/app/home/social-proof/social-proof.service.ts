import { Injectable } from '@angular/core';
import {
  Observable,
  forkJoin,
  map
} from 'rxjs';
import { ImageExtensionService } from '../../shared/image-extension.service';
import { SocialProofImage } from './social-proof.model';

@Injectable({
  providedIn: 'root'
})
export class SocialProofService {

  private readonly siteSlug = 'julia-mello-tattoo';
  private readonly section = 'social-proof';
  private readonly maxSlots = 12;

  constructor(
    private readonly imageExtensionService: ImageExtensionService
  ) {}

  getImages(): Observable<SocialProofImage[]> {
    const requests: Observable<SocialProofImage | null>[] =
      Array.from(
        { length: this.maxSlots },
        (_, index) => {
          const position = index + 1;
          const slot = String(position).padStart(2, '0');

          const path =
            `/${this.siteSlug}/` +
            `${this.section}/` +
            `slot-${slot}`;

          return this.imageExtensionService.findImageUrl(path).pipe(
            map((src): SocialProofImage | null =>
              src
                ? {
                    src,
                    alt: `Depoimento de cliente ${position}`
                  }
                : null
            )
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
}