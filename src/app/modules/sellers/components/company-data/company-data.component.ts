import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SellersService } from '../../sellers.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.scss']
})
export class CompanyDataComponent implements OnInit {

  public formConfirm: FormGroup;
  public company: any;
  public isValidFlg: any;
  public submitted: any;
  public errors: any;

  constructor(
    private title: Title,
    private formBuilder: FormBuilder, 
    private seller: SellersService, 
    private router: Router) { 

      this.title.setTitle('Dados da empresa');

      this.formConfirm = this.formBuilder.group({

        firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        cpf: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
        cel: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
        
        fantasia: ['', [Validators.required, Validators.maxLength(255)]],
        // nome: ['', [Validators.required, Validators.maxLength(255)]],
        // abertura: ['', [Validators.required, Validators.maxLength(10)]],
        logradouro: ['', [Validators.required, Validators.maxLength(255)]],
        numero: ['', [Validators.required, Validators.maxLength(15)]],
        complemento: ['', [Validators.maxLength(255)]],
        bairro: ['', [Validators.required, Validators.maxLength(255)]],
        municipio: ['', [Validators.required, Validators.maxLength(255)]],
        uf: ['', [Validators.required, Validators.maxLength(2)]],
        cep: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        telefone: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
        telefone2: ['', [Validators.minLength(14), Validators.maxLength(14)]],
        // alias: ['', [Validators.required, Validators.maxLength(255)]],
        
        bankName: ['', [Validators.required]],
        bankType: ['', [Validators.required]],
        bankAg: ['', [Validators.required]],
        bankAccount: ['', [Validators.required]],
      });
    }

  ngOnInit(): void {

    this.seller.sellerData()
      .subscribe(response => {

        this.company = response;

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
      },
      error => {
          Swal.fire({
            icon: 'error',
            title: 'Usuário não encontrado',
            text: '',
            footer: '<a href> Precisa de ajuda? Chat com nosso atendimento</a>'
          })
          window.localStorage.removeItem('token');
          this.router.navigateByUrl('/vendedores');
      });
  }

  get f() { return this.formConfirm.controls; }

  onSubmit() {

    this.submitted = true;

    event.preventDefault();

    if (this.formConfirm.invalid) {
        return;
      }

      if(this.formConfirm.controls.municipio.value !== 'Rio Claro' || this.formConfirm.controls.uf.value !== 'SP' ) {
        event.preventDefault();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'A cidade informada não faz parte da nossa cobertura. Sua empresa precisa ser de Rio Claro/SP.',
          footer: '<a href> Precisa de ajuda? Chat com nosso atendimento</a>'
        })
        return;
      }

    this.seller.updateCompany(this.formConfirm.value)
        .subscribe(res => {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Dados alterados com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl(`vendedores`);

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

  buscaCEP() {
    
    const cep = this.formConfirm.get('cep').value;

    if(cep != null && cep !== '') {
      this.seller.consultaCEP(cep)
          .subscribe(dados => this.populateAddress(dados));
    }
  }

  populateAddress(dados) {
    this.formConfirm.patchValue({
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      municipio: dados.localidade,
      uf: dados.uf,
      complemento: '',
      numero: ''

    })
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
