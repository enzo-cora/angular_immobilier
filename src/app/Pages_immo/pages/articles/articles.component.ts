import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "../../../services/articles.service";
import {Subscription} from "rxjs";
import {Article} from "../../../models/article";
import {Router} from "@angular/router";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles : Article[]
  articlesSub : Subscription
  constructor(
    private articlesService : ArticlesService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.articlesSub = this.articlesService.articlesSubject.subscribe(
      content => this.articles = content
    )
    this.articlesService.getAllArticles()
  }

  goToThis(article : Article){
    let id = article.titre.replace(/[\W\s]/g,'_')
    this.router.navigate(['immobilier','articles',id], {queryParams : {ref :article.reference}})
  }
}
