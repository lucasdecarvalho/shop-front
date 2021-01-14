import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellersComponent } from './sellers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataConfirmComponent } from './components/data-confirm/data-confirm.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SellersRoutingModule } from './sellers-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CompanyDataComponent } from './components/company-data/company-data.component';
import { ShortcutsComponent } from './components/shortcuts/shortcuts.component';
import { SalesComponent } from './components/sales/sales.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
import { NgxCurrencyModule } from "ngx-currency";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    DashboardComponent,
    DataConfirmComponent,
    LoginComponent,
    SignupComponent,
    SellersComponent,
    AddProductComponent,
    ProductsListComponent,
    CompanyDataComponent,
    ShortcutsComponent,
    SalesComponent,
    EditProductComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SellersRoutingModule,
    [SweetAlert2Module.forRoot()],
    NgxSpinnerModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule,
    CKEditorModule,
  ]
})
export class SellersModule { }
