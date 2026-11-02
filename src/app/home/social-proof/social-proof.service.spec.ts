import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SocialProofService } from './social-proof.service';

describe('SocialProofService', () => {
  let service: SocialProofService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SocialProofService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(SocialProofService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('loads images from public using the available extension', () => {
    let images: { src: string; alt?: string }[] | undefined;
    service.getImages().subscribe(result => images = result);

    for (let position = 1; position <= 12; position++) {
      const slot = String(position).padStart(2, '0');
      const request = httpMock.expectOne(
        `/julia-mello-tattoo/social-proof/slot-${slot}.jpg`
      );

      if (position === 1) {
        request.flush(null, { status: 404, statusText: 'Not Found' });
      } else {
        request.flush(null);
      }
    }

    httpMock
      .expectOne('/julia-mello-tattoo/social-proof/slot-01.jpeg')
      .flush(null, { status: 404, statusText: 'Not Found' });
    httpMock
      .expectOne('/julia-mello-tattoo/social-proof/slot-01.png')
      .flush(null);

    expect(images?.[0]).toEqual({
      src: '/julia-mello-tattoo/social-proof/slot-01.png',
      alt: 'Depoimento de cliente 1'
    });
    expect(images?.length).toBe(12);
  });
});
