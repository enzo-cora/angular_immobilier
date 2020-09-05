import { Component, OnInit } from '@angular/core';
import {AgenceService} from "../../services/agence.service";
import {HttpClient} from "@angular/common/http";
import {Agence} from "../../models/agence";

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.css']
})
export class AgenceComponent implements OnInit {

  agence : Agence = null
  constructor(
    private agenceService  :AgenceService,
    private http : HttpClient
  ) { }

  ngOnInit(): void {
    this.agenceService.agenceSubject.subscribe(
      (agence ) => this.agence = agence
    )
    this.agenceService.getAgence()
  }

  onSubmit(form){
    this.agenceService.modifyAgence(form.value)
  }

}
