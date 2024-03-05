/**===================================================
 * 名稱：main-hunting-find-jobs.component.ts
 *
 * 用途：處理【首頁-尋找職缺 Part】相關的内容
 * 版本：
 * ===================================================
 * 人員      日期          版本          註記
 * ---------------------------------------------------
 * Daniel   2023/05/15    Ver 1.0.0     Create
 * ===================================================
 */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import * as Job from '../../jobs/jobs.component';
import { JobLocalServiceService } from 'src/app/services/job-local-service.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-hunting-find-jobs',
  templateUrl: './main-hunting-find-jobs.component.html',
  styleUrls: ['./main-hunting-find-jobs.component.css'],
})
export class MainHuntingFindJobsComponent implements OnInit {
  searchText: string | null = null;
  selectedPlaceItem: number = 0;
  selectedJobItem: number = 0;

  selectedPlace: string = '';
  selectedJob: string = '';

  places!: any[];
  jobs!: any[];

  constructor(
    private router: Router,
    private http: HttpClient,
    private titleService: Title,
    private _jobService: JobLocalServiceService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('首頁｜JB Headhunter');

    // 在初始化 Component 時呼叫 API 取得地區資料

    this.http
      .get<any[]>(`${environment.apiUrl}/Job/place`)
      .subscribe((n) => (this.places = n));

    this.http
      .get<any[]>(`${environment.apiUrl}/Job/jobCategory`)
      .subscribe((n) => (this.jobs = n));

    let o = this._jobService.getSavedJobs();

    const jobs: number[] = JSON.parse(localStorage.getItem('jobs')!);

    this._jobService.updateLocalStorage(jobs, o);
  }

  /**
   *
   * @param f
   */
  findJobs(f: NgForm) {
    const v: string = f.value.search ? f.value.search : ' ';

    const selectedPlaceId = f.value.selectedPlace;
    const selectedJobId = f.value.selectedJob;

    const queryParams: any = {
      placeId: selectedPlaceId,
      jobId: selectedJobId,
      [Job.JobsComponent.searchKey]: v,
      hasingKey: new Date().getTime(),
    };

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['Jobs'], {
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      })
    );
    // window.open(`${this.utility.getHandleBaseHref()}${url}`);
    this.router.navigateByUrl(url);
  }
}
