import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Book } from '../models/Book';
import { configService } from '../configService/configService';


@Injectable()
export class BooksService {

  constructor(private _httpClient: HttpClient) { }

  public getBooksAll(): Observable<Book[]> {
    const url = configService.host.api;
    return this._httpClient.get<Book[]>(url).map(res => res);
  }
}
