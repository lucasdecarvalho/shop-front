import { Component, Input, OnInit } from '@angular/core';
import { SellersService } from 'src/app/modules/sellers/sellers.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

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
  
  constructor(
    private SellerService: SellersService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.p = this.products;
      this.url = environment.api_url+'/storage/';
  }
  
  ngOnInit() {
    
    let alias = this.activatedRoute.snapshot.paramMap.get('store');
    if (alias) {
      this.products['brand'] = null;
    }
  }
  
  navToProd(store, id) {
    this.SellerService.store(store)
        .subscribe(
          response => { 

            this.router.navigateByUrl('loja/'+response['alias'] + '/' + id);
          },
          
          );
  }
  
  navToStore(id) {
    this.SellerService.store(id)
        .subscribe(
          response => { 
            this.router.navigateByUrl('loja/'+response['alias']);
          },
          
          );
  }

}
