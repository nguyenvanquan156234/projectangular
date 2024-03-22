import { ProductService } from './../services/product.service';

import { cart, login, product, signUp } from '../data-type';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent  implements OnInit{
  authError:string=''
  showLogin : boolean = true;
  constructor(private user:UserService, private product:ProductService){}
  ngOnInit(): void {
      this.user.userAuthReaload()
  }
  signup(data: signUp){
    this.user.userSign(data)

  }
  login(data:login){
    this.user.userLogin(data)
    this.user.invalidUser.subscribe((result)=>{
      if(result)
      {
        this.authError = "Email hoặc mật khẩu không tồn tại"
      }else{
        this.removeToCart()
      }

    })
  }
  openSignUp(event: Event){
    this.showLogin=false
    this.showLogin=true
  }
  openLogin(event: Event){
    event.preventDefault();
    this.showLogin=false
  }
  removeToCart(){
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id
    if(data){
      let cartDataList:product[] = JSON.parse(data)

       cartDataList.forEach((product:product, index) => {
          let cartData:cart ={
            ...product,
            productId:product.id,
            userId
          }
          delete cartData.id
          setTimeout(() => {
            this.product.addToCart(cartData).subscribe((result)=>{
              if(result){

              }
          })
          }, 500);
          if(cartDataList.length===index+1){
            localStorage.removeItem('localCart')
          }
       });
    }
   setTimeout(() => {
    this.product.getCartList(userId)
   }, 2000);
  }
}
