(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-signup-login-signup-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/login-signup/cover/cover.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login-signup/cover/cover.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n    <div class=\"cover\">\r\n        <ion-grid class=\"grid\" >\r\n            <ion-row>\r\n\r\n                <ion-col>\r\n                    <!--        <img src=\"assets/clover.png\"/>-->\r\n                </ion-col>\r\n\r\n                <ion-col>\r\n                </ion-col>\r\n\r\n                <ion-col>\r\n                </ion-col>\r\n\r\n            </ion-row>\r\n            <ion-row>\r\n\r\n\r\n                <ion-col size=\"12\" >\r\n                    <img src=\"assets/02.png\"/>\r\n                </ion-col >\r\n\r\n            </ion-row>\r\n\r\n\r\n            <ion-row>\r\n\r\n                <ion-col>\r\n                    <div class=\"buttons\">\r\n                        <div class=\"btnDiv\">\r\n                            <ion-button class=\"button\"    (click)=\"login()\"  color=\"light\"  >Login</ion-button>\r\n\r\n                        </div>\r\n                        <div class=\"btnDiv\">\r\n                            <ion-button class=\"button\"   (click)=\"signup()\"  color=\"light\" >Sign Up</ion-button>\r\n\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                </ion-col>\r\n\r\n\r\n            </ion-row>\r\n\r\n\r\n        </ion-grid>\r\n    </div>\r\n</ion-content>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/login-signup/login/login.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login-signup/login/login.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--<ion-content>-->\r\n<!--<div *ngIf=\"showSplash\" class=\"myBackground\">-->\r\n<!--    <div>-->\r\n<!--    <img src=\"/assets/giphy.gif\">-->\r\n<!--</div> -->\r\n<!--</div> -->\r\n<!--<div *ngIf=\"!showSplash\">-->\r\n<!--  <ion-grid >-->\r\n<!--    <ion-row>-->\r\n<!--      <ion-col>-->\r\n<!--           -->\r\n<!--  -->\r\n<!--               <ion-button  (click)= \"backClick()\" color=\"light\" shape =\"round\" >-->\r\n<!--                 <ion-icon name=\"arrow-round-back\"></ion-icon>-->\r\n<!--               </ion-button>       -->\r\n<!--            -->\r\n\r\n<!--      </ion-col>-->\r\n<!--      <ion-col >-->\r\n<!--        <h1 style=\"height: 80px;\"></h1> -->\r\n<!--        <img class = \"space\" src=\"/assets/logo02.png\"/>-->\r\n<!--        <h1 class=\"fat-free\">Log In</h1>-->\r\n<!--        -->\r\n<!--      </ion-col>-->\r\n<!--        <ion-col >-->\r\n<!--            <img src=\"/assets/path-6.png\"/>-->\r\n<!--        </ion-col>-->\r\n\r\n<!--    </ion-row>-->\r\n<!--    -->\r\n<!--  -->\r\n<!--  </ion-grid>-->\r\n\r\n<!--        <div class=\"marginTop\">-->\r\n<!--        -->\r\n\r\n\r\n<!--       -->\r\n<!--          <div class=\"centric\">-->\r\n<!--              <ion-card>-->\r\n<!--                <ion-item>-->\r\n<!--                    <ion-input required placeholder=\"Enter Phone Number\" type=\"email\" #EmailInput></ion-input>-->\r\n<!--                  </ion-item>-->\r\n<!--                </ion-card>-->\r\n<!--           -->\r\n<!--            </div>-->\r\n<!--          <div class=\"centric\">-->\r\n<!--            <ion-card>-->\r\n<!--              <ion-item>-->\r\n<!-- -->\r\n<!--                  <ion-input required placeholder=\"Enter Password\" type=\"password\" #PasswordInput></ion-input>-->\r\n<!--                </ion-item>-->\r\n<!--              </ion-card>-->\r\n<!--          </div>-->\r\n<!--       -->\r\n<!--        </div>-->\r\n<!--         -->\r\n\r\n<!--   <div class=\"marginTop centric\"> <ion-button style=\"height: 40px; \"class=\"marginTop button\"  shape=\"round\" (click)=\"login(EmailInput.value, PasswordInput.value)\" color=\"light\">Log In</ion-button></div>      -->\r\n<!--</div>-->\r\n<!--</ion-content>-->\r\n\r\n\r\n\r\n<!--<div *ngIf=\"showSplash\" class=\"myBackground\">-->\r\n<!--    <div>-->\r\n<!--    <img src=\"/assets/giphy.gif\">-->\r\n<!--</div>-->\r\n<!--</div>-->\r\n\r\n\r\n\r\n<ion-header no-border >\r\n\r\n<ion-toolbar class=\"wrapper\">\r\n\r\n  <ion-title style=\"font-size: 20px; margin: 5%\">Hello</ion-title>\r\n    <ion-title style=\"font-size: 30px; margin: 5%\">Sign In ! </ion-title>\r\n</ion-toolbar>\r\n\r\n\r\n</ion-header>\r\n<ion-content>\r\n\r\n    <ion-grid>\r\n        <ion-row class=\"inputs\">\r\n\r\n            <ion-item class=\"ion-input\">\r\n                <ion-label position=\"floating\">Mobile Number</ion-label>\r\n                <ion-input required placeholder=\"Enter Phone Number\" type=\"email\" #EmailInput></ion-input>\r\n            </ion-item>\r\n            <ion-item class=\"ion-input\">\r\n                <ion-label position=\"floating\">Password</ion-label>\r\n                <ion-input required placeholder=\"Enter Password\" type=\"password\" #PasswordInput></ion-input>\r\n            </ion-item>\r\n        </ion-row>\r\n        <ion-row  >\r\n            <ion-toolbar >\r\n                <div class=\"buttons-tool_bar\">\r\n                    <ion-buttons >\r\n                        <ion-button class=\"ion-button\" (click)=\"login(EmailInput.value, PasswordInput.value)\" > Sign-In </ion-button>\r\n\r\n                    </ion-buttons>\r\n                </div>\r\n                <div class=\"sign-up\">\r\n                    <p>Don't Have an Account? <a (click)=\"SignUp()\">Sign-Up</a></p>\r\n                </div>\r\n\r\n            </ion-toolbar>\r\n\r\n        </ion-row>\r\n    </ion-grid>\r\n\r\n</ion-content>\r\n\r\n");

/***/ }),

/***/ "./src/app/login-signup/cover/cover.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/login-signup/cover/cover.component.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":root {\n  --ion-color-primary: #3880ff;\n  --ion-color-primary-rgb: 56, 128, 255;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #3171e0;\n  --ion-color-primary-tint: #4c8dff; }\n\n@font-face {\n  font-family: Poppins-Medium;\n  src: url(/assets/fonts/fonts/poppins/Poppins-Medium.ttf); }\n\n.cover {\n  background: #02aab0;\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(30%, #02aab0), color-stop(50%, #06beb6), color-stop(72%, #00cdac));\n  background: linear-gradient(#02aab0 30%, #06beb6 50%, #00cdac 72%);\n  background-position: center;\n  background-repeat: no-repeat;\n  height: 100%; }\n\n.grid {\n  display: grid;\n  grid-template-rows: 1fr 2fr 1fr;\n  grid-gap: 10px; }\n\n.button {\n  margin: 2% 0%;\n  display: block;\n  width: 80%;\n  font-weight: normal;\n  font-family: Poppins-Medium;\n  font-size: 18px;\n  height: 45px; }\n\n.btnDiv {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9sb2dpbi1zaWdudXAvY292ZXIvY292ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSw0QkFBb0I7RUFDcEIscUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QixFQUFBOztBQUUzQjtFQUNFLDJCQUEyQjtFQUMzQix3REFBd0QsRUFBQTs7QUFLMUQ7RUFPRSxtQkFBMEI7RUFDMUIseUlBQWdHO0VBQWhHLGtFQUFnRztFQUNoRywyQkFBMkI7RUFDM0IsNEJBQTRCO0VBQzVCLFlBQVksRUFBQTs7QUFJZDtFQUNFLGFBQVk7RUFDWiwrQkFBaUM7RUFDakMsY0FBYSxFQUFBOztBQUtmO0VBQ0UsYUFBYTtFQUNiLGNBQWM7RUFDZCxVQUFVO0VBQ1YsbUJBQW1CO0VBQ25CLDJCQUEyQjtFQUMzQixlQUFlO0VBQ2YsWUFBWSxFQUFBOztBQUlkO0VBQ0Usb0JBQWE7RUFBYixhQUFhO0VBQ2Isd0JBQXVCO1VBQXZCLHVCQUF1QixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbG9naW4tc2lnbnVwL2NvdmVyL2NvdmVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOnJvb3Qge1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMzODgwZmY7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDU2LCAxMjgsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGU6ICMzMTcxZTA7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS10aW50OiAjNGM4ZGZmO1xyXG59XHJcbkBmb250LWZhY2Uge1xyXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLU1lZGl1bTtcclxuICBzcmM6IHVybCgvYXNzZXRzL2ZvbnRzL2ZvbnRzL3BvcHBpbnMvUG9wcGlucy1NZWRpdW0udHRmKTtcclxufVxyXG5cclxuXHJcbi8vYmFja2dyb3VuZFxyXG4uY292ZXIge1xyXG4gIC8vYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHJnYmEoODEsMTg0LDIwNywxKSA1NSUsICM0Y2I4YzQgODAlKTtcclxuICAvL2JhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCggIzRmYmNlYiwjNTFlNmU4KTtcclxuICAvL2JhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgjN2ZkZGVmIDE2JSwgIzhkZTVkMyA4MCUpO1xyXG4gIC8vYmx1ZSBvbmVcclxuICAvL2JhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChyZ2JhKDAsMTk0LDIwNiwxKSAyMiUsIHJnYmEoMzIsMTUwLDIxNCwxKSA4MCUpO1xyXG4gIC8vIGJsdWUgYW5kIGdyZWVuIG9uZVxyXG4gIGJhY2tncm91bmQ6IHJnYigyLDE3MCwxNzYpO1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChyZ2JhKDIsMTcwLDE3NiwxKSAzMCUsIHJnYmEoNiwxOTAsMTgyLDEpIDUwJSwgcmdiYSgwLDIwNSwxNzIsMSkgNzIlKTtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbi8vdG8gY29udHJvbCByb3dzIGhlaWdodFxyXG4uZ3JpZCB7XHJcbiAgZGlzcGxheTpncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogIDFmciAyZnIgMWZyIDtcclxuICBncmlkLWdhcDoxMHB4O1xyXG4gIC8vaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTBweCk7XHJcbn1cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vYnV0dG9uXHJcbi5idXR0b257XHJcbiAgbWFyZ2luOiAyJSAwJTtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICB3aWR0aDogODAlO1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMtTWVkaXVtO1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBoZWlnaHQ6IDQ1cHg7XHJcblxyXG59XHJcblxyXG4uYnRuRGl2e1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi8vdG8gYXBwbHkgZ3JhZGllbnQgY29sb3Igb24gYnRuXHJcbi8vXHJcbi8vLmJ0bl9jb2xvcntcclxuLy8gIC0tYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxyXG4vLyAgICAgICAgICAgICAgICAgIHRvIGJvdHRvbSxcclxuLy8gICAgICAgICAgICAgICAgICB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSkgMzAlLFxyXG4vLyAgICAgICAgICAgICAgICAgIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KSAxMDAlXHJcbi8vICApO1xyXG4vL31cclxuXHJcblxyXG4iXX0= */");

/***/ }),

/***/ "./src/app/login-signup/cover/cover.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/login-signup/cover/cover.component.ts ***!
  \*******************************************************/
/*! exports provided: CoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoverComponent", function() { return CoverComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/home/NavService/navigation.service */ "./src/app/home/NavService/navigation.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");




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
CoverComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["MenuController"] },
    { type: src_app_home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"] }
];
CoverComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-cover',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./cover.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/login-signup/cover/cover.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./cover.component.scss */ "./src/app/login-signup/cover/cover.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["MenuController"],
        src_app_home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"]])
], CoverComponent);



/***/ }),

/***/ "./src/app/login-signup/login-signup.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/login-signup/login-signup.module.ts ***!
  \*****************************************************/
/*! exports provided: LoginSignupModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginSignupModule", function() { return LoginSignupModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _cover_cover_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cover/cover.component */ "./src/app/login-signup/cover/cover.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../home/NavService/navigation.service */ "./src/app/home/NavService/navigation.service.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login-signup/login/login.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _home_HttPService_http_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../home/HttPService/http.service */ "./src/app/home/HttPService/http.service.ts");
/* harmony import */ var _ionic_native_fcm_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/fcm/ngx */ "./node_modules/@ionic-native/fcm/ngx/index.js");












let LoginSignupModule = class LoginSignupModule {
};
LoginSignupModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClientModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forChild([
                {
                    path: 'cover',
                    component: _cover_cover_component__WEBPACK_IMPORTED_MODULE_1__["CoverComponent"]
                },
                {
                    path: '',
                    component: _cover_cover_component__WEBPACK_IMPORTED_MODULE_1__["CoverComponent"]
                },
                {
                    path: 'login',
                    component: _login_login_component__WEBPACK_IMPORTED_MODULE_8__["LoginComponent"]
                },
            ])
        ],
        providers: [
            _home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_7__["NavigationService"],
            _home_HttPService_http_service__WEBPACK_IMPORTED_MODULE_10__["HttpService"],
            _ionic_native_fcm_ngx__WEBPACK_IMPORTED_MODULE_11__["FCM"],
        ],
        declarations: [_cover_cover_component__WEBPACK_IMPORTED_MODULE_1__["CoverComponent"], _login_login_component__WEBPACK_IMPORTED_MODULE_8__["LoginComponent"]]
    })
], LoginSignupModule);



/***/ }),

/***/ "./src/app/login-signup/login/login.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/login-signup/login/login.component.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".wrapper {\n  --background: #25b7d3;\n  color: aliceblue; }\n\n.header-title {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  display: -webkit-box;\n  display: flex;\n  align-content: flex-start;\n  -webkit-box-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  color: black; }\n\n.img-frame {\n  position: absolute;\n  top: 0px;\n  left: 0px; }\n\n.inputs {\n  display: -webkit-box;\n  display: flex;\n  height: 100%;\n  align-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center; }\n\n.ion-input {\n  margin-top: 2%;\n  margin-bottom: 2%;\n  margin-left: 7%;\n  margin-right: 7%;\n  border-radius: 15px;\n  border: #25b7d3 solid 0.5px;\n  width: 100%; }\n\n.buttons-tool_bar {\n  display: -webkit-box;\n  display: flex;\n  align-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  width: 100%;\n  color: white; }\n\n.ion-button {\n  border-radius: 15px;\n  display: -webkit-box;\n  display: flex;\n  height: 50px;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  align-content: center;\n  margin-left: 10%;\n  width: 150px;\n  background: linear-gradient(145deg, #28c4e2, #21a5be);\n  box-shadow: 3px 3px 3px white,\r -3px -3px 3px white; }\n\n.sign-up {\n  display: -webkit-box;\n  display: flex;\n  align-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9sb2dpbi1zaWdudXAvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2xvZ2luLXNpZ251cC9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyRUE7RUFFRSxxQkFBYTtFQUNiLGdCQUFnQixFQUFBOztBQUlsQjtFQUNHLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsU0FBUztFQUNULG9CQUFhO0VBQWIsYUFBYTtFQUNiLHlCQUF5QjtFQUN6Qix3QkFBdUI7VUFBdkIsdUJBQXVCO0VBQ3ZCLHVCQUEyQjtVQUEzQiwyQkFBMkI7RUFDM0IsWUFBWSxFQUFBOztBQUVmO0VBQ0Usa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixTQUFTLEVBQUE7O0FBR1g7RUFDRSxvQkFBYTtFQUFiLGFBQWE7RUFDYixZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLHlCQUFtQjtVQUFuQixtQkFBbUI7RUFDbkIsd0JBQXVCO1VBQXZCLHVCQUF1QixFQUFBOztBQUV6QjtFQUNFLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixtQkFBa0I7RUFDbEIsMkJBQTJCO0VBQzNCLFdBQVcsRUFBQTs7QUFHYjtFQUNFLG9CQUFhO0VBQWIsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQix5QkFBbUI7VUFBbkIsbUJBQW1CO0VBQ25CLHdCQUF1QjtVQUF2Qix1QkFBdUI7RUFDdkIsV0FBVztFQUNYLFlBQVksRUFBQTs7QUFHZDtFQUNFLG1CQUFtQjtFQUNuQixvQkFBYTtFQUFiLGFBQWE7RUFDYixZQUFZO0VBQ1osd0JBQXVCO1VBQXZCLHVCQUF1QjtFQUN2Qix5QkFBbUI7VUFBbkIsbUJBQW1CO0VBQ25CLHFCQUFxQjtFQUNyQixnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLHFEQUFxRDtFQUNyRCxtRENoRmtCLEVBQUU7O0FBRXRCO0VEb0ZFLG9CQUFhO0VBQWIsYUFBYTtFQUNiLHFCQUFtQjtFQUNuQix5QkFBaUI7VUFBakIsbUJBQWlCO0VDbEZqQix3QkFBdUI7VUFBdkIsdUJBQXVCLEVBQUUiLCJmaWxlIjoic3JjL2FwcC9sb2dpbi1zaWdudXAvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLy5jb3ZlciB7XHJcbi8vICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvYXNzZXRzL3BhdGgtNi5wbmcpO1xyXG4vLyAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbi8vICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbi8vICAgIGhlaWdodDogMTAwJTtcclxuLy8gICAgICAgICAgfVxyXG4vL1xyXG4vL1xyXG4vLyAgICAgLmNsb3ZlciB7XHJcbi8vXHJcbi8vICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9hc3NldHMvY2xvdmVyLnBuZyk7XHJcbi8vICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuLy8gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuLy9cclxuLy8gICAgfVxyXG4vLyAgICAuc3BhY2V7XHJcbi8vICAgICAgZGlzcGxheTogYmxvY2s7XHJcbi8vXHJcbi8vXHJcbi8vICAgIH1cclxuLy8gICAgLmZhdC1mcmVlIHtcclxuLy8gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuLy8gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbi8vICAgICAgZm9udC1mYW1pbHk6IFwiVGltZXMgTmV3IFJvbWFuXCIsIFRpbWVzLCBzZXJpZjtcclxuLy8gICAgICBmb250LXdlaWdodDogYm9sZDtcclxuLy8gICAgICBjb2xvcjogIzBiMGMwYjtcclxuLy8gICAgICBmb250LXNpemU6NDUwO1xyXG4vLyAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4vLyAgICB9XHJcbi8vXHJcbi8vICAubWFyZ2luVG9we1xyXG4vL1xyXG4vLyAgICAgICAgICBtYXJnaW4tdG9wOiA3JTtcclxuLy9cclxuLy9cclxuLy8gICAgfVxyXG4vL1xyXG4vLyAgICAuYnV0dG9ue1xyXG4vLyAgICAgIG1hcmdpbjogMiUgMCU7XHJcbi8vICAgICAgZGlzcGxheTogYmxvY2s7XHJcbi8vICAgICAgd2lkdGg6IDY1JTtcclxuLy8gICAgICBmb250LXdlaWdodDogMTIlO1xyXG4vL1xyXG4vLyAgICB9XHJcbi8vXHJcbi8vICAgIC5jZW50cmlje1xyXG4vLyAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbi8vICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbi8vICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4vLyAgICB9XHJcbi8vXHJcbi8vaW9uLWlucHV0IHtcclxuLy8gIG1hcmdpbjogMHB4IDUwcHg7XHJcbi8vICBkaXNwbGF5OiBibG9jaztcclxuLy8gIGZvbnQtd2VpZ2h0OiAxMiU7XHJcbi8vICBib3JkZXI6ICAxcHggc29saWQgd2hpdGU7XHJcbi8vfVxyXG4vLy5teUJhY2tncm91bmR7XHJcbi8vICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICB3aWR0aDoxMDAlO1xyXG4vLyAgaGVpZ2h0OjEwMCU7XHJcbi8vICB6LWluZGV4OiA5OTk7XHJcbi8vICBkaXNwbGF5OiBmbGV4O1xyXG4vLyAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuLy8gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4vLyAgYmFja2dyb3VuZDpyZ2IoODAsIDE4NSwgMTgyKTtcclxuLy9cclxuLy8gIH1cclxuLy8gIC5iYWNre1xyXG4vLyAgICBoZWlnaHQ6IDEwMCU7XHJcbi8vICAgIHdpZHRoOjIwJTtcclxuLy8gICAgbWFyZ2luLXRvcDogMiU7XHJcbi8vICAgIG1hcmdpbi1sZWZ0OiAyJTtcclxuLy8gIH1cclxuXHJcbi53cmFwcGVye1xyXG4gIC8vYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltYWdlcy5qcGcnKTtcclxuICAtLWJhY2tncm91bmQ6ICMyNWI3ZDM7XHJcbiAgY29sb3I6IGFsaWNlYmx1ZTtcclxuICAvL2ZvbnQtc2l6ZTogMmVtO1xyXG5cclxufVxyXG4uaGVhZGVyLXRpdGxle1xyXG4gICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgIHRvcDogMHB4O1xyXG4gICBsZWZ0OiAwcHg7XHJcbiAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgIGNvbG9yOiBibGFjaztcclxuIH1cclxuLmltZy1mcmFtZXtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwcHg7XHJcbiAgbGVmdDogMHB4O1xyXG5cclxufVxyXG4uaW5wdXRze1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcbi5pb24taW5wdXR7XHJcbiAgbWFyZ2luLXRvcDogMiU7XHJcbiAgbWFyZ2luLWJvdHRvbTogMiU7XHJcbiAgbWFyZ2luLWxlZnQ6IDclO1xyXG4gIG1hcmdpbi1yaWdodDogNyU7XHJcbiAgYm9yZGVyLXJhZGl1czoxNXB4O1xyXG4gIGJvcmRlcjogIzI1YjdkMyBzb2xpZCAwLjVweDtcclxuICB3aWR0aDogMTAwJTtcclxuXHJcbn1cclxuLmJ1dHRvbnMtdG9vbF9iYXJ7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICB3aWR0aDogMTAwJTtcclxuICBjb2xvcjogd2hpdGU7XHJcblxyXG59XHJcbi5pb24tYnV0dG9uIHtcclxuICBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gIG1hcmdpbi1sZWZ0OiAxMCU7XHJcbiAgd2lkdGg6IDE1MHB4O1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxNDVkZWcsICMyOGM0ZTIsICMyMWE1YmUpO1xyXG4gIGJveC1zaGFkb3c6ICAzcHggM3B4IDNweCB3aGl0ZSxcclxuICAtM3B4IC0zcHggM3B4IHdoaXRlO1xyXG59XHJcblxyXG4uc2lnbi11cHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4iLCIud3JhcHBlciB7XG4gIC0tYmFja2dyb3VuZDogIzI1YjdkMztcbiAgY29sb3I6IGFsaWNlYmx1ZTsgfVxuXG4uaGVhZGVyLXRpdGxlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDBweDtcbiAgbGVmdDogMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBjb2xvcjogYmxhY2s7IH1cblxuLmltZy1mcmFtZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwcHg7XG4gIGxlZnQ6IDBweDsgfVxuXG4uaW5wdXRzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XG5cbi5pb24taW5wdXQge1xuICBtYXJnaW4tdG9wOiAyJTtcbiAgbWFyZ2luLWJvdHRvbTogMiU7XG4gIG1hcmdpbi1sZWZ0OiA3JTtcbiAgbWFyZ2luLXJpZ2h0OiA3JTtcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgYm9yZGVyOiAjMjViN2QzIHNvbGlkIDAuNXB4O1xuICB3aWR0aDogMTAwJTsgfVxuXG4uYnV0dG9ucy10b29sX2JhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xuICBjb2xvcjogd2hpdGU7IH1cblxuLmlvbi1idXR0b24ge1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDUwcHg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbi1sZWZ0OiAxMCU7XG4gIHdpZHRoOiAxNTBweDtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE0NWRlZywgIzI4YzRlMiwgIzIxYTViZSk7XG4gIGJveC1zaGFkb3c6IDNweCAzcHggM3B4IHdoaXRlLFxyIC0zcHggLTNweCAzcHggd2hpdGU7IH1cblxuLnNpZ24tdXAge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XG4iXX0= */");

/***/ }),

/***/ "./src/app/login-signup/login/login.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/login-signup/login/login.component.ts ***!
  \*******************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/home/NavService/navigation.service */ "./src/app/home/NavService/navigation.service.ts");
/* harmony import */ var src_app_home_HttPService_http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/home/HttPService/http.service */ "./src/app/home/HttPService/http.service.ts");
/* harmony import */ var src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/datastream/datastreaming.service */ "./src/app/services/datastream/datastreaming.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _ionic_native_fcm_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/fcm/ngx */ "./node_modules/@ionic-native/fcm/ngx/index.js");









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
            this.showSplash = true;
            // timer
            Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["timer"])(10000).subscribe(() => this.showSplash = false);
            //recieveing Token For Development Only FOR NOW
            this.fcm.getToken().then((fcmtoken) => {
                this.http.editFCMToken(fcmtoken, res.token).subscribe((data) => {
                    console.log(JSON.stringify(data));
                }, err => {
                    alert("ERROR in updating FCM token: " + JSON.stringify(err));
                });
            }, (err) => {
                alert("ERROR in getting FCM token: " + JSON.stringify(err));
            });
            //Use Token To get Doctor Data
            console.log("Token: " + res.token);
            this.datastream.setToken(res.token);
            this.http.getDoctorUsingToken(res.token).subscribe(doctordata => {
                console.log("doctor: " + JSON.stringify(doctordata));
                that.datastream.setDoctor(doctordata.mydoctor);
                this.datastream.clearPatientList();
                doctordata.patientArrayList.forEach(element => {
                    this.datastream.addToPatientList(element);
                });
                that.nav.navigateTo('home');
            }, err => {
                this.presentAlert('HTTP Doctor Data Error: ', err.error.message);
            }, () => console.log('HTTP get Doctor data request completed.'));
        }, err => {
            this.presentAlert('HTTP Login Error: ', err.error.message);
            // that.nav.navigateTo('home');
        }, () => { console.log('HTTP Login request completed.'); });
    }
    presentAlert(subtitleString, messageString) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.addController.create({
                header: 'ERROR',
                subHeader: subtitleString,
                message: messageString,
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
    backClick() {
        this.nav.navigateTo('cover');
    }
    SignUp() {
        this.nav.navigateTo('cover');
    }
};
LoginComponent.ctorParameters = () => [
    { type: src_app_home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"] },
    { type: src_app_home_HttPService_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"] },
    { type: src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_4__["DatastreamingService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["MenuController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _ionic_native_fcm_ngx__WEBPACK_IMPORTED_MODULE_7__["FCM"] }
];
LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-login',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/login-signup/login/login.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./login.component.scss */ "./src/app/login-signup/login/login.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"],
        src_app_home_HttPService_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"],
        src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_4__["DatastreamingService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["MenuController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"],
        _ionic_native_fcm_ngx__WEBPACK_IMPORTED_MODULE_7__["FCM"]])
], LoginComponent);



/***/ })

}]);
//# sourceMappingURL=login-signup-login-signup-module-es2015.js.map