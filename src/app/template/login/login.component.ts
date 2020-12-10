import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errors: any[] = [];

  constructor(private auth: SignupService, private router: Router) { }

  ngOnInit() {

  }

  dataAccess(data) {

    this.auth.verifyAccess(data)
        .subscribe(res => { });
  }

  onSubmit(data: any) {
        
    this.auth.sellerLogin(data)
        .subscribe(response => {

          response['typeAccount'] = 'seller';

          this.dataAccess(response);
          
          //@ts-ignore;
          window.localStorage.setItem('token',response.access_token);
          
          //@ts-ignore;
          window.localStorage.setItem('typeAccount',response.role);
          
          return this.router.navigateByUrl('/');
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
