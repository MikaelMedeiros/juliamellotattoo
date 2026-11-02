import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageExtensionService } from '../../shared/image-extension.service';
import { Banner } from './model/banner.model';

@Injectable({
  providedIn: 'root'
})
export class BannerImageService {

  constructor(
    private readonly imageExtensionService: ImageExtensionService
  ) {}

  filterExistingImages(
    banners: Banner[],
    defaultTitle: string,
    defaultButtonLabel: string,
    defaultButtonSection: string
    ): Observable<Banner[]> {

    return forkJoin(
      banners.map(banner =>
        this.imageExtensionService.findImageUrl(banner.image).pipe(
          map(image => ({
            banner,
            image
          }))
        )
      )
    ).pipe(
      map(results =>
        results
          .filter(
            (result): result is typeof result & { image: string } =>
              result.image !== null
          )
          .map(result => ({
            ...result.banner,
            image: result.image,
            title: result.banner.title ?? defaultTitle,
            buttonLabel: result.banner.buttonLabel ?? defaultButtonLabel,
            buttonSection:
              result.banner.buttonSection ?? defaultButtonSection
          }))
      )
    );
  }
}