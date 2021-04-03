import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items = this.storeService.getItems();
  price: number;
  url: string = environment.api_url+'/storage/';
  subtotal: any = 0;

  constructor(public storeService: StoreService) { }

  ngOnInit(): void {

    this.items.forEach(item => {
      this.subtotal += Number(item.price);
    });
    console.log(this.subtotal);
  }

}
