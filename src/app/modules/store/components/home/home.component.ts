import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showLoad: boolean = false;
  products: any;

  constructor(private storeService: StoreService, private SpinnerService: NgxSpinnerService) { 

  }
  
  ngOnInit() {
    
    this.storeService.allProducts()
        .subscribe(data => {
          this.products = data;
        },
        error => {
          // console.log('erros: ', error);          
        });
  }

}
