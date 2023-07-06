/**===================================================
 * 名稱：job-local-service.service.ts
 * 
 * 用途：處理【收藏職缺】相關的服務内容
 * 版本：
 * ===================================================
 * 人員      日期          版本          註記
 * ---------------------------------------------------
 * Daniel   2023/05/15    Ver 1.0.0     Create
 * ===================================================
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JobHttp } from '../share/Model/JobHttpDto';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobLocalServiceService {
  // 宣告並初始化 savedJobsCount 屬性（收藏職缺的數量）
  savedJobsCount: number = 0; 

  private savedJobsCountSource = new BehaviorSubject<number>(0);

  savedJobsCount$ = this.savedJobsCountSource.asObservable();

  constructor(
    private http: HttpClient) {
  }

  /**
   * 更新收藏職缺數量
   * @param count 
   */
  updateSavedJobsCount(count: number) {
    this.savedJobsCountSource.next(count);
  }
  
  /**
   * 取得所有收藏的職缺内容
   * @returns 
   */
  getSavedJobs():Observable<JobHttp[]> {

    const savedData: JobHttp[] = []

    const jobs: number[] = JSON.parse(localStorage.getItem('jobs')!);

    // 正式環境 API 的 URL
    const url = 'https://hunter.jbhr.com.tw/api/Job/GetJobDetial/';
    // // 測試環境 API 的 URL
    // const url = 'https://edc.jbhr.com.tw/FlyHigh/flyMe/Job/GetJobDetial/';

    // 分別將資料抓出來
    jobs.forEach(job => {
      this.http.get<JobHttp>(url+job).subscribe(data => {
        savedData.push(data);
      });
    });
    
    return of(savedData);
  }

  /**
   * 在收藏職缺時呼叫的方法
   * @param job 
   */
  onJobFavorited(job: JobHttp) {
    // 更新相應的數據

    // 取得 Local Storage 中已儲存的陣列（假設 key 為 'jobs'）
    let savedJobsIds = JSON.parse(localStorage.getItem('jobs')!) || [];

    // 判斷職缺是否已經被使用者收藏
    const jobIndex = savedJobsIds.indexOf(job.id);

    // 如果收藏，且職缺 ID 不在陣列中，則將職缺 ID 加入陣列
    if (jobIndex === -1) {
      savedJobsIds.push(job.id);
    }
    // 如果取消收藏，且職缺 ID 在陣列中，則從陣列中刪除職缺 ID
    else if (jobIndex !== -1) {
      savedJobsIds.splice(jobIndex, 1);
    }

    // 更新 Local Storage 中的值
    localStorage.setItem('jobs', JSON.stringify(savedJobsIds));

    // 更新組件屬性 savedJobsCount
    this.savedJobsCount = savedJobsIds.length;
  }
}
