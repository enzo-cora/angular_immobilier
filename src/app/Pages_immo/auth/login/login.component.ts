import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formUser : FormGroup
  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
  ) { }

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      mail: [],
      mdp : [],
    })
  }

  onSubmit(){
    this.authService.connect(this.formUser.value).subscribe(
      res => {
        if(res['token']) {
          localStorage.setItem('token', res['token'])
          this.authService.emmitIsAuth(true)
        }
        this.authService.emmitUser(res['user'])
      })

  }
}
