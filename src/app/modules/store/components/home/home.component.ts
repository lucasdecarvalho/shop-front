import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showLoad: boolean = false;

  constructor(private SpinnerService: NgxSpinnerService) { 

  }
  
  ngOnInit() {
    
    window.addEventListener('beforeunload', (event) => {
      this.SpinnerService.show();
    });

    this.SpinnerService.hide();
  }

}
