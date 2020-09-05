import { Injectable } from '@angular/core';
import {Immobilier} from "../models/immobilier";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ImmobilierService {

  previousFilters = {}
  filter = {}
  numberSubject = new Subject<number>()
  immoSubject = new Subject<Immobilier[]>()
  link = location.protocol +'//'+ location.hostname + '/api1'  + '/immobilier'
  Adminlink = location.protocol +'//'+ location.hostname + '/api1'  + '/admin/immo'

  constructor(private http : HttpClient) { }

  emmitImmo(content) {
    this.immoSubject.next(content)
  }

  emmitNumber(content) {
    this.numberSubject.next(content)
  }

  getByRef(id) : Observable<Immobilier> {
    return this.http.get<Immobilier>(this.link + '/findOne/' + id )
  }

  getByFilters(status?) {
    let filters = {}
    status ? filters = {...this.filter,status} :  filters = {...this.filter}
    this.http.post(this.link + '/filter', filters).subscribe(
      content => this.emmitImmo(content)
    )
  }

  getDistinct(value : string ,name : string ,limit) {
    return this.http.post(this.link + '/getDistinct', {value : value, name : name} ,
      {params: {limit : limit}})
  }

  getNumber(){
    this.http.post(this.link + '/numberResults', this.filter).subscribe(
      number => this.emmitNumber(number)
    )
  }

  getLast(){
    return this.http.get<Immobilier[]>(this.link + '/getLast/4')
  }

  updateFilter(newFilter) {
    for(let elem in newFilter) {
      if (newFilter[elem]) {
        this.filter[elem] = newFilter[elem]
      }else {
        delete this.filter[elem]
      }
    }
  }

  resetFilter(){
    this.previousFilters = this.filter
    this.filter = {}
  }

  //Pour les admins ----- :

  getByFiltersAdmin() {
    this.http.post(this.Adminlink + '/getByFilter/', this.filter).subscribe(
      content => this.emmitImmo(content)
    )
  }

  getAllImmos(){
    this.http.get(this.Adminlink + '/getAll').subscribe(
      (content: Immobilier[]) => this.immoSubject.next(content)
    )
  }

  delete(id){
    this.http.delete(this.Adminlink + '/delete/' + id).subscribe(
      res => {
        this.getAllImmos()
        console.log(res)
      })
  }

  postImmo(content){
    return this.http.post(this.Adminlink +'/newImmo',content)
  }

  postUpdate(content, id){
    this.http.put(this.Adminlink +'/update/' + id,content).subscribe(
      res => {
        console.log(res)
        this.getAllImmos()
      }
    )
  }

}
