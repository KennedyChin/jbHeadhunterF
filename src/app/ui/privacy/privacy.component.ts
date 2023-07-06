/**===================================================
 * 名稱：privacy.component.ts
 * 
 * 用途：處理【隱私權保護政策】相關的内容
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
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  constructor(
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("隱私權保護政策｜JB Headhunter");
  }

}
