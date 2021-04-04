import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store.service';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";
import { SellersService } from 'src/app/modules/sellers/sellers.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  groupByCompany = {};
  items = this.storeService.getItems();
  price: number;
  url: string = environment.api_url+'/storage/';
  subtotal: any = 0;
  storaged: any = {};
  order; any = {};
  errors: any[] = [];

  constructor(public storeService: StoreService, private auth: SellersService, private router: Router) {  }
  
  ngOnInit(): void {

    this.storaged = JSON.parse(localStorage.getItem('cart'));

    this.storaged.forEach(item => {
      this.subtotal += Number(item.price);
    });

    this.groupByCompany = this.groupByType(this.storaged);
  }

  groupByType(array){
    return array.reduce((r, a) => {
          r[a.brand] = r[a.brand] || [];
          r[a.brand].push(a);
          return r;
      }, Object.create(null));
  }

  cleanItem(index) {
    console.log(index);
    this.storaged.splice(index, 1);
    localStorage.setItem('cart',JSON.stringify(this.storaged));
  }

  cleanCart() {
    this.storeService.clearCart();
  }

  clientLogon() {
    this.order = {
      'cart': this.storaged,
      'buyer': null,
    }
    if(!this.order.buyer) {
      alert('vc precisa estar logado para continuar');
    } else {
      console.log(this.order);
    }
  }

  onSubmit(data: any) {

    console.log('chegou aqui');
        
    this.auth.sellerLogin(data)
        .subscribe(response => {

          // response['typeAccount'] = 'seller';
          // this.dataAccess(response);
          
          //@ts-ignore;
          window.localStorage.setItem('token',response.token);
          // @ts-ignore
          
          //@ts-ignore;
          // window.localStorage.setItem('typeAccount',response.role);
          
          return this.router.navigateByUrl('vendedores');
        },
        error => {

            if (error.error.errors)
                this.errors = error.error.errors;
        }
        
    );
  }

}