import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BannerImageService } from './banner.service';

describe('BannerImageService', () => {
  let service: BannerImageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BannerImageService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(BannerImageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('finds a banner image without requiring a configured extension', () => {
    let result: string[] | undefined;

    service.filterExistingImages(
      [{ image: 'julia-mello-tattoo/banner/slot-01' }],
      'Título padrão',
      'Botão padrão',
      'formSite'
    ).subscribe(banners => result = banners.map(banner => banner.image));

    httpMock
      .expectOne('/julia-mello-tattoo/banner/slot-01.jpg')
      .flush(null);

    expect(result).toEqual([
      '/julia-mello-tattoo/banner/slot-01.jpg'
    ]);
  });

  it('tries another common extension when the first one is missing', () => {
    let result: string[] | undefined;

    service.filterExistingImages(
      [{ image: 'julia-mello-tattoo/banner' }],
      'Título padrão',
      'Botão padrão',
      'formSite'
    ).subscribe(banners => result = banners.map(banner => banner.image));

    httpMock
      .expectOne('/julia-mello-tattoo/banner.jpg')
      .flush(null, { status: 404, statusText: 'Not Found' });
    httpMock
      .expectOne('/julia-mello-tattoo/banner.jpeg')
      .flush(null, { status: 404, statusText: 'Not Found' });
    httpMock
      .expectOne('/julia-mello-tattoo/banner.png')
      .flush(null);

    expect(result).toEqual([
      '/julia-mello-tattoo/banner.png'
    ]);
  });
});
