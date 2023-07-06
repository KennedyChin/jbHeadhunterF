import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLineMe'
})
export class NewLineMePipe implements PipeTransform {

  transform(value: string): string | null {
    
    if(value == null) {
      return null
    } 
    const vals:string[] = value.split("\n")
    return vals.join("<br/>")
  }

}
