/**===================================================
 * 名稱：main-hunting-introduction.component.ts
 * 
 * 用途：處理【首頁-基本介紹 Part】相關的内容
 * 版本：
 * ===================================================
 * 人員      日期          版本          註記
 * ---------------------------------------------------
 * Daniel   2023/05/15    Ver 1.0.0     Create
 * ===================================================
 */
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobHttp } from '../../../share/Model/JobHttpDto';

@Component({
  selector: 'app-main-hunting-introduction',
  templateUrl: './main-hunting-introduction.component.html',
  styleUrls: ['./main-hunting-introduction.component.css']
})
export class MainHuntingIntroductionComponent implements OnInit {

  @Input() jobs:JobHttp[] | null = null
  jobs$?:Observable<JobHttp[]>
  static readonly imageRoot:string =   environment.hotJobImagePath

  constructor(
    
  ) { }

  /**
   * 初始化
   */
  ngOnInit(): void {
    
  }
}
