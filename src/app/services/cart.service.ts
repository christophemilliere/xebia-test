import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs/";
import { HttpClient } from '@angular/common/http';
import { configService } from '../configService/configService';

@Injectable()
export class CartService {
  public _countCartInSubject = new BehaviorSubject<number>(this.countItem());

  constructor(private _httpClient: HttpClient) { }

  public getDiscount(books) {
    let api = configService.host.api;
    books.forEach(function (e) {
      api += e.isbn + ',';
    });
    api = `${api.substring(0, api.length - 1)}/commercialOffers`;
    return this._httpClient.get(api).map(res => res);
  }

  getBestDiscount(bookOffers, total) {
    const offers = bookOffers.offers;
    const bestOffers = [];
    offers.forEach(e => {
      if (e.type === 'percentage') {
        const percent = total - ((total * e.value) / 100);
        bestOffers.push(percent);
      }

      if (e.type === 'minus') {
        bestOffers.push(total - e.value);
      }

      if (e.type === 'slice') {
        bestOffers.push(total - Math.floor(total / e.sliceValue) * e.value);
      }
    });
    return Math.min(...bestOffers);
  }

  public countCart(): Observable<number> {
    return this._countCartInSubject.asObservable();
  }

  public countItem() {
    const count = JSON.parse(localStorage.getItem('cart'));
    return (count && count.length) ? count.length : 0;
  }

}
