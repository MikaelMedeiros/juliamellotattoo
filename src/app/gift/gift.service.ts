import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gift } from './model/gift.model';

@Injectable({
  providedIn: 'root',
})
export class GiftService {

  private http = inject(HttpClient);

  private readonly KEY = 'gift-admin-key';
  private readonly api = '/api';

  private get key(): string {
    return localStorage.getItem(this.KEY) ?? '';
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'x-api-key': this.key
    });
  }

  createGift(): Observable<{
    giftId: string;
    claimUrl: string;
  }> {

    return this.http.post<{
      giftId: string;
      claimUrl: string;
    }>(
      `${this.api}/gifts/create`,
      {},
      {
        headers: this.headers
      }
    );
  }

  getGift(giftId: string): Observable<Gift> {

    return this.http.get<Gift>(
      `${this.api}/gifts/${giftId}`,
      {
        headers: this.headers
      }
    );
  }

  validateGift(giftId: string): Observable<Gift> {

    return this.http.post<Gift>(
      `${this.api}/gifts/${giftId}/validate`,
      {},
      {
        headers: this.headers
      }
    );
  }

  claimGift(
    giftId: string,
    name: string,
    phone: string
  ): Observable<Gift> {

    return this.http.post<Gift>(
      `${this.api}/gifts/${giftId}/claim`,
      {
        name,
        phone
      }
    );
  }
}