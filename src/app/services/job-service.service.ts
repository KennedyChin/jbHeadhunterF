/**===================================================
 * 名稱：job-service.service.ts
 * 
 * 用途：處理【搜尋職缺】相關的服務内容
 * 版本：
 * ===================================================
 * 人員      日期          版本          註記
 * ---------------------------------------------------
 * Daniel   2023/05/15    Ver 1.0.0     Create
 * ===================================================
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';

import { JobHttp } from '../share/Model/JobHttpDto';

@Injectable({
  providedIn: 'root'
})
export class JobServiceService {  
  // 宣告並初始化 savedJobsCount 屬性
  savedJobsCount: number = 0; 

  // 查詢結果清單
  resultDataList: any;
  // 查詢結果明細
  resultDataDetail: any;

  // 收藏職缺來源
  private savedJobsCountSource = new BehaviorSubject<number>(0);
  // 收藏職缺數量
  savedJobsCount$ = this.savedJobsCountSource.asObservable();

  // 更新收藏職缺數量
  updateSavedJobsCount(count: number) {
    this.savedJobsCountSource.next(count);
  }

  constructor(
    private http: HttpClient) {
  }

  /**
   * 取得職缺資訊
   * @param id
   * @returns 
   */
  getJobDetail(id: number):Observable<JobHttp> {

    // 正式環境 API 的 URL
    const fUrl:string = `https://hunter.jbhr.com.tw/api/Job/GetJobDetial/${id}`
    // // 測試環境 API 的 URL
    // const fUrl:string = `https://edc.jbhr.com.tw/FlyHigh/flyMe/Job/GetJobDetial/${id}`;
    
    return this.http.get(fUrl).pipe(tap(n => this.resultDataDetail = n), map(() => this.resultDataDetail));  
  }

  /**
   * 取得搜索職缺
   * @param placeId 區域代碼
   * @param jobId 職務類別代碼
   * @param text 模糊查詢内容
   * @returns 職缺搜索結果
   */
  getSearchJobs(placeId:number, jobId:number, text:string) {
    const encodeStr:string = encodeURIComponent(text);

    // 正式環境 API 的 URL
    const fUrl:string = `https://hunter.jbhr.com.tw/api/Job/Search/${jobId}/${placeId}/${encodeStr}`
    // // 測試環境 API 的 URL
    // const fUrl:string = `https://edc.jbhr.com.tw/FlyHigh/flyMe/Job/Search/${jobId}/${placeId}/${encodeStr}`;
    
    return this.http.get<JobHttp[]>(fUrl);  
  }

  /**
   * 取得電子報職缺
   * @param number 使用者代碼
   * @returns 職缺
   */
  getUserNoJobs(userNo:number) {

    // 正式環境 API 的 URL
    const fUrl:string = `https://hunter.jbhr.com.tw/api/Job/GetMoreMore/${userNo}`
    // // 測試環境 API 的 URL
    // const fUrl:string = `https://edc.jbhr.com.tw/FlyHigh/flyMe/Job/GetMoreMore/${userNo}`;
    
    return this.http.get<JobHttp[]>(fUrl);  
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
