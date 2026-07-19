import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Gift } from './model/gift.model';
import { GiftFilterDto } from './model/gift-filter.dto';
import { GiftPageDto } from './model/gift-page.dto';

@Injectable({
  providedIn: 'root',
})
export class GiftService {

  private readonly http = inject(HttpClient);

  private readonly api = '/api';
  private readonly resource = `${this.api}/gifts`;

  createGift(): Observable<{
    giftId: string;
    claimUrl: string;
  }> {

    return this.http.post<{
      giftId: string;
      claimUrl: string;
    }>(
      `${this.resource}/create`,
      {}
    );
  }

  getGift(giftId: string): Observable<Gift> {
    return this.http.get<Gift>(
      `${this.resource}/${giftId}`
    );
  }

  getGifts(filter: GiftFilterDto): Observable<GiftPageDto> {
    return this.http.post<GiftPageDto>(
      `${this.resource}/search`,
      filter
    );
  }

  validateGift(giftId: string): Observable<Gift> {
    return this.http.post<Gift>(
      `${this.resource}/${giftId}/validate`,
      {}
    );
  }

  claimGift(
    giftId: string,
    name: string,
    phone: string
  ): Observable<Gift> {

    return this.http.post<Gift>(
      `${this.resource}/${giftId}/claim`,
      {
        name,
        phone
      }
    );
  }

}