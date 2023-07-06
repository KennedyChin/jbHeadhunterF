/**===================================================
 * 名稱：footer.component.ts
 * 
 * 用途：處理【網頁頁尾】相關的内容
 * 版本：
 * ===================================================
 * 人員      日期          版本          註記
 * ---------------------------------------------------
 * Daniel   2023/05/15    Ver 1.0.0     Create
 * ===================================================
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // 取得當前年份
  currentYear: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
