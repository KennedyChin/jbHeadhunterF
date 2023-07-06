import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-hourglass',
  template: '<div class="lds-hourglass"></div>',
  styleUrls: ['./loading-hourglass.component.css']
})
export class LoadingHourglassComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
