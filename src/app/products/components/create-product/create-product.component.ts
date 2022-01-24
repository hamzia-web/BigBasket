import { Component, OnInit } from '@angular/core';
import {IProduct} from '../../models/IProduct';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public product:IProduct = {
    _id : '',
    name : '',
    image : '',
    price : null,
    qty : null,
    info : ''
  };
  public imageFileName:any;
  public errorMessage:string;
  public emptyFields:boolean;

  constructor(private productService:ProductService, private router:Router) { }

  ngOnInit(): void {
  }

  // selectProductImage
  public selectProductImage(event){
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      this.imageFileName = file;
      reader.addEventListener('load', () => {
        return reader.result ? this.product.image = String(reader.result) : '';
      });
    }
  }

  // submitCreateProduct
  public submitCreateProduct(){
    if(this.product.name !== '' && this.product.image !== '' && this.product.price !== null &&
      this.product.qty !== null && this.product.info !== ''){
        this.productService.createProduct(this.product).subscribe((data) => {
          this.router.navigate(['/products/admin']);
        }, (error) => {
          this.errorMessage = error;
        });
    }
    else{
      this.emptyFields = true;
    }
  }

}
