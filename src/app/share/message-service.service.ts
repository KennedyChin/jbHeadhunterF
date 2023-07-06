import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  msgSub:ReplaySubject<string> = new ReplaySubject<string>(3)

  constructor() { }
}
