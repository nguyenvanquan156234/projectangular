import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  total: number = 0;

  constructor(private product: ProductService, private route:Router) {}

  ngOnInit(): void {
    this.getCart()
  }

  // Hàm tính tổng giỏ hàng
  calculateTotal(cartData: cart[]): number {
    let total = 0;
    cartData.forEach((item) => {
      if (item.quantity) {
        total += item.price * item.quantity;
      }
    });
    return total;
  }

  getCart(){
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      this.total = this.calculateTotal(result); // Tính tổng giỏ hàng
    });
  }
  checkout(){
    this.route.navigate(['/checkout'])
  }
  removeCart(cartId : string |undefined){
    cartId && this.product.removeToCart(cartId).subscribe((result)=>{
      if(result)
      {
        this.getCart()
      }
    })
  }
}
