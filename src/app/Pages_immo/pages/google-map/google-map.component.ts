import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  @Input() address
  latitude : number
  longitude : number
  constructor() { }

  ngOnInit(): void {
    this.longitude = this.address.longitude
    this.latitude = this.address.latitude
  }

}
