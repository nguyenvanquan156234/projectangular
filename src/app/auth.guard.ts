import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SellerService } from './service/seller.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private sellerService: SellerService, private router: Router) {}

  canActivate(): boolean {
    if (this.sellerService.isSellerLoggedIn.value && localStorage.getItem('seller')) {
      return true; // Cho phép navigation nếu người dùng đã đăng nhập và có đối tượng "seller" trong localStorage
    } else {
      this.router.navigate(['/']); // Navigate đến trang chính nếu không có quyền truy cập
      return false;
    }
  }
}
