import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store.service';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";
import { UsersService } from 'src/app/modules/users/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  groupByCompany: any = {};
  items = this.storeService.getItems();
  price: number;
  url: string = environment.api_url+'/storage/';
  subtotal: any = 0;
  storaged: any = {};
  order: any = {};
  errors: any = [];
  closeModal: any;

  constructor(public storeService: StoreService, public auth: UsersService, private router: Router) {  }
  
  ngOnInit(): void {

    this.storaged = JSON.parse(localStorage.getItem('cart'));

    if(this.storaged) {
      this.storaged.forEach(item => {
        this.subtotal += Number(item.price);
      })
    }

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
    this.storaged.splice(index, 1);
    localStorage.setItem('cart',JSON.stringify(this.storaged));
  }

  cleanCart() {
    this.storeService.clearCart();
  }

  clientLogon() {
    this.order = {
      'cart': this.storaged,
      'buyer': localStorage.getItem('token'),
    }
    if(!this.order.buyer) {
      alert('Você precisa estar logado(a) para continuar');
    } else {
      this.router.navigateByUrl('pagamento');
    }
  }

  onSubmit(data: any) {
        
    this.auth.userLogin(data)
        .subscribe(res => {

          // response['typeAccount'] = 'seller';
          // this.dataAccess(response);

          let closeModal = document.getElementsByClassName('show');
          let closeModalBody = document.getElementsByClassName('modal-open');
          let closeModalBg = document.getElementsByClassName('modal-backdrop');
          
          closeModal[0].removeAttribute('class');
          closeModalBody[0].removeAttribute('class');
          closeModalBg[0].removeAttribute('class');

          window.localStorage.setItem('token',res['access_token']);
          
          this.router.navigateByUrl('pagamento');
        }, error => {

            this.errors = error.error.errors

            if (error.error.errors) {
              console.log('Erro ao logar: ', this.errors);
            }
        });
  }

  onSubmitRegister(data: any) {

    this.auth.createUser(data)
        .subscribe(an => {
      
          this.auth.userLogin(data)
          .subscribe(res => {

              let closeModal = document.getElementsByClassName('show');
              let closeModalBg = document.getElementsByClassName('modal-backdrop');
              
              closeModal[0].removeAttribute('class');
              closeModalBg[0].removeAttribute('class');
        
              window.localStorage.setItem('token',res['access_token']);

              this.router.navigateByUrl('pagamento');
          }, error => {
              
              this.errors = error.error.errors

              if (error.error.errors) {
                  console.log('Erro ao logar após registrar: ', this.errors);
              }
          });

        }, error => {

            this.errors = error.error.errors

            if (error.error.errors) {
                console.log('Erro ao registrar: ', this.errors);
            }
        });
  }

}