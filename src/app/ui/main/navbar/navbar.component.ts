/**===================================================
 * 名稱：navbar.component.ts
 *
 * 用途：處理【首頁-服務介紹 Part】相關的内容
 * 版本：
 * ===================================================
 * 人員      日期          版本          註記
 * ---------------------------------------------------
 * Daniel   2023/05/15    Ver 1.0.0     Create
 * ===================================================
 */
import { Component, OnInit } from '@angular/core';
import { JobServiceService } from 'src/app/services/job-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // 宣告並初始化 savedJobsCount 屬性
  savedJobsCount: number =
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem('jobs')!)
      : [];

  constructor(private jobService: JobServiceService) {}

  navbarCollapsed = true;

  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  ngOnInit(): void {
    this.jobService.savedJobsCount$.subscribe((count) => {
      this.savedJobsCount = count;
    });

    this.savedJobsCount = this.getSavedJobsCount();
  }
  // 获取收藏职缺数量的方法
  getSavedJobsCount(): number {
    // 从 Local Storage 中获取保存的收藏职缺 ID 数组
    let savedJobsIds =
      typeof localStorage !== 'undefined'
        ? JSON.parse(localStorage.getItem('jobs')!)
        : [];

    // 返回数组长度作为收藏职缺数量
    return savedJobsIds.length;
    return 0;
  }
}
