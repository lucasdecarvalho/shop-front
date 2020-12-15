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
  public nome: string;
  isValidFlg:boolean = true;
  
  constructor(
    private formBuilder: FormBuilder, 
    private seller: SellersService, 
    private router: Router) 
    {  
      this.formConfirm = this.formBuilder.group({

        firstName: ['', [Validators.required, Validators.maxLength(255)]],
        lastName: ['', [Validators.required, Validators.maxLength(255)]],
        cpf: ['', [Validators.required, Validators.maxLength(14)]],
        cel: ['', [Validators.required, Validators.maxLength(15)]],
        
        fantasia: ['', [Validators.required, Validators.maxLength(255)]],
        // nome: ['', [Validators.required, Validators.maxLength(255)]],
        // abertura: ['', [Validators.required, Validators.maxLength(10)]],
        logradouro: [{value: '', disabled: true}, Validators.required, Validators.maxLength(255)],
        numero: ['', [Validators.required, Validators.maxLength(15)]],
        complemento: ['', [Validators.maxLength(255)]],
        bairro: [{value: '', disabled: true}, [Validators.required, Validators.maxLength(255)]],
        municipio: [{value: '', disabled: true}, [Validators.required, Validators.maxLength(255)]],
        uf: [{value: '', disabled: true}, [Validators.required, Validators.maxLength(2)]],
        cep: ['', [Validators.required, Validators.maxLength(10)]],
        telefone: ['', [Validators.required, Validators.maxLength(15)]],
        telefone2: ['', [Validators.maxLength(15)]],
        // alias: ['', [Validators.required, Validators.maxLength(255)]],
        
        bankName: ['', [Validators.required]],
        bankType: ['', [Validators.required]],
        bankAg: ['', [Validators.required]],
        bankAccount: ['', [Validators.required]],
      });
    }
                
  ngOnInit() { 

    this.seller.sellerData()
      .subscribe(response => {

        this.company = response;
        this.nome = this.company.seller.nome;

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


  next(id: number) {
    
    this.submitted = true;

    if(id == 1) {

      event.preventDefault();
      if (this.f.firstName.invalid || this.f.lastName.invalid || this.f.cpf.invalid || this.f.cel.invalid) {
        return;
      }
    }

    if(id == 2) {

      event.preventDefault();
      if (this.f.fantasia.invalid || this.f.telefone.invalid || this.f.telefone2.invalid || this.f.cep.invalid || this.f.logradouro.invalid || this.f.numero.invalid || this.f.complemento.invalid || this.f.bairro.invalid || this.f.municipio.invalid || this.f.uf.invalid) {
        return;
      }
    }
    
    if (id == 3) {
      if (this.formConfirm.invalid) {
        event.preventDefault();
        return;
      }
    }

    this.seller.updateCompany(this.formConfirm.value)
          .subscribe(res => {

              this.stepper.next();
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

  validateCpf(field) {
    let phoneNumDigits = field.value.replace(/\D/g, '');
  
    this.isValidFlg = (phoneNumDigits.length == 0 || phoneNumDigits.length == 18);
  
    let formattedNumber = phoneNumDigits;
    if (phoneNumDigits.length >= 4)
      formattedNumber = phoneNumDigits.substring(0, 3) + '.' + phoneNumDigits.substring(3);
    if (phoneNumDigits.length >= 7)
      formattedNumber = phoneNumDigits.substring(0, 3) + '.' + phoneNumDigits.substring(3, 6) + '.' + phoneNumDigits.substring(6);
    if (phoneNumDigits.length >= 10)
      formattedNumber = phoneNumDigits.substring(0, 3) + '.' + phoneNumDigits.substring(3, 6) + '.' + phoneNumDigits.substring(6,9) +'-'+ phoneNumDigits.substring(9);
    if (phoneNumDigits.length >= 11)
      formattedNumber = phoneNumDigits.substring(0, 3) + '.' + phoneNumDigits.substring(3, 6) + '.' + phoneNumDigits.substring(6,9) +'-'+ phoneNumDigits.substring(9,11) + phoneNumDigits.substring(11);
  
    field.value = formattedNumber;
  }

  validateCel(field) {
    let phoneNumDigits = field.value.replace(/\D/g, '');
  
    this.isValidFlg = (phoneNumDigits.length == 0 || phoneNumDigits.length == 18);
  
    let formattedNumber = phoneNumDigits;
    if (phoneNumDigits.length >= 3)
      formattedNumber = '(' + phoneNumDigits.substring(0, 2) + ') ' + phoneNumDigits.substring(2);
    if (phoneNumDigits.length >= 8)
      formattedNumber = '(' + phoneNumDigits.substring(0, 2) + ') ' + phoneNumDigits.substring(2, 7) + '-' + phoneNumDigits.substring(7);
    if (phoneNumDigits.length >= 12)
      formattedNumber = '(' + phoneNumDigits.substring(0, 2) + ') ' + phoneNumDigits.substring(2, 7) + '-' + phoneNumDigits.substring(7,11);
  
    field.value = formattedNumber;
  }

  validatePhoneNo(field) {
    let phoneNumDigits = field.value.replace(/\D/g, '');
  
    this.isValidFlg = (phoneNumDigits.length == 0 || phoneNumDigits.length == 18);
  
    let formattedNumber = phoneNumDigits;
    if (phoneNumDigits.length >= 3)
      formattedNumber = '(' + phoneNumDigits.substring(0, 2) + ') ' + phoneNumDigits.substring(2);
    if (phoneNumDigits.length >= 7)
      formattedNumber = '(' + phoneNumDigits.substring(0, 2) + ') ' + phoneNumDigits.substring(2, 6) + '-' + phoneNumDigits.substring(6);
    if (phoneNumDigits.length >= 11)
      formattedNumber = '(' + phoneNumDigits.substring(0, 2) + ') ' + phoneNumDigits.substring(2, 6) + '-' + phoneNumDigits.substring(6,10);
  
    field.value = formattedNumber;
  }

  validateCep(field) {
    let phoneNumDigits = field.value.replace(/\D/g, '');
  
    this.isValidFlg = (phoneNumDigits.length == 0 || phoneNumDigits.length == 18);
  
    let formattedNumber = phoneNumDigits;
    if (phoneNumDigits.length >= 3)
      formattedNumber = phoneNumDigits.substring(0, 2) + '.' + phoneNumDigits.substring(2);
    if (phoneNumDigits.length >= 6)
      formattedNumber = phoneNumDigits.substring(0, 2) + '.' + phoneNumDigits.substring(2, 5) + '-' + phoneNumDigits.substring(5);
  
    field.value = formattedNumber;
  }

}
