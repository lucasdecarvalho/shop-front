import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  hasSale: boolean = false;

  constructor(
    private title: Title,
  ) { 
    this.title.setTitle('Suas vendas');
  }

  ngOnInit(): void {
  }

}
