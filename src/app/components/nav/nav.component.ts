import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public countItem;

  constructor(public _cartService: CartService) {
    this._cartService.countCart().subscribe(c => this.countItem = c);
  }

  ngOnInit() { }

}
