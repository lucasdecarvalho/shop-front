import { Component, OnInit } from '@angular/core';
import { SellersService } from 'src/app/modules/sellers/sellers.service';
import { StoreService } from '../../store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  prodId: any;
  prod: any;

  constructor(
    private seller: SellersService,
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute) { 

    }

  ngOnInit(): void {

    this.prodId = this.activatedRoute.snapshot.paramMap.get('prodId');

    this.seller.showProduct(this.prodId)
            .subscribe(prod => {
              
              this.prod = prod;
            });
  }

}
