import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Banner } from './model/banner.model';

@Injectable({
  providedIn: 'root'
})
export class BannerImageService {

  constructor(private http: HttpClient) {}

  imageExists(url: string): Observable<boolean> {
    return this.http.head(url, { observe: 'response' }).pipe(
      map(response => response.ok),
      catchError(() => of(false))
    );
  }

  filterExistingImages(
    banners: Banner[],
    defaultTitle: string,
    defaultButtonLabel: string,
    defaultButtonSection: string
    ): Observable<Banner[]> {

    return forkJoin(
        banners.map(banner =>
        this.imageExists(banner.image).pipe(
            map(exists => ({
            banner,
            exists
            }))
        )
        )
    ).pipe(
        map(results =>
        results
            .filter(result => result.exists)
            .map(result => ({
            ...result.banner,
            title: result.banner.title ?? defaultTitle,
            buttonLabel: result.banner.buttonLabel ?? defaultButtonLabel,
            buttonSection:
                result.banner.buttonSection ?? defaultButtonSection
            }))
        )
    );
    }
}