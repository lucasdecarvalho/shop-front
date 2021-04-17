import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/modules/users/users.service';
import { StoreService } from '../../store.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  clientToken = localStorage.getItem('token');
  buyer: any = {};

  constructor(public router: Router, public user: UsersService, public payment: StoreService) { }

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
    // console.log('ta pago: ', data)
    this.payment.payment(data)
        .subscribe(data => {

          if(data['erro']) {

            Swal.fire({
              position: 'center',
            icon: 'error',
            title: 'Falha de preenchimento',
            html: 'Revise as informações de pagamento e tente concluir sua compra novamente.',
            footer: '<a href> Precisa de ajuda? Chat com nosso atendimento</a>',
            showConfirmButton: true,
            // timer: 1500
            })
          } else {

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Pagamento realizado!',
              // html: 'Revise as informações de pagamento e tente concluir sua compra novamente.',
              // footer: '<a href> Precisa de ajuda? Chat com nosso atendimento</a>',
              showConfirmButton: true,
              // timer: 1500
            })
            this.router.navigateByUrl('clientes');
          }

        }, error => {

          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Falha no pagamento',
            html: 'Revise as informações de pagamento e tente concluir sua compra novamente.',
            footer: '<a href> Precisa de ajuda? Chat com nosso atendimento</a>',
            showConfirmButton: true,
            // timer: 1500
          })
        });
  }

}
