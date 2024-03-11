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
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { finalize } from 'rxjs/internal/operators/finalize';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Title } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css'],
})
export class SubscribeComponent implements OnInit {
  isLoading: boolean = false;
  isDropdownActived = [false, false];
  @ViewChild('f', { static: false }) f: NgForm | undefined;
  @HostListener('document:click', ['$event']) closeDropdown(e: Event) {
    const selector =
      (e.target as Element).closest('.selector') ||
      (e.target as Element).closest('.selector_flag_cross');

    if (!selector) {
      this.isDropdownActived = [false, false];
    }
  }

  areaDataList: { id: number; name: string; groupName: string }[] = [];
  areaSelectedItems: { id: number; name: string; groupName: string }[] = [
    { id: 0, name: '不拘', groupName: '無' },
  ];

  postDataList: { id: number; name: string }[] = [];
  postSelectedItems: { id: number; name: string }[] = [{ id: 0, name: '不拘' }];

  constructor(
    private route: ActivatedRoute,
    private _http: HttpClient,
    private toastr: ToastrService,
    private titleService: Title
  ) {
    this.route.queryParams
      .pipe(filter((p) => p.message))
      .subscribe((params) => {
        // this.message = params.message??"";
        this.toastr.info(params.message ?? '');
      });
  }

  /**
   * 初始化
   */
  ngOnInit(): void {
    this.titleService.setTitle('訂閱電子報｜JB Headhunter');

    this._http
      .get<{ id: number; name: string; groupName: string }[]>(
        `${environment.apiUrl}/Job/place`
      )
      .subscribe((data) => {
        this.areaDataList = data.map((item) => ({
          id: item.id,
          name: item.name,
          groupName: item.groupName,
        }));
        this.areaSelectedItems = [{ id: 0, name: '不拘', groupName: '無' }];
      });

    this._http
      .get<{ id: number; name: string }[]>(
        `${environment.apiUrl}/Job/jobCategory`
      )
      .subscribe((data) => {
        this.postDataList = data.map((item) => ({
          id: item.id,
          name: item.name,
        }));
        this.postSelectedItems = [{ id: 0, name: '不拘' }];
      });
  }

  private singleExecutionSubscription?: Subscription = undefined;
  recentToken = '';

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
   * 控制下拉選單
   *
   */
  toggleDropdown(e: MouseEvent, dropdownTarget: number) {
    const targetEl = e.target as Element;

    if (
      targetEl.closest('.selector_reset') ||
      targetEl.closest('.selector_flag_cross') ||
      targetEl.closest('.dropdown')
    ) {
      return;
    }

    this.isDropdownActived[dropdownTarget] =
      !this.isDropdownActived[dropdownTarget];
    this.isDropdownActived[dropdownTarget ? 0 : 1] = false;
  }

  /**
   * 訂閱電子報
   * @param form
   */
  subscribeNews(form: NgForm) {
    // 姓名
    const username = form.value.username;
    // 郵件
    const usermail = form.value.usermail;

    const jobs: number[] = this.postSelectedItems.map((item) => item.id);

    const places: number[] = this.areaSelectedItems.map((item) => item.id);

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
      name: username,
      email: usermail,
      jobs: jobs,
      places: places,
    };

    const headers = { 'content-type': 'application/json' };

    if (form.valid) {
      // 表單驗證通過，可以提交表單
      const sendUserData$ = this._http.post(
        `${environment.apiUrl}/NewNewspaper/subscribe`,
        jsonBody,
        { headers }
      );
      sendUserData$.subscribe({
        next: (response: any) => {
          // console.log(response);
          alert('訂閱完成');
          window.location.href = environment.homePage;
        },
        error: (error: any) => {
          // console.log(error);
          if (error.status === 409) {
            alert(
              '該 Email 帳號已存在訂閱紀錄\n若您要變更訂閱條件，請於取消訂閱後重新訂閱\n\n若仍有疑問，歡迎於 Line 與我們聯繫，謝謝'
            );
          } else {
            alert('連線異常，請稍後再試');
          }
        },
      });
    } else {
      // 表單驗證失敗，阻止提交表單
    }
  }
}
