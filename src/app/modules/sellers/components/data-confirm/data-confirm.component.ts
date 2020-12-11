import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { isString } from 'util';
import { SellersService } from '../../sellers.service';

@Component({
  selector: 'app-data-confirm',
  templateUrl: './data-confirm.component.html',
  styleUrls: ['./data-confirm.component.scss']
})
export class DataConfirmComponent implements OnInit {

  company: any;
  formConfirm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private seller: SellersService, private router: Router) {  }
                
  ngOnInit() { 

    this.company = window.localStorage.getItem('companyData');
    this.company = JSON.parse(this.company);

    let company = this.company;

    // this.formConfirm = new FormGroup({
    //   fantasia: new FormControl( 123 )
    //   telefone: new FormControl( company.telefone ),
    //   telefone2: new FormControl( company.telefone2 ),
    //   cep: new FormControl( company.cep ),
    //   logradouro: new FormControl({ value: company.logradouro, disabled: true }),
    //   numero: new FormControl( company.numero ),
    //   complemento: new FormControl( company.complemento ),
    //   bairro: new FormControl({ value: company.bairro, disabled: true }),
    //   municipio: new FormControl({ value: company.municipio, disabled: true }),
    //   uf: new FormControl({ value: company.uf, disabled: true })
    // })

    this.formConfirm = this.formBuilder.group({
      fantasia: [company.fantasia, [Validators.required, Validators.minLength(14), Validators.maxLength(18)]],
      telefone: [company.telefone, [Validators.required, Validators.minLength(14), Validators.maxLength(18)]],
      telefone2: [company.telefone2, [Validators.required, Validators.minLength(14), Validators.maxLength(18)]],
      cep: [company.cep, [Validators.required, Validators.minLength(14), Validators.maxLength(18)]],
      logradouro: [company.logradouro, [Validators.required, Validators.minLength(14), Validators.maxLength(18)]],
      numero: [company.numero, [Validators.required, Validators.minLength(14), Validators.maxLength(18)]],
      complemento: [company.complemento, [Validators.required, Validators.minLength(14), Validators.maxLength(18)]],
      bairro: [company.bairro, [Validators.required, Validators.minLength(14), Validators.maxLength(18)]],
      municipio: [company.municipio, [Validators.required, Validators.minLength(14), Validators.maxLength(18)]],
      uf: [company.uf, [Validators.required, Validators.minLength(14), Validators.maxLength(18)]]
    });
  }

  onSubmit() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Dados confirmados com sucesso!',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigateByUrl(`vendedores`);
  }

  buscaCEP() {
    console.log("muito malandro");
  }

}
