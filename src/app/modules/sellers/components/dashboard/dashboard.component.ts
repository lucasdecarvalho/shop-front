import { Component, OnInit } from '@angular/core';
import { SellersService } from '../../sellers.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  firstName: string;

  constructor(private seller: SellersService) { }

  ngOnInit(): void {

    this.seller.sellerData()
      .subscribe(response => {

        // @ts-ignore
        let company = response.seller;

        // @ts-ignore
        this.firstName = company.firstName;

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
      });
  }
}
