/**===================================================
 * 名稱：subscribe.component.ts
 * 
 * 用途：處理【訂閱電子報】相關的内容
 * 版本：
 * ===================================================
 * 人員      日期          版本          註記
 * ---------------------------------------------------
 * Daniel   2023/05/15    Ver 1.0.0     Create
 * ===================================================
 */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, empty } from 'rxjs';
import { filter } from 'rxjs/operators';
import { finalize } from 'rxjs/internal/operators/finalize';
import { DropdownSettings } from 'angular2-multiselect-dropdown/lib/multiselect.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit  {

  


  isLoading: boolean = false
  // message: string = ""
  @ViewChild("f",{static:false}) f: NgForm | undefined

  areaDataList: {id: number, name: string, groupName: string}[] = [];
  areaSelectedItems: {id: number, name: string, groupName: string}[] = [{id: 0, name: '不拘', groupName: '無'}];

  areaDropSetting = {
    singleSelection: false,
    searchPlaceholderText: '搜尋區域關鍵字',
    text: "選擇區域",
    enableCheckAll:false,
    enableSearchFilter: true,
    labelKey: "name",
    primaryKey: "id",
    idField: "id",
    textField: "name",
    badgeShowLimit: 5,
    disabled:false,
    groupBy: "groupName"
  } as DropdownSettings

  postDataList: {id: number, name: string}[] = [];
  postSelectedItems: {id: number, name: string}[] = [{id: 0, name: '不拘'}];
  
  postDropSetting = {
    singleSelection: false,
    searchPlaceholderText: '搜尋職務關鍵字',
    text: "選擇職務",
    enableCheckAll:false,
    enableSearchFilter: true,    
    labelKey: "name",
    primaryKey: "id",
    idField: "id",
    textField: "name",
    badgeShowLimit: 5,
    disabled:false,
    selectionLimit:3
  } as DropdownSettings

  constructor(
    private route: ActivatedRoute 
    , private _http:HttpClient
    , private toastr: ToastrService
    , private titleService: Title
    ) { 
    this.route.queryParams
    .pipe(filter(p=>p.message))
    .subscribe(params => {
      // this.message = params.message??"";
      this.toastr.info(params.message??'')
    })

  }

  /**
   * 初始化
   */
  ngOnInit(): void {
    this.titleService.setTitle("訂閱電子報｜JB Headhunter");
    // 將 dummyData 賦值給 multiselect 的 data 屬性
    this._http.get<{id: number, name: string, groupName: string}[]>
    ('https://hunter.jbhr.com.tw/api/Job/place')
    // ('https://edc.jbhr.com.tw/FlyHigh/flyMe/Job/place')
    .subscribe(data => {
      this.areaDataList = data.map(item => ({id: item.id, name: item.name, groupName: item.groupName}));
      this.areaSelectedItems=[{id:0, name:'不拘', groupName:'無'}];
      
    console.log(this.areaDataList)
    console.log(this.areaSelectedItems)
    }
    );

    this._http.get<{id: number, name: string}[]>
    ('https://hunter.jbhr.com.tw/api/Job/jobCategory')
    // ('https://edc.jbhr.com.tw/FlyHigh/flyMe/Job/jobCategory')
    .subscribe(data => {
      this.postDataList = data.map(item => ({id: item.id, name: item.name}));
      this.postSelectedItems=[{id:0, name:'不拘'}];
      
    console.log(this.postDataList)
    console.log(this.postSelectedItems)
    }
    );
  }


  private singleExecutionSubscription?: Subscription = undefined;
  recentToken = "";
  
  /**
   * 
   * @param action 
   */
  executeAction(action: string): void {
    if (this.singleExecutionSubscription) {
      this.singleExecutionSubscription.unsubscribe();
    }
  }

  /**
   * 訂閱電子報
   * @param form 
   */
  subscribeNews(form: NgForm){

    console.log('test');

    // 姓名
    const username = form.value.username;
    // 郵件
    const usermail = form.value.usermail;

    const jobs:number[] = this.postSelectedItems.map(item => item.id);

    const places:number[] = this.areaSelectedItems.map(item => item.id);

    // 若 jobs 包含 0 則將 jobs 清空
    if (jobs.includes(0)) {
      jobs.length = 0; 
    }

    // 若 places 包含 0 則將 places 清空
    if (places.includes(0)) {
      places.length = 0; 
    }

    // Json格式
    const jsonBody = {
      "name": username,
      "email": usermail,
      "jobs": jobs,
      "places": places
    };

    const headers = { 'content-type': 'application/json' }

    if (form.valid) {
      // 表單驗證通過，可以提交表單

      // const sendUserData$ = this._http.post(
      //   // 'https://hunter.jbhr.com.tw/api/NewNewspaper/subscribe'
      //   'https://edc.jbhr.com.tw/FlyHigh/flyMe/NewNewspaper/subscribe'
      //   , jsonBody, { 'headers': headers })
      //   .pipe(finalize(()=>{}))
  
      // sendUserData$.subscribe( (response: any) => {
      //   if (response.status >= 200 && response.status < 300) {
      //     console.log(response);
      //     alert('訂閱完成');
      //     window.location.href = 'https://hunter.jbhr.com.tw';
      //   } else {
      //     console.log(response);
      //     alert('該 Email 帳號已存在');
      //   }
      // })

      const sendUserData$ = this._http.post(
        'https://hunter.jbhr.com.tw/api/NewNewspaper/subscribe'
        // 'https://edc.jbhr.com.tw/FlyHigh/flyMe/NewNewspaper/subscribe'
        , jsonBody,
        { headers }
      );
      
      sendUserData$.subscribe({
        next: (response: any) => {
            console.log(response);
            alert('訂閱完成');
            window.location.href = 'https://hunter.jbhr.com.tw';
        },
        error: (error: any) => {
          console.log(error);
          if (error.status === 409) {
            alert('該 Email 帳號已存在訂閱紀錄\n若您要變更訂閱條件，請於取消訂閱後重新訂閱\n\n若仍有疑問，歡迎於 Line 與我們聯繫，謝謝');
          } else {
            alert('連線異常，請稍後再試');
          }
        }
      });
    } 
    else {
      // 表單驗證失敗，阻止提交表單
    }
  }

  //#region 多選下拉選單控制
  
  /**【職缺地區】選擇任意項目
   * 
   */
  onAreaItemSelect() {
    // 如果使用者選擇了任何項目，則移除"不拘"
    this.areaSelectedItems = this.areaSelectedItems.filter(item => item.id !== 0);
    // 最多只能選擇3個項目
    if (this.postSelectedItems.length > 3) {
      this.postSelectedItems.shift();
    }
  }
  
  /**【職缺地區】取消選擇項目
   * 
   */
  onAreaItemDeselect() {
    // 如果使用者取消選擇了所有項目，則添加"不拘"
    if (this.areaSelectedItems.length === 0) {
      this.areaSelectedItems.push({id: 0, name: '不拘', groupName: "無"});
    }
  }
  
  /**【職缺地區】選擇全部項目
   * 
   */
  onAreaSelectAll() {
    // 如果使用者選擇了所有項目，則移除"不拘"
    this.areaSelectedItems = this.areaSelectedItems.filter(item => item.id !== 0);
  }
  
  /**【職缺地區】取消選擇全部項目
   * 
   */
  onAreaDeselectAll() {
    // 如果使用者取消選擇了所有項目，則添加"不拘"
    if (this.areaSelectedItems.length === 0) {
      this.areaSelectedItems.push({id: 0, name: '不拘', groupName: "無"});
    }
  }

  /**【職務類別】選擇任意項目
   * 
   */
  onPostItemSelect() {
    // 如果使用者選擇了任何項目，則移除"不拘"
    this.postSelectedItems = this.postSelectedItems.filter(item => item.id !== 0);
    // 最多只能選擇3個項目
    if (this.postSelectedItems.length > 3) {
      this.postSelectedItems.shift();
    }
  }
  
  /**【職務類別】取消選擇項目
   * 
   */
  onPostItemDeselect() {
    // 如果使用者取消選擇了所有項目，則添加"不拘"
    if (this.postSelectedItems.length === 0) {
      this.postSelectedItems.push({id: 0, name: '不拘'});
    }
  }
  
  /**【職務類別】選擇全部項目
   * 
   */
  onPostSelectAll() {
    // 如果使用者選擇了所有項目，則移除"不拘"
    this.postSelectedItems = this.postSelectedItems.filter(item => item.id !== 0);
    // 最多只能選擇3個項目
    if (this.postSelectedItems.length > 3) {
      this.postSelectedItems.splice(3, this.postSelectedItems.length - 3);
    }
  }
  
  /**【職務類別】取消選擇全部項目
   * 
   */
  onPostDeselectAll() {
    // 如果使用者取消選擇了所有項目，則添加"不拘"
    if (this.postSelectedItems.length === 0) {
      this.postSelectedItems.push({id: 0, name: '不拘'});
    }
  }

  //#endregion
  
}
