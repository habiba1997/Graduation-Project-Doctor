(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-signup-login-signup-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/login-signup/cover/cover.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login-signup/cover/cover.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\n    <div class=\"cover\">\n        <ion-grid class=\"grid\" >\n            <ion-row>\n\n                <ion-col>\n                    <!--        <img src=\"assets/clover.png\"/>-->\n                </ion-col>\n\n                <ion-col>\n                </ion-col>\n\n                <ion-col>\n                </ion-col>\n\n            </ion-row>\n            <ion-row>\n\n\n                <ion-col size=\"12\" >\n                    <img src=\"assets/02.png\"/>\n                </ion-col >\n\n            </ion-row>\n\n\n            <ion-row>\n\n                <ion-col>\n                    <div class=\"buttons\">\n                        <div class=\"btnDiv\">\n                            <ion-button class=\"button\"    (click)=\"login()\"  color=\"light\"  >Login</ion-button>\n\n                        </div>\n                        <div class=\"btnDiv\">\n                            <ion-button class=\"button\"   (click)=\"signup()\"  color=\"light\" >Sign Up</ion-button>\n\n                        </div>\n                    </div>\n\n\n                </ion-col>\n\n\n            </ion-row>\n\n\n        </ion-grid>\n    </div>\n</ion-content>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/login-signup/login/login.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login-signup/login/login.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--<ion-content>-->\n<!--<div *ngIf=\"showSplash\" class=\"myBackground\">-->\n<!--    <div>-->\n<!--    <img src=\"/assets/giphy.gif\">-->\n<!--</div> -->\n<!--</div> -->\n<!--<div *ngIf=\"!showSplash\">-->\n<!--  <ion-grid >-->\n<!--    <ion-row>-->\n<!--      <ion-col>-->\n<!--           -->\n<!--  -->\n<!--               <ion-button  (click)= \"backClick()\" color=\"light\" shape =\"round\" >-->\n<!--                 <ion-icon name=\"arrow-round-back\"></ion-icon>-->\n<!--               </ion-button>       -->\n<!--            -->\n\n<!--      </ion-col>-->\n<!--      <ion-col >-->\n<!--        <h1 style=\"height: 80px;\"></h1> -->\n<!--        <img class = \"space\" src=\"/assets/logo02.png\"/>-->\n<!--        <h1 class=\"fat-free\">Log In</h1>-->\n<!--        -->\n<!--      </ion-col>-->\n<!--        <ion-col >-->\n<!--            <img src=\"/assets/path-6.png\"/>-->\n<!--        </ion-col>-->\n\n<!--    </ion-row>-->\n<!--    -->\n<!--  -->\n<!--  </ion-grid>-->\n\n<!--        <div class=\"marginTop\">-->\n<!--        -->\n\n\n<!--       -->\n<!--          <div class=\"centric\">-->\n<!--              <ion-card>-->\n<!--                <ion-item>-->\n<!--                    <ion-input required placeholder=\"Enter Phone Number\" type=\"email\" #EmailInput></ion-input>-->\n<!--                  </ion-item>-->\n<!--                </ion-card>-->\n<!--           -->\n<!--            </div>-->\n<!--          <div class=\"centric\">-->\n<!--            <ion-card>-->\n<!--              <ion-item>-->\n<!-- -->\n<!--                  <ion-input required placeholder=\"Enter Password\" type=\"password\" #PasswordInput></ion-input>-->\n<!--                </ion-item>-->\n<!--              </ion-card>-->\n<!--          </div>-->\n<!--       -->\n<!--        </div>-->\n<!--         -->\n\n<!--   <div class=\"marginTop centric\"> <ion-button style=\"height: 40px; \"class=\"marginTop button\"  shape=\"round\" (click)=\"login(EmailInput.value, PasswordInput.value)\" color=\"light\">Log In</ion-button></div>      -->\n<!--</div>-->\n<!--</ion-content>-->\n\n\n\n<!--<div *ngIf=\"showSplash\" class=\"myBackground\">-->\n<!--    <div>-->\n<!--    <img src=\"/assets/giphy.gif\">-->\n<!--</div>-->\n<!--</div>-->\n\n\n\n<ion-header no-border >\n\n<ion-toolbar class=\"wrapper\">\n\n    <ion-title style=\"font-size: 30px; margin: 5%\">Sign In ! </ion-title>\n</ion-toolbar>\n\n\n</ion-header>\n<ion-content>\n\n    <ion-grid>\n        <ion-row class=\"inputs\">\n\n            <ion-item class=\"ion-input\">\n                <ion-label position=\"floating\">Mobile Number</ion-label>\n                <ion-input required placeholder=\"Enter Phone Number\" type=\"email\" #EmailInput></ion-input>\n            </ion-item>\n            <ion-item class=\"ion-input\">\n                <ion-label position=\"floating\">Password</ion-label>\n                <ion-input required placeholder=\"Enter Password\" type=\"password\" #PasswordInput></ion-input>\n            </ion-item>\n        </ion-row>\n        <ion-row  >\n            <ion-toolbar >\n                <div class=\"buttons-tool_bar\">\n                    <ion-buttons >\n                        <ion-button class=\"ion-button\" (click)=\"login(EmailInput.value, PasswordInput.value)\" > Sign-In </ion-button>\n\n                    </ion-buttons>\n                </div>\n                <div class=\"sign-up\">\n                    <p>Don't Have an Account? <a (click)=\"SignUp()\">Sign-Up</a></p>\n                </div>\n\n            </ion-toolbar>\n\n        </ion-row>\n    </ion-grid>\n\n</ion-content>\n\n");

/***/ }),

/***/ "./src/app/login-signup/cover/cover.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/login-signup/cover/cover.component.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":root {\n  --ion-color-primary: #3880ff;\n  --ion-color-primary-rgb: 56, 128, 255;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #3171e0;\n  --ion-color-primary-tint: #4c8dff; }\n\n@font-face {\n  font-family: Poppins-Medium;\n  src: url(/assets/fonts/fonts/poppins/Poppins-Medium.ttf); }\n\n.cover {\n  background: #02aab0;\n  background: linear-gradient(#02aab0 30%, #06beb6 50%, #00cdac 72%);\n  background-position: center;\n  background-repeat: no-repeat;\n  height: 100%; }\n\n.grid {\n  display: grid;\n  grid-template-rows: 1fr 2fr 1fr;\n  grid-gap: 10px; }\n\n.button {\n  margin: 2% 0%;\n  display: block;\n  width: 80%;\n  font-weight: normal;\n  font-family: Poppins-Medium;\n  font-size: 18px;\n  height: 45px; }\n\n.btnDiv {\n  display: flex;\n  justify-content: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2hhYmliYS9HUC9HcmFkdWF0aW9uLVByb2plY3QtRG9jdG9yL3NyYy9hcHAvbG9naW4tc2lnbnVwL2NvdmVyL2NvdmVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsNEJBQW9CO0VBQ3BCLHFDQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUIsRUFBQTs7QUFFM0I7RUFDRSwyQkFBMkI7RUFDM0Isd0RBQXdELEVBQUE7O0FBSzFEO0VBT0UsbUJBQTBCO0VBQzFCLGtFQUFnRztFQUNoRywyQkFBMkI7RUFDM0IsNEJBQTRCO0VBQzVCLFlBQVksRUFBQTs7QUFJZDtFQUNFLGFBQVk7RUFDWiwrQkFBaUM7RUFDakMsY0FBYSxFQUFBOztBQUtmO0VBQ0UsYUFBYTtFQUNiLGNBQWM7RUFDZCxVQUFVO0VBQ1YsbUJBQW1CO0VBQ25CLDJCQUEyQjtFQUMzQixlQUFlO0VBQ2YsWUFBWSxFQUFBOztBQUlkO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbG9naW4tc2lnbnVwL2NvdmVyL2NvdmVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOnJvb3Qge1xuICAtLWlvbi1jb2xvci1wcmltYXJ5OiAjMzg4MGZmO1xuICAtLWlvbi1jb2xvci1wcmltYXJ5LXJnYjogNTYsIDEyOCwgMjU1O1xuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZTogIzMxNzFlMDtcbiAgLS1pb24tY29sb3ItcHJpbWFyeS10aW50OiAjNGM4ZGZmO1xufVxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLU1lZGl1bTtcbiAgc3JjOiB1cmwoL2Fzc2V0cy9mb250cy9mb250cy9wb3BwaW5zL1BvcHBpbnMtTWVkaXVtLnR0Zik7XG59XG5cblxuLy9iYWNrZ3JvdW5kXG4uY292ZXIge1xuICAvL2JhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChyZ2JhKDgxLDE4NCwyMDcsMSkgNTUlLCAjNGNiOGM0IDgwJSk7XG4gIC8vYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCAjNGZiY2ViLCM1MWU2ZTgpO1xuICAvL2JhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgjN2ZkZGVmIDE2JSwgIzhkZTVkMyA4MCUpO1xuICAvL2JsdWUgb25lXG4gIC8vYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHJnYmEoMCwxOTQsMjA2LDEpIDIyJSwgcmdiYSgzMiwxNTAsMjE0LDEpIDgwJSk7XG4gIC8vIGJsdWUgYW5kIGdyZWVuIG9uZVxuICBiYWNrZ3JvdW5kOiByZ2IoMiwxNzAsMTc2KTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHJnYmEoMiwxNzAsMTc2LDEpIDMwJSwgcmdiYSg2LDE5MCwxODIsMSkgNTAlLCByZ2JhKDAsMjA1LDE3MiwxKSA3MiUpO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLy90byBjb250cm9sIHJvd3MgaGVpZ2h0XG4uZ3JpZCB7XG4gIGRpc3BsYXk6Z3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAgMWZyIDJmciAxZnIgO1xuICBncmlkLWdhcDoxMHB4O1xuICAvL2hlaWdodDogY2FsYygxMDB2aCAtIDEwcHgpO1xufVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vL2J1dHRvblxuLmJ1dHRvbntcbiAgbWFyZ2luOiAyJSAwJTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiA4MCU7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLU1lZGl1bTtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBoZWlnaHQ6IDQ1cHg7XG5cbn1cblxuLmJ0bkRpdntcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi8vdG8gYXBwbHkgZ3JhZGllbnQgY29sb3Igb24gYnRuXG4vL1xuLy8uYnRuX2NvbG9ye1xuLy8gIC0tYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxuLy8gICAgICAgICAgICAgICAgICB0byBib3R0b20sXG4vLyAgICAgICAgICAgICAgICAgIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSAzMCUsXG4vLyAgICAgICAgICAgICAgICAgIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KSAxMDAlXG4vLyAgKTtcbi8vfVxuXG5cbiJdfQ== */");

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
/* harmony default export */ __webpack_exports__["default"] = (".wrapper {\n  --background: #25b7d3;\n  color: aliceblue; }\n\n.header-title {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  display: flex;\n  align-content: flex-start;\n  align-items: flex-start;\n  justify-content: flex-start;\n  color: black; }\n\n.img-frame {\n  position: absolute;\n  top: 0px;\n  left: 0px; }\n\n.inputs {\n  display: flex;\n  height: 100%;\n  align-content: center;\n  align-items: center;\n  justify-content: center; }\n\n.ion-input {\n  margin-top: 2%;\n  margin-bottom: 2%;\n  margin-left: 7%;\n  margin-right: 7%;\n  border-radius: 15px;\n  border: #25b7d3 solid 0.5px;\n  width: 100%; }\n\n.buttons-tool_bar {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  color: white; }\n\n.ion-button {\n  border-radius: 15px;\n  display: flex;\n  height: 50px;\n  justify-content: center;\n  align-items: center;\n  align-content: center;\n  margin-left: 10%;\n  width: 150px;\n  background: linear-gradient(145deg, #28c4e2, #21a5be);\n  box-shadow: 3px 3px 3px white, -3px -3px 3px white; }\n\n.sign-up {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  justify-content: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2hhYmliYS9HUC9HcmFkdWF0aW9uLVByb2plY3QtRG9jdG9yL3NyYy9hcHAvbG9naW4tc2lnbnVwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJFQTtFQUVFLHFCQUFhO0VBQ2IsZ0JBQWdCLEVBQUE7O0FBSWxCO0VBQ0csa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixTQUFTO0VBQ1QsYUFBYTtFQUNiLHlCQUF5QjtFQUN6Qix1QkFBdUI7RUFDdkIsMkJBQTJCO0VBQzNCLFlBQVksRUFBQTs7QUFFZjtFQUNFLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsU0FBUyxFQUFBOztBQUdYO0VBQ0UsYUFBYTtFQUNiLFlBQVk7RUFDWixxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLHVCQUF1QixFQUFBOztBQUV6QjtFQUNFLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixtQkFBa0I7RUFDbEIsMkJBQTJCO0VBQzNCLFdBQVcsRUFBQTs7QUFHYjtFQUNFLGFBQWE7RUFDYixxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixXQUFXO0VBQ1gsWUFBWSxFQUFBOztBQUdkO0VBQ0UsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixZQUFZO0VBQ1osdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixxREFBcUQ7RUFDckQsa0RBQ21CLEVBQUE7O0FBR3JCO0VBQ0UsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIsdUJBQXVCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9sb2dpbi1zaWdudXAvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLy5jb3ZlciB7XG4vLyAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL2Fzc2V0cy9wYXRoLTYucG5nKTtcbi8vICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbi8vICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4vLyAgICBoZWlnaHQ6IDEwMCU7XG4vLyAgICAgICAgICB9XG4vL1xuLy9cbi8vICAgICAuY2xvdmVyIHtcbi8vXG4vLyAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvYXNzZXRzL2Nsb3Zlci5wbmcpO1xuLy8gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuLy8gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbi8vXG4vLyAgICB9XG4vLyAgICAuc3BhY2V7XG4vLyAgICAgIGRpc3BsYXk6IGJsb2NrO1xuLy9cbi8vXG4vLyAgICB9XG4vLyAgICAuZmF0LWZyZWUge1xuLy8gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbi8vICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuLy8gICAgICBmb250LWZhbWlseTogXCJUaW1lcyBOZXcgUm9tYW5cIiwgVGltZXMsIHNlcmlmO1xuLy8gICAgICBmb250LXdlaWdodDogYm9sZDtcbi8vICAgICAgY29sb3I6ICMwYjBjMGI7XG4vLyAgICAgIGZvbnQtc2l6ZTo0NTA7XG4vLyAgICAgIGRpc3BsYXk6IGJsb2NrO1xuLy8gICAgfVxuLy9cbi8vICAubWFyZ2luVG9we1xuLy9cbi8vICAgICAgICAgIG1hcmdpbi10b3A6IDclO1xuLy9cbi8vXG4vLyAgICB9XG4vL1xuLy8gICAgLmJ1dHRvbntcbi8vICAgICAgbWFyZ2luOiAyJSAwJTtcbi8vICAgICAgZGlzcGxheTogYmxvY2s7XG4vLyAgICAgIHdpZHRoOiA2NSU7XG4vLyAgICAgIGZvbnQtd2VpZ2h0OiAxMiU7XG4vL1xuLy8gICAgfVxuLy9cbi8vICAgIC5jZW50cmlje1xuLy8gICAgICBkaXNwbGF5OiBmbGV4O1xuLy8gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbi8vICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuLy8gICAgfVxuLy9cbi8vaW9uLWlucHV0IHtcbi8vICBtYXJnaW46IDBweCA1MHB4O1xuLy8gIGRpc3BsYXk6IGJsb2NrO1xuLy8gIGZvbnQtd2VpZ2h0OiAxMiU7XG4vLyAgYm9yZGVyOiAgMXB4IHNvbGlkIHdoaXRlO1xuLy99XG4vLy5teUJhY2tncm91bmR7XG4vLyAgcG9zaXRpb246IGFic29sdXRlO1xuLy8gIHdpZHRoOjEwMCU7XG4vLyAgaGVpZ2h0OjEwMCU7XG4vLyAgei1pbmRleDogOTk5O1xuLy8gIGRpc3BsYXk6IGZsZXg7XG4vLyAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbi8vICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbi8vICBiYWNrZ3JvdW5kOnJnYig4MCwgMTg1LCAxODIpO1xuLy9cbi8vICB9XG4vLyAgLmJhY2t7XG4vLyAgICBoZWlnaHQ6IDEwMCU7XG4vLyAgICB3aWR0aDoyMCU7XG4vLyAgICBtYXJnaW4tdG9wOiAyJTtcbi8vICAgIG1hcmdpbi1sZWZ0OiAyJTtcbi8vICB9XG5cbi53cmFwcGVye1xuICAvL2JhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWFnZXMuanBnJyk7XG4gIC0tYmFja2dyb3VuZDogIzI1YjdkMztcbiAgY29sb3I6IGFsaWNlYmx1ZTtcbiAgLy9mb250LXNpemU6IDJlbTtcblxufVxuLmhlYWRlci10aXRsZXtcbiAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgIHRvcDogMHB4O1xuICAgbGVmdDogMHB4O1xuICAgZGlzcGxheTogZmxleDtcbiAgIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgIGNvbG9yOiBibGFjaztcbiB9XG4uaW1nLWZyYW1le1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMHB4O1xuICBsZWZ0OiAwcHg7XG5cbn1cbi5pbnB1dHN7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogMTAwJTtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cbi5pb24taW5wdXR7XG4gIG1hcmdpbi10b3A6IDIlO1xuICBtYXJnaW4tYm90dG9tOiAyJTtcbiAgbWFyZ2luLWxlZnQ6IDclO1xuICBtYXJnaW4tcmlnaHQ6IDclO1xuICBib3JkZXItcmFkaXVzOjE1cHg7XG4gIGJvcmRlcjogIzI1YjdkMyBzb2xpZCAwLjVweDtcbiAgd2lkdGg6IDEwMCU7XG5cbn1cbi5idXR0b25zLXRvb2xfYmFye1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbiAgY29sb3I6IHdoaXRlO1xuXG59XG4uaW9uLWJ1dHRvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogNTBweDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luLWxlZnQ6IDEwJTtcbiAgd2lkdGg6IDE1MHB4O1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTQ1ZGVnLCAjMjhjNGUyLCAjMjFhNWJlKTtcbiAgYm94LXNoYWRvdzogIDNweCAzcHggM3B4IHdoaXRlLFxuICAtM3B4IC0zcHggM3B4IHdoaXRlO1xufVxuXG4uc2lnbi11cHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuIl19 */");

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






let LoginComponent = class LoginComponent {
    constructor(nav, http, datastream, men) {
        this.nav = nav;
        this.http = http;
        this.datastream = datastream;
        this.men = men;
        this.showSplash = false;
    }
    ngOnInit() {
        this.men.enable(false);
    }
    login(mobile, password) {
        let that = this;
        console.log(mobile, password);
        mobile = mobile.replace(/^0+/, '');
        mobile = "+20" + mobile;
        this.http.Login(mobile, password).subscribe(tokenObj => {
            this.showSplash = true;
            console.log("Token: ", tokenObj.token);
            this.datastream.setToken(tokenObj.token);
            this.http.editFCMToken();
            this.http.getDoctorUsingToken().subscribe(doctordata => {
                console.log("http doctor data", doctordata);
                that.datastream.setDoctor(doctordata.mydoctor);
                this.datastream.clearPatientList();
                doctordata.patientArrayList.forEach(element => {
                    this.datastream.addToPatientList(element);
                });
                that.nav.navigateTo('home');
            }, err => {
                this.showSplash = false;
                alert('HTTP Doctor Data Error: ' + err);
            }, () => {
                this.showSplash = false;
                console.log('HTTP get patient data request completed.');
                console.log("patientData.doctorsArrayList: ", that.datastream.getPatientList());
                console.log("patientData.myPatient Name: ", that.datastream.getDoctorName());
                that.nav.navigateTo('home');
            });
        }, err => alert('HTTP Login Error: ' + err), () => console.log('HTTP Login request completed.'));
    }
    backClick() {
        this.nav.navigateTo('cover');
    }
};
LoginComponent.ctorParameters = () => [
    { type: src_app_home_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"] },
    { type: src_app_home_HttPService_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"] },
    { type: src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_4__["DatastreamingService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["MenuController"] }
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
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["MenuController"]])
], LoginComponent);



/***/ })

}]);
//# sourceMappingURL=login-signup-login-signup-module-es2015.js.map