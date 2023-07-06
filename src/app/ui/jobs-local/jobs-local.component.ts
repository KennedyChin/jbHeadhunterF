/**===================================================
 * 名稱：jobs-local.component.ts
 * 
 * 用途：處理【收藏職缺列表】相關的内容
 * 版本：
 * ===================================================
 * 人員      日期          版本          註記
 * ---------------------------------------------------
 * Daniel   2023/05/15    Ver 1.0.0     Create
 * ===================================================
 */
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { JobServiceService } from 'src/app/services/job-service.service';
import { JobHttp } from 'src/app/share/Model/JobHttpDto';
import { Router } from '@angular/router';

import { routesPath } from '../../app-routing.module'
import { Utility } from '../utility';


@Component({
  selector: 'app-jobs-local',
  templateUrl: './jobs-local.component.html',
  styleUrls: ['./jobs-local.component.css']
})
export class JobsLocalComponent implements OnInit {

  constructor(
    private _utility: Utility
    , private _clipboard: Clipboard
    , private _modalService: BsModalService
    , private _router: Router
    , private jobService: JobServiceService
  ) {

  }

  // 外部輸入職缺(例如搜索或是其他條件後資料)
  @Input() jobs: JobHttp[] | null = [];

  // 刪除event trigger (emitter)
  @Output() jobsEvent = new EventEmitter<JobHttp>()

  @Input() hideFavo: boolean = false
  @Input() hideJoin: boolean = false
  @Input() hideShare: boolean = false
  @Input() previewMode:boolean = false

  /**
   * 
   */
  ngOnInit(): void {
    
  }

  isJobSaved(job: JobHttp): boolean {
    let savedJobsIds = JSON.parse(localStorage.getItem('jobs')!) || [];
    return savedJobsIds.includes(job.id);
  }

  // 收藏 & 解除收藏
  jobsSaved(j: JobHttp) {
   
    if(this.previewMode) {
      return
    }

    this.jobService.onJobFavorited(j);
    
    this.jobsEvent.emit(j);

    let savedJobsIds = JSON.parse(localStorage.getItem('jobs')!) || [];

    this.updateSavedJobsCount(savedJobsIds.length);
  }
  modalRef?: BsModalRef;

  openModal(template: TemplateRef<any>, jobId: string) {

    if(this.previewMode) {
      return
    }
    
    this._clipboard.copy(`${this._utility.getFullUrlWithBaseHref()}${routesPath.job.path}/${routesPath.job.detail.path}/${jobId?.toString()}`)
    this.modalRef = this._modalService.show(template);
  }
    
  // 更新收藏職缺數量並通知NavbarComponent
  updateSavedJobsCount(count: number) {
    this.jobService.updateSavedJobsCount(count);
  }

  openJob(j: JobHttp){
    // [routerLink]="previewMode?null:['/Jobs','Show',j.id]"
        
    const url =this._router.serializeUrl(this._router.createUrlTree(['Jobs/Show',j.id]))
    
    window.open(`${this._utility.getHandleBaseHref()}${url}`)
  }
}
