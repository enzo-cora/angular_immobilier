import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Agence} from "../../../models/agence";
import {AgenceService} from "../../../services/agence.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactUsIsOpen = false
  agence : Agence = <Agence>{}
  constructor(
    private agenceService : AgenceService
  ) { }

  ngOnInit(): void {
    this.agenceService.agenceSubject.subscribe(
      agence => this.agence = agence
    )
    this.agenceService.getAgence()
    //Ferme le block s'il y a un click sur le body
    document.body.addEventListener('click',  (e) => {
      if(this.contactUsIsOpen){
        this.contactUsIsOpen = false
      }
    })
  }
  activeContactUsv2(e){
    if (!this.contactUsIsOpen){
      this.contactUsIsOpen = true
      e.stopPropagation()/*On stop la propag pour empecher l'event d'aller jusqu'au body (ce qui engendrerai la fermeture)
                            Mais quand on veut fermer le menu on laisse aller jusqu'au body */
    }

  }
  ongletChange(section,ref){
    section.querySelector('.floating-block').classList.add('desactive')
    section.querySelector(`.${ref}`).classList.add('isActive')
  }

}
