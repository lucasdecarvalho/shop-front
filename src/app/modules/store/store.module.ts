import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CompanyComponent } from './components/company/company.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TermsComponent } from './components/terms/terms.component';
import { DetailsComponent } from './components/details/details.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

@NgModule({
  declarations: [
    StoreComponent,
    HomeComponent,
    CompanyComponent,
    AboutUsComponent,
    TermsComponent,
    DetailsComponent,
    SearchResultComponent,
  ],
  imports: [
  CommonModule,
    StoreRoutingModule,
    SharedModule,
    NgxSpinnerModule,
  ]
})
export class StoreModule { }
