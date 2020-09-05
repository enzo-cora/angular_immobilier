import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPannelRoutingModule } from './admin-pannel-routing.module';
import { AdminPannelComponent } from './admin-pannel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewArcticleComponent } from './new-arcticle/new-arcticle.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BDDArticlesComponent } from './BDD/bdd-articles/bdd-articles.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { BddImmobilierComponent } from './BDD/bdd-immobilier/bdd-immobilier.component';
import { AdminFilterComponent } from './BDD/bdd-immobilier/admin-filter/admin-filter.component';
import {NgxPaginationModule} from "ngx-pagination";
import { NewImmoComponent } from './new-immo/new-immo.component';
import { UpdateImmoComponent } from './update-immo/update-immo.component';
import { AgenceComponent } from './agence/agence.component';
import {BddUserComponent} from "./BDD/bdd-user/bdd-user.component";


@NgModule({
  declarations: [AdminPannelComponent,
    DashboardComponent,
    BddUserComponent,
    NewArcticleComponent,
    BDDArticlesComponent,
    UpdateArticleComponent,
    BddImmobilierComponent,
    AdminFilterComponent,
    NewImmoComponent,
    UpdateImmoComponent,
    AgenceComponent],
  exports: [
  ],
  imports: [
    CommonModule,
    AdminPannelRoutingModule,
    CKEditorModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ]
})
export class AdminPannelModule { }
