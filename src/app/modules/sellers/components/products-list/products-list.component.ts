import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/modules/store/store.service';
import { SellersService } from '../../sellers.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

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

  constructor(
    private title: Title,
    private seller: SellersService, 
    private storeServive: StoreService, 
    private router: Router) { 

      this.title.setTitle('Lista de produtos');
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

  deleteProd(id) {

    Swal.fire({
      title: 'Atenção!',
      text: "Tem certeza que deseja deletar este produto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, deletar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.seller.deleteProduct(id)
          .subscribe(data => {
            Swal.fire({
              title: 'Produto deletado com sucesso!',
              text: '',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            })  
          }, error => {
            console.log('erro', error);
          });
      }
    })
  }

}
