import {Component, OnInit, ViewChild} from '@angular/core';
import {ImmobilierService} from "../../../services/immobilier.service";
import {Immobilier} from "../../../models/immobilier";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactUsComponent} from "../contact-us/contact-us.component";

@Component({
  selector: 'app-details-immo',
  templateUrl: './details-immo.component.html',
  styleUrls: ['./details-immo.component.css']
})
export class DetailsImmoComponent implements OnInit {

  onContactUs : number = null
  @ViewChild(ContactUsComponent) contactUs: ContactUsComponent ;
  saveFilters
  logement: Immobilier
  page : string
  id : string
  mainImage

  constructor(
    private immoService: ImmobilierService,
    private activeRoute: ActivatedRoute,
    private router : Router
  ) {
  }

  ngOnInit(): void {
    this.saveFilters = this.immoService.filter
    this.activeRoute.params.subscribe(params => {
        this.id = params.id
        this.immoService.getByRef(params.id).subscribe(
          logement => {
            this.logement = logement
            this.mainImage = logement.banniere
          }
        )
      }
    )
    this.activeRoute.queryParams.subscribe(
      queryParams => this.page = queryParams.page,
      error => console.log("Il n'y a pas de QueryParam dans l'url" + error.message)
    )
  }

/*  onContactUs(e,chiffre){
    this.x = chiffre
    this.contactUs.activeContactUsv2(e)
  }*/
  changeImage(photo){
    this.mainImage = photo
  }

  onReturn() {
    this.immoService.filter = this.immoService.previousFilters
    this.router.navigate(['../..'], {relativeTo : this.activeRoute,queryParams : {page : this.page, ancreToGo : this.id }})
  }

}
