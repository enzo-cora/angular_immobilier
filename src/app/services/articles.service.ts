import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Article} from "../models/article";


@Injectable({
  providedIn: 'root'
})

export class ArticlesService {

  urlAdmin = location.protocol +'//'+ location.hostname + '/api1'  + '/admin/articles'
  urlArticles = location.protocol +'//'+ location.hostname + '/api1'  + '/articles'
  articlesSubjectAdmin = new Subject<Article[]>()
  articlesSubject = new Subject<Article[]>()

  constructor(
    private http : HttpClient,
  ) {}


  emmitArticle(content){
    this.articlesSubject.next(content)
  }

  getAllArticles() {
    this.http.get(this.urlArticles + '/getAll').subscribe(
      content => this.emmitArticle(content)
    )
  }

  getByReference(id) : Observable<Article> {
    return this.http.get<Article>(this.urlArticles + '/getOne/' + id )
  }

  getByCategories(categorie,number) : Observable<Article[]>{
    return this.http.get<Article[]>(this.urlArticles + '/getByCategories/' + categorie,{params: {number : number}})
  }
  getLast(number) : Observable<Article[]>{
    return this.http.get<Article[]>(this.urlArticles + '/getLast',{params: {number : number}})
  }

  // ------------Pour Admin ---------(A refacto car ne devrai pas être là)

  emmitArticleAdmin(content){
    this.articlesSubjectAdmin.next(content)
  }

  getAllArticlesAdmin() {
    this.http.get(this.urlAdmin + '/getAll').subscribe(
      content => this.emmitArticleAdmin(content)
    )
  }

  deleteOne(id){
    this.http.delete(this.urlAdmin + '/delete/' + id).subscribe(
      res=> {
        this.getAllArticlesAdmin()
        return  console.log(res)
      }
    )
  }

  publishArticle (formData : FormData) {
    let url = this.urlAdmin + "/publish"
    return this.http.post(url ,formData).subscribe(
      res => {
        console.log(res)
        this.getAllArticles()
      }
    )
  }


  updateOne(id,content){
    let url = this.urlAdmin + '/update/' + id
    return this.http.put(url, content)
  }
}
