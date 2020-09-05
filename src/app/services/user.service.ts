import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = location.protocol +'//'+ location.hostname + '/api1'  + '/admin/users'
  usersSubject = new Subject<User[]>()

  constructor(
    private http : HttpClient
  ) { }

  emmitUsers(users){
    this.usersSubject.next(users)
  }
  getUser(id){
    this.http.get(this.url + '/user/'+id, )
  }
  getAll(){
    this.http.get(this.url+'/getAll').subscribe(
      content => this.emmitUsers(content)
    )
  }

  deleteOne(id){
    this.http.delete(this.url+'/delete/' + id).subscribe(
      res => this.getAll()
    )
  }
}
