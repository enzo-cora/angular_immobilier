import {Component, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ImmobilierService} from "../../../services/immobilier.service";
import {LabelType, Options} from 'ng5-slider';

@Component({
  selector: 'app-filtrator2000',
  templateUrl: './filtrator2000.component.html',
  styleUrls: ['./filtrator2000.component.css']
})
export class Filtrator2000Component implements OnInit {

  filterShow = this.immoService.filter
  @Input() status : string
  resultats : number = -1
  filterForm : FormGroup

  typeData = ['Maison','Appartement','Local']
  bedroomsData = [1,2,3,4,5,6,7]
  bathroomsData = [1,2,3,4,5,6,7]
  living_roomData = [1,2,3,4]
  kitchenData = [1,2,3]

  optionsRangeSlider1 : Options = { //Option pour le slider Prix
    floor: 150000,
    ceil: 5000000,
    logScale: true,
    animate : false,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low: return '<b>Min</b> ' + Math.ceil(value/1000) + 'K €';
        case LabelType.High: return '<b>Max</b> ' + Math.ceil(value/1000) +'K €';
        default : return ''
      }
    }
  }
  optionsRangeSlider2 : Options = { //Option pour le slider Surface
    floor: 10,
    ceil: 400,
    animate : false,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low: return '<b>Min</b> ' + value + 'm²';
        case LabelType.High: return '<b>Max</b> ' + value +'m²';
        default : return ''
      }
    }
  }


  constructor(
    private formBuilder : FormBuilder,
    private immoService : ImmobilierService,
  ) { }


  changeNumber(number){
    if (this.resultats == number) {
      return 0
    }
    else if (this.resultats == null)
      this.resultats = 0
    let etapes = Math.abs(number - this.resultats) > 50 ? 50 : Math.abs(number - this.resultats)
    let ms = 16

    let qte = number - this.resultats
    let pas = Math.trunc(qte / etapes)
    let i = 0
    let numInterval = setInterval(()=>{
      this.resultats += pas
      i++
      if(i == etapes){
        this.resultats = number
        clearInterval(numInterval)
      }
    },ms)
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      type: this.formBuilder.array([]),
      status: [this.status || null],
      price : new FormControl([
        this.immoService.filter['price'] ? this.immoService.filter['price'][0] : 150000,
        this.immoService.filter['price'] ? this.immoService.filter['price'][1] : 5000000 ]),

      surface : new FormControl([
        this.immoService.filter['surface'] ? this.immoService.filter['surface'][0] : 10,
        this.immoService.filter['surface'] ? this.immoService.filter['surface'][1] : 400 ]),

      bedroom: this.formBuilder.array([]),
      bathroom: this.formBuilder.array([]),
      living_room: this.formBuilder.array([]),
      kitchen: this.formBuilder.array([]),

      garage: [this.immoService.filter['garage']],
      terrace: [this.immoService.filter['terrace']],

      region: [this.immoService.filter['region']],
      city: [this.immoService.filter['city']],
      postal_code: [this.immoService.filter['postal_code']],
    })
    this.immoService.getByFilters(this.status)
  }


    isChecked(target){

      const filters = this.immoService.filter
      let key = target.name
      let value = target.value
      let array = filters[key]
      if(Array.isArray(array) && array.includes(value) ) {
        target.checked = true
        const  checkArray : FormArray = this.filterForm.get(target.name) as FormArray
        checkArray.push(new FormControl(target.value))
      }
    }

  onCheckChange (e){
    const  checkArray : FormArray = this.filterForm.get(e.target.name) as FormArray
    if(e.target.checked) { // Si on coche une case
      checkArray.push(new FormControl(e.target.value))
    }
    else  { // Si on décoche une case
      checkArray.controls.forEach((item : FormControl, index) =>{
        if(item.value === e.target.value ) {
          checkArray.removeAt(index)
          return
        }
      })
    }
  }

  recherche(){
    this.immoService.updateFilter(this.filterForm.value)
    this.immoService.getByFilters(this.status)
  }


}
