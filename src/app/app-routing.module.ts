import { NgModule } from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import {AcheterComponent} from "./Pages_immo/pages/acheter/acheter.component";
import {LouerComponent} from "./Pages_immo/pages/louer/louer.component";
import {ArticlesComponent} from "./Pages_immo/pages/articles/articles.component";
import {ItemArticleComponent} from "./Pages_immo/pages/articles/item-article/item-article.component";
import {AcceuilPageComponent} from "./Pages_immo/accueil/acceuil-page/acceuil-page.component";
import {Error404Component} from "./Pages_immo/error404/error404.component";
import {VendreComponent} from "./Pages_immo/pages/vendre/vendre.component";
import {DetailsImmoComponent} from "./Pages_immo/pages/details-immo/details-immo.component";
import {HeaderComponent} from "./Pages_immo/structure/header/header.component";
import {GuardAdmin} from "./services/guards/guard-admin.service";
import {AboutUsComponent} from "./Pages_immo/about-us/about-us.component";

const routerOptions: ExtraOptions
  = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
  onSameUrlNavigation: 'reload'
};

const routes: Routes = [
  { path: 'admin',canActivate : [GuardAdmin] ,
    loadChildren: () => import('./admin-pannel/admin-pannel.module')
      .then(m => m.AdminPannelModule) },
    {path : 'immobilier', component : HeaderComponent , children : [
          {path : '', pathMatch :'full',redirectTo : 'accueil'},
          {path : 'accueil', component : AcceuilPageComponent},
        //Immobilier
          {path : 'achat', component : AcheterComponent},
          {path: 'location', component : LouerComponent },
          {path: 'vendre', component : VendreComponent},
          {path: ':id2/details/:id', component : DetailsImmoComponent},
        //Articles
          {path: 'articles',children: [
              {path: '', component: ArticlesComponent},
              {path: ':id', runGuardsAndResolvers: 'paramsOrQueryParamsChange',component : ItemArticleComponent},
          ]},
          {path: 'aPropos', children: [
            {path: '', component: AboutUsComponent},
          ]},
        //Erreur et redirec
      ]},
  {path: '', pathMatch : 'full', redirectTo : "/immobilier/accueil" },
  {path : '**', component : Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
