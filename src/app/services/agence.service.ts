import {Injectable} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Agence} from "../models/agence";

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  agence : Agence = null
  url = location.protocol +'//'+ location.hostname + '/api1/agence'
  urlAdmin = location.protocol +'//'+ location.hostname + '/api1/admin/agence'
  agenceSubject = new Subject<Agence>()

  constructor(
    private http : HttpClient,
  ) {
    this.agenceSubject.subscribe(agence => this.agence = agence )
    this.getAgence()
  }

  emmitAgence(content){
    this.agenceSubject.next(content)
  }

  getAgence() {
    this.http.get(this.url + '/getAgence').subscribe(
      ( agence : Agence) => this.emmitAgence(agence)
    )
  }
  modifyAgence(content) {
    this.http.put(this.urlAdmin + '/update',content).subscribe(
      (res) => this.getAgence()
    )
  }
}
