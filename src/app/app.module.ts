import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Pages_immo/auth/register/register.component';
import { LoginComponent } from './Pages_immo/auth/login/login.component';
import { AcceuilPageComponent } from './Pages_immo/accueil/acceuil-page/acceuil-page.component';
import { FilterComponent } from './Pages_immo/accueil/filter/filter.component';
import { NewLetterComponent } from './Pages_immo/accueil/new-letter/new-letter.component';
import { WhyUsComponent } from './Pages_immo/accueil/whyUs/why-us.component';
import { HeaderComponent } from './Pages_immo/structure/header/header.component';
import { FooterComponent } from './Pages_immo/structure/footer/footer.component';
import { AcheterComponent } from './Pages_immo/pages/acheter/acheter.component';
import { LouerComponent } from './Pages_immo/pages/louer/louer.component';
import { ProfilComponent } from './Pages_immo/auth/profil/profil.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { ItemArticleComponent } from './Pages_immo/pages/articles/item-article/item-article.component';
import { Error404Component } from './Pages_immo/error404/error404.component';
import { VendreComponent } from './Pages_immo/pages/vendre/vendre.component';
import { Filtrator2000Component } from './Pages_immo/structure/filtrator2000/filtrator2000.component';
import {NgxPaginationModule} from "ngx-pagination";
import { DetailsImmoComponent } from './Pages_immo/pages/details-immo/details-immo.component';
import { NgInitDirective } from './services/directives/ng-init.directive';
import { GoogleMapComponent } from './Pages_immo/pages/google-map/google-map.component';
import {AgmCoreModule} from "@agm/core";
import {LoginIntercepteurProdiver} from "./services/interceptor/login.interceptor";
import {GuardAdmin} from "./services/guards/guard-admin.service";
import {GuardLogged} from "./services/guards/guard-logged.service";
import {GuardUnlogged} from "./services/guards/guard-unlogged.service";
import {HttpClientModule} from "@angular/common/http";
import {ArticlesComponent} from "./Pages_immo/pages/articles/articles.component";
import {MessagesInterceptorProvider} from "./services/interceptor/messages.interceptor";
import {ToastrModule} from "ngx-toastr";
import {Ng5SliderModule} from "ng5-slider";
import { LastArticlesComponent } from './Pages_immo/accueil/last-articles/last-articles.component';
import { LastImmoComponent } from './Pages_immo/accueil/last-immo/last-immo.component';
import { CutTextPipe } from './services/pipes/cut-text.pipe';
import { ReplaceByPipe } from './services/pipes/replace-by.pipe';
import { ContactUsComponent } from './Pages_immo/pages/contact-us/contact-us.component';
import { AboutUsComponent } from './Pages_immo/about-us/about-us.component';
import { SuggestionsComponent } from './Pages_immo/suggestions/suggestions.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AcceuilPageComponent,
    FilterComponent,
    NewLetterComponent,
    WhyUsComponent,
    HeaderComponent,
    FooterComponent,
    AcheterComponent,
    LouerComponent,
    ProfilComponent,
    ItemArticleComponent,
    Error404Component,
    VendreComponent,
    Filtrator2000Component,
    DetailsImmoComponent,
    NgInitDirective,
    GoogleMapComponent,
    ArticlesComponent,
    LastArticlesComponent,
    LastImmoComponent,
    CutTextPipe,
    ReplaceByPipe,
    ContactUsComponent,
    AboutUsComponent,
    SuggestionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({apiKey: "AIzaSyC4G_O6u0TpC-fOMqeLQfd37pJPUqU5lh8"}),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    Ng5SliderModule
  ],
  providers: [
    LoginIntercepteurProdiver,
    MessagesInterceptorProvider,
    GuardAdmin,
    GuardLogged,
    GuardUnlogged,
  ],
  exports: [
    NgInitDirective,
    GoogleMapComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
