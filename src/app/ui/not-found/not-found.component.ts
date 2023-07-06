/**===================================================
 * 名稱：not-found.component.ts
 * 
 * 用途：處理【404 Not Found 頁面】相關的内容
 * 版本：
 * ===================================================
 * 人員      日期          版本          註記
 * ---------------------------------------------------
 * Daniel   2023/05/15    Ver 1.0.0     Create
 * ===================================================
 */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("404｜JB Headhunter");
  }

}
