import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CompanyComponent } from './components/company/company.component';

@NgModule({
  declarations: [
    StoreComponent,
    HomeComponent,
    CompanyComponent,
  ],
  imports: [
  CommonModule,
    StoreRoutingModule,
    SharedModule,
    NgxSpinnerModule,
  ]
})
export class StoreModule { }
