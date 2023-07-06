import { Directive, HostListener, ElementRef } from '@angular/core';

/**
 * 協助input將Label顯示文字上移效果
 */
@Directive({
  selector: 'input[appInputFocusWithLabel]'
})
export class InputFocusWithLabelDirective {

  constructor() { }

  @HostListener("focus", ['$event.target'])
  InputFocus(ele: HTMLInputElement) {
    // console.log(ele.parentElement?.tagName)
    const tEle = ele.parentElement?.parentElement;

    if (tEle?.classList.contains("form-group")) {
      tEle.classList.add("focused")
    }
  }

  @HostListener("blur", ['$event.target'])
  InputUnfocus(ele: HTMLInputElement) {
    const tEle = ele.parentElement?.parentElement;

    if(ele.value == ''){
      if (tEle?.classList.contains("form-group")) {
        tEle.classList.remove("focused")
      }
    } 
  }
}
