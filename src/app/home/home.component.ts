import { ProductService } from './../services/product.service';
import { product } from './../data-type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts: product[] | undefined;
  trendyProducts: product[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.popularProducts().subscribe((data) => {
      this.popularProducts = data;
    });
    this.productService.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    });
  }
  
}
