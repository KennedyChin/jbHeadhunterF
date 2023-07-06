/**===================================================
 * 名稱：unsubscribe.component.ts
 * 
 * 用途：處理【取消訂閱電子報】相關的内容
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
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/internal/operators/finalize';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit  {

  isLoading: boolean = false
  @ViewChild("f",{static:false}) f: NgForm | undefined

  userMail: string = "";
 

  constructor(
    private route: ActivatedRoute 
    , private _http: HttpClient
    , private toastr: ToastrService
    , private titleService: Title
    ) { 
      this.route.queryParams
      .pipe(filter(p=>p.message))
      .subscribe(params => {
        this.toastr.info(params.message??'')
      })

    }

  ngOnInit(): void {
    this.titleService.setTitle("取消訂閱電子報｜JB Headhunter");

    // 從URL中擷取userNo參數
    this.route.queryParams.subscribe(params => {
      this.userMail = params['userMail'] !== undefined ? params['userMail'] : "";
      // if(this.userMail !== ""){
      //   this.f?.controls['usermail'].setValue(this.userMail);
      // }
    })
  }


  private singleExecutionSubscription?: Subscription = undefined;
  recentToken = "";
  
  executeAction(action: string): void {
    if (this.singleExecutionSubscription) {
      this.singleExecutionSubscription.unsubscribe();
    }
  }

  /**
   * 取消訂閱
   * @param form 
   */
  unsubscribeNews(form: NgForm){

    console.log('test');

    // 郵件
    const usermail = form.value.usermail;

    // Json格式
    const jsonBody = {
      'email': usermail
    };

    const headers = { 'content-type': 'application/json' }

    if (form.valid) {
      // 表單驗證通過，可以提交表單

      const sendUserData$ = this._http.post(
        'https://hunter.jbhr.com.tw/api/NewNewspaper/unsubscribe', jsonBody, { 'headers': headers })
        .pipe(finalize(()=>{}))
  
      sendUserData$.subscribe(n=>console.log(n))
        
      alert('已取消訂閱');
  
      // 將使用者重新導回首頁
      window.location.href = 'https://hunter.jbhr.com.tw'; // 將 URL 設為首頁的 URL

    } 
    else {
      // 表單驗證失敗，阻止提交表單
    }
  }
}
