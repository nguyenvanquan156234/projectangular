import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // Import NgForm
import { SellerService } from '../service/seller.service';
import { signUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService) {}
  showLogin = false;
  authError = '';

  ngOnInit() {
    this.seller.reloadSeller();
  }

  signUp(formData: signUp) {
    console.warn(formData); // Print form data to console
    this.seller.userSignUp(formData);
  }

  login(data: signUp) {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email hoặc Mật khẩu không đúng";
      } else {
        this.authError = '';
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }
}
