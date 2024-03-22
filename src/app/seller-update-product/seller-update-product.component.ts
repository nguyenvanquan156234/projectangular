import { product } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{
  productData:undefined | product
  updateMessage : string |undefined
  constructor(private route:ActivatedRoute, private product:ProductService,private router:Router){}
  ngOnInit(): void {
      let productId =this.route.snapshot.paramMap.get('id')
      productId && this.product.getProduct(productId).subscribe((data)=>{
        this.productData=data
    })
  }
  submit(data:any){
    if(this.productData){
      data.id = this.productData.id
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.updateMessage="Thay Đổi sản Phẩm thành công"
        setTimeout(() => {
          this.router.navigate(['/seller-home']); // Chuyển hướng người dùng đến trang sản phẩm
        }, 2000);
      }
    })
    setTimeout(() => {
      this.updateMessage=undefined
    }, 5000);
  }
}
