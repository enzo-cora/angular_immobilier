import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Immobilier} from "../../../models/immobilier";
import {ImmobilierService} from "../../../services/immobilier.service";

@Component({
  selector: 'app-bdd-immobilier',
  templateUrl: './bdd-immobilier.component.html',
  styleUrls: ['./bdd-immobilier.component.css']
})
export class BddImmobilierComponent implements OnInit,OnDestroy {

  immos : Immobilier[] = []
  immoSub : Subscription
  page : number = 1

  constructor(
    private immoService : ImmobilierService
  ) { }

  ngOnInit(): void {
    this.immoSub = this.immoService.immoSubject.subscribe(
      content => this.immos = content
    )
    this.immoService.getAllImmos()
  }

  goToThis(elem){
    window.open(`/immobilier/${elem.status}/details/${elem.reference}` )
  }

  onDelete(ref){
    this.immoService.delete(ref)
  }

  pageChanged(event){ //Event = La page valide la + proche
    this.page = event
  }
  ngOnDestroy(): void {
    this.immoSub.unsubscribe()
    this.immoService.resetFilter()
  }

}
