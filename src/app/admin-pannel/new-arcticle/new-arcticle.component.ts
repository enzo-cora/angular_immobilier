import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {HttpClient} from "@angular/common/http";
import {UploadAdaptator} from "./UploadAdaptator";
import {NgForm} from "@angular/forms";
import {ArticlesService} from "../../services/articles.service";
import {Router} from "@angular/router";
import {FileTransformService} from "../../services/file-transform.service";

@Component({
  selector: 'app-new-arcticle',
  templateUrl: './new-arcticle.component.html',
  styleUrls: ['./new-arcticle.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewArcticleComponent implements OnInit {

  @ViewChild('img') img:ElementRef;
  Editor = ClassicEditor
  model = { editorData : '' };
  miniature = null
  online  = 'false';
  files = []
  listCategorie = ['autre','achat','vente','location','confiance']

  constructor(
    public  http : HttpClient,
    private articlesService : ArticlesService,
    private router : Router,
    private fileTransform : FileTransformService,
  ) {
  }

  ngOnInit(): void {
  }

  showMiniature(event){
    let file = event.target.files[0]
    new Promise( ( resolve, reject ) => {
      let myReader= new FileReader();
      myReader.onloadend = () => {
        resolve(myReader.result);
      }
      myReader.readAsDataURL(file);
    } )
      .then( (result)=>  this.miniature = result  )
  }

  onSubmit(form : NgForm){
    let elem = document.querySelector('.ck-content')
    let imgs = elem.querySelectorAll("img")
    let formData :FormData = new FormData()
    if(imgs.length){
      imgs.forEach((elem,index) => {
        let base64 =  elem.getAttribute('src')
        let file = this.fileTransform.base64ToFile(base64,'images' + index)
        formData.append('imgs', file) })
    }
    if(this.img.nativeElement.files[0]){
      formData.append('img',this.img.nativeElement.files[0]) ;
    }
    formData.append('contenu',elem.innerHTML) ;
    formData.append('online',form.controls['online'].value.includes('true'))
    formData.append('titre',form.controls['titre'].value.trim())
    formData.append('categorie',form.controls['categorie'].value)
    formData.append('sousTitre',form.controls['sousTitre'].value)
    this.articlesService.publishArticle(formData)
    this.router.navigate(['admin','articles'])
  }

  onReady(Editor) {
    Editor.plugins.get('FileRepository').createUploadAdapter =  (loader) => {
      return new UploadAdaptator(loader,this.http)
    };
  }


}
