import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(public find: SharedService) { }

  ngOnInit(): void {

  }
  
  search(keyword: string) {
      this.find.search(keyword);
  }

}
