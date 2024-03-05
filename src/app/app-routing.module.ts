import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { JobDetailComponent } from './ui/jobs/job-detail/job-detail/job-detail.component';
import { JobsListComponent } from './ui/jobs/jobs-list/jobs-list.component';
import { JobsSavedComponent } from './ui/jobs-local/jobs-saved/jobs-saved.component';
import { JobsMainComponent } from './ui/jobs/jobs-main/jobs-main.component';
import { SubscribeComponent } from './ui/subscribe/subscribe.component';
import { UnsubscribeComponent } from './ui/unsubscribe/unsubscribe.component';
import { UploadResumeComponent } from './ui/uploadresume/uploadresume.component';
import { NotFoundComponent } from './ui/not-found/not-found.component';
import { PrivacyComponent } from './ui/privacy/privacy.component';
import { WhereUareComponent } from './ui/public/where-uare/where-uare.component';

export const routesPath = {
  path: '',
  root: '', // 首頁
  // 訂閱電子報
  subscribe: {
    path: 'Subscribe',
  },
  // 取消訂閱
  unsubscribe: {
    path: 'Unsubscribe',
  },
  // 上傳履歷
  uploadresume: {
    path: 'UploadResume',
  },
  // 隱私權
  privacy: {
    path: 'Privacy',
  },
  // 儲存的工作
  savedjobs: {
    path: 'SavedJobs',
  },
  job: {
    path: 'Jobs',
    root: '',
    default: '',
    // 顯示某職缺詳細內容
    detail: {
      /**
       * format with params :id
       */
      path: 'Show',
      fullPath: 'Show/:id',
      params: ':id',
    },
  },
  404: '404',
  other: '**',
};

const routes: Routes = [
  { path: routesPath.root, component: MainComponent, pathMatch: 'full' },
  // 訂閱電子報
  { path: routesPath.subscribe.path, component: SubscribeComponent },
  // 取消訂閱
  { path: routesPath.unsubscribe.path, component: UnsubscribeComponent },
  // 上傳履歷
  { path: routesPath.uploadresume.path, component: UploadResumeComponent },
  // 隱私政策
  { path: routesPath.privacy.path, component: PrivacyComponent },
  // 職缺
  {
    path: routesPath.job.path,
    component: JobsMainComponent,
    children: [
      { path: routesPath.job.default, component: JobsListComponent },
      { path: routesPath.job.detail.fullPath, component: JobDetailComponent },
    ],
  },
  // 收藏職缺
  {
    path: routesPath.savedjobs.path,
    component: JobsSavedComponent,
  },
  {
    path: 'MyAddr',
    component: WhereUareComponent,
  },
  { path: routesPath[404], component: NotFoundComponent },
  { path: routesPath.other, component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      // enableTracing: true    ,
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
