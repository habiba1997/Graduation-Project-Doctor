(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-signup-login-signup-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/login-signup/cover/cover.component.html":
  /*!***********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login-signup/cover/cover.component.html ***!
    \***********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppLoginSignupCoverCoverComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-content>\r\n  <div class=\"cover\">\r\n  <ion-grid >\r\n    <ion-row>\r\n\r\n        <ion-col>\r\n        <img src=\"assets/clover.png\"/>\r\n        </ion-col>\r\n\r\n        <ion-col>\r\n        </ion-col>\r\n\r\n        <ion-col>\r\n        </ion-col>\r\n\r\n    </ion-row>\r\n    <ion-row>\r\n          <ion-col>\r\n          </ion-col>\r\n\r\n          <ion-col> \r\n                <img src=\"assets/logo02.png\"/>\r\n                <h1 class=\"fat-free\">Fat Free</h1>\r\n          </ion-col>\r\n          <ion-col>\r\n          </ion-col>\r\n    </ion-row>\r\n  \r\n    \r\n    <ion-row>\r\n\r\n      <ion-col>\r\n        <div class=\"buttons\">\r\n          <div class=\"btnDiv\">\r\n             <ion-button class=\"button\"   shape=\"round\" (click)=\"login()\"  color=\"light\" >Login</ion-button>\r\n\r\n          </div>\r\n        \r\n        </div>\r\n         \r\n\r\n      </ion-col>\r\n\r\n          \r\n    </ion-row>\r\n\r\n\r\n</ion-grid>\r\n</div>\r\n</ion-content>\r\n\r\n\r\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/login-signup/login/login.component.html":
  /*!***********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login-signup/login/login.component.html ***!
    \***********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppLoginSignupLoginLoginComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-content>\r\n<div *ngIf=\"showSplash\" class=\"myBackground\">\r\n    <div>\r\n    <img src=\"/assets/giphy.gif\">\r\n</div> \r\n</div> \r\n<div *ngIf=\"!showSplash\">\r\n  <ion-grid >\r\n    <ion-row>\r\n      <ion-col>\r\n           \r\n  \r\n               <ion-button  (click)= \"backClick()\" color=\"light\" shape =\"round\" >\r\n                 <ion-icon name=\"arrow-round-back\"></ion-icon>\r\n               </ion-button>       \r\n            \r\n\r\n      </ion-col>\r\n      <ion-col >\r\n        <h1 style=\"height: 80px;\"></h1> \r\n        <img class = \"space\" src=\"/assets/logo02.png\"/>\r\n        <h1 class=\"fat-free\">Log In</h1>\r\n        \r\n      </ion-col>\r\n        <ion-col >\r\n            <img src=\"/assets/path-6.png\"/>\r\n        </ion-col>\r\n\r\n    </ion-row>\r\n    \r\n  \r\n  </ion-grid>\r\n\r\n        <div class=\"marginTop\">\r\n        \r\n\r\n\r\n       \r\n          <div class=\"centric\">\r\n              <ion-card>\r\n                <ion-item>\r\n                    <ion-input required placeholder=\"Enter Phone Number\" type=\"email\" #EmailInput></ion-input>\r\n                  </ion-item>\r\n                </ion-card>\r\n           \r\n            </div>\r\n          <div class=\"centric\">\r\n            <ion-card>\r\n              <ion-item>\r\n \r\n                  <ion-input required placeholder=\"Enter Password\" type=\"password\" #PasswordInput></ion-input>\r\n                </ion-item>\r\n              </ion-card>\r\n          </div>\r\n       \r\n        </div>\r\n         \r\n\r\n   <div class=\"marginTop centric\"> <ion-button style=\"height: 40px; \"class=\"marginTop button\"  shape=\"round\" (click)=\"login(EmailInput.value, PasswordInput.value)\" color=\"light\">Log In</ion-button></div>      \r\n</div>\r\n</ion-content>\r\n";
    /***/
  },

  /***/
  "./src/app/login-signup/cover/cover.component.scss":
  /*!*********************************************************!*\
    !*** ./src/app/login-signup/cover/cover.component.scss ***!
    \*********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppLoginSignupCoverCoverComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".cover {\n  background-image: url(/assets/cover.png);\n  background-position: center;\n  background-repeat: no-repeat;\n  height: 100%; }\n\n.clover {\n  background-image: url(/assets/clover.png);\n  background-position: center;\n  background-repeat: no-repeat; }\n\n.fat-free {\n  text-align: center;\n  font-family: \"Times New Roman\", Times, serif;\n  font-weight: bold;\n  color: #ffffff; }\n\n.buttons {\n  margin-top: 20%; }\n\n.button {\n  margin: 2% 0%;\n  display: block;\n  width: 65%;\n  font-weight: 12%; }\n\n.btnDiv {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9sb2dpbi1zaWdudXAvY292ZXIvY292ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx3Q0FBd0M7RUFDeEMsMkJBQTJCO0VBQzNCLDRCQUE0QjtFQUM5QixZQUFZLEVBQUE7O0FBR1Q7RUFFQyx5Q0FBeUM7RUFDM0MsMkJBQTJCO0VBQzNCLDRCQUE0QixFQUFBOztBQUk1QjtFQUNFLGtCQUFrQjtFQUNsQiw0Q0FBNEM7RUFDNUMsaUJBQWlCO0VBQ2pCLGNBQWMsRUFBQTs7QUFJbEI7RUFFUSxlQUFlLEVBQUE7O0FBS3JCO0VBQ0UsYUFBYTtFQUNiLGNBQWM7RUFDZCxVQUFVO0VBQ1YsZ0JBQWdCLEVBQUE7O0FBSWxCO0VBQ0Usb0JBQWE7RUFBYixhQUFhO0VBQ2Isd0JBQXVCO1VBQXZCLHVCQUF1QixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbG9naW4tc2lnbnVwL2NvdmVyL2NvdmVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvdmVyIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvYXNzZXRzL2NvdmVyLnBuZyk7XHJcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgIC5jbG92ZXIge1xyXG4gICAgXHJcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvYXNzZXRzL2Nsb3Zlci5wbmcpO1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmF0LWZyZWUge1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIGZvbnQtZmFtaWx5OiBcIlRpbWVzIE5ldyBSb21hblwiLCBUaW1lcywgc2VyaWY7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgLmJ1dHRvbnN7XHJcbiAgXHJcbiAgICAgICAgICBtYXJnaW4tdG9wOiAyMCU7XHJcbiAgICAgICAgICBcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5idXR0b257XHJcbiAgICAgIG1hcmdpbjogMiUgMCU7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICB3aWR0aDogNjUlO1xyXG4gICAgICBmb250LXdlaWdodDogMTIlO1xyXG4gICAgIFxyXG4gICAgfVxyXG4gIFxyXG4gICAgLmJ0bkRpdntcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICB9Il19 */";
    /***/
  },

  /***/
  "./src/app/login-signup/cover/cover.component.ts":
  /*!*******************************************************!*\
    !*** ./src/app/login-signup/cover/cover.component.ts ***!
    \*******************************************************/

  /*! exports provided: CoverComponent */

  /***/
  function srcAppLoginSignupCoverCoverComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CoverComponent", function () {
      return CoverComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var src_app_home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/app/home/NavService/navigation.service */
    "./src/app/home/NavService/navigation.service.ts");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/dist/fesm5.js");

    let CoverComponent = class CoverComponent {
      constructor(men, nav) {
        this.men = men;
        this.nav = nav;
      }

      ngOnInit() {
        this.men.enable(false);
      }

      login() {
        this.nav.navigateTo('/cover/login');
      }

    };

    CoverComponent.ctorParameters = () => [{
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["MenuController"]
    }, {
      type: src_app_home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"]
    }];

    CoverComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-cover',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./cover.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/login-signup/cover/cover.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./cover.component.scss */
      "./src/app/login-signup/cover/cover.component.scss")).default]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["MenuController"], src_app_home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"]])], CoverComponent);
    /***/
  },

  /***/
  "./src/app/login-signup/login-signup.module.ts":
  /*!*****************************************************!*\
    !*** ./src/app/login-signup/login-signup.module.ts ***!
    \*****************************************************/

  /*! exports provided: LoginSignupModule */

  /***/
  function srcAppLoginSignupLoginSignupModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginSignupModule", function () {
      return LoginSignupModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _cover_cover_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./cover/cover.component */
    "./src/app/login-signup/cover/cover.component.ts");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/dist/fesm5.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../home/NavService/navigation.service */
    "./src/app/home/NavService/navigation.service.ts");
    /* harmony import */


    var _login_login_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ./login/login.component */
    "./src/app/login-signup/login/login.component.ts");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var _home_HttPService_http_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ../home/HttPService/http.service */
    "./src/app/home/HttPService/http.service.ts");
    /* harmony import */


    var _ionic_native_fcm_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @ionic-native/fcm/ngx */
    "./node_modules/@ionic-native/fcm/ngx/index.js");

    let LoginSignupModule = class LoginSignupModule {};
    LoginSignupModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClientModule"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forChild([{
        path: 'cover',
        component: _cover_cover_component__WEBPACK_IMPORTED_MODULE_1__["CoverComponent"]
      }, {
        path: '',
        component: _cover_cover_component__WEBPACK_IMPORTED_MODULE_1__["CoverComponent"]
      }, {
        path: 'login',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_8__["LoginComponent"]
      }])],
      providers: [_home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_7__["NavigationService"], _home_HttPService_http_service__WEBPACK_IMPORTED_MODULE_10__["HttpService"], _ionic_native_fcm_ngx__WEBPACK_IMPORTED_MODULE_11__["FCM"]],
      declarations: [_cover_cover_component__WEBPACK_IMPORTED_MODULE_1__["CoverComponent"], _login_login_component__WEBPACK_IMPORTED_MODULE_8__["LoginComponent"]]
    })], LoginSignupModule);
    /***/
  },

  /***/
  "./src/app/login-signup/login/login.component.scss":
  /*!*********************************************************!*\
    !*** ./src/app/login-signup/login/login.component.scss ***!
    \*********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppLoginSignupLoginLoginComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".cover {\n  background-image: url(/assets/path-6.png);\n  background-position: center;\n  background-repeat: no-repeat;\n  height: 100%; }\n\n.clover {\n  background-image: url(/assets/clover.png);\n  background-position: center;\n  background-repeat: no-repeat; }\n\n.space {\n  display: block; }\n\n.fat-free {\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  font-family: \"Times New Roman\", Times, serif;\n  font-weight: bold;\n  color: #0b0c0b;\n  font-size: 450;\n  display: block; }\n\n.marginTop {\n  margin-top: 7%; }\n\n.button {\n  margin: 2% 0%;\n  display: block;\n  width: 65%;\n  font-weight: 12%; }\n\n.centric {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  border-radius: 50%; }\n\nion-input {\n  margin: 0px 50px;\n  display: block;\n  font-weight: 12%;\n  border: 1px solid white; }\n\n.myBackground {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  z-index: 999;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  background: #50b9b6; }\n\n.back {\n  height: 100%;\n  width: 20%;\n  margin-top: 2%;\n  margin-left: 2%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9sb2dpbi1zaWdudXAvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx5Q0FBeUM7RUFDekMsMkJBQTJCO0VBQzNCLDRCQUE0QjtFQUM1QixZQUFZLEVBQUE7O0FBSVg7RUFFQyx5Q0FBeUM7RUFDM0MsMkJBQTJCO0VBQzNCLDRCQUE0QixFQUFBOztBQUc1QjtFQUNFLGNBQWMsRUFBQTs7QUFJaEI7RUFDRSx3QkFBdUI7VUFBdkIsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQiw0Q0FBNEM7RUFDNUMsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxjQUFhO0VBQ2IsY0FBYyxFQUFBOztBQUdsQjtFQUVRLGNBQWMsRUFBQTs7QUFLcEI7RUFDRSxhQUFhO0VBQ2IsY0FBYztFQUNkLFVBQVU7RUFDVixnQkFBZ0IsRUFBQTs7QUFJbEI7RUFDRSxvQkFBYTtFQUFiLGFBQWE7RUFDYix3QkFBdUI7VUFBdkIsdUJBQXVCO0VBQ3ZCLGtCQUFrQixFQUFBOztBQUd4QjtFQUNFLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLHVCQUF3QixFQUFBOztBQUUxQjtFQUNFLGtCQUFrQjtFQUNsQixXQUFVO0VBQ1YsWUFBVztFQUNYLFlBQVk7RUFDWixvQkFBYTtFQUFiLGFBQWE7RUFDYix5QkFBbUI7VUFBbkIsbUJBQW1CO0VBQ25CLHdCQUF1QjtVQUF2Qix1QkFBdUI7RUFDdkIsbUJBQTRCLEVBQUE7O0FBRzVCO0VBQ0UsWUFBWTtFQUNaLFVBQVM7RUFDVCxjQUFjO0VBQ2QsZUFBZSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvbG9naW4tc2lnbnVwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvdmVyIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvYXNzZXRzL3BhdGgtNi5wbmcpO1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgIH1cclxuICAgIFxyXG4gICBcclxuICAgICAuY2xvdmVyIHtcclxuICAgIFxyXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL2Fzc2V0cy9jbG92ZXIucG5nKTtcclxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgICBcclxuICAgIH1cclxuICAgIC5zcGFjZXtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgLmZhdC1mcmVlIHtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgZm9udC1mYW1pbHk6IFwiVGltZXMgTmV3IFJvbWFuXCIsIFRpbWVzLCBzZXJpZjtcclxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgIGNvbG9yOiAjMGIwYzBiO1xyXG4gICAgICBmb250LXNpemU6NDUwO1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxuICAgIFxyXG4gIC5tYXJnaW5Ub3B7XHJcbiAgXHJcbiAgICAgICAgICBtYXJnaW4tdG9wOiA3JTtcclxuICAgICAgICAgIFxyXG4gICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmJ1dHRvbntcclxuICAgICAgbWFyZ2luOiAyJSAwJTtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIHdpZHRoOiA2NSU7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiAxMiU7XHJcbiAgICAgXHJcbiAgICB9XHJcbiAgXHJcbiAgICAuY2VudHJpY3tcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIH1cclxuXHJcbmlvbi1pbnB1dCB7XHJcbiAgbWFyZ2luOiAwcHggNTBweDtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBmb250LXdlaWdodDogMTIlO1xyXG4gIGJvcmRlcjogIDFweCBzb2xpZCB3aGl0ZTtcclxufVxyXG4ubXlCYWNrZ3JvdW5ke1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB3aWR0aDoxMDAlO1xyXG4gIGhlaWdodDoxMDAlO1xyXG4gIHotaW5kZXg6IDk5OTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZDpyZ2IoODAsIDE4NSwgMTgyKTtcclxuICBcclxuICB9XHJcbiAgLmJhY2t7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDoyMCU7XHJcbiAgICBtYXJnaW4tdG9wOiAyJTtcclxuICAgIG1hcmdpbi1sZWZ0OiAyJTtcclxuICB9XHJcblxyXG5cclxuIl19 */";
    /***/
  },

  /***/
  "./src/app/login-signup/login/login.component.ts":
  /*!*******************************************************!*\
    !*** ./src/app/login-signup/login/login.component.ts ***!
    \*******************************************************/

  /*! exports provided: LoginComponent */

  /***/
  function srcAppLoginSignupLoginLoginComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginComponent", function () {
      return LoginComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var src_app_home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/app/home/NavService/navigation.service */
    "./src/app/home/NavService/navigation.service.ts");
    /* harmony import */


    var src_app_home_HttPService_http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/home/HttPService/http.service */
    "./src/app/home/HttPService/http.service.ts");
    /* harmony import */


    var src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! src/app/services/datastream/datastreaming.service */
    "./src/app/services/datastream/datastreaming.service.ts");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/dist/fesm5.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var _ionic_native_fcm_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @ionic-native/fcm/ngx */
    "./node_modules/@ionic-native/fcm/ngx/index.js");

    let LoginComponent = class LoginComponent {
      constructor(nav, http, datastream, men, addController, fcm) {
        this.nav = nav;
        this.http = http;
        this.datastream = datastream;
        this.men = men;
        this.addController = addController;
        this.fcm = fcm;
      }

      ngOnInit() {
        this.men.enable(false);
      }

      login(mobile, password) {
        let that = this;
        console.log(mobile, password);
        mobile = mobile.replace(/^0+/, '');
        mobile = "+20" + mobile;
        this.http.Login(mobile, password).subscribe(res => {
          // timer
          this.showSplash = true; // timer

          Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["timer"])(10000).subscribe(() => this.showSplash = false); //recieveing Token For Development Only FOR NOW

          this.fcm.getToken().then(fcmtoken => {
            this.http.editFCMToken(fcmtoken, res.token).subscribe(data => {
              console.log(JSON.stringify(data));
            }, err => {
              alert("ERROR in updating FCM token: " + JSON.stringify(err));
            });
          }, err => {
            alert("ERROR in getting FCM token: " + JSON.stringify(err));
          }); //Use Token To get Doctor Data

          console.log("Token: " + res.token);
          this.datastream.setToken(res.token);
          this.http.getDoctorUsingToken(res.token).subscribe(doctordata => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  console.log("doctor: " + JSON.stringify(doctordata));
                  _context.next = 3;
                  return that.datastream.setDoctor(doctordata);

                case 3:
                  //Get Doctor List
                  // await  this.http.getPatientList(res.token)
                  // .subscribe(
                  //   async response=>{
                  //     this.datastream.clearPatientList();
                  //     await response.forEach(element => {
                  //       this.datastream.addToPatientList(element);
                  //     }); 
                  //   }, 
                  //   err =>
                  //   {
                  //     console.log('HTTP Patient List Error: ', err.error.message);
                  //     this.presentAlert('HTTP Patient List Error: ', err.error.message);
                  //   },
                  //   () => 
                  //   {
                  //     this.datastream.savePatientListToDataStore();
                  //     console.log('HTTP request completed.');
                  //   }
                  // );
                  that.nav.navigateTo('home');

                case 4:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          })), err => {
            this.presentAlert('HTTP Doctor Data Error: ', err.error.message);
          }, () => console.log('HTTP get Doctor data request completed.'));
        }, err => {
          this.presentAlert('HTTP Login Error: ', err.error.message);
        }, () => console.log('HTTP Login request completed.'));
      }

      presentAlert(subtitleString, messageString) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0,
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          var alert;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.addController.create({
                  header: 'ERROR',
                  subHeader: subtitleString,
                  message: messageString,
                  buttons: ['OK']
                });

              case 2:
                alert = _context2.sent;
                _context2.next = 5;
                return alert.present();

              case 5:
              case "end":
                return _context2.stop();
            }
          }, _callee2, this);
        }));
      }

      backClick() {
        this.nav.navigateTo('cover');
      }

    };

    LoginComponent.ctorParameters = () => [{
      type: src_app_home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"]
    }, {
      type: src_app_home_HttPService_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"]
    }, {
      type: src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_4__["DatastreamingService"]
    }, {
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["MenuController"]
    }, {
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"]
    }, {
      type: _ionic_native_fcm_ngx__WEBPACK_IMPORTED_MODULE_7__["FCM"]
    }];

    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-login',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./login.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/login-signup/login/login.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./login.component.scss */
      "./src/app/login-signup/login/login.component.scss")).default]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"], src_app_home_HttPService_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"], src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_4__["DatastreamingService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["MenuController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"], _ionic_native_fcm_ngx__WEBPACK_IMPORTED_MODULE_7__["FCM"]])], LoginComponent);
    /***/
  }
}]);
//# sourceMappingURL=login-signup-login-signup-module-es5.js.map