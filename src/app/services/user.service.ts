
import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUser = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router:Router) { }
  userSign(user:signUp){
    this.http.post('http://localhost:3000/users',user,{observe:'response'})
    .subscribe((result)=>{
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/'])

      }

    })
  }
  userAuthReaload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
  userLogin(data: login){
    this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, {
      observe: 'response'
    }).subscribe((result) => {
      if(result && result.body && Array.isArray(result.body) && result.body.length > 0){
        localStorage.setItem('user',  JSON.stringify(result.body[0]))
        this.router.navigate(['/'])
        this.invalidUser.emit(false)
      }else{
        this.invalidUser.emit(true)
      }
    })

  }
}
