import { Component, OnInit } from '@angular/core';
import {Immobilier} from "../../../models/immobilier";
import {Subscription} from "rxjs";
import {ImmobilierService} from "../../../services/immobilier.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-last-immo',
  templateUrl: './last-immo.component.html',
  styleUrls: ['./last-immo.component.css']
})
export class LastImmoComponent implements OnInit {

  logements : Immobilier[] = []
  immoSub : Subscription
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
    this.immoSub = this.immoService.getLast().subscribe(
      content => {
        this.logements = content
      }
    )
    this.activeRoute.queryParams.subscribe(
      queryParams => {
        if(queryParams.ancreToGo ) {
          this.comeFromAnother.status  = true
          this.comeFromAnother.ancre  = queryParams.ancreToGo
        }
      })
  }

  onDetails(id: string) {
    this.router.navigate(['details',id],{relativeTo : this.activeRoute, queryParams: {ancre : this.ancreToSend}})
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
  }
}
