import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-confirm',
  templateUrl: './data-confirm.component.html',
  styleUrls: ['./data-confirm.component.scss']
})
export class DataConfirmComponent implements OnInit {

  @Input() recebeDataCompany: any;
  company: any;
  formConfirm: FormGroup;
  
  constructor() {  
  }
  
  ngOnInit(): void { 

    
  }
  
  ngOnChanges() {
    this.company = this.recebeDataCompany;
  
    this.formConfirm = new FormGroup({
      fantasia: new FormControl( this.company?.fantasia ),
      telefone: new FormControl( this.company?.telefone ),
      telefone2: new FormControl( this.company?.telefone2 ),
      cep: new FormControl( this.company?.cep ),
      logradouro: new FormControl({ value: this.company?.logradouro, disabled: true }),
      numero: new FormControl( this.company?.numero ),
      complemento: new FormControl( this.company?.complemento ),
      bairro: new FormControl({ value: this.company?.bairro, disabled: true }),
      municipio: new FormControl({ value: this.company?.municipio, disabled: true }),
      uf: new FormControl({ value: this.company?.uf, disabled: true })
    });

  }

  onSubmit() {
    console.log("me salva");
  }

  buscaCEP() {
    console.log("muito malandro");
  }

}
