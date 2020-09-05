import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-bdd-user',
  templateUrl: './bdd-user.component.html',
  styleUrls: ['./bdd-user.component.css']
})
export class BddUserComponent implements OnInit {

  users : User[] = []
  userSub : Subscription
  page : number = 1

  constructor(
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.userSub = this.userService.usersSubject.subscribe(
      content => this.users = content
    )
    this.userService.getAll()
  }

  onDelete(id){
    this.userService.deleteOne(id)
  }
  pageChanged(event){ //Event = La page valide la + proche
    this.page = event
  }

}
