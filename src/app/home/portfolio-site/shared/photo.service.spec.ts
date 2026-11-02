import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import {
  PhotoService,
  PortfolioImage
} from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PhotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loads images from public and supports different file extensions', () => {
    let images: PortfolioImage[] | undefined;
    service.getImages().subscribe(result => images = result);

    for (let position = 1; position <= 12; position++) {
      const slot = String(position).padStart(2, '0');
      const request = httpMock.expectOne(
        `/julia-mello-tattoo/portfolio/slot-${slot}.jpg`
      );

      if (position === 1) {
        request.flush(null);
      } else {
        request.flush(null, { status: 404, statusText: 'Not Found' });
      }
    }

    for (const extension of ['jpeg', 'png', 'webp', 'avif', 'gif']) {
      for (let position = 2; position <= 12; position++) {
        const slot = String(position).padStart(2, '0');
        httpMock
          .expectOne(
            `/julia-mello-tattoo/portfolio/slot-${slot}.${extension}`
          )
          .flush(null, { status: 404, statusText: 'Not Found' });
      }
    }

    expect(images).toEqual([
      {
        itemImageSrc: '/julia-mello-tattoo/portfolio/slot-01.jpg',
        thumbnailImageSrc: '/julia-mello-tattoo/portfolio/slot-01.jpg',
        alt: 'Tatuagem 1',
        title: 'Tatuagem 1'
      }
    ]);
  });
});
