import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() products = [];
  p: any = [];
  url: string;
  
  constructor() {
    this.p = this.products;
    this.url = environment.api_url + '/storage/';
  }
  
  ngOnInit() {
  }

}
