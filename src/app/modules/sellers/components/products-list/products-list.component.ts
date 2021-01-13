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
  status: string;
  result: string;

  constructor(private seller: SellersService, private storeServive: StoreService, private router: Router) { }

  showHiden(data) {

    this.seller.showProduct(data.id)
        .subscribe(res => {
                
          if(res['available'] == true) {
              this.result = "0";
              this.status = "ocultado";
            }
            if(res['available'] == false) {
              this.result = "1";
              this.status = "publicado";
            }
        
            let formData = new FormData();
        
            formData.append("store", data.store);
            formData.append("name", data.name);
            formData.append("price", data.price);
            formData.append("brand", data.brand);
            formData.append("available", this.result);

            this.seller.editProduct(data.id, formData)
            .subscribe(responde => {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Produto '+ this.status +' com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                });
        });

  }

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
