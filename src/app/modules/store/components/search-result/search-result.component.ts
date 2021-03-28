import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  public keyword;
  public products;

  constructor(public find: SharedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.keyword = this.activatedRoute.snapshot.paramMap.get('keyword');  

    this.find.searchResult(this.keyword)
          .subscribe(data => {
            this.products = data;
          },
          error => {
            console.log('erro');
          })
  }
}
