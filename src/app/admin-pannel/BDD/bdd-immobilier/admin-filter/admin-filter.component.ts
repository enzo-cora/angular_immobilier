import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ImmobilierService} from "../../../../services/immobilier.service";

@Component({
  selector: 'app-admin-filter',
  templateUrl: './admin-filter.component.html',
  styleUrls: ['./admin-filter.component.css']
})
export class AdminFilterComponent implements OnInit {

  filterShow = this.immoService.filter

  keypress = 0
  typeData = ['Maison','Appartement','Local']
  bedroomsData = [1,2,3,4,5,6,7]
  bathroomsData = [1,2,3,4,5,6,7]
  living_roomData = [1,2,3,4]
  kitchenData = [1,2,3]
  statusData =  ['achat','location']

  @Input() resultats : number
  filterForm : FormGroup

  constructor(
    private formBuilder : FormBuilder,
    private immoService : ImmobilierService,
  ) { }


  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      type: this.formBuilder.array([]),

      maxPrice: [this.immoService.filter['maxPrice']],
      minPrice: [this.immoService.filter['minPrice']],

      maxSurface: [this.immoService.filter['maxSurface']],
      minSurface: [this.immoService.filter['minSurface']],

      status : this.formBuilder.array([]),
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

  onKeyDown(){
    this.keypress ++
    const ref = this.keypress
    setTimeout(()=>{
      if(ref === this.keypress) {
        this.recherche()
      }
    },400)
  }

  recherche(){
    this.immoService.updateFilter(this.filterForm.value)
    this.immoService.getByFiltersAdmin()
  }


}
