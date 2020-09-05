import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImmobilierService} from "../../services/immobilier.service";
import {strict} from "assert";

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})

export class SuggestionsComponent implements OnInit {

  isActive = false
  @Input() input
  myinputValue : string
  @Output() myinputChange = new EventEmitter<string>()
  suggestions : [string] = null
  lastSuggestion = null

 constructor(
    private immoService : ImmobilierService
  ) { }

  ngOnInit(): void {
    this.input.addEventListener('focus', ()=> {
      this.isActive = true
    })
    this.input.addEventListener('blur', ()=> {
      this.isActive = false
    })
  }

  @Input() get myinput(){
    return this.myinputValue;
  }

  set myinput(val) {
    this.myinputValue = val;
    this.myinputChange.emit(this.myinputValue)
    this.onChange()
  }

  onChange(){
    if (this.input.value != '' && this.lastSuggestion != this.input.value){
      let name = this.input.attributes.getNamedItem('ng-reflect-name').value
      let value = this.input.value
      this.immoService.getDistinct(value,'address.'+ name,5).subscribe(
        (res : [string]) => this.suggestions = res
      )
    }else {
      this.suggestions = null
    }
  }

  setfilter(value){
    this.input.value = value
    this.suggestions = null
    this.lastSuggestion = value
  }

}
