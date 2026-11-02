import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ImageExtensionService } from './image-extension.service';

describe('ImageExtensionService', () => {
  let service: ImageExtensionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ImageExtensionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('resolves the first existing supported extension', () => {
    let result: string | null | undefined;

    service.findImageUrl('julia-mello-tattoo/bio/slot-01')
      .subscribe(url => result = url);

    httpMock
      .expectOne('/julia-mello-tattoo/bio/slot-01.jpg')
      .flush(null, { status: 404, statusText: 'Not Found' });
    httpMock
      .expectOne('/julia-mello-tattoo/bio/slot-01.jpeg')
      .flush(null, { status: 404, statusText: 'Not Found' });
    httpMock
      .expectOne('/julia-mello-tattoo/bio/slot-01.png')
      .flush(null);

    expect(result).toBe('/julia-mello-tattoo/bio/slot-01.png');
  });

  it('returns null when no supported extension exists', () => {
    let result: string | null | undefined;
    const basePath = '/julia-mello-tattoo/social-proof/slot-01';
    const extensions = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'];

    service.findImageUrl(basePath).subscribe(url => result = url);

    for (const extension of extensions) {
      httpMock
        .expectOne(`${basePath}.${extension}`)
        .flush(null, { status: 404, statusText: 'Not Found' });
    }

    expect(result).toBeNull();
  });

  it('does not append a second extension to an already extended path', () => {
    let result: string | null | undefined;

    service.findImageUrl('/julia-mello-tattoo/bio/slot-01.PNG')
      .subscribe(url => result = url);

    httpMock
      .expectOne('/julia-mello-tattoo/bio/slot-01.jpg')
      .flush(null, { status: 404, statusText: 'Not Found' });
    httpMock
      .expectOne('/julia-mello-tattoo/bio/slot-01.jpeg')
      .flush(null, { status: 404, statusText: 'Not Found' });
    httpMock
      .expectOne('/julia-mello-tattoo/bio/slot-01.png')
      .flush(null);

    expect(result).toBe('/julia-mello-tattoo/bio/slot-01.png');
  });
});
