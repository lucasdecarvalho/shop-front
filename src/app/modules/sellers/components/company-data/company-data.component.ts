import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { SellersService } from '../../sellers.service';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.scss']
})
export class CompanyDataComponent implements OnInit {

  public formConfirm: FormGroup;
  public company: any;
  public errors: any;
  public submitted: boolean = false;
  public nome: string;
  isValidFlg:boolean = true;
  address: any;
  url1: any = 'https://icons-for-free.com/iconfiles/png/512/add+board+new+plus+icon-1320186882821780394.png';
  formData: any = new FormData();
  
  constructor(
    private title: Title,
    private formBuilder: FormBuilder, 
    private seller: SellersService, 
    private router: Router) 
    {  

      this.title.setTitle('Confirme seus dados');
      this.formConfirm = this.formBuilder.group({

        firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        cel: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(15)]],
        
        logo: [''],
        fantasia: ['', [Validators.required, Validators.maxLength(255)]],
        // nome: ['', [Validators.required, Validators.maxLength(255)]],
        // abertura: ['', [Validators.required, Validators.maxLength(10)]],
        logradouro: ['', [Validators.required, Validators.maxLength(255)]],
        numero: ['', [Validators.required, Validators.maxLength(15)]],
        complemento: ['', [Validators.maxLength(255)]],
        bairro: ['', [Validators.required, Validators.maxLength(255)]],
        // bairro: [{value: '', disabled: true}, [Validators.required, Validators.maxLength(255)]],
        municipio: ['', [Validators.required, Validators.maxLength(255)]],
        uf: ['', [Validators.required, Validators.maxLength(2)]],
        cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
        telefone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(14)]],
        telefone2: ['', [Validators.minLength(10), Validators.maxLength(14)]],
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

        if(response['logo'] !== null) {
          this.url1 = environment.api_url+'/storage/'+ response['seller']['logo'];
        }

        if(this.company.seller.telefone != null && this.company.seller.telefone.length > 14) {
          
          let fone = this.company.seller.telefone.split('/ ');
          this.company.seller.telefone = fone[0];
          this.company.seller.telefone2 = fone[1];
        }

        this.formConfirm.patchValue({
          logo: this.company.seller.logo,
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

  uploadFile1(event) {

    const file = (event.target as HTMLInputElement).files[0];

    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        this.url1 = (<FileReader>event.target).result;
      }
    }

    this.formConfirm.patchValue({
      logo: file,
    });

    this.formConfirm.get('logo').updateValueAndValidity()
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
    
    if (id == 2) {
      
      // if (this.formConfirm.invalid) {
        //   event.preventDefault();
        //   return;
        // }
              
      if (this.f.fantasia.invalid || this.f.telefone.invalid || this.f.telefone2.invalid || this.f.cep.invalid || this.f.logradouro.invalid || this.f.numero.invalid || this.f.complemento.invalid || this.f.bairro.invalid || this.f.municipio.invalid || this.f.uf.invalid) {
        event.preventDefault();
        return;
      }
  
      if(this.formConfirm.controls.municipio.value !== 'Rio Claro' && this.formConfirm.controls.municipio.value !== 'RIO CLARO' || this.formConfirm.controls.uf.value !== 'SP' ) {
        event.preventDefault();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'A cidade informada não faz parte da nossa cobertura. Sua empresa precisa ser de Rio Claro/SP.',
          footer: '<a href> Precisa de ajuda? Chat com nosso atendimento</a>'
        })
        return;
      }

    }

    // 
    
    if(this.formConfirm.get('logo').value) {
      this.formData.append('logo', this.formConfirm.get('logo').value);
    }
    
    this.formData.append('fantasia', this.formConfirm.get('fantasia').value);
    this.formData.append('logradouro', this.formConfirm.get('logradouro').value);
    this.formData.append('numero', this.formConfirm.get('numero').value);
    
    if(this.formConfirm.get('complemento').value) {
      this.formData.append('complemento', this.formConfirm.get('complemento').value);
    }

    this.formData.append('bairro', this.formConfirm.get('bairro').value);
    this.formData.append('municipio', this.formConfirm.get('municipio').value);
    this.formData.append('uf', this.formConfirm.get('uf').value);
    this.formData.append('cep', this.formConfirm.get('cep').value);
    this.formData.append('telefone', this.formConfirm.get('telefone').value);

    if(this.formConfirm.get('telefone2').value) {
      this.formData.append('telefone2', this.formConfirm.get('telefone2').value);
    }
    
    this.formData.append('firstName', this.formConfirm.get('firstName').value);
    this.formData.append('lastName', this.formConfirm.get('lastName').value);
    this.formData.append('cpf', this.formConfirm.get('cpf').value);
    this.formData.append('cel', this.formConfirm.get('cel').value);

    this.formData.append('bankName', this.formConfirm.get('bankName').value);
    this.formData.append('bankType', this.formConfirm.get('bankType').value);
    this.formData.append('bankAg', this.formConfirm.get('bankAg').value);
    this.formData.append('bankAccount', this.formConfirm.get('bankAccount').value);
    // 

    console.log('form data: ', [...this.formData]);
    console.log('form confirm: ', this.formConfirm.value);

    this.seller.updateCompany(this.formData)
          .subscribe(res => {
              console.log('sucesso!');
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

}
