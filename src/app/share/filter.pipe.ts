import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], search:any, fieldName:string):any[] {
    if(!items)
      return []
    if(!search)
      return items
    
    return items.filter(item=>{
      if(item && item[fieldName] === search)
        return true
      else return false
    })
  }
}
