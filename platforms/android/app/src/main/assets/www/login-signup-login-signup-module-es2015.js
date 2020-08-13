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
/* harmony default export */ __webpack_exports__["default"] = ("<!--<ion-content>-->\n<!--<div *ngIf=\"showSplash\" class=\"myBackground\">-->\n<!--    <div>-->\n<!--    <img src=\"/assets/giphy.gif\">-->\n<!--</div> -->\n<!--</div> -->\n<!--<div *ngIf=\"!showSplash\">-->\n<!--  <ion-grid >-->\n<!--    <ion-row>-->\n<!--      <ion-col>-->\n<!--           -->\n<!--  -->\n<!--               <ion-button  (click)= \"backClick()\" color=\"light\" shape =\"round\" >-->\n<!--                 <ion-icon name=\"arrow-round-back\"></ion-icon>-->\n<!--               </ion-button>       -->\n<!--            -->\n\n<!--      </ion-col>-->\n<!--      <ion-col >-->\n<!--        <h1 style=\"height: 80px;\"></h1> -->\n<!--        <img class = \"space\" src=\"/assets/logo02.png\"/>-->\n<!--        <h1 class=\"fat-free\">Log In</h1>-->\n<!--        -->\n<!--      </ion-col>-->\n<!--        <ion-col >-->\n<!--            <img src=\"/assets/path-6.png\"/>-->\n<!--        </ion-col>-->\n\n<!--    </ion-row>-->\n<!--    -->\n<!--  -->\n<!--  </ion-grid>-->\n\n<!--        <div class=\"marginTop\">-->\n<!--        -->\n\n\n<!--       -->\n<!--          <div class=\"centric\">-->\n<!--              <ion-card>-->\n<!--                <ion-item>-->\n<!--                    <ion-input required placeholder=\"Enter Phone Number\" type=\"email\" #EmailInput></ion-input>-->\n<!--                  </ion-item>-->\n<!--                </ion-card>-->\n<!--           -->\n<!--            </div>-->\n<!--          <div class=\"centric\">-->\n<!--            <ion-card>-->\n<!--              <ion-item>-->\n<!-- -->\n<!--                  <ion-input required placeholder=\"Enter Password\" type=\"password\" #PasswordInput></ion-input>-->\n<!--                </ion-item>-->\n<!--              </ion-card>-->\n<!--          </div>-->\n<!--       -->\n<!--        </div>-->\n<!--         -->\n\n<!--   <div class=\"marginTop centric\"> <ion-button style=\"height: 40px; \"class=\"marginTop button\"  shape=\"round\" (click)=\"login(EmailInput.value, PasswordInput.value)\" color=\"light\">Log In</ion-button></div>      -->\n<!--</div>-->\n<!--</ion-content>-->\n\n\n\n<!--<div *ngIf=\"showSplash\" class=\"myBackground\">-->\n<!--    <div>-->\n<!--    <img src=\"/assets/giphy.gif\">-->\n<!--</div>-->\n<!--</div>-->\n\n\n\n<ion-header no-border >\n\n<ion-toolbar class=\"wrapper\">\n\n  <ion-title style=\"font-size: 20px; margin: 5%\">Hello</ion-title>\n    <ion-title style=\"font-size: 30px; margin: 5%\">Sign In ! </ion-title>\n</ion-toolbar>\n\n\n</ion-header>\n<ion-content>\n\n    <ion-grid>\n        <ion-row class=\"inputs\">\n\n            <ion-item class=\"ion-input\">\n                <ion-label position=\"floating\">Mobile Number</ion-label>\n                <ion-input required placeholder=\"Enter Phone Number\" type=\"email\" #EmailInput></ion-input>\n            </ion-item>\n            <ion-item class=\"ion-input\">\n                <ion-label position=\"floating\">Password</ion-label>\n                <ion-input required placeholder=\"Enter Password\" type=\"password\" #PasswordInput></ion-input>\n            </ion-item>\n        </ion-row>\n        <ion-row  >\n            <ion-toolbar >\n                <div class=\"buttons-tool_bar\">\n                    <ion-buttons >\n                        <ion-button class=\"ion-button\" (click)=\"login(EmailInput.value, PasswordInput.value)\" > Sign-In </ion-button>\n\n                    </ion-buttons>\n                </div>\n                <div class=\"sign-up\">\n                    <p>Don't Have an Account? <a (click)=\"SignUp()\">Sign-Up</a></p>\n                </div>\n\n            </ion-toolbar>\n\n        </ion-row>\n    </ion-grid>\n\n</ion-content>\n\n");

/***/ }),

/***/ "./src/app/login-signup/cover/cover.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/login-signup/cover/cover.component.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":root {\n  --ion-color-primary: #3880ff;\n  --ion-color-primary-rgb: 56, 128, 255;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #3171e0;\n  --ion-color-primary-tint: #4c8dff; }\n\n@font-face {\n  font-family: Poppins-Medium;\n  src: url(/assets/fonts/fonts/poppins/Poppins-Medium.ttf); }\n\n.cover {\n  background: #02aab0;\n  background: linear-gradient(#02aab0 30%, #06beb6 50%, #00cdac 72%);\n  background-position: center;\n  background-repeat: no-repeat;\n  height: 100%; }\n\n.grid {\n  display: grid;\n  grid-template-rows: 1fr 2fr 1fr;\n  grid-gap: 10px; }\n\n.button {\n  margin: 2% 0%;\n  display: block;\n  width: 80%;\n  font-weight: normal;\n  font-family: Poppins-Medium;\n  font-size: 18px;\n  height: 45px; }\n\n.btnDiv {\n  display: flex;\n  justify-content: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2hhYmliYS9HUC9uZXcvR3JhZHVhdGlvbi1Qcm9qZWN0LURvY3Rvci9zcmMvYXBwL2xvZ2luLXNpZ251cC9jb3Zlci9jb3Zlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDRCQUFvQjtFQUNwQixxQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCLEVBQUE7O0FBRTNCO0VBQ0UsMkJBQTJCO0VBQzNCLHdEQUF3RCxFQUFBOztBQUsxRDtFQU9FLG1CQUEwQjtFQUMxQixrRUFBZ0c7RUFDaEcsMkJBQTJCO0VBQzNCLDRCQUE0QjtFQUM1QixZQUFZLEVBQUE7O0FBSWQ7RUFDRSxhQUFZO0VBQ1osK0JBQWlDO0VBQ2pDLGNBQWEsRUFBQTs7QUFLZjtFQUNFLGFBQWE7RUFDYixjQUFjO0VBQ2QsVUFBVTtFQUNWLG1CQUFtQjtFQUNuQiwyQkFBMkI7RUFDM0IsZUFBZTtFQUNmLFlBQVksRUFBQTs7QUFJZDtFQUNFLGFBQWE7RUFDYix1QkFBdUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2xvZ2luLXNpZ251cC9jb3Zlci9jb3Zlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpyb290IHtcbiAgLS1pb24tY29sb3ItcHJpbWFyeTogIzM4ODBmZjtcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDU2LCAxMjgsIDI1NTtcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XG4gIC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGU6ICMzMTcxZTA7XG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzRjOGRmZjtcbn1cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogUG9wcGlucy1NZWRpdW07XG4gIHNyYzogdXJsKC9hc3NldHMvZm9udHMvZm9udHMvcG9wcGlucy9Qb3BwaW5zLU1lZGl1bS50dGYpO1xufVxuXG5cbi8vYmFja2dyb3VuZFxuLmNvdmVyIHtcbiAgLy9iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQocmdiYSg4MSwxODQsMjA3LDEpIDU1JSwgIzRjYjhjNCA4MCUpO1xuICAvL2JhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCggIzRmYmNlYiwjNTFlNmU4KTtcbiAgLy9iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoIzdmZGRlZiAxNiUsICM4ZGU1ZDMgODAlKTtcbiAgLy9ibHVlIG9uZVxuICAvL2JhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChyZ2JhKDAsMTk0LDIwNiwxKSAyMiUsIHJnYmEoMzIsMTUwLDIxNCwxKSA4MCUpO1xuICAvLyBibHVlIGFuZCBncmVlbiBvbmVcbiAgYmFja2dyb3VuZDogcmdiKDIsMTcwLDE3Nik7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChyZ2JhKDIsMTcwLDE3NiwxKSAzMCUsIHJnYmEoNiwxOTAsMTgyLDEpIDUwJSwgcmdiYSgwLDIwNSwxNzIsMSkgNzIlKTtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi8vdG8gY29udHJvbCByb3dzIGhlaWdodFxuLmdyaWQge1xuICBkaXNwbGF5OmdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogIDFmciAyZnIgMWZyIDtcbiAgZ3JpZC1nYXA6MTBweDtcbiAgLy9oZWlnaHQ6IGNhbGMoMTAwdmggLSAxMHB4KTtcbn1cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy9idXR0b25cbi5idXR0b257XG4gIG1hcmdpbjogMiUgMCU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogODAlO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LWZhbWlseTogUG9wcGlucy1NZWRpdW07XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgaGVpZ2h0OiA0NXB4O1xuXG59XG5cbi5idG5EaXZ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4vL3RvIGFwcGx5IGdyYWRpZW50IGNvbG9yIG9uIGJ0blxuLy9cbi8vLmJ0bl9jb2xvcntcbi8vICAtLWJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcbi8vICAgICAgICAgICAgICAgICAgdG8gYm90dG9tLFxuLy8gICAgICAgICAgICAgICAgICB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSkgMzAlLFxuLy8gICAgICAgICAgICAgICAgICB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCkgMTAwJVxuLy8gICk7XG4vL31cblxuXG4iXX0= */");

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
/* harmony default export */ __webpack_exports__["default"] = (".wrapper {\n  --background: #25b7d3;\n  color: aliceblue; }\n\n.header-title {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  display: flex;\n  align-content: flex-start;\n  align-items: flex-start;\n  justify-content: flex-start;\n  color: black; }\n\n.img-frame {\n  position: absolute;\n  top: 0px;\n  left: 0px; }\n\n.inputs {\n  display: flex;\n  height: 100%;\n  align-content: center;\n  align-items: center;\n  justify-content: center; }\n\n.ion-input {\n  margin-top: 2%;\n  margin-bottom: 2%;\n  margin-left: 7%;\n  margin-right: 7%;\n  border-radius: 15px;\n  border: #25b7d3 solid 0.5px;\n  width: 100%; }\n\n.buttons-tool_bar {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  color: white; }\n\n.ion-button {\n  border-radius: 15px;\n  display: flex;\n  height: 50px;\n  justify-content: center;\n  align-items: center;\n  align-content: center;\n  margin-left: 10%;\n  width: 150px;\n  background: linear-gradient(145deg, #28c4e2, #21a5be);\n  box-shadow: 3px 3px 3px white, -3px -3px 3px white; }\n\n.sign-up {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  justify-content: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2hhYmliYS9HUC9uZXcvR3JhZHVhdGlvbi1Qcm9qZWN0LURvY3Rvci9zcmMvYXBwL2xvZ2luLXNpZ251cC9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyRUE7RUFFRSxxQkFBYTtFQUNiLGdCQUFnQixFQUFBOztBQUlsQjtFQUNHLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsU0FBUztFQUNULGFBQWE7RUFDYix5QkFBeUI7RUFDekIsdUJBQXVCO0VBQ3ZCLDJCQUEyQjtFQUMzQixZQUFZLEVBQUE7O0FBRWY7RUFDRSxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLFNBQVMsRUFBQTs7QUFHWDtFQUNFLGFBQWE7RUFDYixZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQix1QkFBdUIsRUFBQTs7QUFFekI7RUFDRSxjQUFjO0VBQ2QsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsbUJBQWtCO0VBQ2xCLDJCQUEyQjtFQUMzQixXQUFXLEVBQUE7O0FBR2I7RUFDRSxhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsV0FBVztFQUNYLFlBQVksRUFBQTs7QUFHZDtFQUNFLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IsWUFBWTtFQUNaLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIscUJBQXFCO0VBQ3JCLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1oscURBQXFEO0VBQ3JELGtEQUNtQixFQUFBOztBQUdyQjtFQUNFLGFBQWE7RUFDYixxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLHVCQUF1QixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbG9naW4tc2lnbnVwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8uY292ZXIge1xuLy8gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9hc3NldHMvcGF0aC02LnBuZyk7XG4vLyAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4vLyAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuLy8gICAgaGVpZ2h0OiAxMDAlO1xuLy8gICAgICAgICAgfVxuLy9cbi8vXG4vLyAgICAgLmNsb3ZlciB7XG4vL1xuLy8gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL2Fzc2V0cy9jbG92ZXIucG5nKTtcbi8vICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbi8vICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4vL1xuLy8gICAgfVxuLy8gICAgLnNwYWNle1xuLy8gICAgICBkaXNwbGF5OiBibG9jaztcbi8vXG4vL1xuLy8gICAgfVxuLy8gICAgLmZhdC1mcmVlIHtcbi8vICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4vLyAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbi8vICAgICAgZm9udC1mYW1pbHk6IFwiVGltZXMgTmV3IFJvbWFuXCIsIFRpbWVzLCBzZXJpZjtcbi8vICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4vLyAgICAgIGNvbG9yOiAjMGIwYzBiO1xuLy8gICAgICBmb250LXNpemU6NDUwO1xuLy8gICAgICBkaXNwbGF5OiBibG9jaztcbi8vICAgIH1cbi8vXG4vLyAgLm1hcmdpblRvcHtcbi8vXG4vLyAgICAgICAgICBtYXJnaW4tdG9wOiA3JTtcbi8vXG4vL1xuLy8gICAgfVxuLy9cbi8vICAgIC5idXR0b257XG4vLyAgICAgIG1hcmdpbjogMiUgMCU7XG4vLyAgICAgIGRpc3BsYXk6IGJsb2NrO1xuLy8gICAgICB3aWR0aDogNjUlO1xuLy8gICAgICBmb250LXdlaWdodDogMTIlO1xuLy9cbi8vICAgIH1cbi8vXG4vLyAgICAuY2VudHJpY3tcbi8vICAgICAgZGlzcGxheTogZmxleDtcbi8vICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4vLyAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbi8vICAgIH1cbi8vXG4vL2lvbi1pbnB1dCB7XG4vLyAgbWFyZ2luOiAwcHggNTBweDtcbi8vICBkaXNwbGF5OiBibG9jaztcbi8vICBmb250LXdlaWdodDogMTIlO1xuLy8gIGJvcmRlcjogIDFweCBzb2xpZCB3aGl0ZTtcbi8vfVxuLy8ubXlCYWNrZ3JvdW5ke1xuLy8gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbi8vICB3aWR0aDoxMDAlO1xuLy8gIGhlaWdodDoxMDAlO1xuLy8gIHotaW5kZXg6IDk5OTtcbi8vICBkaXNwbGF5OiBmbGV4O1xuLy8gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4vLyAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4vLyAgYmFja2dyb3VuZDpyZ2IoODAsIDE4NSwgMTgyKTtcbi8vXG4vLyAgfVxuLy8gIC5iYWNre1xuLy8gICAgaGVpZ2h0OiAxMDAlO1xuLy8gICAgd2lkdGg6MjAlO1xuLy8gICAgbWFyZ2luLXRvcDogMiU7XG4vLyAgICBtYXJnaW4tbGVmdDogMiU7XG4vLyAgfVxuXG4ud3JhcHBlcntcbiAgLy9iYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1hZ2VzLmpwZycpO1xuICAtLWJhY2tncm91bmQ6ICMyNWI3ZDM7XG4gIGNvbG9yOiBhbGljZWJsdWU7XG4gIC8vZm9udC1zaXplOiAyZW07XG5cbn1cbi5oZWFkZXItdGl0bGV7XG4gICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICB0b3A6IDBweDtcbiAgIGxlZnQ6IDBweDtcbiAgIGRpc3BsYXk6IGZsZXg7XG4gICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICBjb2xvcjogYmxhY2s7XG4gfVxuLmltZy1mcmFtZXtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDBweDtcbiAgbGVmdDogMHB4O1xuXG59XG4uaW5wdXRze1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDEwMCU7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG4uaW9uLWlucHV0e1xuICBtYXJnaW4tdG9wOiAyJTtcbiAgbWFyZ2luLWJvdHRvbTogMiU7XG4gIG1hcmdpbi1sZWZ0OiA3JTtcbiAgbWFyZ2luLXJpZ2h0OiA3JTtcbiAgYm9yZGVyLXJhZGl1czoxNXB4O1xuICBib3JkZXI6ICMyNWI3ZDMgc29saWQgMC41cHg7XG4gIHdpZHRoOiAxMDAlO1xuXG59XG4uYnV0dG9ucy10b29sX2JhcntcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIGNvbG9yOiB3aGl0ZTtcblxufVxuLmlvbi1idXR0b24ge1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDUwcHg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbi1sZWZ0OiAxMCU7XG4gIHdpZHRoOiAxNTBweDtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE0NWRlZywgIzI4YzRlMiwgIzIxYTViZSk7XG4gIGJveC1zaGFkb3c6ICAzcHggM3B4IDNweCB3aGl0ZSxcbiAgLTNweCAtM3B4IDNweCB3aGl0ZTtcbn1cblxuLnNpZ24tdXB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbiJdfQ== */");

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