import { Component, OnInit } from '@angular/core';
import { SellersService } from '../../sellers.service';
import { StoreService } from '../../../store/store.service';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  firstName: string;
  products: any;
  id: number;

  constructor(
    private title: Title,
    private seller: SellersService, 
    private storeServive: StoreService, 
    private router: Router) { 

      this.title.setTitle('Painel de controle');
    }

  ngOnInit(): void {

    }

    logout() {
      window.localStorage.removeItem('token');
      this.router.navigateByUrl('/');
    }

  }
