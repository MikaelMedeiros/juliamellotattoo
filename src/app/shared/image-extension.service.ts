import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Observable,
  catchError,
  concatMap,
  defaultIfEmpty,
  filter,
  from,
  map,
  of,
  take
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageExtensionService {
  private readonly http = inject(HttpClient);

  private readonly extensions =
    ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'] as const;

  findImageUrl(path: string): Observable<string | null> {
    const rootPath = path.startsWith('/') ? path : `/${path}`;
    const basePath = rootPath.replace(
      /\.(?:jpg|jpeg|png|webp|avif|gif)$/i,
      ''
    );

    return from(this.extensions).pipe(
      concatMap(extension => {
        const url = `${basePath}.${extension}`;

        return this.http.head(url).pipe(
          map(() => url),
          catchError(() => of(null))
        );
      }),
      filter((url): url is string => url !== null),
      take(1),
      defaultIfEmpty(null)
    );
  }
}
