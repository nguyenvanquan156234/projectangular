import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: product[] | undefined;
  DeleteMessage: string | undefined;
  icon = faTrash;
  iconEdit = faEdit;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.list();
  }

  delete(id: string,event:Event) {
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.DeleteMessage = "Sản phẩm đã được xóa";
        event.preventDefault()
        this.list();
        setTimeout(() => {
          this.DeleteMessage = undefined;
        }, 3000);
      }
    });
  }

  list() {
    this.productService.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }
}
