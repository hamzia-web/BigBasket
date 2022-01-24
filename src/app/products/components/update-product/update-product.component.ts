import { Component, OnInit } from '@angular/core';
import {IProduct} from '../../models/IProduct';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  public productId:string;
  public selectedProduct:IProduct;
  public errorMessage:string;
  public emptyFields:boolean;
  constructor(private activatedRoute: ActivatedRoute,
              private productService:ProductService,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap) => {
      this.productId = param.get('id');
    });

    this.productService.getProduct(this.productId).subscribe((data) => {
      this.selectedProduct = data;
    }, (error) => {
      console.error(error);
      this.errorMessage = error;
    });
  }

  // selectProductImage
  public selectProductImage(event){
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      //this.imageFileName = file;
      reader.addEventListener('load', () => {
        return reader.result ? this.selectedProduct.image = String(reader.result) : '';
      });
    }
  }

  // submitUpdateProduct
  public submitUpdateProduct(){
    if(this.selectedProduct.name !== '' && this.selectedProduct.image !== '' && this.selectedProduct.price !== null &&
      this.selectedProduct.qty !== null && this.selectedProduct.info !== ''){
      this.productService.updateProduct(this.selectedProduct, this.productId).subscribe((data) => {
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
