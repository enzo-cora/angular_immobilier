import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Immobilier} from "../../../models/immobilier";
import {ImmobilierService} from "../../../services/immobilier.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Filtrator2000Component} from "../../structure/filtrator2000/filtrator2000.component";
import {ContactUsComponent} from "../contact-us/contact-us.component";

@Component({
  selector: 'app-louer',
  templateUrl: './louer.component.html',
  styleUrls: ['./louer.component.css']
})
export class LouerComponent implements OnInit, OnDestroy{

  @ViewChild(ContactUsComponent) contactUs: ContactUsComponent ;
  @ViewChild(Filtrator2000Component) filtator: Filtrator2000Component ;
  logements : Immobilier[] = []
  immoSub : Subscription
  page : number = 1
  ancreToSend : string
  comeFromAnother : {
    status : boolean | null
    ancre : string | null } = { status : null, ancre : null}

  constructor(
    private immoService : ImmobilierService,
    private router : Router,
    private activeRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.immoSub = this.immoService.immoSubject.subscribe(
        logements => {
          this.logements = logements
          this.filtator.changeNumber(logements.length)
        }
    )
    // this.immoService.getByFilters()
    this.activeRoute.queryParams.subscribe(
      queryParams => {
        if(queryParams.page && queryParams.ancreToGo ) {
          this.page = queryParams.page
          this.comeFromAnother.status  = true
          this.comeFromAnother.ancre  = queryParams.ancreToGo

        }
      })
  }

  pageChanged(event){ //Event = La page valide la + proche
    this.page = event
  }


  ancreToGo(){
    if(this.comeFromAnother.status) {
      this.router.navigate([], {fragment: this.comeFromAnother.ancre})
    }
  }

  makeNum(target,listLi,i) {
    if (target.classList.contains('carousel-next')){
      return +i+1 > listLi.length -1 ? 0 : +i+1
    }else{
      return +i-1 < 0 ? listLi.length - 1 :  +i-1
    }
  }

  nextPrevious(section,event) {
    let listLi = section.querySelectorAll('.header-tab li')
    for(let i in listLi){
      if (listLi[i].classList.contains('isActive') ){
        listLi[i].classList.remove('isActive')
        let num = this.makeNum(event.target,listLi,i)
        listLi[num].classList.add('isActive')
        let ref = listLi[num].getAttribute('data-title')
        section.querySelector('.content-tab.isActive').classList.remove('isActive')
        section.querySelector(`.${ref}`).classList.add('isActive')
        break
      }
    }
  }

  ongletChange(section,e){
    section.querySelector('.header-tab li.isActive').classList.remove('isActive')
    e.target.classList.add('isActive')

    let ref = e.target.getAttribute("data-title")
    section.querySelector('.content-tab.isActive').classList.remove('isActive')
    section.querySelector(`.${ref}`).classList.add('isActive')
  }

  ngOnDestroy(): void {
    this.immoSub.unsubscribe()
    this.immoService.resetFilter()
  }

}
