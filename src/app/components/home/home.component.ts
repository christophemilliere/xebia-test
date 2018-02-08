import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { CartService } from '../../services/cart.service';
import { Book } from '../../models/Book';
import { BehaviorSubject, Observable } from "rxjs/";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public books: Book[];
  public cart = [];
  public searchTerm: string;

  constructor(public _booksService: BooksService, public _cartService: CartService) { }

  ngOnInit() {
    this._booksService.getBooksAll().subscribe(book => {
      this.books = book;
    });
  }

  selectedBook(chooseBook) {
    if (this.cart.indexOf(chooseBook) < 0) { this.cart.push(chooseBook); }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this._cartService._countCartInSubject.next(this._cartService.countItem());
  }
}
