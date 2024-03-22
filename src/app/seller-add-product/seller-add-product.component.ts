import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined = '';

  constructor(private productService: ProductService, private router: Router) {}

  submit(data: product) {
    this.productService.addProduct(data).subscribe((result) => {
      if (result) {
        this.addProductMessage = "Sản phẩm đã được thêm thành công";
        setTimeout(() => {
          this.router.navigate(['/seller-home']); // Chuyển hướng người dùng đến trang sản phẩm
        }, 2000); // Đợi 2 giây trước khi chuyển hướng
      }
    });
    setTimeout(() => {
      this.addProductMessage = undefined;
    }, 5000); // Hiển thị thông báo trong 5 giây
  }
}
