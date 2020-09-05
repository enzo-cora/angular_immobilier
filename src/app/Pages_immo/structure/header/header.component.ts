import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Subscription} from "rxjs";
import {ContactUsComponent} from "../../pages/contact-us/contact-us.component";
import {AgenceService} from "../../../services/agence.service";
import {Agence} from "../../../models/agence";

import {fadeAnimation} from "../../../route-animation";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [fadeAnimation]
})
export class HeaderComponent implements OnInit {

  @ViewChild(ContactUsComponent) contactUs: ContactUsComponent ;
  agence : Agence = <Agence>{}
  compteIsOpen : boolean = false
  menuIsOpen : boolean = false
  isAuth : boolean
  isAuthSub : Subscription
  showFooter : boolean = true
  constructor(
    private authService : AuthService,
    private agenceService : AgenceService,
    private router : Router
  ) {
    router.events.subscribe(
      (events) => {

        if (events instanceof NavigationStart) {
          this.showFooter = false
        }
        if (events instanceof NavigationEnd) {
          setTimeout(()=>{
            this.showFooter = true
          },2000)
        }
      }
    )
  }

  ngOnInit(): void {
    this.agenceService.agenceSubject.subscribe(
      agence => this.agence = agence
    )
    this.agenceService.getAgence()
    this.isAuthSub = this.authService.isAuthSubject.subscribe(
      bool => this.isAuth = bool
    )
    this.authService.isAuth()
    //Ferme le menu s'il y a un click sur le body
    document.body.addEventListener('mouseup',  (e) => {
      if(this.menuIsOpen){
        this.menuIsOpen = false
      }
    })
  }



  onOpenMenu(humburger, e){
    e.stopPropagation() //Stop la propagation du click vers le body
    this.menuIsOpen = !this.menuIsOpen
  }
  onOpenCompte(){
    this.compteIsOpen = !this.compteIsOpen
  }

  ongletChange(section,e){
    section.querySelector('.authentification-onglets div.isActive').classList.remove('isActive')
    e.target.classList.add('isActive')

    let ref = e.target.getAttribute("data-title")
    section.querySelector('.contenu-section.isActive').classList.remove('isActive')
    section.querySelector(`.${ref}`).classList.add('isActive')
  }
}
