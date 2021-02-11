import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SellersService } from 'src/app/modules/sellers/sellers.service';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  products: any;
  alias: string;
  cnpj: string;
  endereco: string;
  since: string;
  fantasia: string;
  fone: string;
  brand: string;

  constructor(
    private title: Title,
    private storeService: StoreService, 
    private seller: SellersService,
    private SpinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute) { 

    this.title.setTitle('Shop Rio Claro');
  }

  ngOnInit(): void {

    this.alias = this.activatedRoute.snapshot.paramMap.get('store');

          this.seller.showSellerByAlias(this.alias)
              .subscribe(data => {

                let id = data['id'];

                this.fantasia = data['fantasia'];
                this.cnpj = data['cnpj'];
                this.since = data['abertura'];
                this.fone = data['telefone'];
                this.endereco = data['logradouro'] + ', ' + data['numero'] + ' - ' + data['complemento'] + ' - ' + data['bairro'] + ' - CEP: ' + data['cep'] + ' - ' + data['municipio'] + '/' + data['uf'];

                this.storeService.companyProducts(id)
                    .subscribe(data => {
                      
                      this.products = data;
                      
                    },
                    error => {
                      console.log('erros: ', error);
                    });
              });


  }

}
