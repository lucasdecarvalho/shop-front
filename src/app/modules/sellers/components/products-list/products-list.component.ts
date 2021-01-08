import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/modules/store/store.service';
import { SellersService } from '../../sellers.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: any;
  sim: boolean = false;

  constructor(private seller: SellersService, private storeServive: StoreService, private router: Router) { }

  ngOnInit(): void {

    this.seller.sellerData()
      .subscribe(response => {

          this.storeServive.companyProducts(response['seller']['id'])
          .subscribe(data => {
              this.products = data;

              if(this.products.length !== 0) {
                this.sim = true;
              } else {
                this.sim = false;
              }
          },
          error => {

          });
      },
      error => {
          Swal.fire({
            icon: 'error',
            title: 'Usuário não encontrado',
            text: '',
            footer: '<a href> Precisa de ajuda? Chat com nosso atendimento</a>'
          })
          window.localStorage.removeItem('token');
          this.router.navigateByUrl('/');
      });

    }

    editProduct(id){
      this.router.navigateByUrl('/vendedores/editar-produto/' + id);
    }
  

}
