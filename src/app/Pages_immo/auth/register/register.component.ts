import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formUser : FormGroup
  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      mail: [],
      mdp : [],
      sexe : [],
      prenom : [],
      nom : [],
      pays : [],
      ville : [],
      cp : [],
      rue : [],
      phone : [],
      pub1 : [true],
      pub2 : [false],
    })
  }

  onSubmit(){
    this.authService.newUser(this.formUser.value).subscribe(
      () => {}
    )
  }


}
