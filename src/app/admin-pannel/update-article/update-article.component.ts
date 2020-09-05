import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {ArticlesService} from "../../services/articles.service";
import {UploadAdaptator} from "../new-arcticle/UploadAdaptator";
import {ActivatedRoute, Router} from "@angular/router";
import {Article} from "../../models/article";
import {FileTransformService} from "../../services/file-transform.service";

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateArticleComponent implements OnInit {

  file = null
  Editor = ClassicEditor
  article : Article = <Article>{}
  model = { editorData : '' };
  miniature = undefined
  online : string
  disableButton = false
  linkToTransform = []
  listCategorie = ['autre','achat','vente','location','confiance']



  constructor(
    public  http : HttpClient,
    private articlesService : ArticlesService,
    private activeRoute : ActivatedRoute,
    private fileTransform : FileTransformService
  ) {
  }


  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params.id
    this.articlesService.getByReference(id).subscribe(
      (article) => {
        this.article = article
        this.transformContent(article.contenu)
        this.online  =  Boolean(article.online).toString()
        this.fileTransform.urlToBase64(article.photo).then(
          (result)=> this.miniature = result
        )
        if(!article.photo.includes('defaultBannierePhoto')){
          this.fileTransform.urlToBlob(article.photo).then(blob => this.file = blob)
        }

      })


  }

  formatChain(chaine){
    if(this.linkToTransform.length) {
      let elem = this.linkToTransform.pop()
      this.fileTransform.urlToBase64(elem)
        .then(data => {
          chaine = chaine.replace(elem, data)
          this.formatChain(chaine)
        })
    }else{
      this.model.editorData = chaine
    }
  }

  transformContent(chaine){
    let regex =  /<img src="(http\S+)">/g
    let monTableau;
    let promises = []
    let base64 = []
    while ((monTableau = regex.exec(chaine)) !== null) {
      this.linkToTransform.push(monTableau[1])
    }
    this.linkToTransform.reverse()
    this.formatChain(chaine)
  }

  showMiniature(){
    this.fileTransform.blobToBase64(this.file)
      .then(base64 => this.miniature = base64)
  }

  onFileChange(event) {
    this.file = event.target.files[0]
    this.showMiniature()
  }


  onSubmit(form : NgForm){
    this.disableButton = true
    let elem = document.querySelector('.ck-content')
    let imgs = elem.querySelectorAll("img")
    let formData :FormData = new FormData()
    if(imgs.length){
      imgs.forEach((elem,index) => {
        let base64 =  elem.getAttribute('src')
        let file = this.fileTransform.base64ToFile(base64,'images' + index)
        formData.append('imgs', file) })
    }
    if(this.file){
      formData.append('img',this.file) ;
    }
    formData.append('contenu',elem.innerHTML) ;
    formData.append('online',form.controls['online'].value.includes('true'))
    formData.append('titre',form.controls['titre'].value.trim())
    formData.append('categorie',form.controls['categorie'].value)
    formData.append('sousTitre',form.controls['sousTitre'].value)

    this.articlesService.updateOne(this.activeRoute.snapshot.params.id,formData).subscribe(
      res => {
        this.disableButton = false})
    setTimeout(()=> this.disableButton = false,5000)

  }

  onVoir(){
    let id = this.article.titre.replace(/[\W\s]/g,'')
    let params = '?ref=' + this.article.reference
    window.open('/immobilier/articles/'+id + params )
  }

  onReady(Editor) {
    Editor.plugins.get('FileRepository').createUploadAdapter =  (loader) => {
      return new UploadAdaptator(loader,this.http)
    }
  }


}
