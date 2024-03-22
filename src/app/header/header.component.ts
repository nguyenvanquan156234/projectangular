import { product } from './../data-type';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menutype: string = 'default';
  sellerName:string=''
  searchResult: undefined | product[]
  userName:string='' ;
  cartItems = 0
  constructor(private router: Router, private product:ProductService) {}

  ngOnInit(): void {

    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
         let sellerStore = localStorage.getItem('seller')
         let sellerData  = sellerStore && JSON.parse(sellerStore)[0]
        this.sellerName = sellerData.name
          this.menutype = 'seller';

        } else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore)
          this.userName = userData.name
          this.menutype = 'user'
          this.product.getCartList(userData.id)
        }
        else {
          this.menutype = 'default';
        }
      }
    });
    let cartData = localStorage.getItem('localCart')
    if(cartData){
      this.cartItems = JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems = items.length
    })
  }
  logout(){
    localStorage.removeItem('seller')
    this.router.navigate(['/']);
  }
  userLogout(){
    localStorage.removeItem('user')
    this.router.navigate(['/user-auth']);
    this.product.cartData.emit([])
  }
  searchProducts(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const element = event.target as HTMLInputElement;
      if (element.value.trim() !== '') {
        this.product.searchProducts(element.value).subscribe((result) => {
          // Giới hạn số kết quả tìm kiếm
          if (result.length > 5) {
            result = result.slice(0, 5);
          }
          this.searchResult = result;
        });
      }
    }
  }
  hideSearch(){
    this.searchResult=undefined
  }
  submitSearch(val:string){
    console.warn(val);
    this.router.navigate([`search/${val}`])
  }
}
