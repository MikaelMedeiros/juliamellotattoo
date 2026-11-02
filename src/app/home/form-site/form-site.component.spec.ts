import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSiteComponent } from './form-site.component';

describe('FormSiteComponent', () => {
  let component: FormSiteComponent;
  let fixture: ComponentFixture<FormSiteComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSiteComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSiteComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    httpMock
      .expectOne('/julia-mello-tattoo/avatar-chat.jpg')
      .flush(null);
    expect(component).toBeTruthy();
    expect(component.urlImageAvatarChat)
      .toBe('/julia-mello-tattoo/avatar-chat.jpg');
  });

  it('keeps the default avatar when no supported extension exists', () => {
    const extensions = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'];

    for (const extension of extensions) {
      httpMock
        .expectOne(`/julia-mello-tattoo/avatar-chat.${extension}`)
        .flush(null, { status: 404, statusText: 'Not Found' });
    }

    expect(component.urlImageAvatarChat)
      .toBe('/assets/images/orc-tatuadora.png');
  });
});
