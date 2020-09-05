import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ImmobilierService} from "../../../services/immobilier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LabelType, Options} from "ng5-slider";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  numberResult : number = -1
  filterForm : FormGroup
  typeData = ['Maison','Appartement','Local']

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

  constructor(
    private formBuilder : FormBuilder,
    private immobilierService : ImmobilierService,
    private router : Router,
    private activeRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      region : [],
      city: [],
      status : ['location'],
      type: this.formBuilder.array([]),
      price : new FormControl([150000,5000000 ])
    })
    this.immobilierService.updateFilter(this.filterForm.value)

    this.immobilierService.numberSubject.subscribe(
      (number : number) => {
        number[0] ? this.changeNumber(number[0].total) :
          this.changeNumber(0)
      }
    )

  }

  onCheckChange (e) {

    const checkArray: FormArray = this.filterForm.get(e.target.name) as FormArray
    if (e.target.checked) { // Si on coche une case
      checkArray.push(new FormControl(e.target.value))
    } else { // Si on décoche une case
      checkArray.controls.forEach((item: FormControl, index) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(index)
          return
        }
      })
    }
  }

  changeNumber(number){
    if (this.numberResult == number) {
      return 0
    }
    else if (this.numberResult == null)
      this.numberResult = 0

    let etapes = Math.abs(number - this.numberResult) > 50 ? 50 : Math.abs(number - this.numberResult)
    let ms = 16

    let qte = number - this.numberResult
    let pas = Math.trunc(qte / etapes)
    let i = 0
    let numInterval = setInterval(()=>{
      this.numberResult += pas
      i++
      if(i == etapes){
        this.numberResult = number
        clearInterval(numInterval)
      }
    },ms)
  }

  onFormChange(){
    this.immobilierService.updateFilter(this.filterForm.value)
    this.immobilierService.getNumber()

  }

  navigate(){
    this.router.navigate(['immobilier','location'/*,'location'this.filterForm.get('status').value*/])
  }

}
