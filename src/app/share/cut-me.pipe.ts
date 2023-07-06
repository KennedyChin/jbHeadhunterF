import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutMe'
})
export class CutMePipe implements PipeTransform {

  transform(value: string,length:number): string | null {
    if(value == null) {
      return null
    }

    const len = value.length;
    return len<=length ? value : `${value.slice(0,length)}...`
  }

}
