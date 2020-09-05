import {Component, Input, OnInit} from '@angular/core';
import {Agence} from "../../../models/agence";
import {AgenceService} from "../../../services/agence.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() agence : Agence = <Agence>{}
  constructor(
    private agenceService : AgenceService
  ) { }

  ngOnInit(): void {
  }

}
