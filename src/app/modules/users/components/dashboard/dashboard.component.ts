import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/modules/users/users.service';
import { StoreService } from '../../../store/store.service';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { Title } from '@angular/platform-browser';
import { isObject } from 'util';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  firstName: string;
  alias: string;
  products: any;
  id: number;

  constructor(
    private title: Title,
    private user: UsersService,
    private storeServive: StoreService, 
    private router: Router) { 

      this.title.setTitle('Painel de controle');
    }

  ngOnInit(): void {

    this.user.userData()
      .subscribe(data => {

        this.firstName = data['user']['name'];

        // this.firstName = 'Nome mocado';
        // this.alias = 'alias mocado';
    });
  }

  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('cart');
    this.router.navigateByUrl('/');
  }

}
