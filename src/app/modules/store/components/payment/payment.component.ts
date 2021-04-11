import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/modules/users/users.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  clientToken = localStorage.getItem('token');
  buyer: any = {};

  constructor(public router: Router, public user: UsersService) { }

  ngOnInit(): void {

    if(!this.clientToken) {
      this.router.navigateByUrl('/');
    }
    
    this.user.userData()
        .subscribe(data => {

          this.buyer = data;
        });

  }

  submitPayment(data: any) {
    console.log('ta pago: ', data)
  }

}
