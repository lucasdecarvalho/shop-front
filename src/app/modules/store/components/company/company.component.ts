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
