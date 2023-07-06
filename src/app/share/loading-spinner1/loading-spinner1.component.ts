import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner1',
  template: '<div class="lds-facebook"><div></div><div></div><div></div></div>',
  styleUrls: ['./loading-spinner1.component.css'],
})
export class LoadingSpinner1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
