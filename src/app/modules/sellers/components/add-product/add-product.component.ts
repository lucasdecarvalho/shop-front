import { Component, OnInit } from '@angular/core';
import { SellersService } from '../../sellers.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  form: FormGroup;
  url: any;
  format: any;

  constructor(public fb: FormBuilder, private SellerService: SellersService) {

    this.form = this.fb.group({
      store: [''],
      name: [''],
      brand: [''],
      storage_initial: [''],
      available: [''],
      photo1: [null],
      price: [''],
    });
  }
  
  ngOnInit(): void {
    
  }

  uploadFile(event) {

    const file = (event.target as HTMLInputElement).files[0];

    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }

      this.form.patchValue({
        photo1: file,
      });

    this.form.get('photo1').updateValueAndValidity()
  }
  
  submitForm() {

    this.SellerService.sellerData()
        .subscribe(response => {

          let formData: any = new FormData();
          formData.append("store", response['seller']['id']);
          formData.append("name", this.form.get('name').value);
          formData.append("brand", response['seller']['fantasia']);
          formData.append("storage_initial", this.form.get('storage_initial').value);
          formData.append("available", 1);
          formData.append("photo1", this.form.get('photo1').value);
          formData.append("price", this.form.get('price').value);

          this.SellerService.addProduct(formData)
              .subscribe(response => {
                console.log('enviado: ', response);
              },
              error => {
                console.log('falha');
              });
        });

    }

}
