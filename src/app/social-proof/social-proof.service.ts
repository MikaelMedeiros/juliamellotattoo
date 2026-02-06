import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SocialProofImage } from './social-proof.model';

@Injectable({
  providedIn: 'root',
})
export class SocialProofService {

  private readonly images: SocialProofImage[] = [
    {
      src: 'assets/social-proof/amandafb.jpeg',
      alt: 'Customer testimonial 1',
    },
    {
      src: 'assets/social-proof/analuizafb.jpeg',
      alt: 'Customer testimonial 2',
    },
    {
      src: 'assets/social-proof/haynarafb.jpeg',
      alt: 'Customer testimonial 3',
    },
    {
      src: 'assets/social-proof/isisfb.jpeg',
      alt: 'Customer testimonial 4',
    },
    {
      src: 'assets/social-proof/larafb.jpeg',
      alt: 'Customer testimonial 5',
    },
    {
      src: 'assets/social-proof/lindafb.jpeg',
      alt: 'Customer testimonial 6',
    },
    {
      src: 'assets/social-proof/lorraynefb.jpeg',
      alt: 'Customer testimonial 7',
    },
    {
      src: 'assets/social-proof/pietrafb.jpeg',
      alt: 'Customer testimonial 8',
    },
    {
      src: 'assets/social-proof/rosanafb.jpeg',
      alt: 'Customer testimonial 9',
    },
  ];

  getImages(): Observable<SocialProofImage[]> {
    return of(this.images);
  }
}
