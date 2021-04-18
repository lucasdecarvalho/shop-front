import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { UsersService } from '../../users.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  public formConfirm: FormGroup;
  formData: any = new FormData();
  user: any;
  submitted: boolean = false;
  public errors: any;

  constructor(
    private title: Title,
    private formBuilder: FormBuilder, 
    private userService: UsersService, 
    private router: Router) { 

      this.title.setTitle('Confirme seus dados');
      this.formConfirm = this.formBuilder.group({

        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        doc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        phone1: ['', [Validators.required, Validators.maxLength(255)]],
        
        street: ['', [Validators.required, Validators.maxLength(255)]],
        number: ['', [Validators.required, Validators.maxLength(15)]],
        comp: ['', [Validators.maxLength(255)]],
        neigh: ['', [Validators.required, Validators.maxLength(255)]],
        city: ['', [Validators.required, Validators.maxLength(255)]],
        state: ['', [Validators.required, Validators.maxLength(2)]],
        zipcode: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      });
    }

  ngOnInit(): void {

    this.userService.userData()
      .subscribe(response => {

        this.user = response['user'];
        // console.log('daqui: ', response['user']['name']);

        this.formConfirm.patchValue({
          name: this.user.name,
          lastname: this.user.lastname,
          doc: this.user.doc,
          phone1: this.user.phone1,
          street: this.user.street,
          number: this.user.number,
          comp: this.user.comp,
          neigh: this.user.neigh,
          city: this.user.city,
          state: this.user.state,
          zipcode: this.user.zipcode,
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
          this.router.navigateByUrl('/');
      });

  }

  get f() { return this.formConfirm.controls; }

  onSubmit() {

    this.submitted = true;

    this.userService.updateUser(this.formConfirm.value)
          .subscribe(res => {

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Dados confirmados com sucesso!',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigateByUrl(`clientes`);

          },
          error => {
            

          });
  }

  buscaCep() {

  }

}
