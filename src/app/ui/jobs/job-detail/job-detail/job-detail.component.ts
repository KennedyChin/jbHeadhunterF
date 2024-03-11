/**===================================================
 * 名稱：jobs-detail.component.ts
 *
 * 用途：處理【職缺明細】相關的内容
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
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Clipboard } from '@angular/cdk/clipboard';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { Utility } from '../../../utility';
import { JobServiceService } from 'src/app/services/job-service.service';
import { JobHttp } from 'src/app/share/Model/JobHttpDto';
import { Title } from '@angular/platform-browser';
import * as uploadresume from '../../../uploadresume/uploadresume.component';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
})
export class JobDetailComponent implements OnInit {
  title: string = '職缺細節';
  jobSub$ = new ReplaySubject<JobHttp>(1);
  job$: Observable<JobHttp> | null = null;
  showMyresumeAlert: boolean = false;
  error: boolean | null = null;
  /**
   * 關閉相關按鈕功能(Event) for 預覽用
   */
  @Input() previewMode: boolean = false;

  /**
   * 刪除event trigger (emitter)
   */
  @Output() jobsEvent = new EventEmitter<JobHttp>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _utility: Utility,
    private clipboard: Clipboard,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private _jobService: JobServiceService,
    private titleService: Title
  ) {
    this.route.params.subscribe((n) => {
      this.spinner.show();
      const id: number = n['id'] as number;
      _jobService.getJobDetail(id).subscribe({
        next: (n) => {
          if (!!n) this.jobSub$.next(n);
        },
        error: (error) => {
          this.router.navigate(['404']);
        },
      });
    });

    this.jobSub$.subscribe((job) =>
      this.titleService.setTitle(job.jobName + '｜JB Headhunter')
    );
  }

  /**
   * 收藏職缺
   * @param j 職缺資訊
   * @returns
   */
  saveThisJob(j: JobHttp) {
    if (this.previewMode) {
      return;
    }

    this._jobService.onJobFavorited(j);

    this.jobsEvent.emit(j);

    let savedJobsIds = JSON.parse(localStorage.getItem('jobs')!) || [];

    this.updateSavedJobsCount(savedJobsIds.length);
  }

  ngOnInit(): void {}

  /**
   * 檢查職缺是否已收藏
   * @param job
   * @returns
   */
  isJobSaved(job: JobHttp): boolean {
    let savedJobsIds =
      typeof localStorage !== 'undefined'
        ? JSON.parse(localStorage.getItem('jobs')!)
        : [];
    return savedJobsIds.includes(job.id);
  }

  modalRef?: BsModalRef;

  /**
   *
   * @param template
   * @param jobId
   * @returns
   */
  openModal(template: TemplateRef<any>, jobId: string) {
    if (this.previewMode) {
      return;
    }

    const fullUrl: string = location.href;
    this.clipboard.copy(fullUrl);
    this.modalRef = this.modalService.show(template);
  }

  // 更新收藏職缺數量並通知NavbarComponent
  updateSavedJobsCount(count: number) {
    this._jobService.updateSavedJobsCount(count);
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
}
