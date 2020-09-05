import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewArcticleComponent} from "./new-arcticle/new-arcticle.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BDDArticlesComponent} from "./BDD/bdd-articles/bdd-articles.component";
import {UpdateArticleComponent} from "./update-article/update-article.component";
import {BddImmobilierComponent} from "./BDD/bdd-immobilier/bdd-immobilier.component";
import {NewImmoComponent} from "./new-immo/new-immo.component";
import {UpdateImmoComponent} from "./update-immo/update-immo.component";
import {BddUserComponent} from "./BDD/bdd-user/bdd-user.component";
import {AgenceComponent} from "./agence/agence.component";
import {AdminPannelComponent} from "./admin-pannel.component";
import {GuardAdmin} from "../services/guards/guard-admin.service";


const routes: Routes = [
  { path: '',component : AdminPannelComponent, canActivate : [GuardAdmin], children : [
      {path : 'dashboard', component : DashboardComponent},
      {path : '', component : AgenceComponent},
      {path: 'articles', children : [
          {path : '',component : BDDArticlesComponent},
          {path : 'new', component : NewArcticleComponent},
          {path : 'update/:id', component : UpdateArticleComponent},
        ]},
      {path: 'immobilier', children : [
          {path : '',component : BddImmobilierComponent},
          {path : 'new', component : NewImmoComponent},
          {path : 'update/:id', component : UpdateImmoComponent},
        ]},
      {path: 'users', children : [
          {path : '',component : BddUserComponent},
        ]},
      ]},
  {path : '', pathMatch : 'full', redirectTo : 'dashboard'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPannelRoutingModule { }
