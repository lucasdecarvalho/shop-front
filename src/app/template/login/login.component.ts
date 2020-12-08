import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errors: any[] = [];

  constructor(private urlParams: ActivatedRoute, private auth: AuthService, private router: Router) { 

  }

  ngOnInit() {

    window.localStorage.clear();
  }

  onSubmit(data: any) {
        
    this.auth.sellerLogin(data)
        .subscribe(response => {

            //@ts-ignore;
            window.localStorage.setItem('token',response.access_token);
            console.log(response);
        },
        error => {

            if (error.error.errors)
                this.errors = error.error.errors;
            else
                console.log("deu ruim");
        }
        
    );
}

}
