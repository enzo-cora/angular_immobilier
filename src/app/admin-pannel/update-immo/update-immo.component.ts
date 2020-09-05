import {Component, OnInit, ViewChild} from '@angular/core';
import {Immobilier} from "../../models/immobilier";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ImmobilierService} from "../../services/immobilier.service";
import {ActivatedRoute} from "@angular/router";
import {FileTransformService} from "../../services/file-transform.service";

@Component({
  selector: 'app-update-immo',
  templateUrl: './update-immo.component.html',
  styleUrls: ['./update-immo.component.css']
})
export class UpdateImmoComponent implements OnInit {

  miniaBanniere
  miniaPhotos = []
  immo : Immobilier
  immoForm : FormGroup
  files = []
  id = this.activedRoute.snapshot.params.id

  constructor(
    private formBuilder : FormBuilder,
    private immoService : ImmobilierService,
    private activedRoute : ActivatedRoute,
    private fileTransform : FileTransformService
  ) {
  }


  ngOnInit(): void {
    this.initImmo()
    this.immoService.getByRef(this.id).subscribe(
      content => {
        this.immo = content
        this.miniaPhotos = content.photos
        this.miniaBanniere = content.banniere
        this.immoForm.patchValue(content)
        this.immoForm.patchValue(content.address)
        this.fileTransform.urlToBlob(content.banniere)
          .then(blob => this.immoForm.patchValue({img: blob}))

        let promises = content.photos.map(url => this.fileTransform.urlToBlob(url))
        Promise.all(promises).then( blobArray => this.files = blobArray )
      })
  }

  initImmo (){
    this.immoForm = this.formBuilder.group({
      img : [],
      sellerFirstName : ['',Validators.required],
      sellerName : ['',Validators.required],
      type : ['',Validators.required],
      title : ['',Validators.required],
      status : ['',Validators.required] ,
      description : ['',Validators.required],
      surface : ['',Validators.required],
      price : ['',Validators.required],
      bedroom : ['',Validators.required],
      bathroom : ['',Validators.required],
      living_room : ['',Validators.required],
      kitchen : ['',Validators.required],
      rooms : ['',Validators.required],
      garage : [],
      terrace : [],
      country : ['',Validators.required],
      region : ['',Validators.required],
      city : ['',Validators.required],
      postal_code : ['',Validators.required],
      street : ['',Validators.required],
      longitude : ['',Validators.required],
      latitude : ['',Validators.required],
      offres : this.formBuilder.array([])
    })
  }

  onFileChange(event){
    this.immoForm.patchValue({img : event.target.files[0]})

    this.fileTransform.blobToBase64(event.target.files[0])
      .then(result => this.miniaBanniere = result)

  }

  onFilesChange(event){
    this.files = []
    for(let key in event.target.files){
      this.files.push(event.target.files[key])
    }

    this.miniaPhotos = []
    this.files.forEach(elem=>{
      if(elem.type){
        this.fileTransform.blobToBase64(elem)
          .then(base64 =>  this.miniaPhotos.push(base64))
      }
    })
  }


  onRoomsChange(){
    this.immoForm.patchValue({rooms : this.immoForm.value.bedroom + this.immoForm.value.living_room })
  }

  goToThis(){
    let elem = this.immo
    window.open(`/immobilier/${elem.status}/details/${elem.reference}` )
  }

  onSubmit(){
    let formData = new FormData()
    this.files.forEach(elem =>{
      formData.append('imgs',elem)
    })

    for (let key in this.immoForm.value) {
      formData.append(key,this.immoForm.value[key])
    }
    this.immoService.postUpdate(formData,this.id)
  }

}
