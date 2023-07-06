/**===================================================
 * 名稱：jobs-list.component.ts
 * 
 * 用途：處理【搜尋職缺明細】相關的内容
 * 版本：
 * ===================================================
 * 人員      日期          版本          註記
 * ---------------------------------------------------
 * Daniel   2023/05/15    Ver 1.0.0     Create
 * ===================================================
 */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { JobServiceService } from 'src/app/services/job-service.service';
import { JobHttp } from 'src/app/share/Model/JobHttpDto';
import { JobsComponent } from '../jobs.component';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  userNo: number = 0;

  savedSearchText: string = '';

  selectedPlace: string = '';
  selectedJob: string = '';

  selectedPlaceId:number = 0;
  selectedJobId:number = 0;

  searchControl = new FormControl('');
  places!: any[]
  jobs!: any[]

  searchText:string|null = null
  selectedPlaceItem:number = 0
  selectedJobItem:number = 0

  jobs$?:Observable<JobHttp[]> 
  @Input() previewMode:boolean = false
  // 宣告一個變數來儲存取得的地區資料

  constructor(
    private _route:ActivatedRoute
    , private _router:Router
    , private _jobService:JobServiceService
    , private http: HttpClient
    , private titleService: Title
  ) { }

  /**
   * 初始化
   */
  ngOnInit(): void {   
    this.titleService.setTitle("職缺列表｜JB Headhunter");

    // 在初始化 Component 時呼叫 API 取得地區資料
    this.http.get<any[]>('https://hunter.jbhr.com.tw/api/Job/place').subscribe(n => this.places = n);
    // // 測試環境 API 的 URL
    // this.http.get<any[]>('https://edc.jbhr.com.tw/FlyHigh/flyMe/Job/place').subscribe(n => this.places = n);
    
    // 在初始化 Component 時呼叫 API 取得職務資料
    this.http.get<any[]>('https://hunter.jbhr.com.tw/api/Job/jobCategory').subscribe(n => this.jobs = n);
    // // 測試環境 API 的 URL
    // this.http.get<any[]>('https://edc.jbhr.com.tw/FlyHigh/flyMe/Job/jobCategory').subscribe(n => this.jobs = n);
    
    // 從URL中擷取userNo參數
    this._route.queryParams.subscribe(params => {
      this.userNo = params['userNo'] !== undefined ? params['userNo'] : 0;
      this.selectedPlaceId = params['placeId'],
      this.selectedJobId = params['jobId'];
    })
    
    this.selectedPlaceItem = this.selectedPlaceId;     
    this.selectedJobItem = this.selectedJobId;


    this.queryParamSubscribe()
  }

  /**
   * search 
   */
  findText() {    
    const searchContent = this.searchText ? this.searchText : " ";

    this.savedSearchText = searchContent;
  
    this.changeQueryParam(this.selectedPlaceItem, this.selectedJobItem,searchContent)
  }

  /**
   * 
   * @param selectedPlaceId 
   * @param selectedJobId 
   * @param searchText 
   */
  changeQueryParam(selectedPlaceId:number,selectedJobId:number, searchText:string|null) {
    this._router.navigate([],{
      relativeTo:this._route
      ,queryParams:{        
      placeId: selectedPlaceId,
      jobId: selectedJobId,
        [JobsComponent.searchKey]:searchText
        ,hasingKey:new Date().getTime()
      }
      ,queryParamsHandling:'merge'
      ,skipLocationChange:false
    })
  }

  /**
   * 
   * @param placeId 
   * @param jobId 
   * @param t 
   */
  getMeInfo(placeId:number, jobId:number, t:string|null) {
    let o = !!t ? this._jobService.getSearchJobs(placeId, jobId, t) : this._jobService.getSearchJobs(placeId, jobId, " ")
    this.jobs$ = o
  }

  /**
   * 取得query param參數並篩選之
   */
  queryParamSubscribe() {
    // 根據userNo呼叫對應的API
    // 如果使用者不是從Mail的More點進來（預設userNo為0）則走正常查詢
    if (this.userNo === 0) {
          this._route.queryParamMap.subscribe(n => {
      // const id = n.get("id")
      const id =this._route.snapshot.paramMap.get("id")
      if(id!==null) {
        this.jobs$ = this._jobService.getJobDetail(+id).pipe(first(),map(o=>[o]))
        return
      }
      const t: string | null = n.get(JobsComponent.searchKey)
      if(this.savedSearchText === " ") {
              this.searchText = '';
      }
      else {
        this.searchText = this.savedSearchText;
      }

      this.getMeInfo(this.selectedPlaceId, this.selectedJobId, t)
    })

    } 
    else {
      let o = this._jobService.getUserNoJobs(this.userNo)
      this.jobs$ = o
    };
  }
}


