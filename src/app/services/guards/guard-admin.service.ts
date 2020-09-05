import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class GuardAdmin {

  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }

  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token')
    if(token){
      let decodedToken = this.getDecodedAccessToken(token)
      return decodedToken['isAdmin']
    }

    return !!token;
  }
}
