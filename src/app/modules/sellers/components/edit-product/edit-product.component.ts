import { Component, OnInit } from '@angular/core';
import { SellersService } from '../../sellers.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { isArray, isObject, isString } from 'util';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  url1: any = 'https://icons-for-free.com/iconfiles/png/512/add+board+new+plus+icon-1320186882821780394.png';
  url2: any = 'https://icons-for-free.com/iconfiles/png/512/add+board+new+plus+icon-1320186882821780394.png';
  url3: any = 'https://icons-for-free.com/iconfiles/png/512/add+board+new+plus+icon-1320186882821780394.png';
  format: any;
  position: any;
  p: any;
  submitted: any;
  errors: any;
  id: any;

  ph1: any;
  ph2: any;
  ph3: any;

  constructor(
    private SellerService: SellersService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) {  }
  
  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.SellerService.showProduct(this.id)
        .subscribe(data => {

          this.p = data;

          if(data['photo1'] !== null) {
            this.url1 = environment.api_url+'/storage/'+ this.p['photo1'];
          }

          if(data['photo2'] !== null) {
            this.url2 = environment.api_url+'/storage/'+ this.p['photo2'];
          }

          if(data['photo3'] !== null) {
            this.url3 = environment.api_url+'/storage/'+ this.p['photo3'];
          }

        });
  }

  uploadFile1(event) {

    const file = (event.target as HTMLInputElement).files[0];
    
    if (file) {
      
      var reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        this.url1 = (<FileReader>event.target).result;
        this.ph1 = file;
      }

    }

  }

  uploadFile2(event) {

    const file = (event.target as HTMLInputElement).files[0];
    
    if (file) {
      
      var reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        this.url2 = (<FileReader>event.target).result;
        this.ph2 = file;
      }

    }

  }

  uploadFile3(event) {

    const file = (event.target as HTMLInputElement).files[0];
    
    if (file) {
      
      var reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        this.url3 = (<FileReader>event.target).result;
        this.ph3 = file;
      }
    }

  }
  
  onSubmit(data: any) {

    this.SellerService.showProduct(this.id)
        .subscribe(response => {

          let formData = new FormData();

          if(this.ph1) {
            formData.append("photo1", this.ph1);
          }
          if(this.ph2) {
            formData.append("photo2", this.ph2);
          }
          if(this.ph3) {
            formData.append("photo3", this.ph3);
          }

          formData.append("store", response['store']);
          formData.append("brand", response['brand']);
          formData.append("name", data['name']);
          formData.append("available", response['available']);
          formData.append("price", data['price']);
          formData.append("storage_initial", response['storage_initial']);
          formData.append("caption", data['caption']);
          formData.append("description", data['description']);
          formData.append("details", response['details']);
          formData.append("discount", response['discount']);
          formData.append("video", response['video']);
          
          let nice = JSON.parse(this.id);

          // const jsonData = {};
          // for(const [key, value] of formData) {
          //     jsonData[key] = value;
          // }
          
          this.SellerService.editProduct(nice, formData)
        .subscribe(data => {
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
        });
      });

    }

}
