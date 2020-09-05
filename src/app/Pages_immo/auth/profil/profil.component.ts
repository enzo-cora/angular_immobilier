import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user : User = <User>{}
  userSub : Subscription

  constructor(
    private authService : AuthService,
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.userSubject.subscribe(
      user => this.user = user
    )
  }
  logout(){
    this.authService.logout()
  }

}
