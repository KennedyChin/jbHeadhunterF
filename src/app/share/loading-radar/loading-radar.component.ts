import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-radar',
  template: '<div class="lds-ripple"><div></div><div></div></div>',
  styleUrls: ['./loading-radar.component.css']
})
export class LoadingRadarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
