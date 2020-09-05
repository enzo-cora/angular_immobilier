import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ImmobilierService} from "../../services/immobilier.service";
import {FileTransformService} from "../../services/file-transform.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-immo',
  templateUrl: './new-immo.component.html',
  styleUrls: ['./new-immo.component.css']
})
export class NewImmoComponent implements OnInit {

  miniaBanniere
  miniaPhotos = []
  immoForm : FormGroup
  @ViewChild('images') images : ElementRef;

  constructor(
    private formBuilder : FormBuilder,
    private immoService : ImmobilierService,
    private fileTransform : FileTransformService,
    private router : Router
  ) { }


  ngOnInit(): void {
      this.immoForm = this.formBuilder.group({
      img : ['',[Validators.required]],
      sellerFirstName : [null,Validators.required],
      sellerName : [null,Validators.required],
      type : [null,Validators.required],
      title : [null,Validators.required],
      status : [] ,
      description : [null,Validators.required],
      surface : [null,Validators.required],
      price : [null,Validators.required],
      bedroom : [null,Validators.required],
      bathroom : [null,Validators.required],
      living_room : [null,Validators.required],
      kitchen : [null,Validators.required],
      rooms : [null,Validators.required],
      garage : [false],
      terrace : [false],
        country : [null,Validators.required],
        region : [null,Validators.required],
        city : [null,Validators.required],
        postal_code : [null,Validators.required],
        street : [null,Validators.required],
        longitude : [null,Validators.required],
        latitude : [null,Validators.required],
      offres : this.formBuilder.array([])
    })
  }

  onFileChange(event){
    this.immoForm.patchValue ({img: event.target.files[0]})

    this.fileTransform.blobToBase64(event.target.files[0])
      .then(result => this.miniaBanniere = result)
  }


  onFilesChange(event){

    this.miniaPhotos = []
    for(let key in this.images.nativeElement.files){
      let photo = this.images.nativeElement.files[key]
      if(photo.type){
        this.fileTransform.blobToBase64(photo)
          .then(base64 =>  this.miniaPhotos.push(base64))
      }
    }
  }

  onRoomsChange(){
    this.immoForm.patchValue({rooms : this.immoForm.value.bedroom + this.immoForm.value.living_room })
  }


  onSubmit(){
    // console.log(this.immoForm.value)
    let formData = new FormData()
    for (let key in this.immoForm.value) {
      formData.append(key,this.immoForm.value[key])
    }
    for(let key in this.images.nativeElement.files){
      formData.append('imgs',this.images.nativeElement.files[key])
    }
    this.immoService.postImmo(formData).subscribe(
      res => {
        res['success'] ? this.router.navigate(['admin','immobilier']) : '' ;
      }
    )
  }

}

