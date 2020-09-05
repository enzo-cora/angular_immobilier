import {Directive, EventEmitter, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[ngInit]'
})
export class NgInitDirective implements OnInit{

  @Output() ngInit : EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
    this.ngInit.emit()
  }

}
