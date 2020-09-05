import {Component, Input, OnInit} from '@angular/core';
import {ArticlesService} from "../../../services/articles.service";
import {Article} from "../../../models/article";
import {Router} from "@angular/router";

@Component({
  selector: 'app-whyus',
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.css']
})
export class WhyUsComponent implements OnInit {

  @Input() color = 'white'
  confiance_articles : Article[] = null
  constructor(
    private articlesService : ArticlesService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.articlesService.getByCategories('confiance',3).subscribe(
      articles => this.confiance_articles = articles
    )
  }
  goToThis(article : Article){
    let id = article.titre.replace(/[\W\s]/g,'_')
    this.router.navigate(['immobilier','articles',id], {queryParams : {ref :article.reference}})
  }

}
