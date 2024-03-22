import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart } from '../data-type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit{
  total: number = 0;

  constructor(private product:ProductService){}
  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {

      this.total = this.calculateTotal(result); // Tính tổng giỏ hàng
    });
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
  orderNow(data: {email:string, diachi:string, thongtin:string }){
    let user = localStorage.getItem('user')
    let userId =user && JSON.parse(user)
    if(this.total){
      let orderData={
        ...data,
        total : this.total,
        userId


      }
      


    }
  }
}
