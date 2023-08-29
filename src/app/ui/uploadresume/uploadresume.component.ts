/**===================================================
 * 名稱：uploadresume.component.ts
 * 
 * 用途：處理【上傳履歷】相關的内容
 * 版本：
 * ===================================================
 * 人員      日期          版本          註記
 * ---------------------------------------------------
 * Daniel   2023/05/15    Ver 1.0.0     Create
 * ===================================================
 */
import { HttpClient, } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Observer, Subscription } from 'rxjs';
import { finalize } from 'rxjs/internal/operators/finalize';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-uploadresume',
  templateUrl: './uploadresume.component.html',
  styleUrls: ['./uploadresume.component.css']
})
export class UploadResumeComponent implements OnInit  {
  @ViewChild('resumeInput', { static: false })
  resumeInput!: ElementRef<HTMLInputElement>;
  
  public userOccasion: string = '';
  public maxCharCount: number = 60;

  agreePrivacyPolicy = false;
  static readonly key: string = "id"
  isEmailValid = true;
  jobId:number = 0

  isLoading: boolean = false
  @ViewChild("f",{static:false}) f: NgForm | undefined

  //
  fileKeyID: number = 0;

  constructor(
    private route: ActivatedRoute 
    , private _http:HttpClient
    , private toastr: ToastrService
    , private titleService: Title
    ) { 
    this.route.queryParams
    .pipe(filter(p=>p.message))
    .subscribe(params => {
      this.toastr.info(params.message??'')
    })
  }

  /**
   * 初始化
   */
  ngOnInit(): void {
    this.titleService.setTitle("上傳履歷｜JB Headhunter");
    interface User {
      id: number;
      name: string;
      email: string;
      contact: string;
      occasion: string;
      // 其他屬性
    }
    
    // 從URL中擷取userNo參數
    this.route.queryParams.subscribe(params => {
      this.jobId = params['id'] !== undefined ? params['id'] : 0;
    })
  }

  private singleExecutionSubscription?: Subscription = undefined;
  recentToken = "";
  
  executeAction(action: string): void {
    if (this.singleExecutionSubscription) {
      this.singleExecutionSubscription.unsubscribe();
    }
  }

  /** file 檔案區域 */
  fileName?: string
  uploadSub: Subscription | null = null
  uploadProgress:number = 0

  cancelUpload() {
    this.uploadSub?.unsubscribe();
  }

  onFileSelected(files:FileList) {
    // 測試是否有進入執行
    console.log('test');

    const file = files[0]

    if(this.uploadSub != null) {
      this.cancelUpload()
    }

    if (file) {
      const size = file.size
      if(size >= 10485760) {
        alert('超過檔案限制10Mb')
        
      }
      else{
        this.fileName = '上傳成功'
          
        const formData = new FormData();
        formData.append("inFile",file)
        const upload$ = this._http.post(
          'https://hunter.jbhr.com.tw/api/File/upload'
          // 'https://edc.jbhr.com.tw/FlyHigh/flyMe/File/upload'
          , formData, {
        }).pipe(finalize(()=>{
          
        }))

        upload$.subscribe({
          next: (response: any) => {
              console.log(response);
              // alert('檔案正確');
              this.uploadSub = upload$.subscribe((n: any) => {console.log(n); this.fileKeyID = n.fileUploadKey})
          },
          error: (error: any) => {
            console.log(error);
            if (error.status === 400) {
              alert('無上傳檔案或內容為空，請檢查附件内容，並請於稍後重試。');
            } else {
              alert('上傳檔案連線異常，請稍後再試');
            }
          }
        });
        
      }
    }
  }

  /**讀取檔案 */
  private readFile(blob: Blob): Observable<string> {
    return new Observable((obs:Observer<string>) => {
      const reader = new FileReader();
      reader.onerror = err => obs.error(err);
      reader.onabort = err => obs.error(err);
      reader.onload = () => obs.next(reader.result as string);
      reader.onloadend = () => obs.complete();
      return reader.readAsDataURL(blob);
    });
  }

  sendUserData(form: NgForm){
    // 檢查是否有上傳履歷
  if (this.resumeInput?.nativeElement.files?.length === 0) {
    // 若未上傳履歷則阻止上傳
    return
  }
  else{

    if (!this.agreePrivacyPolicy) {
      alert('請先勾選隱私權條款');
      return;
  }
    else{

      // 姓名
      const username = form.value.username;
      // 郵件
      const usermail = form.value.usermail;
      // 聯絡電話
      const usercontact = form.value.usercontact;
      // 可聯絡時間
      const useroccasion = form.value.useroccasion;

      // Json格式
      const jsonBody = {
        'email': usermail,
        'key': this.fileKeyID,
        'name': username,
        "jobId": this.jobId,
        "contact": usercontact,
        "occasion": useroccasion
      };

      const headers = { 'content-type': 'application/json' }

        if (form.valid) {
          // 表單驗證通過，可以提交表單

          const sendUserData$ = this._http.post(
          'https://hunter.jbhr.com.tw/api/File/UpdateFileInfo'
          // 'https://edc.jbhr.com.tw/FlyHigh/flyMe/File/UpdateFileInfo'
          , jsonBody, { 'headers': headers })
          .pipe(finalize(()=>{}))

          // sendUserData$.subscribe(n=>console.log(n));

          sendUserData$.subscribe({
            next: (response: any) => {
                console.log(response);
                alert('上傳成功');
                this.backToMain()
            },
            error: (error: any) => {
              console.log(error);
              if (error.status === 404) {
                alert('找不到對應資訊，請檢查欄位及履歷是否均有填寫，並請於稍後重試。');
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
    }
  }

  // clickTickTock(){
  //   // 發送 HTTP GET 請求
  //   console.log('TickTockTest');

  //   this._http.get('https://hunter.jbhr.com.tw/api/File/TickTock').subscribe(n=>console.log(n));
  //   // console.log(test);    
  // }

  backToMain(){
    alert('已上傳履歷');

    // 將使用者重新導回首頁
    window.location.href = 'https://hunter.jbhr.com.tw'; // 將 URL 設為首頁的 URL
  }

  openPrivacyPolicy() {
    window.open('https://hunter.jbhr.com.tw/Privacy', '_blank');
  }

  public updateCharCount(): void {
    this.userOccasion = this.userOccasion.slice(0, this.maxCharCount);
  }
}
