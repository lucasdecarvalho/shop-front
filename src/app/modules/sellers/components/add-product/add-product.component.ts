import { Component, OnInit } from '@angular/core';
import { SellersService } from '../../sellers.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  form: FormGroup;
  url1: any = 'https://icons-for-free.com/iconfiles/png/512/add+board+new+plus+icon-1320186882821780394.png';
  url2: any = 'https://icons-for-free.com/iconfiles/png/512/add+board+new+plus+icon-1320186882821780394.png';
  url3: any = 'https://icons-for-free.com/iconfiles/png/512/add+board+new+plus+icon-1320186882821780394.png';
  format: any;
  position: any;

  constructor(public fb: FormBuilder, private SellerService: SellersService, private router: Router) {

    this.form = this.fb.group({
      store: [''],
      brand: [''],

      photo1: [null],
      photo2: [null],
      photo3: [null],

      name: [''],
      storage_initial: [''],
      caption: [''],
      description: [''],
      details: [''],
      price: [''],
      discount: [''],
      video: [''],
    });
  }
  
  ngOnInit(): void {
    
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

      this.form.patchValue({
        photo1: file,
      });

    this.form.get('photo1').updateValueAndValidity()
  }

  uploadFile2(event) {

    const file = (event.target as HTMLInputElement).files[0];

    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        this.url2 = (<FileReader>event.target).result;
      }
    }

      this.form.patchValue({
        photo2: file,
      });

    this.form.get('photo2').updateValueAndValidity()
  }

  uploadFile3(event) {

    const file = (event.target as HTMLInputElement).files[0];

    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        this.url3 = (<FileReader>event.target).result;
      }
    }

      this.form.patchValue({
        photo3: file,
      });

    this.form.get('photo3').updateValueAndValidity()
  }
  
  submitForm() {

    this.SellerService.sellerData()
        .subscribe(response => {

          let formData: any = new FormData();
          formData.append("store", response['seller']['id']);
          formData.append("brand", response['seller']['fantasia']);

          if(this.form.get('photo1').value) {
            formData.append("photo1", this.form.get('photo1').value);
          }

          if(this.form.get('photo2').value) {
            formData.append("photo2", this.form.get('photo2').value);
          }

          if(this.form.get('photo3').value) {
            formData.append("photo3", this.form.get('photo3').value);
          }

          formData.append("name", this.form.get('name').value);
          formData.append("storage_initial", this.form.get('storage_initial').value);
          formData.append("caption", this.form.get('caption').value);
          formData.append("description", this.form.get('description').value);
          formData.append("details", this.form.get('details').value);
          formData.append("price", this.form.get('price').value);
          formData.append("discount", this.form.get('discount').value);
          formData.append("video", this.form.get('video').value);

          this.SellerService.addProduct(formData)
              .subscribe(data => {

                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Produto cadastrado com sucesso!',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.router.navigateByUrl(`vendedores/lista-produtos`);
              },
              error => {
                console.log('falha: ', formData);
              });
        });

    }

}
