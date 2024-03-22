import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
     // Kiểm tra localStorage khi service được khởi tạo
  }

  userSignUp(data: signUp) {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
      console.warn(result);
      if (result && result.body) {
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.isSellerLoggedIn.next(true);
        this.router.navigate(['seller-home']);
      }
    });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: login) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {
      observe: 'response'
    }).subscribe((result) => {
      if (result && result.body && Array.isArray(result.body) && result.body.length > 0) {
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.isSellerLoggedIn.next(true);
        this.router.navigate(['seller-home']);
      } else {
        this.isLoginError.emit(true);

      }
    });
  }
}
