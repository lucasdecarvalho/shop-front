import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SellersService } from '../../sellers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errors: any[] = [];

  constructor(private auth: SellersService, private router: Router) { }

  ngOnInit() {

  }

  dataAccess(data) {

    this.auth.verifyAccess(data)
        .subscribe(res => { });
  }

  onSubmit(data: any) {
        
    this.auth.sellerLogin(data)
        .subscribe(response => {

          // response['typeAccount'] = 'seller';
          // this.dataAccess(response);
          
          //@ts-ignore;
          window.localStorage.setItem('token',response.token);
          // @ts-ignore
          
          //@ts-ignore;
          // window.localStorage.setItem('typeAccount',response.role);
          
          return this.router.navigateByUrl('vendedores');
        },
        error => {

            if (error.error.errors)
                this.errors = error.error.errors;
            else
                console.log("Erro ao logar");
        }
        
    );
}

}
