import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public booksDiscount;
  public total = 0;
  public messagePayment: string;

  constructor(public _cartService: CartService, private _router: Router) { }

  ngOnInit() {
    this.getBookDiscount();
  }

  public getBookDiscount() {
    if (localStorage.getItem('cart')) {
      this.booksDiscount = JSON.parse(localStorage.getItem('cart'));
      this.BooksPriceTotal();
      this.getDiscount();
    }
  }

  public BooksPriceTotal() {
    this.total = 0;
    this.booksDiscount.forEach(e => {
      this.total += e.price;
    });
  }
  public getDiscount() {
    this._cartService.getDiscount(this.booksDiscount).subscribe(bookOffers => {
      this.total = this._cartService.getBestDiscount(bookOffers, this.total);
    });
  }

  deletedBook(oneBook) {
    this.booksDiscount = this.booksDiscount.filter(obj => obj.isbn !== oneBook.isbn);

    if (this.booksDiscount.length !== 0) {
      localStorage.setItem('cart', JSON.stringify(this.booksDiscount));
      this.BooksPriceTotal();
      this.getDiscount();
    } else {
      localStorage.removeItem('cart');
      this.booksDiscount = [];
    }
    this._cartService._countCartInSubject.next(this._cartService.countItem());
  }

  public payment() {
    this.messagePayment = 'Merci de vos achats.';
    this.booksDiscount = [];
    localStorage.removeItem('cart');
    this._cartService._countCartInSubject.next(this._cartService.countItem());
  }
}
