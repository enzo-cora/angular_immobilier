import { Component, OnInit } from '@angular/core';
import {Article} from "../../../models/article";
import {ArticlesService} from "../../../services/articles.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-last-articles',
  templateUrl: './last-articles.component.html',
  styleUrls: ['./last-articles.component.css']
})
export class LastArticlesComponent implements OnInit {

  last_articles : Article[] = null

  constructor(
  private articlesService : ArticlesService,
  private router : Router
  ) { }

  ngOnInit(): void {
    this.articlesService.getLast(4).subscribe(
      articles => this.last_articles = articles
    )
  }
  goToThis(article : Article){
    let id = article.titre.replace(/[\W\s]/g,'_')
    this.router.navigate(['immobilier','articles',id], {queryParams : {ref :article.reference}})
  }

}
