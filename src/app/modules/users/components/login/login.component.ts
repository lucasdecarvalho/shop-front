import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errors: any[] = [];

  constructor(
    private title: Title,
    private auth: UsersService, 
    private router: Router) { 

      this.title.setTitle('Login');
    }

  ngOnInit() {
    
  }

  onSubmit(data: any) {
        
    this.auth.userLogin(data)
        .subscribe(response => {

          // response['typeAccount'] = 'seller';
          // this.dataAccess(response);
          
          //@ts-ignore;
          window.localStorage.setItem('token',response.token);
          // @ts-ignore
          
          //@ts-ignore;
          // window.localStorage.setItem('typeAccount',response.role);
          
          return this.router.navigateByUrl('clientes');
        },
        error => {

            if (error.error.errors)
                this.errors = error.error.errors;
        }
        
    );
}

}
