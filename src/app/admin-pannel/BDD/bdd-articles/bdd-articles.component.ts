import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "../../../services/articles.service";
import {Article} from "../../../models/article";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-bdd-articles',
  templateUrl: './bdd-articles.component.html',
  styleUrls: ['./bdd-articles.component.css']
})
export class BDDArticlesComponent implements OnInit {

  articles : Article[] = []
  articleSub : Subscription

  constructor(
    private articlesService : ArticlesService,
  ) { }

  ngOnInit(): void {
    this.articleSub = this.articlesService.articlesSubjectAdmin.subscribe(
      content => this.articles = content
    )
    this.articlesService.getAllArticlesAdmin()
  }

  goToArticle(elem){
    let id = elem.titre.replace(/[\W\s]/g,'')
    let params = '?ref=' + elem.reference
    window.open('/immobilier/articles/'+id + params )
  }

  onDelete(id){
    this.articlesService.deleteOne(id)
    this.articlesService.getAllArticlesAdmin()
  }

}
