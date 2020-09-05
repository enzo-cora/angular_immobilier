import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {BehaviorSubject, Subject} from "rxjs";
import * as jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthSubject = new Subject<boolean>()
  // userSubject = new Subject<User>()
  userSubject = new BehaviorSubject<User>(null)
  user : User
  url = location.protocol +'//'+ location.hostname + '/api1'  + '/authentification'


  constructor(
    private http : HttpClient
  ) { }

  emmitIsAuth(content){
    this.isAuthSubject.next(content)
  }
  emmitUser(user){
    this.userSubject.next(user)
  }
  newUser(content){
    return this.http.post(this.url + '/register', content)
  }
  getUser(idUser){
    this.http.get(this.url+'/user/'+idUser).subscribe(
      user => this.emmitUser(user)
    )
  }
  connect(content){
    return this.http.post(this.url + '/login', content)
  }
  logout() {
    localStorage.removeItem('token')
    this.emmitIsAuth(false)
    this.emmitUser(null)
  }
  isAuth () {
    let token = localStorage.getItem('token')
    if(token){
      try{
        let decodedToken =  jwt_decode(token);
        if(decodedToken['comeFrom'] != 'immobilierApp' ) {
          this.emmitIsAuth(false)
        }else if (decodedToken['exp'] < Date.now() / 1000 ){
          localStorage.removeItem('token')
          this.emmitIsAuth(false)
        }else{
          this.emmitIsAuth(true)
          this.getUser(decodedToken['userId'])
        }
      }
      catch(Error){
        this.emmitIsAuth(false)
      }
    }else{
      this.emmitIsAuth(false)
    }

  }

}
