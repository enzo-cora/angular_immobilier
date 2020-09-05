import { Component, OnInit } from '@angular/core';
import {Agence} from "../../../models/agence";
import {AgenceService} from "../../../services/agence.service";

@Component({
  selector: 'app-new-letter',
  templateUrl: './new-letter.component.html',
  styleUrls: ['./new-letter.component.css']
})
export class NewLetterComponent implements OnInit {

  agence : Agence = null
  constructor(
    private agenceService : AgenceService
  ) { }

  ngOnInit(): void {
    this.agenceService.agenceSubject.subscribe(
      agence => this.agence = agence
    )
    this.agenceService.getAgence()
  }

}
