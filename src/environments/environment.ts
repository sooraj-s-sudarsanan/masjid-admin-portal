// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseURL: 'http://uc5.nodecluster.net:11355/ServicesAdminV2/',
  aesEncrptionKey: '44320f45aa46488abc8d2eaf26d24070',
  superAdminRoleId: '7775d9043bc1-98f7-43a9-92d4-3c3f6ef99843',
  AES: {
    key: '46AC3323700A47458753163D35215E14',
    iv: '1334567890123456'
  },
  customerWebBaseUrl:'https://bookeazi/en/branch/details/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
