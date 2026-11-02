import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioSiteComponent } from './bio-site.component';

describe('BioSiteComponent', () => {
  let component: BioSiteComponent;
  let fixture: ComponentFixture<BioSiteComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioSiteComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BioSiteComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    httpMock
      .expectOne('/julia-mello-tattoo/bio/slot-01.jpg')
      .flush(null);
    expect(component).toBeTruthy();
  });

  it('finds the bio image without requiring a configured extension', () => {
    httpMock
      .expectOne('/julia-mello-tattoo/bio/slot-01.jpg')
      .flush(null, { status: 404, statusText: 'Not Found' });
    httpMock
      .expectOne('/julia-mello-tattoo/bio/slot-01.jpeg')
      .flush(null, { status: 404, statusText: 'Not Found' });
    httpMock
      .expectOne('/julia-mello-tattoo/bio/slot-01.png')
      .flush(null);

    fixture.detectChanges();
    const image: HTMLImageElement =
      fixture.nativeElement.querySelector('img');

    expect(image.getAttribute('src'))
      .toBe('/julia-mello-tattoo/bio/slot-01.png');
  });
});
