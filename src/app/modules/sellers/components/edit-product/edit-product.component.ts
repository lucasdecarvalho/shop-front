import { Component, OnInit } from '@angular/core';
import { SellersService } from '../../sellers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from "sweetalert2";
import { environment } from 'src/environments/environment';
import { isObject, isString } from 'util';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  form: FormGroup;
  url1: any;
  url2: any = 'https://icons-for-free.com/iconfiles/png/512/add+board+new+plus+icon-1320186882821780394.png';
  url3: any = 'https://icons-for-free.com/iconfiles/png/512/add+board+new+plus+icon-1320186882821780394.png';
  format: any;
  position: any;
  products: any;
  submitted: any;
  errors: any;
  id: any; 

  constructor(public fb: FormBuilder, private SellerService: SellersService, private router: Router, private activatedRoute: ActivatedRoute) { 

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

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.SellerService.showProduct(this.id)
        .subscribe(data => {

          this.products = data;
          this.url1 = environment.api_url+'/storage/'+ this.products['photo1'];
          this.url2 = environment.api_url+'/storage/'+ this.products['photo2'];
          this.url3 = environment.api_url+'/storage/'+ this.products['photo3'];

          this.form.patchValue({
            store: this.products['store'],
            brand: this.products['brand'],

            name: this.products['name'],
            storage_initial: this.products['storage_initial'],
            caption: this.products['caption'],
            description: this.products['description'],
            details: this.products['details'],
            price: this.products['price'],
            discount: this.products['discount'],
            video: this.products['video'],
          });

        });
  }

  get f() { return this.form.controls; }

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
          formData.append("caption", this.form.get('caption').value);
          formData.append("description", this.form.get('description').value);
          formData.append("details", this.form.get('details').value);
          formData.append("price", this.form.get('price').value);
          // formData.append("discount", this.form.get('discount').value);
          formData.append("video", this.form.get('video').value);

          let nice = JSON.parse(this.id);
          const jsonData = {};

          for(const [key, value] of formData) {
              jsonData[key] = value;
          }
          
          // console.log('aqui: ', jsonData);

          this.SellerService.editProduct(nice, jsonData)
        .subscribe(data => {
          console.log('enviado: ', data);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Produto editado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl(`/vendedores/lista-produtos`);
        },
        error => {
          console.log('falha: ', formData);
        });
      });

    }

}
