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

  dataAccess() {
    alert("acessou");
  }

  onSubmit(data: any) {
        
    this.auth.sellerLogin(data)
        .subscribe(response => {

          // @ts-ignore
          let res = JSON.stringify(response);
          //@ts-ignore;
          console.log("dados: "+response.m_name);
          this.dataAccess();
          //@ts-ignore;
          window.localStorage.setItem('token',response.access_token);
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
