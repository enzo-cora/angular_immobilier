import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticlesService} from "../../../../services/articles.service";
import {Article} from "../../../../models/article";

@Component({
  selector: 'app-item-article',
  templateUrl: './item-article.component.html',
  styleUrls: ['./item-article.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemArticleComponent implements OnInit,OnDestroy {

  last_articles : Article[] = null
  others_articles : Article[] = null
  article : Article = null

  constructor(
    private articlesService : ArticlesService,
    private http : HttpClient,
    private router : Router,
    private activeRoute : ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(
      qyeryparams =>  this.articlesService.getByReference(qyeryparams.ref).subscribe(
        article => {
          this.article = article
          this.articlesService.getByCategories(article.categorie,3).subscribe(
            (articles : Article[]) => this.others_articles = this.removeActualArticle(articles)
          )
          this.articlesService.getLast(3).subscribe(
            articles => this.last_articles = this.removeActualArticle(articles)
          )
        }
      )
    )
  }

  removeActualArticle(list) : Article[]{
    list.forEach((elem,i)=>{
      if (elem.reference === this.article.reference){
        list.splice(i,1)
      }
    })
    return list
  }
  goToThis(article : Article){
    let id = article.titre.replace(/[\W\s]/g,'_')
    this.router.navigate(['immobilier','articles',id], {queryParams : {ref :article.reference}})
  }

  ngOnDestroy() {
  }

}
