import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../auth.service";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class GuardUnlogged {

  constructor(
    private authService :AuthService
  ) {
    this.authService.isAuth()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token')
    if(token){
      try{
        let decodedToken =  jwt_decode(token);
        if(decodedToken['comeFrom'] != 'immobilierApp' ) {
          return !false
        }else if (decodedToken['exp'] > Date.now() ){
          localStorage.removeItem('token')
          return !false
        }else{
          return !true
        }
      }
      catch(Error){
        return !false
      }
    }else{
      return !false
    }
  }
}
