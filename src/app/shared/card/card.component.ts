import { Component, Input, OnInit } from '@angular/core';
import { SellersService } from 'src/app/modules/sellers/sellers.service';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() products = [];
  p: any = [];
  url: string;
  company: string;
  
  constructor(private SellerService: SellersService, private router: Router) {
    this.p = this.products;
    this.url = environment.api_url + '/storage/';
  }
  
  ngOnInit() {
    this.SellerService.sellerData()
        .subscribe(user => {
          this.company = user['seller']['fantasia'];
        })
  }
  
  navToStore(id) {
    this.SellerService.store(id)
        .subscribe(
          response => { 
            this.router.navigateByUrl('loja/'+response['alias']);
          },
          error => { console.log(error) }
          );
  }

}
