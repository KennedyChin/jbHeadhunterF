/**===================================================
 * 名稱：jobs.component.ts
 *
 * 用途：處理【查詢職缺結果】相關的内容
 * 版本：
 * ===================================================
 * 人員      日期          版本          註記
 * ---------------------------------------------------
 * Daniel   2023/05/15    Ver 1.0.0     Create
 * ===================================================
 */
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { JobServiceService } from 'src/app/services/job-service.service';
import { JobHttp } from 'src/app/share/Model/JobHttpDto';
import { Router } from '@angular/router';

import { routesPath } from '../../app-routing.module';
import { Utility } from '../utility';

import * as uploadresume from '../uploadresume/uploadresume.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  static readonly searchKey: string = 'search';

  constructor(
    private router: Router,
    private _utility: Utility,
    private _clipboard: Clipboard,
    private _modalService: BsModalService,
    private jobService: JobServiceService
  ) {}

  // 外部輸入職缺(例如搜索或是其他條件後資料)
  @Input() jobs: JobHttp[] | null = [];

  // 刪除event trigger (emitter)
  @Output() jobsEvent = new EventEmitter<JobHttp>();

  @Input() hideFavo: boolean = false;
  @Input() hideJoin: boolean = false;
  @Input() hideShare: boolean = false;
  @Input() previewMode: boolean = false;

  ngOnInit(): void {}

  isJobSaved(job: JobHttp): boolean {
    let savedJobsIds =
      typeof localStorage !== 'undefined'
        ? JSON.parse(localStorage.getItem('jobs')!)
        : [];

    return savedJobsIds?.includes(job.id);
  }

  // 收藏 & 解除收藏
  jobsSaved(j: JobHttp) {
    if (this.previewMode) {
      return;
    }

    this.jobService.onJobFavorited(j);

    this.jobsEvent.emit(j);

    let savedJobsIds = JSON.parse(localStorage.getItem('jobs')!) || [];

    this.updateSavedJobsCount(savedJobsIds.length);
  }

  modalRef?: BsModalRef;

  openModal(template: TemplateRef<any>, jobId: string) {
    if (this.previewMode) {
      return;
    }

    this._clipboard.copy(
      `${this._utility.getFullUrlWithBaseHref()}${routesPath.job.path}/${
        routesPath.job.detail.path
      }/${jobId?.toString()}`
    );
    this.modalRef = this._modalService.show(template);
  }

  /**
   * 更新收藏職缺數量並通知NavbarComponent
   * @param count
   */
  updateSavedJobsCount(count: number) {
    this.jobService.updateSavedJobsCount(count);
  }

  /**
   * 將職缺代碼帶去UploadResume
   * @param j
   */
  sendResume(j: JobHttp) {
    const o: any = {};
    o[uploadresume.UploadResumeComponent.key] = j.id;

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['UploadResume'], { queryParams: o })
    );

    window.open(`${this._utility.getHandleBaseHref()}${url}`);
  }

  /**
   * 點擊進入職缺查詢明細
   * @param j
   */
  openJob(j: JobHttp) {
    // [routerLink]="previewMode?null:['/Jobs','Show',j.id]"

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['Jobs/Show', j.id])
    );

    window.open(`${this._utility.getHandleBaseHref()}${url}`);
  }
}
