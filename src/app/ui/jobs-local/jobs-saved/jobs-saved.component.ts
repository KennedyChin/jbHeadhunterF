/**===================================================
 * 名稱：jobs-saved.component.ts
 * 
 * 用途：處理【收藏職缺明細】相關的内容
 * 版本：
 * ===================================================
 * 人員      日期          版本          註記
 * ---------------------------------------------------
 * Daniel   2023/05/15    Ver 1.0.0     Create
 * ===================================================
 */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JobLocalServiceService } from 'src/app/services/job-local-service.service';
import { JobHttp } from 'src/app/share/Model/JobHttpDto';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-jobs-saved',
  templateUrl: './jobs-saved.component.html',
  styleUrls: ['./jobs-saved.component.css']
})
export class JobsSavedComponent implements OnInit {

  searchText:string|null = null
  jobs$?:Observable<JobHttp[]> 
  @Input() previewMode:boolean = false
  
  constructor(
    private _jobService:JobLocalServiceService
    , private titleService: Title
  ) { }

  /**
   * 
   */
  ngOnInit(): void {
    this.titleService.setTitle("我的收藏｜JB Headhunter");
    // this.queryParamSubscribe()
    let o = this._jobService.getSavedJobs()
    this.jobs$ = o
  }
}
