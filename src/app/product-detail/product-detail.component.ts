import { product, cart } from './../data-type';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  productData : undefined | product
  productQuantity:number=1
  removeCart= false;
  cartData: product | undefined
  constructor(private activaRoute:ActivatedRoute, private product:ProductService){}
  ngOnInit(): void  {
    let productId = this.activaRoute.snapshot.paramMap.get('productId')

    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData=result
      let cartData = localStorage.getItem('localCart')
      if(productId && cartData){
        let items = JSON.parse(cartData)
        items = items.filter((items:product)=>productId===items.id.toString())
        this.removeCart = items.length > 0;

      }
      let user = localStorage.getItem('user')
      if(user){
        let userId = user && JSON.parse(user).id
        this.product.getCartList(userId)
        this.product.cartData.subscribe((result)=>{
          let item = result.filter((item:product)=>productId?.toString()==item.productId?.toString)
          if(item.length){
            this.cartData=item[0]

          }
        })
      }

    })



  }
  handleQuantity(val:string){
    if(this.productQuantity<20 && val=='plus'){
      this.productQuantity+=1
    }else if(this.productQuantity>1 && val=='min'){
      this.productQuantity-=1
    }
  }
  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity
      if(!localStorage.getItem('user')){
          this.product.localAddToCart(this.productData)
          alert("sản phẩm đã được thêm vào giỏ hàng")
          this.removeCart = true;
      }else{
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId

        }
        delete cartData.id
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            this.product.getCartList(userId)
            alert("sản phẩm đã được thêm vào giỏ hàng")
            this.removeCart = true;
          }
        })

      }
    }
  }
  removeToCart(productId: string){
  if( !localStorage.getItem('user')){
    this.product.removeItemFromCart(productId)

    }else{
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        this.product.getCartList(userId)

      })
    }
  }
}
