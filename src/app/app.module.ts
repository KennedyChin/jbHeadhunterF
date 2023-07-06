import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule  } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF, PlatformLocation , DatePipe } from '@angular/common';


import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown'
import { NgxPrintModule} from 'ngx-print'
/** 定義ngx Date Picker 中文參數  */
import { defineLocale } from 'ngx-bootstrap/chronos';
import { zhCnLocale } from 'ngx-bootstrap/locale';
zhCnLocale.invalidDate = "無效格式"
defineLocale('zh', zhCnLocale);
/** end */
import { ToastrModule } from 'ngx-toastr';
// import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

// 獵才部首頁
import { MainHuntingIntroductionComponent } from './ui/main/main-hunting-introduction/main-hunting-introduction.component';
import { MainHuntingFindJobsComponent } from './ui/main/main-hunting-find-jobs/main-hunting-find-jobs.component';
import { MainHuntingServiceComponent } from './ui/main/main-hunting-service/main-hunting-service.component';
import { MainHuntingDomainComponent } from './ui/main/main-hunting-domain/main-hunting-domain.component';

// 訂閱電子報
import { SubscribeComponent } from './ui/subscribe/subscribe.component';
// 取消訂閱電子報
import { UnsubscribeComponent } from './ui/unsubscribe/unsubscribe.component';

import { UploadResumeComponent } from './ui/uploadresume/uploadresume.component';
import { LoadingSpinner1Component } from './share/loading-spinner1/loading-spinner1.component';
import { JobsComponent } from './ui/jobs/jobs.component';
import { JobsLocalComponent } from './ui/jobs-local/jobs-local.component';
import { JobDetailComponent } from './ui/jobs/job-detail/job-detail/job-detail.component';
import { NewLineMePipe } from './share/new-line-me.pipe';
import { CutMePipe } from './share/cut-me.pipe';
import { NotFoundComponent } from './ui/not-found/not-found.component';
import { FooterComponent } from './ui/footer/footer.component';
import { LoadingRadarComponent } from './share/loading-radar/loading-radar.component';
import { LoadingHourglassComponent } from './share/loading-hourglass/loading-hourglass.component';
import { InputFocusWithLabelDirective } from './share/inputFocusWithLabel/input-focus-with-label.directive';

import { NavbarComponent } from './ui/main/navbar/navbar.component';
import { JobsMainComponent } from './ui/jobs/jobs-main/jobs-main.component';

import { Utility } from './ui/utility';
import { PrivacyComponent } from './ui/privacy/privacy.component';
import { FilterPipe } from './share/filter.pipe';
import { RocIdsValidatorDirectiveDirective } from './share/roc-ids-validator-directive.directive';
import { JobsListComponent } from './ui/jobs/jobs-list/jobs-list.component';
import { JobsSavedComponent } from './ui/jobs-local/jobs-saved/jobs-saved.component';
import { WhereUareComponent } from './ui/public/where-uare/where-uare.component';
import { TermsOfServiceComponent } from './ui/public/terms-of-service/terms-of-service.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SubscribeComponent,
    UnsubscribeComponent,
    UploadResumeComponent,
    LoadingSpinner1Component,
    JobsComponent,
    JobsLocalComponent,
    JobDetailComponent,
    NewLineMePipe,
    CutMePipe,
    NotFoundComponent,
    FooterComponent,
    LoadingRadarComponent,
    LoadingHourglassComponent,
    InputFocusWithLabelDirective,
    
    //獵才部首頁
    MainHuntingIntroductionComponent,
    MainHuntingFindJobsComponent,
    MainHuntingServiceComponent,
    MainHuntingDomainComponent,

    
    NavbarComponent,
    JobsMainComponent,
    PrivacyComponent,
    FilterPipe,
    RocIdsValidatorDirectiveDirective,
    JobsListComponent,
    JobsSavedComponent,
    WhereUareComponent,
    TermsOfServiceComponent,
    // NgxPrintModule
  ],
  imports: [
    BrowserModule,
    // RecaptchaV3Module,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPrintModule,
    AngularMultiSelectModule,
    ToastrModule.forRoot({
      'progressBar':false
      ,'timeOut':5000
      // ,'disableTimeOut':true
      ,'maxOpened':5
      ,'positionClass':"toast-top-center"
      // ,'countDuplicates':true
      ,'preventDuplicates':true
      // ,'includeTitleDuplicates':true
    })
    // Utility
    // PopoverModule.forRoot()
  ],
  providers: [
    Utility,
    DatePipe,
    {provide: APP_BASE_HREF,useFactory:(s:PlatformLocation)=>s.getBaseHrefFromDOM(),deps:[PlatformLocation]}
    //,{provide: RECAPTCHA_V3_SITE_KEY, useValue: "6Lf63x0gAAAAAOHCsyhYgRLAQH-71pkA1EbMWS3E"}
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor() {
  }
 }
