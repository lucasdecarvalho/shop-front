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

        // @ts-ignore
        let company = response.seller;

        // @ts-ignore
        this.firstName = company.firstName;

        // @ts-ignore
        this.id = company.id;

          // fantasia: this.company.seller.fantasia,
          // nome: this.company.seller.nome,
          // abertura: this.company.seller.abertura,
          // logradouro: this.company.seller.logradouro,
          // numero: this.company.seller.numero,
          // complemento: this.company.seller.complemento,
          // bairro: this.company.seller.bairro,
          // municipio: this.company.seller.municipio,
          // uf: this.company.seller.uf,
          // cep: this.company.seller.cep,
          // telefone: this.company.seller.telefone,
          // telefone2: this.company.seller.telefone2,
          // alias: this.company.seller.alias,
          // firstName: this.company.seller.firstName,
          // lastName: this.company.seller.lastName,
          // cpf: this.company.seller.cpf,
          // cel: this.company.seller.cel,
          // bankName: this.company.seller.bankName,
          // bankType: this.company.seller.bankType,
          // bankAg: this.company.seller.bankAg,
          // bankAccount: this.company.seller.bankAccount,

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
  

}
