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
/* harmony default export */ __webpack_exports__["default"] = (":root {\n  --ion-color-primary: #3880ff;\n  --ion-color-primary-rgb: 56, 128, 255;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #3171e0;\n  --ion-color-primary-tint: #4c8dff; }\n\n@font-face {\n  font-family: Poppins-Medium;\n  src: url(/assets/fonts/fonts/poppins/Poppins-Medium.ttf); }\n\n.cover {\n  background: #02aab0;\n  background: linear-gradient(#02aab0 30%, #06beb6 50%, #00cdac 72%);\n  background-position: center;\n  background-repeat: no-repeat;\n  height: 100%; }\n\n.grid {\n  display: grid;\n  grid-template-rows: 1fr 2fr 1fr;\n  grid-gap: 10px; }\n\n.button {\n  margin: 2% 0%;\n  display: block;\n  width: 80%;\n  font-weight: normal;\n  font-family: Poppins-Medium;\n  font-size: 18px;\n  height: 45px; }\n\n.btnDiv {\n  display: flex;\n  justify-content: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9sb2dpbi1zaWdudXAvY292ZXIvY292ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSw0QkFBb0I7RUFDcEIscUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QixFQUFBOztBQUUzQjtFQUNFLDJCQUEyQjtFQUMzQix3REFBd0QsRUFBQTs7QUFLMUQ7RUFPRSxtQkFBMEI7RUFDMUIsa0VBQWdHO0VBQ2hHLDJCQUEyQjtFQUMzQiw0QkFBNEI7RUFDNUIsWUFBWSxFQUFBOztBQUlkO0VBQ0UsYUFBWTtFQUNaLCtCQUFpQztFQUNqQyxjQUFhLEVBQUE7O0FBS2Y7RUFDRSxhQUFhO0VBQ2IsY0FBYztFQUNkLFVBQVU7RUFDVixtQkFBbUI7RUFDbkIsMkJBQTJCO0VBQzNCLGVBQWU7RUFDZixZQUFZLEVBQUE7O0FBSWQ7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9sb2dpbi1zaWdudXAvY292ZXIvY292ZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6cm9vdCB7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeTogIzM4ODBmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXJnYjogNTYsIDEyOCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZTogIzMxNzFlMDtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQ6ICM0YzhkZmY7XHJcbn1cclxuQGZvbnQtZmFjZSB7XHJcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMtTWVkaXVtO1xyXG4gIHNyYzogdXJsKC9hc3NldHMvZm9udHMvZm9udHMvcG9wcGlucy9Qb3BwaW5zLU1lZGl1bS50dGYpO1xyXG59XHJcblxyXG5cclxuLy9iYWNrZ3JvdW5kXHJcbi5jb3ZlciB7XHJcbiAgLy9iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQocmdiYSg4MSwxODQsMjA3LDEpIDU1JSwgIzRjYjhjNCA4MCUpO1xyXG4gIC8vYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCAjNGZiY2ViLCM1MWU2ZTgpO1xyXG4gIC8vYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCM3ZmRkZWYgMTYlLCAjOGRlNWQzIDgwJSk7XHJcbiAgLy9ibHVlIG9uZVxyXG4gIC8vYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHJnYmEoMCwxOTQsMjA2LDEpIDIyJSwgcmdiYSgzMiwxNTAsMjE0LDEpIDgwJSk7XHJcbiAgLy8gYmx1ZSBhbmQgZ3JlZW4gb25lXHJcbiAgYmFja2dyb3VuZDogcmdiKDIsMTcwLDE3Nik7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHJnYmEoMiwxNzAsMTc2LDEpIDMwJSwgcmdiYSg2LDE5MCwxODIsMSkgNTAlLCByZ2JhKDAsMjA1LDE3MiwxKSA3MiUpO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuLy90byBjb250cm9sIHJvd3MgaGVpZ2h0XHJcbi5ncmlkIHtcclxuICBkaXNwbGF5OmdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAgMWZyIDJmciAxZnIgO1xyXG4gIGdyaWQtZ2FwOjEwcHg7XHJcbiAgLy9oZWlnaHQ6IGNhbGMoMTAwdmggLSAxMHB4KTtcclxufVxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy9idXR0b25cclxuLmJ1dHRvbntcclxuICBtYXJnaW46IDIlIDAlO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHdpZHRoOiA4MCU7XHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICBmb250LWZhbWlseTogUG9wcGlucy1NZWRpdW07XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGhlaWdodDogNDVweDtcclxuXHJcbn1cclxuXHJcbi5idG5EaXZ7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLy90byBhcHBseSBncmFkaWVudCBjb2xvciBvbiBidG5cclxuLy9cclxuLy8uYnRuX2NvbG9ye1xyXG4vLyAgLS1iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXHJcbi8vICAgICAgICAgICAgICAgICAgdG8gYm90dG9tLFxyXG4vLyAgICAgICAgICAgICAgICAgIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSAzMCUsXHJcbi8vICAgICAgICAgICAgICAgICAgdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpIDEwMCVcclxuLy8gICk7XHJcbi8vfVxyXG5cclxuXHJcbiJdfQ== */");

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
/* harmony default export */ __webpack_exports__["default"] = (".wrapper {\n  --background: #25b7d3;\n  color: aliceblue; }\n\n.header-title {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  display: flex;\n  align-content: flex-start;\n  align-items: flex-start;\n  justify-content: flex-start;\n  color: black; }\n\n.img-frame {\n  position: absolute;\n  top: 0px;\n  left: 0px; }\n\n.inputs {\n  display: flex;\n  height: 100%;\n  align-content: center;\n  align-items: center;\n  justify-content: center; }\n\n.ion-input {\n  margin-top: 2%;\n  margin-bottom: 2%;\n  margin-left: 7%;\n  margin-right: 7%;\n  border-radius: 15px;\n  border: #25b7d3 solid 0.5px;\n  width: 100%; }\n\n.buttons-tool_bar {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  color: white; }\n\n.ion-button {\n  border-radius: 15px;\n  display: flex;\n  height: 50px;\n  justify-content: center;\n  align-items: center;\n  align-content: center;\n  margin-left: 10%;\n  width: 150px;\n  background: linear-gradient(145deg, #28c4e2, #21a5be);\n  box-shadow: 3px 3px 3px white,\r -3px -3px 3px white; }\n\n.sign-up {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  justify-content: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9sb2dpbi1zaWdudXAvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2xvZ2luLXNpZ251cC9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyRUE7RUFFRSxxQkFBYTtFQUNiLGdCQUFnQixFQUFBOztBQUlsQjtFQUNHLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsU0FBUztFQUNULGFBQWE7RUFDYix5QkFBeUI7RUFDekIsdUJBQXVCO0VBQ3ZCLDJCQUEyQjtFQUMzQixZQUFZLEVBQUE7O0FBRWY7RUFDRSxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLFNBQVMsRUFBQTs7QUFHWDtFQUNFLGFBQWE7RUFDYixZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQix1QkFBdUIsRUFBQTs7QUFFekI7RUFDRSxjQUFjO0VBQ2QsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsbUJBQWtCO0VBQ2xCLDJCQUEyQjtFQUMzQixXQUFXLEVBQUE7O0FBR2I7RUFDRSxhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsV0FBVztFQUNYLFlBQVksRUFBQTs7QUFHZDtFQUNFLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IsWUFBWTtFQUNaLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIscUJBQXFCO0VBQ3JCLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1oscURBQXFEO0VBQ3JELG1EQ2hGa0IsRUFBRTs7QUFFdEI7RURvRkUsYUFBYTtFQUNiLHFCQUFtQjtFQUNuQixtQkFBaUI7RUNsRmpCLHVCQUF1QixFQUFFIiwiZmlsZSI6InNyYy9hcHAvbG9naW4tc2lnbnVwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8uY292ZXIge1xyXG4vLyAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL2Fzc2V0cy9wYXRoLTYucG5nKTtcclxuLy8gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4vLyAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4vLyAgICBoZWlnaHQ6IDEwMCU7XHJcbi8vICAgICAgICAgIH1cclxuLy9cclxuLy9cclxuLy8gICAgIC5jbG92ZXIge1xyXG4vL1xyXG4vLyAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvYXNzZXRzL2Nsb3Zlci5wbmcpO1xyXG4vLyAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbi8vICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbi8vXHJcbi8vICAgIH1cclxuLy8gICAgLnNwYWNle1xyXG4vLyAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4vL1xyXG4vL1xyXG4vLyAgICB9XHJcbi8vICAgIC5mYXQtZnJlZSB7XHJcbi8vICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbi8vICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4vLyAgICAgIGZvbnQtZmFtaWx5OiBcIlRpbWVzIE5ldyBSb21hblwiLCBUaW1lcywgc2VyaWY7XHJcbi8vICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbi8vICAgICAgY29sb3I6ICMwYjBjMGI7XHJcbi8vICAgICAgZm9udC1zaXplOjQ1MDtcclxuLy8gICAgICBkaXNwbGF5OiBibG9jaztcclxuLy8gICAgfVxyXG4vL1xyXG4vLyAgLm1hcmdpblRvcHtcclxuLy9cclxuLy8gICAgICAgICAgbWFyZ2luLXRvcDogNyU7XHJcbi8vXHJcbi8vXHJcbi8vICAgIH1cclxuLy9cclxuLy8gICAgLmJ1dHRvbntcclxuLy8gICAgICBtYXJnaW46IDIlIDAlO1xyXG4vLyAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4vLyAgICAgIHdpZHRoOiA2NSU7XHJcbi8vICAgICAgZm9udC13ZWlnaHQ6IDEyJTtcclxuLy9cclxuLy8gICAgfVxyXG4vL1xyXG4vLyAgICAuY2VudHJpY3tcclxuLy8gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4vLyAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4vLyAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuLy8gICAgfVxyXG4vL1xyXG4vL2lvbi1pbnB1dCB7XHJcbi8vICBtYXJnaW46IDBweCA1MHB4O1xyXG4vLyAgZGlzcGxheTogYmxvY2s7XHJcbi8vICBmb250LXdlaWdodDogMTIlO1xyXG4vLyAgYm9yZGVyOiAgMXB4IHNvbGlkIHdoaXRlO1xyXG4vL31cclxuLy8ubXlCYWNrZ3JvdW5ke1xyXG4vLyAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgd2lkdGg6MTAwJTtcclxuLy8gIGhlaWdodDoxMDAlO1xyXG4vLyAgei1pbmRleDogOTk5O1xyXG4vLyAgZGlzcGxheTogZmxleDtcclxuLy8gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbi8vICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuLy8gIGJhY2tncm91bmQ6cmdiKDgwLCAxODUsIDE4Mik7XHJcbi8vXHJcbi8vICB9XHJcbi8vICAuYmFja3tcclxuLy8gICAgaGVpZ2h0OiAxMDAlO1xyXG4vLyAgICB3aWR0aDoyMCU7XHJcbi8vICAgIG1hcmdpbi10b3A6IDIlO1xyXG4vLyAgICBtYXJnaW4tbGVmdDogMiU7XHJcbi8vICB9XHJcblxyXG4ud3JhcHBlcntcclxuICAvL2JhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWFnZXMuanBnJyk7XHJcbiAgLS1iYWNrZ3JvdW5kOiAjMjViN2QzO1xyXG4gIGNvbG9yOiBhbGljZWJsdWU7XHJcbiAgLy9mb250LXNpemU6IDJlbTtcclxuXHJcbn1cclxuLmhlYWRlci10aXRsZXtcclxuICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICB0b3A6IDBweDtcclxuICAgbGVmdDogMHB4O1xyXG4gICBkaXNwbGF5OiBmbGV4O1xyXG4gICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICBjb2xvcjogYmxhY2s7XHJcbiB9XHJcbi5pbWctZnJhbWV7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMHB4O1xyXG4gIGxlZnQ6IDBweDtcclxuXHJcbn1cclxuLmlucHV0c3tcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG4uaW9uLWlucHV0e1xyXG4gIG1hcmdpbi10b3A6IDIlO1xyXG4gIG1hcmdpbi1ib3R0b206IDIlO1xyXG4gIG1hcmdpbi1sZWZ0OiA3JTtcclxuICBtYXJnaW4tcmlnaHQ6IDclO1xyXG4gIGJvcmRlci1yYWRpdXM6MTVweDtcclxuICBib3JkZXI6ICMyNWI3ZDMgc29saWQgMC41cHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcblxyXG59XHJcbi5idXR0b25zLXRvb2xfYmFye1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG5cclxufVxyXG4uaW9uLWJ1dHRvbiB7XHJcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGhlaWdodDogNTBweDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICBtYXJnaW4tbGVmdDogMTAlO1xyXG4gIHdpZHRoOiAxNTBweDtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTQ1ZGVnLCAjMjhjNGUyLCAjMjFhNWJlKTtcclxuICBib3gtc2hhZG93OiAgM3B4IDNweCAzcHggd2hpdGUsXHJcbiAgLTNweCAtM3B4IDNweCB3aGl0ZTtcclxufVxyXG5cclxuLnNpZ24tdXB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuIiwiLndyYXBwZXIge1xuICAtLWJhY2tncm91bmQ6ICMyNWI3ZDM7XG4gIGNvbG9yOiBhbGljZWJsdWU7IH1cblxuLmhlYWRlci10aXRsZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwcHg7XG4gIGxlZnQ6IDBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgY29sb3I6IGJsYWNrOyB9XG5cbi5pbWctZnJhbWUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMHB4O1xuICBsZWZ0OiAwcHg7IH1cblxuLmlucHV0cyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogMTAwJTtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxuXG4uaW9uLWlucHV0IHtcbiAgbWFyZ2luLXRvcDogMiU7XG4gIG1hcmdpbi1ib3R0b206IDIlO1xuICBtYXJnaW4tbGVmdDogNyU7XG4gIG1hcmdpbi1yaWdodDogNyU7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIGJvcmRlcjogIzI1YjdkMyBzb2xpZCAwLjVweDtcbiAgd2lkdGg6IDEwMCU7IH1cblxuLmJ1dHRvbnMtdG9vbF9iYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbiAgY29sb3I6IHdoaXRlOyB9XG5cbi5pb24tYnV0dG9uIHtcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogMTAlO1xuICB3aWR0aDogMTUwcHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxNDVkZWcsICMyOGM0ZTIsICMyMWE1YmUpO1xuICBib3gtc2hhZG93OiAzcHggM3B4IDNweCB3aGl0ZSxcciAtM3B4IC0zcHggM3B4IHdoaXRlOyB9XG5cbi5zaWduLXVwIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxuIl19 */");

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