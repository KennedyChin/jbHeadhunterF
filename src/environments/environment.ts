// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://edc.jbhr.com.tw/FlyHigh/flyMe',
  hotJobImagePath: 'https://www.jbhr.com.tw/JQWebClient2015/Files/Files/Jobs',
  homePage: 'https://edc.jbhr.com.tw/hunterTest',
  /**
   * default token time (millisecond)/ tokenHPOffset
   * 前端登入有效時間量 != token 實際有效存活時間
   * 測試登出狀態使用
   */
  signoutOffset: 1.0,
  // ,apiUrl:"https://localhost:7120"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
