import { Component, OnInit } from '@angular/core';
import {AgenceService} from "../../../services/agence.service";
import {Agence} from "../../../models/agence";

@Component({
  selector: 'app-vendre',
  templateUrl: './vendre.component.html',
  styleUrls: ['./vendre.component.css']
})
export class VendreComponent implements OnInit {

  active = true
  agence : Agence
  constructor(
    public agenceService : AgenceService
  ) { }

  ngOnInit(): void {
    this.agenceService.agenceSubject.subscribe(
      agence => this.agence = agence
    )
    this.agenceService.getAgence()
  }

  doThis(){
  }
}
