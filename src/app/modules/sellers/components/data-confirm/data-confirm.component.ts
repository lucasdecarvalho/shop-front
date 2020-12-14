import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { SellersService } from '../../sellers.service';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-data-confirm',
  templateUrl: './data-confirm.component.html',
  styleUrls: ['./data-confirm.component.scss']
})
export class DataConfirmComponent implements OnInit {

  private stepper: Stepper;
  public formConfirm: FormGroup;
  public company: any;
  public errors: any;
  public submitted: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder, 
    private seller: SellersService, 
    private router: Router) 
    {  
      this.formConfirm = this.formBuilder.group({

        firstName: ['', [Validators.required, Validators.maxLength(255)]], //
        lastName: ['', [Validators.required, Validators.maxLength(255)]], //
        cpf: ['', [Validators.required, Validators.maxLength(14)]], // 379.333.588-70
        cel: ['', [Validators.required, Validators.maxLength(15)]], //
        
        fantasia: ['', [Validators.required, Validators.maxLength(255)]], //
        // nome: ['', [Validators.required, Validators.maxLength(255)]], //
        // abertura: ['', [Validators.required, Validators.maxLength(10)]], // 31/12/2020
        logradouro: ['', [Validators.required, Validators.maxLength(255)]], //
        numero: ['', [Validators.required, Validators.maxLength(15)]], //
        complemento: ['', [Validators.maxLength(255)]], //
        bairro: ['', [Validators.required, Validators.maxLength(255)]], //
        municipio: ['', [Validators.required, Validators.maxLength(255)]], //
        uf: ['', [Validators.required, Validators.maxLength(2)]], //
        cep: ['', [Validators.required, Validators.maxLength(10)]], //
        telefone: ['', [Validators.required, Validators.maxLength(15)]], // (11) 95812-9698
        telefone2: ['', [Validators.maxLength(15)]], //
        // alias: ['', [Validators.required, Validators.maxLength(255)]], //
        
        bankName: ['', [Validators.required]], //
        bankType: ['', [Validators.required]], //
        bankAg: ['', [Validators.required]], //
        bankAccount: ['', [Validators.required]], //
      });
    }
                
  ngOnInit() { 
    this.seller.sellerData()
      .subscribe(response => {

        this.company = response;

        console.log(this.company);

        this.formConfirm.patchValue({
          fantasia: this.company.seller.fantasia,
          nome: this.company.seller.nome,
          abertura: this.company.seller.abertura,
          logradouro: this.company.seller.logradouro,
          numero: this.company.seller.numero,
          complemento: this.company.seller.complemento,
          bairro: this.company.seller.bairro,
          municipio: this.company.seller.municipio,
          uf: this.company.seller.uf,
          cep: this.company.seller.cep,
          telefone: this.company.seller.telefone,
          telefone2: this.company.seller.telefone2,
          alias: this.company.seller.alias,
          firstName: this.company.seller.firstName,
          lastName: this.company.seller.lastName,
          cpf: this.company.seller.cpf,
          cel: this.company.seller.cel,
          bankName: this.company.seller.bankName,
          bankType: this.company.seller.bankType,
          bankAg: this.company.seller.bankAg,
          bankAccount: this.company.seller.bankAccount,
        });
      });
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
  }

  get f() { return this.formConfirm.controls; }


  next(id: boolean) {
    
    this.submitted = true;

    if(id) {

      event.preventDefault();
      if (this.f.firstName.invalid || this.f.lastName.invalid || this.f.cpf.invalid || this.f.cel.invalid) {
        return;
      }
    }

    if(id) {

      event.preventDefault();
      if (this.f.fantasia.invalid || this.f.telefone.invalid || this.f.telefone2.invalid || this.f.cep.invalid || this.f.logradouro.invalid || this.f.numero.invalid || this.f.complemento.invalid || this.f.bairro.invalid || this.f.municipio.invalid || this.f.uf.invalid) {
        return;
      }
    }
    
    if (!id) {
      if (this.formConfirm.invalid) {
        event.preventDefault();
        return;
      }
    }

    this.seller.updateCompany(this.formConfirm.value)
          .subscribe(res => {

              this.stepper.next();
              console.log("avançou");
            },
            error => {
              this.errors = error.error.errors;
              
              for (let property in this.errors) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: this.errors[property],
                  footer: '<a href> Precisa de ajuda? Chat com nosso atendimento</a>'
                })
              }

            });
    }

  prev() {
    event.preventDefault()
    this.stepper.previous();
    console.log("voltou");
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
