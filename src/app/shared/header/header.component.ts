import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {  }

  storaged: any = {};
  cartItems: number;

  ngOnInit() {

    this.storaged = JSON.parse(localStorage.getItem('cart'));

    if(this.storaged)
    this.cartItems = this.storaged.length;

  }

}
