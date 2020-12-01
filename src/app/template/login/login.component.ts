import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from "../auth.service";
import { User } from "../../models/user";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() user: User = <User>{};
  @Output() outputUser: EventEmitter<User> = new EventEmitter();

  companyName: string;
  errors: any[] = [];
  // company_name: string = 'hagana-seguranca-limitada';

  constructor(private urlParams: ActivatedRoute, private Auth: AuthService, private router: Router) { 

  }

  ngOnInit() {

    window.sessionStorage.clear();
    window.localStorage.clear();
  }

  onSubmit(data: any) {
        
    this.Auth.getUserDetails(data)
        .subscribe(response => {

            window.sessionStorage.setItem("company_name", this.companyName);
            //@ts-ignore;
            window.sessionStorage.setItem("schedule_id", response.user['schedule_id']);
            //@ts-ignore;
            window.sessionStorage.setItem("user_id", response.user["id"]);
             //@ts-ignore;
             window.sessionStorage.setItem("name_person", response.user["name"]);
            //@ts-ignore;
            window.sessionStorage.setItem("user_name", response.user["first_name"]);
            //@ts-ignore;
            window.sessionStorage.setItem("last_name", response.user["last_name"]);
            //@ts-ignore;
            window.sessionStorage.setItem("person_id", response.user["candidate_id"]);
            //@ts-ignore;
            window.sessionStorage.setItem("candidate_id", response.user["candidate_id"]);
            //@ts-ignore;
            window.sessionStorage.setItem("status", response.user["status"]);
            //@ts-ignore;
            window.sessionStorage.setItem("interviewer_id", response.user["interviewer_id"]);                   
            //@ts-ignore;
            window.sessionStorage.setItem("accepted_the_terms", response.user["accepted_the_terms"]);
            //@ts-ignore;
            window.sessionStorage.setItem("step", response.user["step"]);
            //@ts-ignore;
            window.sessionStorage.setItem("tokenForReload", response["access_token"]);
            //@ts-ignore;
            window.sessionStorage.setItem("tokenForReload2", response["access_token"]);
            //@ts-ignore;
            window.sessionStorage.setItem("token", response["access_token"]);
            //@ts-ignore;
            window.sessionStorage.setItem('user_type', response.user.type);
            
            //@ts-ignore;
            if (response.user["type"]) {
                this.router.navigate(['home']);
            } else {
                this.router.navigate(['login']);
            }

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
