(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./node_modules/ngx-autosize/fesm2015/ngx-autosize.js":
/*!************************************************************!*\
  !*** ./node_modules/ngx-autosize/fesm2015/ngx-autosize.js ***!
  \************************************************************/
/*! exports provided: AutosizeDirective, AutosizeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutosizeDirective", function() { return AutosizeDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutosizeModule", function() { return AutosizeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MAX_LOOKUP_RETRIES = 3;
class AutosizeDirective {
    /**
     * @param {?} element
     * @param {?} _zone
     */
    constructor(element, _zone) {
        this.element = element;
        this._zone = _zone;
        this.onlyGrow = false;
        this.useImportant = false;
        this.retries = 0;
        this._destroyed = false;
        if (this.element.nativeElement.tagName !== 'TEXTAREA') {
            this._findNestedTextArea();
        }
        else {
            this.textAreaEl = this.element.nativeElement;
            this.textAreaEl.style.overflow = 'hidden';
            this._onTextAreaFound();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set minRows(value) {
        this._minRows = value;
        if (this.textAreaEl) {
            this.textAreaEl.rows = value;
        }
    }
    ;
    /**
     * @param {?} textArea
     * @return {?}
     */
    onInput(textArea) {
        this.adjust();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyed = true;
        if (this._windowResizeHandler) {
            window.removeEventListener('resize', this._windowResizeHandler, false);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this.adjust();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.adjust(true);
    }
    /**
     * @return {?}
     */
    _findNestedTextArea() {
        this.textAreaEl = this.element.nativeElement.querySelector('TEXTAREA');
        if (!this.textAreaEl && this.element.nativeElement.shadowRoot) {
            this.textAreaEl = this.element.nativeElement.shadowRoot.querySelector('TEXTAREA');
        }
        if (!this.textAreaEl) {
            if (this.retries >= MAX_LOOKUP_RETRIES) {
                console.warn('ngx-autosize: textarea not found');
            }
            else {
                this.retries++;
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this._findNestedTextArea();
                }), 100);
            }
            return;
        }
        this.textAreaEl.style.overflow = 'hidden';
        this._onTextAreaFound();
    }
    /**
     * @return {?}
     */
    _onTextAreaFound() {
        this._addWindowResizeHandler();
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.adjust();
        }));
    }
    /**
     * @return {?}
     */
    _addWindowResizeHandler() {
        this._windowResizeHandler = Debounce((/**
         * @return {?}
         */
        () => {
            this._zone.run((/**
             * @return {?}
             */
            () => {
                this.adjust();
            }));
        }), 200);
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            window.addEventListener('resize', this._windowResizeHandler, false);
        }));
    }
    /**
     * @param {?=} inputsChanged
     * @return {?}
     */
    adjust(inputsChanged = false) {
        if (!this._destroyed && this.textAreaEl) {
            /** @type {?} */
            const currentText = this.textAreaEl.value;
            if (inputsChanged === false &&
                currentText === this._oldContent &&
                this.textAreaEl.offsetWidth === this._oldWidth) {
                return;
            }
            this._oldContent = currentText;
            this._oldWidth = this.textAreaEl.offsetWidth;
            /** @type {?} */
            const clone = this.textAreaEl.cloneNode(true);
            /** @type {?} */
            const parent = this.textAreaEl.parentNode;
            clone.style.width = this.textAreaEl.offsetWidth + 'px';
            clone.style.visibility = 'hidden';
            clone.style.position = 'absolute';
            clone.textContent = currentText;
            parent.appendChild(clone);
            clone.style.overflow = 'auto';
            clone.style.height = 'auto';
            /** @type {?} */
            let height = clone.scrollHeight;
            // add into height top and bottom borders' width
            /** @type {?} */
            let computedStyle = window.getComputedStyle(clone, null);
            height += parseInt(computedStyle.getPropertyValue('border-top-width'));
            height += parseInt(computedStyle.getPropertyValue('border-bottom-width'));
            /** @type {?} */
            const oldHeight = this.textAreaEl.offsetHeight;
            /** @type {?} */
            const willGrow = height > oldHeight;
            if (this.onlyGrow === false || willGrow) {
                /** @type {?} */
                const lineHeight = this._getLineHeight();
                /** @type {?} */
                const rowsCount = height / lineHeight;
                if (this._minRows && this._minRows >= rowsCount) {
                    height = this._minRows * lineHeight;
                }
                else if (this.maxRows && this.maxRows <= rowsCount) {
                    // never shrink the textarea if onlyGrow is true
                    /** @type {?} */
                    const maxHeight = this.maxRows * lineHeight;
                    height = this.onlyGrow ? Math.max(maxHeight, oldHeight) : maxHeight;
                    this.textAreaEl.style.overflow = 'auto';
                }
                else {
                    this.textAreaEl.style.overflow = 'hidden';
                }
                /** @type {?} */
                let heightStyle = height + 'px';
                heightStyle += this.useImportant ? ' !important' : '';
                this.textAreaEl.style.height = heightStyle;
            }
            parent.removeChild(clone);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _getLineHeight() {
        /** @type {?} */
        let lineHeight = parseInt(this.textAreaEl.style.lineHeight, 10);
        if (isNaN(lineHeight) && window.getComputedStyle) {
            /** @type {?} */
            const styles = window.getComputedStyle(this.textAreaEl);
            lineHeight = parseInt(styles.lineHeight, 10);
        }
        if (isNaN(lineHeight)) {
            /** @type {?} */
            const fontSize = window.getComputedStyle(this.textAreaEl, null).getPropertyValue('font-size');
            lineHeight = Math.floor(parseInt(fontSize.replace('px', ''), 10) * 1.5);
        }
        return lineHeight;
    }
}
AutosizeDirective.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                selector: '[autosize]'
            },] }
];
/** @nocollapse */
AutosizeDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }
];
AutosizeDirective.propDecorators = {
    minRows: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    maxRows: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    onlyGrow: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    useImportant: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    onInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['input', ['$event.target'],] }]
};
if (false) {}
/**
 * @param {?} func
 * @param {?} wait
 * @param {?=} immediate
 * @return {?}
 */
function Debounce(func, wait, immediate = false) {
    /** @type {?} */
    let timeout;
    return (/**
     * @return {?}
     */
    function () {
        /** @type {?} */
        const context = this;
        /** @type {?} */
        const args = arguments;
        /** @type {?} */
        const later = (/**
         * @return {?}
         */
        function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        });
        /** @type {?} */
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AutosizeModule {
}
AutosizeModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                declarations: [AutosizeDirective],
                imports: [],
                exports: [AutosizeDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */


//# sourceMappingURL=ngx-autosize.js.map


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/chat/chat.component.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/chat/chat.component.html ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content [scrollEvents]=\"true\" class=\"cont\">\r\n\r\n  <ion-grid>\r\n     <ion-row >\r\n        <ion-toolbar class=\"tool\" align-items-center> \r\n           {{patName}}\r\n         <ion-buttons slot=\"start\">\r\n            <ion-back-button defaultHref=\"home\" (click)=\"goConv()\"></ion-back-button>\r\n         </ion-buttons>\r\n        </ion-toolbar>\r\n     </ion-row>\r\n\r\n\r\n     <ion-row *ngFor=\"let newMsgs of newMessages\">\r\n         <ion-col offset=\"3\" size=\"9\" *ngIf=\"newMsgs.sender_id===dId \">\r\n         <div  class=\"speech-bubble\">\r\n           \r\n          \r\n          <p class =\"Cspace\">{{newMsgs.msg_body}}</p><br>\r\n          <div class=\"time\" text-right>\r\n            {{newMsgs.created_date}}\r\n          </div>\r\n         </div>\r\n         </ion-col>\r\n         <ion-col  size=\"9\" *ngIf=\"newMsgs.sender_id!==dId \">\r\n          <div color=\"sub.severityLevel\" class=\"speech-bubbleR\">\r\n          \r\n          <p class =\"Cspace\">{{newMsgs.msg_body}}</p><br>\r\n          <div class=\"time\" text-right>\r\n            {{newMsgs.created_date}}\r\n          </div>\r\n         </div>\r\n         </ion-col>\r\n    \r\n     </ion-row>\r\n\r\n  </ion-grid>\r\n</ion-content>\r\n<ion-footer>\r\n <ion-toolbar>\r\n     <ion-row  align-items-center no-padding no-margin>\r\n       <ion-col size=\"10\">\r\n         <ion-item>\r\n            <ion-textarea  [(ngModel)]=\"replyContent\" placeholder=\"Type your Message here...\"  cols =\"8\" rows=\"2\" class=\"typing\"></ion-textarea>\r\n         </ion-item>\r\n       </ion-col>\r\n       <ion-col size=\"2\">\r\n         <ion-button class=\"btn\" color=\"sub.severityLevel\"  [disabled]=\"replyContent===''\" (click)=\"sendReplyFun()\">\r\n            <ion-icon name=\"paper-plane\" ></ion-icon>\r\n         </ion-button>\r\n       </ion-col>\r\n     </ion-row>\r\n </ion-toolbar>\r\n</ion-footer>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/conv-list/conv-list.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/conv-list/conv-list.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content [scrollEvents]=\"true\" >\r\n<ion-grid >\r\n<ion-row>\r\n<ion-col size=\"12\">\r\n<ion-grid>\r\n<ion-row *ngFor=\"let account of convList\" class=\"img-holder\" (click)=\"reply(account)\">\r\n<ion-col size=\"3\">\r\n<div>\r\n<img  class=\"small-icon\" src=\"assets/doctor1.jpeg\">\r\n</div>\r\n</ion-col>\r\n<ion-col size=\"9\">\r\n<ion-grid >\r\n<ion-row >\r\n\r\n<article>\r\n <h4>{{ account.sender_name}}</h4>\r\n\r\n        <h5  [ngClass]=\"{'read' : !account.is_readed}\">{{account.msg_subject}}</h5>\r\n\r\n</article>\r\n\r\n       \r\n\r\n</ion-row>\r\n<ion-row >\r\n<ion-col size=\"12\">\r\n<div class=\"msg_holder\">\r\n<p class=\"msg\" > {{account.msg_body}} </p>\r\n</div>\r\n</ion-col>\r\n</ion-row>\r\n<ion-row>\r\n<ion-col size=\"3\"></ion-col>\r\n<ion-col size=\"9\">\r\n<p>   {{account.created_date}}</p>\r\n</ion-col>\r\n</ion-row>\r\n</ion-grid>\r\n\r\n\r\n</ion-col>\r\n\r\n\r\n</ion-row>\r\n</ion-grid>\r\n\r\n\r\n</ion-col>\r\n\r\n</ion-row>\r\n</ion-grid>\r\n            <ion-infinite-scroll  (ionInfinite)=\"loadData($event)\">\r\n            <ion-infinite-scroll-content\r\n                                loadingSpinner=\"bubbles\"\r\n                                loadingText=\"Loading more data...\">\r\n              </ion-infinite-scroll-content>\r\n              </ion-infinite-scroll>\r\n<ion-content>              ");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/conversations/conversations.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/conversations/conversations.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n            <ion-header >\r\n            <ion-toolbar class=\"header\">\r\n                \r\n                <ion-buttons slot=\"end\">\r\n                \r\n                 <ion-button (click)=\"CreateNew()\">\r\n                  <ion-col class=\"Floating-icon\" (click)=\"CreateNew()\">\r\n                    <ion-icon name=\"create\" size=\"large\"  ></ion-icon>\r\n                                   </ion-col>\r\n                                    Create new\r\n                               </ion-button>\r\n                              \r\n                \r\n                   \r\n               \r\n                  \r\n                </ion-buttons>\r\n                \r\n                \r\n            </ion-toolbar>\r\n            <ion-toolbar>\r\n                <ion-grid>\r\n                        <ion-row>\r\n                             <ion-col size=\"8\">\r\n                                       <ion-title>My Consultations</ion-title>\r\n                                  </ion-col>\r\n                             <ion-col size=\"4\">\r\n                                       <img class=\"vital\" src=\"assets/vitals_n.png\" class=\"Floating-icon\">\r\n                                 </ion-col>     \r\n                            </ion-row>\r\n                         </ion-grid>\r\n\r\n               </ion-toolbar>\r\n\r\n            <ion-toolbar>\r\n            <ion-grid>\r\n                <ion-row>\r\n                    <ion-col size=\"6\" class=\"middle-text\">\r\n                            <ion-title (click)=\"inbox()\">Inbox</ion-title>\r\n\r\n                           </ion-col>\r\n                    <ion-col size=\"6\" class=\"middle-text\">\r\n                            <ion-title (click)=\"sent()\">Sent</ion-title>\r\n\r\n                           </ion-col>\r\n                    </ion-row>\r\n              </ion-grid>\r\n               \r\n            </ion-toolbar>\r\n            </ion-header>\r\n  \r\n <ion-content>\r\n  <ion-app>    \r\n\r\n  <ion-router-outlet></ion-router-outlet>  \r\n\r\n                </ion-app>\r\n                    </ion-content>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/fab/fab.component.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/fab/fab.component.html ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<ion-fab vertical=\"bottom\" horizontal=\"end\" edge slot=\"fixed\" class=\"outer\"  > \r\n    <ion-fab-button color =\"Medium\">\r\n        <ion-icon name=\"menu\" ></ion-icon> \r\n       \r\n    </ion-fab-button>\r\n    <ion-fab-list side=\"start\" >\r\n    <ion-fab-button (click)=\"vitalClick()\"><ion-icon name=\"fitness\"></ion-icon></ion-fab-button>\r\n    <ion-fab-button (click)=\"homeClick()\"><ion-icon name=\"person\"></ion-icon></ion-fab-button>\r\n    <ion-fab-button (click)=\"dlistClick()\"><ion-icon name=\"medkit\"></ion-icon></ion-fab-button>\r\n    <ion-fab-button (click)=\"tlistClick()\"><ion-icon name=\"body\"></ion-icon></ion-fab-button>\r\n    <ion-fab-button (click)=\"outClick()\"><ion-icon name=\"power\"></ion-icon></ion-fab-button>\r\n    </ion-fab-list>\r\n  </ion-fab>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n<div *ngIf=\"showSplash\" class=\"myBackground\">\r\n    <div>\r\n    <img src=\"/assets/giphy.gif\">\r\n</div> \r\n</div> \r\n  <ion-grid class=\"background\">\r\n    <ion-row>\r\n      <ion-col >\r\n\r\n            <!-- <img class =\"icon\"src=\"assets/talin.png\" > -->\r\n  \r\n            <div class=\"center\">\r\n\r\n              <ion-avatar class=\"avat\" >\r\n                  <img src=\"assets/talin.png\" (click)=\"NavigateMe('home/Myprofile')\">\r\n             </ion-avatar>\r\n            </div>\r\n            <h1 class=\"middle-text user-name\">{{datastream.doctor.name}}</h1>\r\n  \r\n              \r\n      </ion-col>\r\n\r\n    </ion-row>\r\n  </ion-grid >\r\n  <ion-row class=\"main-card\">\r\n    <ion-grid>\r\n      <ion-row>\r\n          <ion-col col-6 >\r\n              <div class=\"mini-card\" (click)=\"NavigateMe('home/doctorList')\" >\r\n                <div class=\"center\" >\r\n                    <img class=\"icon\" src=\"assets/vitals2.png\">\r\n\r\n                </div>\r\n                \r\n                <div class=\"middle-text\">\r\n                  Patient List\r\n                </div>\r\n\r\n                  \r\n              </div>\r\n            </ion-col>\r\n            <ion-col col-6 >\r\n              <div  class=\"mini-card\" (click)=\"addPatient()\">\r\n                  <div class=\"center\" >\r\n                      <img class=\"icon\" src=\"assets/addDoc.jpeg\">\r\n  \r\n                  </div>\r\n                  \r\n                  <div class=\"middle-text\">\r\n                     Add Patient\r\n                  </div>\r\n              </div>\r\n            </ion-col>\r\n      </ion-row>\r\n      <ion-row>\r\n          <ion-col col-6 >\r\n              <div class=\"mini-card\" (click)=\"NavigateMe('home/conversation')\">\r\n                  <div class=\"center\" >\r\n                      <img class=\"icon\" src=\"assets/message.png\">\r\n  \r\n                  </div>\r\n                  \r\n                  <div class=\"middle-text\">\r\n                     Conversations\r\n                  </div>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col col-6 >\r\n              <div  class=\"mini-card\" (click)=\"newMessage(NavigateMe('home/message'))\" >\r\n                  <div class=\"center\" >\r\n                      <img class=\"icon\" src=\"assets/message.png\">\r\n  \r\n                  </div>\r\n                  \r\n                  <div class=\"middle-text\">\r\n                     New Message\r\n                  </div>\r\n              </div>\r\n            </ion-col>\r\n\r\n      </ion-row>\r\n      \r\n    </ion-grid>\r\n  </ion-row>\r\n\r\n   <app-fab></app-fab>\r\n\r\n\r\n\r\n</ion-content>\r\n<!-- <ion-content>\r\n  <ion-grid>\r\n    <ion-row>\r\n          \r\n              <app-tab>\r\n          \r\n              </app-tab>\r\n            \r\n     \r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-content> -->\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/message/message.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/message/message.component.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content >\r\n <ion-grid class= \"cont\" >\r\n  <ion-row>\r\n       <ion-toolbar align-items-center>   \r\n        Send A New Message to: {{Reciever_from_pat_list}}\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"home\"></ion-back-button>\r\n    </ion-buttons>\r\n    \r\n      </ion-toolbar>\r\n    \r\n   </ion-row>\r\n    <ion-row > \r\n     <ion-col size=\"10\">\r\n     <ion-item>\r\n      <ion-input [(ngModel)]=\"Subject_from_input\" placeholder=\"Type your Subject here...\" class=\"sub\"> </ion-input>\r\n      </ion-item>\r\n     </ion-col>\r\n     </ion-row>\r\n\r\n     <ion-row>\r\n       <ion-col size =\"12\">\r\n          \r\n        <div class=\"loader\">\r\n           <div > \r\n               <img src=\"assets/chat.png\" >\r\n\r\n           </div>\r\n               \r\n        </div>\r\n    \r\n       </ion-col>\r\n     </ion-row>\r\n     \r\n   \r\n   <ion-row class=\"spaces\" align-items-center no-padding no-margin>\r\n     <ion-col size=\"10\">\r\n        <ion-item>\r\n            <ion-textarea [(ngModel)]=\"Content_from_text_area\" placeholder=\"Type your Message here...\"  cols =\"8\" rows=\"2\" class=\"typing\"></ion-textarea>\r\n        </ion-item>\r\n     </ion-col>\r\n     <ion-col size=\"2\">\r\n     <ion-button class=\"btn\" color=\"sub.severityLevel\" (click)=\"send()\">\r\n        <ion-icon name=\"paper-plane\" ></ion-icon>\r\n        </ion-button>\r\n     </ion-col>\r\n   </ion-row>\r\n\r\n  </ion-grid>\r\n\r\n</ion-content>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/patient-profile/patient-profile.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/patient-profile/patient-profile.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div *ngIf=\"spinnerState\" class=\"myBackground\">\n  <div>\n    <img src=\"/assets/giphy.gif\">\n  </div>\n</div>\n<ion-header no-border  >\n  <ion-toolbar text-center >\n    <ion-buttons slot=\"start\">\n      <ion-back-button></ion-back-button>\n    </ion-buttons>\n    <ion-title>My Navigation Bar</ion-title>\n  </ion-toolbar>\n  <ion-toolbar text-center>\n    <div class=\"profile-img-frame\">\n    <div class=\"profile-img-holder\">\n      <img  class=\"profile-img\" src=\"assets/doctor1.jpeg\" alt=\"profile image\">\n    </div>\n    </div>\n    <ion-title>{{patientData.name}} </ion-title>\n  </ion-toolbar>\n    <ion-toolbar style=\"border-bottom-left-radius: 5%; border-bottom-right-radius: 5% \">\n    <div>\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <div class=\"element\">\n              <ion-icon class=\"icon\" name=\"chatboxes\" size=\"large\" (click)=\"consultDoc()\"></ion-icon>\n            </div>\n          </ion-col>\n          <ion-col>\n            <div class=\"element\">\n              <ion-icon class=\"icon\" name=\"call\" size=\"large\" ></ion-icon>\n            </div>\n\n          </ion-col>\n          <ion-col>\n            <div class=\"element\">\n              <ion-icon class=\"icon\" name=\"calendar\" size=\"large\" ></ion-icon>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-header collapse=\"condense\">\n    <ion-toolbar>\n      <ion-title size=\"large\">My Navigation Bar</ion-title>\n    </ion-toolbar>\n  </ion-header>\n<!--  ////////////////////////////////////////////////////////////////-->\n  <div class=\"personal-data\" style=\"margin-top: 2%\"  >\n    <ion-grid>\n      <ion-row>\n        <ion-col style=\"border-right: 1px solid rgba(0,0,0,0.75);\">\n            <ion-item lines=\"none\" text-center>\n              <ion-avatar slot=\"start\">\n                <ion-icon name=\"person\" size=\"large\" style=\"color: #2cc67b\"></ion-icon>\n              </ion-avatar>\n              <ion-label>\n                <h2>Age</h2>\n                <h3>{{patientData.age}}</h3>\n              </ion-label>\n            </ion-item>\n        </ion-col>\n        <ion-col>\n          <ion-item lines=\"none\" text-center>\n            <ion-avatar slot=\"start\">\n              <ion-icon name=\"female\" size=\"large\" style=\"color: #2cc67b\"></ion-icon>\n            </ion-avatar>\n            <ion-label>\n              <h2>Gender</h2>\n              <h3>Female</h3>\n            </ion-label>\n          </ion-item>\n\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n<!--////////////////////////////////////////////////////  -->\n  <div class=\"personal-data\"  >\n    <ion-header >\n      <ion-toolbar style=\" --background : white; border-radius: 20% ;\" >\n        <ion-buttons slot=\"start\">\n          <ion-button>\n            <ion-icon name=\"pulse\" style=\" color:red\" size=\"large\"></ion-icon>\n          </ion-button>\n        </ion-buttons>\n        <ion-title  style=\" color: rgba(0,0,0,0.75);\">Vitals</ion-title>\n      </ion-toolbar>\n    </ion-header>\n      <ion-item>\n        <ion-avatar slot=\"start\">\n          <img src=\"assets/Iconawesome-weight.png\">\n        </ion-avatar>\n        <ion-label>\n          <h2>Finn</h2>\n          <h3>I'm a big deal</h3>\n          <p>Listen, I've had a pretty messed up day...</p>\n        </ion-label>\n      </ion-item>\n\n      <ion-item>\n        <ion-avatar slot=\"start\">\n          <img src=\"assets/Iconawesome-weight.png\">\n        </ion-avatar>\n        <ion-label>\n          <h2>Han</h2>\n          <h3>Look, kid...</h3>\n          <p>I've got enough on my plate as it is, and I...</p>\n        </ion-label>\n      </ion-item>\n\n      <ion-item>\n        <ion-avatar slot=\"start\">\n          <img src=\"assets/Iconawesome-weight.png\">\n        </ion-avatar>\n        <ion-label>\n          <h2>Rey</h2>\n          <h3>I can handle myself</h3>\n          <p>You will remove these restraints and leave...</p>\n        </ion-label>\n      </ion-item>\n\n      <ion-item>\n        <ion-avatar slot=\"start\">\n          <img src=\"assets/Iconawesome-weight.png\">\n        </ion-avatar>\n        <ion-label>\n          <h2>Luke</h2>\n          <h3>Your thoughts betray you</h3>\n          <p>I feel the good in you, the conflict...</p>\n        </ion-label>\n      </ion-item>\n\n  </div>\n<!--//////////////////////////////////////////////////////////////////////////////  -->\n  <div class=\"personal-data\"  >\n    <ion-header >\n      <ion-toolbar style=\" --background : white; border-radius: 20% ;\" >\n        <ion-buttons slot=\"start\">\n          <ion-button>\n            <ion-icon name=\"calendar\" style=\" color:dodgerblue\" size=\"large\"></ion-icon>\n          </ion-button>\n        </ion-buttons>\n        <ion-title  style=\" color: rgba(0,0,0,0.75);\">Upcoming Appointments</ion-title>\n      </ion-toolbar>\n    </ion-header>\n    <ion-item>\n      <ion-avatar slot=\"start\">\n        <ion-icon name=\"clock\" size=\"large\" style=\"color: #2cc67b\"></ion-icon>\n      </ion-avatar>\n      <ion-label>\n        <h2>Finn</h2>\n        <h3>I'm a big deal</h3>\n        <p>Listen, I've had a pretty messed up day...</p>\n      </ion-label>\n    </ion-item>\n  </div>\n<!--  /////////////////////////////////////////////////////////////////-->\n  <div class=\"personal-data\"  >\n    <ion-header >\n      <ion-toolbar style=\" --background : white; border-radius: 20% ;\" >\n        <ion-buttons slot=\"start\">\n          <ion-button>\n            <ion-icon name=\"person\" size=\"large\" style=\"color: #0a5279\"></ion-icon>\n          </ion-button>\n        </ion-buttons>\n        <ion-title  style=\" color: rgba(0,0,0,0.75);\">Contacts</ion-title>\n      </ion-toolbar>\n    </ion-header>\n    <ion-item>\n      <ion-avatar slot=\"start\">\n        <ion-icon name=\"call\" size=\"large\" style=\"color: #2cc67b\"></ion-icon>\n      </ion-avatar>\n      <ion-label>\n        <h2>Phone Number</h2>\n        <p>{{patientData.mobile}}</p>\n      </ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-avatar slot=\"start\">\n        <ion-icon name=\"mail\" size=\"large\" style=\"color: #2cc67b\"></ion-icon>\n      </ion-avatar>\n      <ion-label>\n        <h2>Email Address</h2>\n        <p>sohaila@gmail.com</p>\n      </ion-label>\n    </ion-item>\n  </div>\n\n\n</ion-content>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/patientList/patient-list.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/patientList/patient-list.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n  <ion-toolbar>\r\n    <ion-row class=\"f-row\">\r\n      <ion-col >\r\n        <ion-grid id=\"item\">\r\n          <ion-row>\r\n            <ion-col size=\"4\">\r\n            </ion-col>\r\n            <ion-col size=\"8\">\r\n              <h1>My Patients</h1>\r\n            </ion-col>\r\n          </ion-row>\r\n\r\n          <ion-row >\r\n            <ion-col size=\"12\">\r\n              <ion-searchbar\r\n                      (ionInput)=\"filterList($event)\"\r\n              ></ion-searchbar>\r\n\r\n            </ion-col>\r\n\r\n\r\n\r\n\r\n          </ion-row>\r\n        </ion-grid>\r\n\r\n\r\n\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-toolbar>\r\n\r\n</ion-header>\r\n\r\n<ion-content >\r\n  <div class=\"background\">\r\n\r\n    <ion-grid class=\"grid\">\r\n      <ion-row *ngFor=\"let item of patientArrayList; let i=index\">\r\n        <ion-grid >\r\n          <!--        //first nested row-->\r\n          <ion-row >\r\n            <ion-col size=\"12\" class=\"card\" >\r\n              <ion-grid >\r\n                <!--          //second nested row    -->\r\n                <ion-row >\r\n                  <ion-col size=\"3\">\r\n                    <img  class=\"small-icon\" src=\"assets/doctor1.jpeg\">\r\n                  </ion-col>\r\n                  <ion-col size=\"9\">\r\n\r\n                    <ion-grid  id=\"item2\">\r\n\r\n                      <ion-row (click)=\"GotoPatientProfile(item)\" >\r\n                        <h3>{{item.name}}</h3>\r\n                      </ion-row>\r\n                      <ion-row>\r\n\r\n                      </ion-row>\r\n\r\n                      <ion-row >\r\n                        <ion-col size=\"3\"  sizeSm=\"1\" >\r\n\r\n                        </ion-col>\r\n                        <ion-col sizeLg=\"9\" sizeMd=\"9\" sizeSm=\"11\">\r\n                          <ion-grid  >\r\n                            <ion-row >\r\n                              <ion-col (click)=\"consultDoc(item)\">\r\n                                <ion-icon class=\"icon\" name=\"chatboxes\" size=\"large\" ></ion-icon>\r\n\r\n                              </ion-col>\r\n                              <ion-col>\r\n                                <ion-icon class=\"icon\" name=\"call\" size=\"large\"></ion-icon>\r\n                              </ion-col>\r\n                              <ion-col>\r\n                                <ion-icon class=\"icon\" name=\"calendar\"size=\"large\"></ion-icon>\r\n\r\n                              </ion-col>\r\n                            </ion-row>\r\n                          </ion-grid>\r\n\r\n\r\n\r\n                        </ion-col>\r\n                      </ion-row>\r\n                    </ion-grid>\r\n                  </ion-col>\r\n\r\n                </ion-row>\r\n                <!--              -->\r\n              </ion-grid>\r\n\r\n            </ion-col>\r\n          </ion-row>\r\n          <!--        -->\r\n        </ion-grid>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n      </ion-row>\r\n      <!--    -->\r\n    </ion-grid>\r\n  </div>\r\n\r\n</ion-content>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/profile/profile.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/profile/profile.component.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--<ion-content class=\"cont\" >-->\r\n<!--    <div *ngIf=\"showSplash\" class=\"myBackground\">-->\r\n<!--        <div>-->\r\n<!--            <img src=\"/assets/giphy.gif\">-->\r\n<!--        </div>-->\r\n<!--    </div>-->\r\n<!--    <ion-grid>-->\r\n<!--        <ion-row class =\"myrow\" >-->\r\n<!--            <ion-col size=\"12\">-->\r\n<!--                <div class=\"wrapper\" >-->\r\n<!--                    <div class=\"wave\"></div>-->\r\n<!--                    <div>-->\r\n\r\n<!--                        <ion-button class=\"back\" (click)= \"backClick()\"  shape=\"round\" color=\"sub.severityLevel\" style=\"color:black\">-->\r\n<!--                            <ion-icon name=\"arrow-round-back\" ></ion-icon>-->\r\n\r\n<!--                        </ion-button>-->\r\n<!--                    </div>-->\r\n\r\n<!--                    <div >-->\r\n<!--                        <h1 class=\"centered\">-->\r\n<!--                            <ion-input clearInput #Name disabled={{notEnable}} (ionChange)=\"changeName()\" #Name [(ngModel)]=\"myName\" floating>-->\r\n<!--                                {{doctorName}}-->\r\n<!--                            </ion-input>-->\r\n<!--                        </h1>-->\r\n<!--                        <div class=\"space\">-->\r\n<!--                            <ion-avatar class=\"avat\"  >-->\r\n<!--                                <img src=\"assets/images.jpg\" >-->\r\n<!--                            </ion-avatar>-->\r\n<!--                        </div>-->\r\n<!--                    </div>-->\r\n\r\n<!--                </div>-->\r\n<!--            </ion-col>-->\r\n<!--        </ion-row>-->\r\n<!--        <ion-row>-->\r\n<!--            <ion-col size=\"6\">-->\r\n<!--                <div class=\"Srow\">-->\r\n\r\n<!--                    <ion-item color=\"sub.severityLevel\" >-->\r\n<!--                        <ion-icon name=\"business\" class=\"pad\"></ion-icon>-->\r\n\r\n<!--                        <ion-input  clearInput  [(ngModel)]=\"myYears\" (ionChange)=\"changeExp()\" #Years  disabled={{notEnable}}  floating>-->\r\n<!--                            Years of Experience: {{years_experience}}-->\r\n<!--                        </ion-input>-->\r\n\r\n<!--                    </ion-item>-->\r\n\r\n<!--                    <ion-item  color=\"sub.severityLevel\" >-->\r\n<!--                        <ion-icon name=\"call\" class=\"pad\"></ion-icon>-->\r\n<!--                        <ion-label>-->\r\n<!--                            Mobile: {{mobile}}-->\r\n<!--                        </ion-label>-->\r\n<!--                    </ion-item>-->\r\n\r\n<!--                    <ion-item  color=\"sub.severityLevel\" >-->\r\n<!--                        <ion-icon name=\"alarm\" class=\"pad\"></ion-icon>-->\r\n<!--                        <ion-label>-->\r\n<!--                            Coming session Date:12/12/2019-->\r\n<!--                        </ion-label>-->\r\n<!--                        <ion-icon name=\"construct\" ></ion-icon>-->\r\n<!--                    </ion-item>-->\r\n\r\n<!--                    <ion-item color=\"sub.severityLevel\" >-->\r\n<!--                        <ion-icon name=\"clock\" class=\"pad\"></ion-icon>-->\r\n\r\n<!--                        Latest session Date:12/12/2019-->\r\n\r\n<!--                    </ion-item>-->\r\n\r\n\r\n<!--                </div>-->\r\n<!--            </ion-col>-->\r\n<!--        </ion-row>-->\r\n<!--        <ion-row class=\"edit\">-->\r\n<!--            <ion-col size=\"4\">-->\r\n<!--                <ion-button shape=\"round\" (click)=\"edit()\" color=\"sub.severityLevel\" style=\"color:black\"> Edit </ion-button>-->\r\n<!--            </ion-col>-->\r\n<!--            <ion-col size=\"4\" class=\"cancel\">-->\r\n<!--                <ion-button  shape=\"round\" (click)=\"save(Name.value,Years.value)\" color=\"sub.severityLevel\" style=\"color:black\"> Save </ion-button>-->\r\n<!--            </ion-col>-->\r\n<!--            <ion-col size =\"4\" class=\"fab\">-->\r\n<!--                <app-fab></app-fab>-->\r\n\r\n<!--            </ion-col>-->\r\n\r\n<!--        </ion-row>-->\r\n\r\n<!--    </ion-grid>-->\r\n<!--</ion-content>-->\r\n<div *ngIf=\"spinnerState\" class=\"myBackground\">\r\n    <div>\r\n        <img src=\"/assets/giphy.gif\">\r\n    </div>\r\n</div>\r\n<ion-content class=\"ion-content\">\r\n    <ion-grid>\r\n        <ion-row>\r\n            <ion-col size=\"3\" sizeLg=\"3\" sizeSm=\"1\" sizeMd=\"2\" sizeXs=\"2\"></ion-col>\r\n            <ion-col size=\"6\" sizeLg=\"6\" sizeMd=\"8\" sizeSm=\"10\" sizeXs=\"8\">\r\n                <ion-toolbar text-center>\r\n                    <p>My Profile</p>\r\n                    <div class=\"wrapper\">\r\n                        <div class=\"profile-img-frame\">\r\n                            <div class=\"profile-img-holder\">\r\n                                <img  class=\"profile-img\" src=\"assets/doctor1.jpeg\" alt=\"profile image\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"camera\">\r\n                            <ion-icon name=\"camera\"  color=\"white\" size=\"large\"></ion-icon>\r\n                        </div>\r\n                    </div>\r\n                    <p style=\"font-size: 0.9em\" class=\"paragraph\">{{InputData[0].value}} </p>\r\n                    <span style=\"font-size: 0.6em\">{{InputData[2].value}} </span>\r\n\r\n                </ion-toolbar>\r\n\r\n            </ion-col>\r\n            <ion-col size=\"3\" sizeLg=\"3\" sizeSm=\"1\" sizeMd=\"2\" sizeXs=\"2\"></ion-col>\r\n\r\n\r\n        </ion-row>\r\n        <ion-row class=\"inputs\">\r\n\r\n            <ion-item *ngFor=\"let item of InputData ;\" class=\"ion-input\">\r\n                <ion-label position=\"floating\">{{item.label}}</ion-label>\r\n                <ion-input [(ngModel)]=item.value  type=\"{{item.type}}\" #input  disabled=\"{{save_state}}\"></ion-input>\r\n            </ion-item>\r\n        </ion-row>\r\n        <ion-row  >\r\n            <ion-toolbar >\r\n                <div class=\"buttons-tool_bar\">\r\n                    <ion-buttons >\r\n                        <ion-button class=\"ion-button\" (click)=\"save()\" > save </ion-button>\r\n                        <ion-button class=\"ion-button\" (click)=\"edit()\"> Edit </ion-button>\r\n                    </ion-buttons>\r\n\r\n\r\n                </div>\r\n\r\n            </ion-toolbar>\r\n\r\n        </ion-row>\r\n\r\n    </ion-grid>\r\n\r\n\r\n</ion-content>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/schedule/schedule.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/schedule/schedule.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>\r\n  schedule works!\r\n</p>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/tab/tab.component.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/tab/tab.component.html ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n\r\n<ion-tabs>\r\n  <ion-tab-bar slot=\"bottom\">\r\n    <ion-tab-button (click)=\"vitalClick()\">\r\n      <ion-icon name=\"fitness\"></ion-icon>\r\n      <ion-label>My Vitals</ion-label>\r\n      <!-- <ion-badge>6</ion-badge> -->\r\n    </ion-tab-button>\r\n\r\n    <ion-tab-button (click)=\"homeClick()\">\r\n      <ion-icon name=\"person\"></ion-icon> \r\n      <ion-label>Homepage</ion-label>\r\n    </ion-tab-button>\r\n\r\n    <ion-tab-button (click)=\"dlistClick()\" >\r\n        <ion-icon name=\"medkit\"></ion-icon>\r\n       <ion-label>My doctors</ion-label>\r\n    </ion-tab-button>\r\n\r\n    <ion-tab-button (click)=\"tlistClick()\">\r\n      <ion-icon name=\"body\"></ion-icon>\r\n      <ion-label>My trainer</ion-label>\r\n    </ion-tab-button>\r\n  </ion-tab-bar>\r\n</ion-tabs>\r\n\r\n");

/***/ }),

/***/ "./src/app/home/chat/chat.component.scss":
/*!***********************************************!*\
  !*** ./src/app/home/chat/chat.component.scss ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".cont {\n  background-color: white;\n  border: thick solid #3cb8b8; }\n\n.typing {\n  width: 100%;\n  border: thick solid #3cb8b8;\n  border-radius: 20%;\n  resize: none; }\n\n.tool {\n  border: thick solid #3cb8b8;\n  border-radius: 20%; }\n\n.sub {\n  width: 100%;\n  border: thick solid #3cb8b8;\n  border-radius: 20%; }\n\n.spaces {\n  margin-top: 120%; }\n\n.btn {\n  --padding-start:1em;\n  --padding-end: 1em;\n  color: #3cb8b8; }\n\n.message {\n  padding: 10%;\n  border-radius: 10%;\n  margin-bottom: 4%;\n  white-space: pre-wrap; }\n\n.mySender {\n  background-color: white;\n  border: thick solid #3cb8b8;\n  border-radius: 20%;\n  color: black; }\n\n.myReciever {\n  background-color: #3cb8b8;\n  border: thick solid white;\n  border-radius: 20%;\n  color: black; }\n\n.time {\n  color: black;\n  font-size: small;\n  margin-right: 5%; }\n\n.Cspace {\n  margin-left: 5%; }\n\n.Sspace {\n  margin-left: 2%; }\n\n.speech-bubble {\n  position: relative;\n  background-color: white;\n  border: thick solid #3cb8b8;\n  border-radius: .4em; }\n\n.speech-bubble:after {\n  content: '';\n  position: absolute;\n  right: 0;\n  top: 50%;\n  width: 0;\n  height: 0;\n  border: 1em solid transparent;\n  border-left-color: #3cb8b8;\n  border-right: 0;\n  border-bottom: 0;\n  margin-top: -0.3em;\n  margin-right: -1em; }\n\n.speech-bubbleR {\n  position: relative;\n  background: #3cb8b8;\n  border-radius: .4em; }\n\n.speech-bubbleR:after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 50%;\n  width: 0;\n  height: 0;\n  border: 0.906em solid transparent;\n  border-right-color: #3cb8b8;\n  border-left: 0;\n  border-bottom: -50%;\n  margin-top: -0.453em;\n  margin-left: -0.906em; }\n\n.skeleton {\n  width: 100%;\n  margin-bottom: 10%;\n  border-radius: 10%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9ob21lL2NoYXQvY2hhdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHVCQUFzQjtFQUd0QiwyQkFBcUMsRUFBQTs7QUFHekM7RUFDSSxXQUFXO0VBQ1gsMkJBQXFDO0VBQ3JDLGtCQUFrQjtFQUNsQixZQUFZLEVBQUE7O0FBR2hCO0VBQ0ksMkJBQXFDO0VBQ3JDLGtCQUFrQixFQUFBOztBQUV0QjtFQUNJLFdBQVc7RUFDWCwyQkFBcUM7RUFDckMsa0JBQWtCLEVBQUE7O0FBRXRCO0VBQ0ksZ0JBQWdCLEVBQUE7O0FBRXBCO0VBR0ksbUJBQWdCO0VBQ2hCLGtCQUFjO0VBQ2QsY0FBd0IsRUFBQTs7QUFFNUI7RUFDRSxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixxQkFBcUIsRUFBQTs7QUFFdkI7RUFFRSx1QkFBdUI7RUFDdkIsMkJBQXFDO0VBQ3JDLGtCQUFrQjtFQUNsQixZQUFZLEVBQUE7O0FBR2Q7RUFDRSx5QkFBbUM7RUFDbkMseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQixZQUFZLEVBQUE7O0FBRWQ7RUFDRSxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLGdCQUFnQixFQUFBOztBQUVsQjtFQUNJLGVBQWUsRUFBQTs7QUFFbkI7RUFDSSxlQUFlLEVBQUE7O0FBRW5CO0VBQ0Msa0JBQWtCO0VBRWpCLHVCQUF1QjtFQUN2QiwyQkFBcUM7RUFDdEMsbUJBQW1CLEVBQUE7O0FBR3BCO0VBQ0MsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsUUFBUTtFQUNSLFFBQVE7RUFDUixTQUFTO0VBQ1QsNkJBQTZCO0VBQzdCLDBCQUFvQztFQUNwQyxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixrQkFBa0IsRUFBQTs7QUFHbkI7RUFDQyxrQkFBa0I7RUFDbEIsbUJBQThCO0VBQzlCLG1CQUFtQixFQUFBOztBQUdwQjtFQUNDLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsT0FBTztFQUNQLFFBQVE7RUFDUixRQUFRO0VBQ1IsU0FBUztFQUNULGlDQUFpQztFQUNqQywyQkFBc0M7RUFDdEMsY0FBYztFQUNkLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIscUJBQXFCLEVBQUE7O0FBRXRCO0VBQ0UsV0FBVztFQUNWLGtCQUFrQjtFQUNsQixrQkFBa0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2hvbWUvY2hhdC9jaGF0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnR7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO1xyXG4gICAgLy8gaGVpZ2h0OiAxMDAlO1xyXG4gICAgLy8gd2lkdGg6IDEwMCU7XHJcbiAgICBib3JkZXI6IHRoaWNrIHNvbGlkIHJnYig2MCwgMTg0LCAxODQpO1xyXG4gICAgLy8gYm9yZGVyLXJhZGl1czogMTAlO1xyXG4gIH1cclxuLnR5cGluZ3tcclxuICAgIHdpZHRoIDoxMDAlO1xyXG4gICAgYm9yZGVyOiB0aGljayBzb2xpZCByZ2IoNjAsIDE4NCwgMTg0KTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDIwJTtcclxuICAgIHJlc2l6ZTogbm9uZTtcclxuXHJcbn1cclxuLnRvb2x7XHJcbiAgICBib3JkZXI6IHRoaWNrIHNvbGlkIHJnYig2MCwgMTg0LCAxODQpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjAlO1xyXG59XHJcbi5zdWJ7XHJcbiAgICB3aWR0aCA6MTAwJTtcclxuICAgIGJvcmRlcjogdGhpY2sgc29saWQgcmdiKDYwLCAxODQsIDE4NCk7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMCU7XHJcbiB9XHJcbi5zcGFjZXN7XHJcbiAgICBtYXJnaW4tdG9wOiAxMjAlO1xyXG59XHJcbi5idG57XHJcbiAgLy8gICBtYXJnaW4tcmlnaHQ6IDEwJTtcclxuICAvLyAgIG1hcmdpbi10b3A6IDUlO1xyXG4gICAgLS1wYWRkaW5nLXN0YXJ0OjFlbTtcclxuICAgIC0tcGFkZGluZy1lbmQ6IDFlbTtcclxuICAgIGNvbG9yOiByZ2IoNjAsIDE4NCwgMTg0KTtcclxufVxyXG4ubWVzc2FnZXtcclxuICBwYWRkaW5nOiAxMCU7XHJcbiAgYm9yZGVyLXJhZGl1czogMTAlO1xyXG4gIG1hcmdpbi1ib3R0b206IDQlO1xyXG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcclxufVxyXG4ubXlTZW5kZXJ7XHJcbiBcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgXHJcbiAgYm9yZGVyOiB0aGljayBzb2xpZCByZ2IoNjAsIDE4NCwgMTg0KTtcclxuICBib3JkZXItcmFkaXVzOiAyMCU7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG5cclxufVxyXG4ubXlSZWNpZXZlcntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNjAsIDE4NCwgMTg0KTsgXHJcbiAgYm9yZGVyOiB0aGljayBzb2xpZCB3aGl0ZTtcclxuICBib3JkZXItcmFkaXVzOiAyMCU7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG59XHJcbi50aW1le1xyXG4gIGNvbG9yOiBibGFjaztcclxuICBmb250LXNpemU6IHNtYWxsO1xyXG4gIG1hcmdpbi1yaWdodDogNSU7XHJcbn1cclxuLkNzcGFjZXtcclxuICAgIG1hcmdpbi1sZWZ0OiA1JTtcclxufVxyXG4uU3NwYWNle1xyXG4gICAgbWFyZ2luLWxlZnQ6IDIlO1xyXG59XHJcbi5zcGVlY2gtYnViYmxlIHtcclxuXHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgLy8gYmFja2dyb3VuZDogcmdiKDYwLCAxODQsIDE4NCk7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7IFxyXG4gIGJvcmRlcjogdGhpY2sgc29saWQgcmdiKDYwLCAxODQsIDE4NCk7XHJcblx0Ym9yZGVyLXJhZGl1czogLjRlbTtcclxufVxyXG5cclxuLnNwZWVjaC1idWJibGU6YWZ0ZXIge1xyXG5cdGNvbnRlbnQ6ICcnO1xyXG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRyaWdodDogMDtcclxuXHR0b3A6IDUwJTtcclxuXHR3aWR0aDogMDtcclxuXHRoZWlnaHQ6IDA7XHJcblx0Ym9yZGVyOiAxZW0gc29saWQgdHJhbnNwYXJlbnQ7XHJcblx0Ym9yZGVyLWxlZnQtY29sb3I6IHJnYig2MCwgMTg0LCAxODQpO1xyXG5cdGJvcmRlci1yaWdodDogMDtcclxuXHRib3JkZXItYm90dG9tOiAwO1xyXG5cdG1hcmdpbi10b3A6IC0wLjNlbTtcclxuXHRtYXJnaW4tcmlnaHQ6IC0xZW07XHJcbn1cclxuXHJcbi5zcGVlY2gtYnViYmxlUiB7XHJcblx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdGJhY2tncm91bmQ6ICByZ2IoNjAsIDE4NCwgMTg0KTtcclxuXHRib3JkZXItcmFkaXVzOiAuNGVtO1xyXG59XHJcblxyXG4uc3BlZWNoLWJ1YmJsZVI6YWZ0ZXIge1xyXG5cdGNvbnRlbnQ6ICcnO1xyXG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRsZWZ0OiAwO1xyXG5cdHRvcDogNTAlO1xyXG5cdHdpZHRoOiAwO1xyXG5cdGhlaWdodDogMDtcclxuXHRib3JkZXI6IDAuOTA2ZW0gc29saWQgdHJhbnNwYXJlbnQ7XHJcblx0Ym9yZGVyLXJpZ2h0LWNvbG9yOiAgcmdiKDYwLCAxODQsIDE4NCk7XHJcblx0Ym9yZGVyLWxlZnQ6IDA7XHJcblx0Ym9yZGVyLWJvdHRvbTogLTUwJTtcclxuXHRtYXJnaW4tdG9wOiAtMC40NTNlbTtcclxuXHRtYXJnaW4tbGVmdDogLTAuOTA2ZW07XHJcbn1cclxuLnNrZWxldG9ue1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gICBtYXJnaW4tYm90dG9tOiAxMCU7XHJcbiAgIGJvcmRlci1yYWRpdXM6IDEwJTtcclxufVxyXG4iXX0= */");

/***/ }),

/***/ "./src/app/home/chat/chat.component.ts":
/*!*********************************************!*\
  !*** ./src/app/home/chat/chat.component.ts ***!
  \*********************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/datacommunication/interaction.service */ "./src/app/services/datacommunication/interaction.service.ts");
/* harmony import */ var _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../NavService/navigation.service */ "./src/app/home/NavService/navigation.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _HttPService_http_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../HttPService/http.service */ "./src/app/home/HttPService/http.service.ts");
/* harmony import */ var src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/datastream/datastreaming.service */ "./src/app/services/datastream/datastreaming.service.ts");







let ChatComponent = class ChatComponent {
    constructor(intComp, navigation, httpService, dataStream, communication) {
        this.intComp = intComp;
        this.navigation = navigation;
        this.httpService = httpService;
        this.dataStream = dataStream;
        this.communication = communication;
        this.newMessages = [];
        this.patientArray = new Array();
    }
    ngOnInit() { }
    ionViewWillEnter() {
        this.communication.getId.subscribe((thread) => {
            this.dId = this.dataStream.getDoctorId();
            this.thread = thread;
            console.log("id " + this.thread.thread_id);
            this.patientArray = this.dataStream.getPatientList();
            console.log("This PatientArray: ", this.patientArray);
        });
        const that = this;
        this.intComp.msg.subscribe((massagesFromMessageOrConvList) => {
            console.log("replies in chat: ", massagesFromMessageOrConvList);
            that.newMessages = massagesFromMessageOrConvList;
            console.log("tpe msg  " + that.newMessages);
            that.setMessege();
        });
    }
    setMessege() {
        this.newMsgs = this.newMessages[0];
        console.log("newMsgs: ", this.newMsgs);
        if (this.newMsgs.sender_id == undefined) {
            this.newMsgs.sender_id = this.dId;
            console.log("newMsgs.sender_id" + this.newMsgs.sender_id);
            console.log("newMsgs if denderid is undefined" + this.newMsgs);
        }
        console.log("myMsgs", this.newMsgs);
        console.log("mypatientArray: ", this.patientArray);
        for (let row of this.patientArray) {
            console.log("this.newMsgs.sender_id" + this.newMsgs.sender_id);
            console.log("row.patientId" + row.patientId);
            if (this.newMsgs.sender_id == row.patientId || this.newMsgs.reciever_id == row.patientId) {
                console.log("row of patient", row);
                this.userToRecieve = row;
                console.log(this.userToRecieve + " id == " + row.patientId);
                this.patName = row.name;
            }
        }
        console.log("newMsgs.sender_id" + this.newMsgs.sender_id);
        console.log("sender", this.dId);
    }
    back() {
        this.navigation.navigateTo('home');
    }
    sendReplyFun() {
        this.sendReply(this.thread.thread_id);
    }
    sendReply(threadId) {
        console.log("this.tId: ", threadId);
        console.log(this.newMessages);
        console.log("userToRecieve in send reply" + this.userToRecieve);
        //////////////////////////////////
        this.data = {
            sender_id: this.dId,
            reciever_id: this.userToRecieve.patientId,
            msg_body: this.replyContent,
            thread_subject: this.thread.msg_subject,
            fcm_token: this.userToRecieve.fcmtoken
        };
        console.log("Data  for reply: ", this.data);
        this.httpService.postReply(this.data, threadId).subscribe((res) => {
            console.log("posted", res);
            this.newMessages.push(this.data);
        });
        //  this.httpService.getReplies(threadId,0).subscribe((res)=>{
        //   // this.intComp.sendMSG(res);
        //   console.log("replies",res);
        //   this.newMessages=res;  
        //   this.newMsgs=this.newMessages[0];
        //  });
        this.replyContent = "";
        this.bigContent.scrollToBottom(200);
        ////////////////////////////////////////////////////////////////////////////////////
    }
    goConv() {
        this.navigation.navigateTo("home/conversation");
    }
};
ChatComponent.ctorParameters = () => [
    { type: src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_2__["InteractionService"] },
    { type: _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_3__["NavigationService"] },
    { type: _HttPService_http_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"] },
    { type: src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_6__["DatastreamingService"] },
    { type: src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_2__["InteractionService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonContent"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonContent"])
], ChatComponent.prototype, "bigContent", void 0);
ChatComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-chat',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./chat.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/chat/chat.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./chat.component.scss */ "./src/app/home/chat/chat.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_2__["InteractionService"],
        _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_3__["NavigationService"],
        _HttPService_http_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"],
        src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_6__["DatastreamingService"],
        src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_2__["InteractionService"]])
], ChatComponent);



/***/ }),

/***/ "./src/app/home/conv-list/conv-list.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/home/conv-list/conv-list.component.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".small-icon {\n  width: 60%;\n  height: 60%;\n  margin-top: 30%; }\n\n.img-holder {\n  border-radius: 10px;\n  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d;\n  border: whitesmoke solid 2px; }\n\n.read {\n  font: bold; }\n\n.subtitle {\n  font: medium; }\n\n.msg_holder {\n  max-height: 5%; }\n\n.msg {\n  max-height: 50px;\n  overflow: hidden; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9ob21lL2NvbnYtbGlzdC9jb252LWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxVQUFVO0VBQ1YsV0FBVTtFQUNWLGVBQWUsRUFBQTs7QUFJbkI7RUFFSSxtQkFBbUI7RUFDbkIsK0NBQTRDO0VBQzVDLG9DQUE0QjtVQUE1Qiw0QkFBNEI7RUFDNUIsNEJBQTRCLEVBQUE7O0FBR2hDO0VBQ0UsVUFBVSxFQUFBOztBQUdaO0VBQ0UsWUFBWSxFQUFBOztBQUVkO0VBQ0UsY0FBYyxFQUFBOztBQUVoQjtFQUNFLGdCQUFlO0VBQ2YsZ0JBQWdCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9ob21lL2NvbnYtbGlzdC9jb252LWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc21hbGwtaWNvbntcclxuICAgIHdpZHRoOiA2MCU7XHJcbiAgICBoZWlnaHQ6NjAlO1xyXG4gICAgbWFyZ2luLXRvcDogMzAlO1xyXG4gICAgXHJcbiAgfVxyXG4gICAgXHJcbi5pbWctaG9sZGVye1xyXG4gICAgXHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYm94LXNoYWRvdzogNXB4IDVweCAxMHB4IDBweCByZ2JhKDAsMCwwLDAuNSk7XHJcbiAgICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xyXG4gICAgYm9yZGVyOiB3aGl0ZXNtb2tlIHNvbGlkIDJweDtcclxuICAgIFxyXG59XHJcbi5yZWFke1xyXG4gIGZvbnQ6IGJvbGQ7XHJcblxyXG59XHJcbi5zdWJ0aXRsZSB7XHJcbiAgZm9udDogbWVkaXVtO1xyXG59XHJcbi5tc2dfaG9sZGVye1xyXG4gIG1heC1oZWlnaHQ6IDUlO1xyXG59XHJcbi5tc2cge1xyXG4gIG1heC1oZWlnaHQ6NTBweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIFxyXG4gIFxyXG59Il19 */");

/***/ }),

/***/ "./src/app/home/conv-list/conv-list.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/home/conv-list/conv-list.component.ts ***!
  \*******************************************************/
/*! exports provided: ConvListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConvListComponent", function() { return ConvListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _HttPService_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../HttPService/http.service */ "./src/app/home/HttPService/http.service.ts");
/* harmony import */ var src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/datastream/datastreaming.service */ "./src/app/services/datastream/datastreaming.service.ts");
/* harmony import */ var src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/datacommunication/interaction.service */ "./src/app/services/datacommunication/interaction.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../NavService/navigation.service */ "./src/app/home/NavService/navigation.service.ts");
/* harmony import */ var _services_EventEmitterService_event_emitter_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/EventEmitterService/event-emitter.service */ "./src/app/services/EventEmitterService/event-emitter.service.ts");








let ConvListComponent = class ConvListComponent {
    constructor(httpService, DoctortData, navigation, eventEmitterService, dateInteraction, addController) {
        this.httpService = httpService;
        this.DoctortData = DoctortData;
        this.navigation = navigation;
        this.eventEmitterService = eventEmitterService;
        this.dateInteraction = dateInteraction;
        this.addController = addController;
        console.log('convlist constructor');
    }
    ngOnInit() {
        console.log('convlist oninit');
        new Promise((resolve, reject) => {
            this.docId = this.DoctortData.getDoctorId();
            console.log('check patient id');
            // tslint:disable-next-line:triple-equals
            if (this.docId == undefined) {
                reject('doctor id is undefined ');
            }
            else {
                console.log('doctor id resolved');
                console.log('doctor_id', this.docId);
                resolve();
            }
        }).then(() => {
            console.log('doctor id form convlist', this.docId);
            this.GetData(0);
            // at the fist time we need to assign the part of code we need to invoke every time the event emitter emits value
            // tslint:disable-next-line:triple-equals
            if (this.eventEmitterService.Subscribtion == undefined) {
                console.log('subscribing to the event emitter');
                // when the event emitter emits new value only the part of the code that the subscriber hold will be invoked
                this.eventEmitterService.Subscribtion = this.eventEmitterService.FunctionCaller.subscribe((state) => {
                    this.GetData(state);
                    console.log('event emitter listener invoked');
                });
            }
        }).catch((err) => this.presentAlert('data stream error', err.message));
    }
    ngOnDestroy() {
        this.eventEmitterService.Subscribtion = undefined;
    }
    ionViewWillEnter() {
        console.log('convlist ion view will enter');
        console.log('this.scrolling', this.scrollPosition);
    }
    GetData(state) {
        console.log('get data function');
        this.page = 0;
        if (state == 0) {
            console.log('page', this.page);
            console.log('interaction works');
            this.httpService.getInbox(this.docId, this.page).subscribe((res) => {
                console.log('inbox ', res);
                this.convList = res;
                console.log('list ', this.convList);
            }, error1 => this.presentAlert('http error get inbox', error1.message));
        }
        else {
            console.log('page', this.page);
            this.httpService.getSent(this.docId, this.page).subscribe((res) => {
                console.log('sent ', res);
                this.convList = res;
                console.log('list sent', this.convList);
            }, error1 => this.presentAlert('http error get sent', error1.message));
        }
    }
    presentAlert(subtitleString, messageString) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log('alert holding screen ');
            const alert = yield this.addController.create({
                header: 'ERROR',
                subHeader: subtitleString,
                message: messageString,
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
    ///////////////////////////////////////////////////////////
    /////////// to create new thread
    //  this.thread={
    //     reciever_id   :  29,
    //     msg_subject   :  "postman4",
    //     created_date  :  "2020-02-02",
    //     is_readed     :  0,
    //     reciever_name :  "sohaila",
    //     sender_name   :  "ahmed",
    //     msg_body      :  "Hello Doctor i want...."
    //   }
    //   this.data={
    //     sender_id:this.patientId,
    //     reciever_id:this.thread.reciever_id,
    //     msg_body:this.thread.msg_body,
    //     created_date:this.thread.created_date,
    //   };
    //   this.httpService.postThread(this.thread,this.patientId).subscribe((res)=>{
    //     console.log("new thread data",res);
    //   this.httpService.postReply(this.data,res.insertId).subscribe((msg)=>{
    //     console.log("first thread message",msg);
    //   });
    //   });
    ////////////////////////////////////////////////////////////
    ngAfterViewInit() {
        console.log('ngviewtinit');
        this.ionContent.scrollToTop();
    }
    loadData(event) {
        console.log('scrolling NOw');
        this.page = this.page + 10;
        console.log('event', event);
        if (this.state == 0) {
            console.log('page', this.page);
            console.log('interaction works');
            this.httpService.getInbox(this.docId, this.page).subscribe((res) => {
                console.log('inbox ', res);
                res.forEach(element => {
                    this.convList.push(element);
                });
                event.target.complete();
                return;
            });
        }
        else {
            console.log('page', this.page);
            this.httpService.getSent(this.docId, this.page).subscribe((res) => {
                console.log('sent ', res);
                res.forEach(element => {
                    this.convList.push(element);
                });
                event.target.complete();
                console.log('New list sent', this.convList);
                return;
            });
        }
    }
    //////////////////////////////////////////////////////////////////
    /////////// to reply on specific thread
    reply(thread) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log('REPLIESSSS IN CONVLIST');
            console.log('Thread ID: ', thread.thread_id);
            this.httpService.getReplies(thread.thread_id, 0).subscribe((res) => {
                this.dateInteraction.sendMSG(res);
                console.log('replies', res);
                this.dateInteraction.getThreadIdfromMessageorConvListtoChat(thread).then(() => {
                    this.navigation.navigateTo('home/chat');
                });
            });
            /////////////////////////////////////////////////////////////////////////reply///////////////////////////////////
            // this.navigation.navigateTo('home/chat');
            // let date=new Date().toLocaleString();
            // console.log("current date ",new Date().toLocaleString());
            // this.data={
            //     sender_id:patient_id,
            //     reciever_id:this.Doctor_id,
            //     msg_body:"Okay, you can change the potato with salad and some fruits you love , i wish uou happy day, thanks. you can change the potato with salad and some fruits you love , i wish uou happy day, thanks. you can change the potato with salad and some fruits you love , i wish uou happy day, thanks. you can change the potato with salad and some fruits you love , i wish uou happy day, thanks. you can change the potato with salad and some fruits you love , i wish uou happy day, thanks.",
            //     created_date:date,
            // }
            //   this.httpService.postReply(this.data,thread_id).subscribe((res)=>{
            //     console.log("posted",res);
            //   });
        });
    }
};
ConvListComponent.ctorParameters = () => [
    { type: _HttPService_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"] },
    { type: src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_3__["DatastreamingService"] },
    { type: _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_6__["NavigationService"] },
    { type: _services_EventEmitterService_event_emitter_service__WEBPACK_IMPORTED_MODULE_7__["EventEmitterService"] },
    { type: src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_4__["InteractionService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonContent"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonContent"])
], ConvListComponent.prototype, "ionContent", void 0);
ConvListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-conv-list',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./conv-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/conv-list/conv-list.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./conv-list.component.scss */ "./src/app/home/conv-list/conv-list.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_HttPService_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"],
        src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_3__["DatastreamingService"],
        _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_6__["NavigationService"],
        _services_EventEmitterService_event_emitter_service__WEBPACK_IMPORTED_MODULE_7__["EventEmitterService"],
        src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_4__["InteractionService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"]])
], ConvListComponent);



/***/ }),

/***/ "./src/app/home/conversations/conversations.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/home/conversations/conversations.component.scss ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-content {\n  height: 100%;\n  width: 100%;\n  margin: 0px; }\n\n.inbox {\n  background-color: paleturquoise;\n  width: 100%;\n  height: 30%;\n  border-radius: 10%;\n  margin-left: -20%; }\n\n.sent {\n  background-color: paleturquoise;\n  width: 100%;\n  height: 30%;\n  border-radius: 10%;\n  margin-left: 20%; }\n\n.myRow {\n  height: 100%; }\n\n.myFab {\n  margin-bottom: 50%; }\n\n.sentText {\n  margin-left: 30%;\n  font-size: 120%; }\n\n.inboxText {\n  margin-left: 50%;\n  font-size: 120%; }\n\n.middle-text {\n  text-align: center;\n  font-family: Georgia, 'Times New Roman', Times, serif;\n  margin-top: 2%;\n  margin-bottom: 2%; }\n\n.header {\n  background-color: #28b997; }\n\n.Floating-icon {\n  -webkit-animation: flickr 0.7s ease-in-out 0.1s 1 alternate both;\n  animation: flickr 0.7s ease-in-out 0.1s 1 alternate both;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite; }\n\n@keyframes flickr {\n  0% {\n    left: 0px;\n    top: 0px; }\n  50% {\n    left: -5px; }\n  100% {\n    right: 5px; } }\n\n@-webkit-keyframes flickr {\n  0% {\n    left: 0px;\n    top: 0px; }\n  50% {\n    left: -5px; }\n  100% {\n    right: 5px; } }\n\n.icon {\n  margin-right: 10%;\n  --padding-start:5em;\n  --padding-end: 5em; }\n\n.ion-icon {\n  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9ob21lL2NvbnZlcnNhdGlvbnMvY29udmVyc2F0aW9ucy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQVk7RUFDWixXQUFXO0VBQ1gsV0FBVyxFQUFBOztBQUViO0VBQ0ksK0JBQThCO0VBQzlCLFdBQVc7RUFDWCxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGlCQUFpQixFQUFBOztBQUdyQjtFQUNFLCtCQUErQjtFQUMvQixXQUFXO0VBQ1gsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixnQkFBZ0IsRUFBQTs7QUFHbkI7RUFDRyxZQUFZLEVBQUE7O0FBRWY7RUFDSSxrQkFBaUIsRUFBQTs7QUFFckI7RUFDSSxnQkFBZ0I7RUFDaEIsZUFBZSxFQUFBOztBQUduQjtFQUNJLGdCQUFnQjtFQUNoQixlQUFlLEVBQUE7O0FBR25CO0VBQ0csa0JBQWtCO0VBQ2xCLHFEQUFxRDtFQUNyRCxjQUFhO0VBQ2IsaUJBQWlCLEVBQUE7O0FBR3JCO0VBQ0kseUJBQXlCLEVBQUE7O0FBTTdCO0VBRUksZ0VBQWdFO0VBQ2hFLHdEQUF3RDtFQUN4RCwyQ0FBbUM7VUFBbkMsbUNBQW1DLEVBQUE7O0FBSXZDO0VBQ1E7SUFBTSxTQUFRO0lBQUUsUUFBTyxFQUFBO0VBQ3ZCO0lBQU8sVUFBUyxFQUFBO0VBQ2hCO0lBQU8sVUFBUyxFQUFBLEVBQUE7O0FBRXhCO0VBQ1E7SUFBTSxTQUFRO0lBQUUsUUFBTyxFQUFBO0VBQ3ZCO0lBQU8sVUFBUyxFQUFBO0VBQ2hCO0lBQU8sVUFBUyxFQUFBLEVBQUE7O0FBR3ZCO0VBQ0csaUJBQWdCO0VBQ2hCLG1CQUFnQjtFQUNoQixrQkFBYyxFQUFBOztBQUVsQjtFQUNZLDhDQUEyQyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9jb252ZXJzYXRpb25zL2NvbnZlcnNhdGlvbnMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tY29udGVudHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWFyZ2luOiAwcHg7XHJcbiAgfVxyXG4gIC5pbmJveHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjpwYWxldHVycXVvaXNlO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgaGVpZ2h0OiAzMCU7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwJTtcclxuICAgICAgbWFyZ2luLWxlZnQ6IC0yMCU7XHJcbiAgICAgIFxyXG4gIH1cclxuICAuc2VudHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHBhbGV0dXJxdW9pc2U7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMzAlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTAlO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDIwJTtcclxuXHJcbiB9XHJcbiAubXlSb3d7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiB9XHJcbiAubXlGYWJ7XHJcbiAgICAgbWFyZ2luLWJvdHRvbTo1MCU7XHJcbiB9XHJcbiAuc2VudFRleHR7XHJcbiAgICAgbWFyZ2luLWxlZnQ6IDMwJTtcclxuICAgICBmb250LXNpemU6IDEyMCU7XHJcbiAgICAgXHJcbiB9XHJcbiAuaW5ib3hUZXh0e1xyXG4gICAgIG1hcmdpbi1sZWZ0OiA1MCU7XHJcbiAgICAgZm9udC1zaXplOiAxMjAlO1xyXG5cclxuIH1cclxuIC5taWRkbGUtdGV4dHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtZmFtaWx5OiBHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgVGltZXMsIHNlcmlmO1xyXG4gICAgbWFyZ2luLXRvcDoyJTtcclxuICAgIG1hcmdpbi1ib3R0b206IDIlO1xyXG4gICAgXHJcbiAgICB9XHJcbi5oZWFkZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjhiOTk3O1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuLkZsb2F0aW5nLWljb257XHJcblxyXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGZsaWNrciAwLjdzIGVhc2UtaW4tb3V0IDAuMXMgMSBhbHRlcm5hdGUgYm90aDtcclxuICAgIGFuaW1hdGlvbjogZmxpY2tyIDAuN3MgZWFzZS1pbi1vdXQgMC4xcyAxIGFsdGVybmF0ZSBib3RoO1xyXG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XHJcbiAgICBcclxuICAgIH0gICBcclxuICBcclxuQGtleWZyYW1lcyBmbGlja3Ige1xyXG4gICAgICAgIDAlICAge2xlZnQ6MHB4OyB0b3A6MHB4O31cclxuICAgICAgICA1MCUgIHsgbGVmdDotNXB4O31cclxuICAgICAgICAxMDAlIHsgcmlnaHQ6NXB4O31cclxuICAgICAgICB9ICAgIFxyXG5ALXdlYmtpdC1rZXlmcmFtZXMgZmxpY2tyIHtcclxuICAgICAgICAwJSAgIHtsZWZ0OjBweDsgdG9wOjBweDt9XHJcbiAgICAgICAgNTAlICB7IGxlZnQ6LTVweDt9XHJcbiAgICAgICAgMTAwJSB7IHJpZ2h0OjVweDt9XHJcbiAgICAgICAgfVxyXG4gICBcclxuIC5pY29ue1xyXG4gICAgbWFyZ2luLXJpZ2h0OjEwJTtcclxuICAgIC0tcGFkZGluZy1zdGFydDo1ZW07XHJcbiAgICAtLXBhZGRpbmctZW5kOiA1ZW07XHJcbiAgICB9XHJcbi5pb24taWNvbiB7XHJcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDBweCAwcHggM3B4IDBweCByZ2JhKDAsMCwwLDAuMik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICB9XHJcbiJdfQ== */");

/***/ }),

/***/ "./src/app/home/conversations/conversations.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/home/conversations/conversations.component.ts ***!
  \***************************************************************/
/*! exports provided: ConversationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConversationsComponent", function() { return ConversationsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../NavService/navigation.service */ "./src/app/home/NavService/navigation.service.ts");
/* harmony import */ var _HttPService_http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../HttPService/http.service */ "./src/app/home/HttPService/http.service.ts");
/* harmony import */ var src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/datacommunication/interaction.service */ "./src/app/services/datacommunication/interaction.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/datastream/datastreaming.service */ "./src/app/services/datastream/datastreaming.service.ts");
/* harmony import */ var _services_EventEmitterService_event_emitter_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/EventEmitterService/event-emitter.service */ "./src/app/services/EventEmitterService/event-emitter.service.ts");








let ConversationsComponent = class ConversationsComponent {
    constructor(navigation, httpService, dataInteraction, patList, datastream, eventEmitterService) {
        this.navigation = navigation;
        this.httpService = httpService;
        this.dataInteraction = dataInteraction;
        this.patList = patList;
        this.datastream = datastream;
        this.eventEmitterService = eventEmitterService;
        this.patientsArray = new Array();
        console.log("conversations component constructor");
    }
    ionViewDidEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log("conversation component ion view did enter ");
            this.patientsArray = this.datastream.getPatientList();
            console.log("doctors array" + this.patientsArray[0]);
        });
    }
    inbox() {
        console.log("inbox");
        this.eventEmitterService.OnComponentCall(0);
        console.log("inbox button triggered the state Function");
    }
    sent() {
        console.log("sent");
        this.eventEmitterService.OnComponentCall(1);
        console.log("sent button triggered the state Function ");
    }
    CreateNew() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let actionSheetButtons = [];
            for (let row of this.patientsArray) {
                actionSheetButtons.push({
                    text: row.name,
                    icon: 'person',
                    handler: () => {
                        this.reciever = row.name;
                        console.log("Patient: " + this.reciever);
                        this.dataInteraction.sendPatientNamefromconvtoMessage(row);
                        console.log("row" + row);
                        this.navigation.navigateTo("home/message");
                    }
                });
            }
            const actionSheet = yield this.patList.create({
                header: 'You want to send message to:',
                buttons: actionSheetButtons
                //buttons: [{
                //     //  text :'Dr.Mahmoud',  
                //    text: 'Dr.'+ dRow.name, //get doctor list
                //   icon: 'person',
                //   handler: () => {
                //       // this.Reciever="Dr.Mahmoud";
                //      this.Reciever= dRow.name;
                //      console.log("docM"+this.Reciever);
                //     this.intComp.sendDoctorNamefromHometoMessage(this.doctorRow);
                //     this.navigation.navigateTo("home/message");
                //     //must be getten from database
                //   }
                // }
                // ,
                //  {
                //     // text:'Dr.Medhat',
                //     text: 'Dr.'+ this.doctorRow[1].name,
                //    icon: 'person',
                //   // icon: 'camera',
                //   handler: () => {
                //     //  this.Reciever="Dr.Medhat";
                //      this.intComp.sendDoctorNamefromHometoMessage(this.doctorRow);
                //    this.Reciever= this.doctorRow[1].name;    
                //      this.navigation.navigateTo("home/message");
                //   }
                // }
                // ]
            });
            yield actionSheet.present();
        });
    }
};
ConversationsComponent.ctorParameters = () => [
    { type: _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"] },
    { type: _HttPService_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"] },
    { type: src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_4__["InteractionService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ActionSheetController"] },
    { type: src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_6__["DatastreamingService"] },
    { type: _services_EventEmitterService_event_emitter_service__WEBPACK_IMPORTED_MODULE_7__["EventEmitterService"] }
];
ConversationsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-conversations',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./conversations.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/conversations/conversations.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./conversations.component.scss */ "./src/app/home/conversations/conversations.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"],
        _HttPService_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"],
        src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_4__["InteractionService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ActionSheetController"],
        src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_6__["DatastreamingService"],
        _services_EventEmitterService_event_emitter_service__WEBPACK_IMPORTED_MODULE_7__["EventEmitterService"]])
], ConversationsComponent);



/***/ }),

/***/ "./src/app/home/fab/fab.component.scss":
/*!*********************************************!*\
  !*** ./src/app/home/fab/fab.component.scss ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".outer {\n  margin-bottom: 10%;\n  color: black; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9ob21lL2ZhYi9mYWIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBa0I7RUFHbEIsWUFBWSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9mYWIvZmFiLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm91dGVyIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwJTtcclxuICAgIC8vIG1hcmdpbi10b3A6IC0xMDBweDtcclxuICAgIC8vIG1hcmdpbi1yaWdodDogMTVweDtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICAgIC8vbGluZWFyLWdyYWRpZW50KFxyXG4gICAgLy8gdG8gYm90dG9tLFxyXG4gICAgLy8gIzBiYjhjYyAwJSxcclxuICAgIC8vICMzMTcxZTAgMTAwJSlcclxuICAgIFxyXG4gIH0iXX0= */");

/***/ }),

/***/ "./src/app/home/fab/fab.component.ts":
/*!*******************************************!*\
  !*** ./src/app/home/fab/fab.component.ts ***!
  \*******************************************/
/*! exports provided: FabComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FabComponent", function() { return FabComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../NavService/navigation.service */ "./src/app/home/NavService/navigation.service.ts");



let FabComponent = class FabComponent {
    constructor(navigation) {
        this.navigation = navigation;
    }
    ngOnInit() { }
    // vitalClick(){
    //   this.navigation.navigateTo('home/vitals');
    // }
    homeClick() {
        this.navigation.navigateTo('home/Myprofile');
    }
    dlistClick() {
        this.navigation.navigateTo('home/profile');
    }
    tlistClick() {
        this.navigation.navigateTo('home/profile');
        console.log("trainer list");
    }
    outClick() {
        this.navigation.navigateTo('cover');
        console.log("trainer list");
    }
};
FabComponent.ctorParameters = () => [
    { type: _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"] }
];
FabComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-fab',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./fab.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/fab/fab.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./fab.component.scss */ "./src/app/home/fab/fab.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"]])
], FabComponent);



/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");
/* harmony import */ var _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NavService/navigation.service */ "./src/app/home/NavService/navigation.service.ts");
/* harmony import */ var _HttPService_http_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HttPService/http.service */ "./src/app/home/HttPService/http.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _tab_tab_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./tab/tab.component */ "./src/app/home/tab/tab.component.ts");
/* harmony import */ var _fab_fab_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./fab/fab.component */ "./src/app/home/fab/fab.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/home/profile/profile.component.ts");
/* harmony import */ var _patientList_patient_list_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./patientList/patient-list.component */ "./src/app/home/patientList/patient-list.component.ts");
/* harmony import */ var _message_message_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./message/message.component */ "./src/app/home/message/message.component.ts");
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./chat/chat.component */ "./src/app/home/chat/chat.component.ts");
/* harmony import */ var _conversations_conversations_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./conversations/conversations.component */ "./src/app/home/conversations/conversations.component.ts");
/* harmony import */ var _conv_list_conv_list_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./conv-list/conv-list.component */ "./src/app/home/conv-list/conv-list.component.ts");
/* harmony import */ var _schedule_schedule_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./schedule/schedule.component */ "./src/app/home/schedule/schedule.component.ts");
/* harmony import */ var ngx_autosize__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-autosize */ "./node_modules/ngx-autosize/fesm2015/ngx-autosize.js");
/* harmony import */ var _patient_profile_patient_profile_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./patient-profile/patient-profile.component */ "./src/app/home/patient-profile/patient-profile.component.ts");





















let HomePageModule = class HomePageModule {
};
HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClientModule"],
            ngx_autosize__WEBPACK_IMPORTED_MODULE_19__["AutosizeModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                {
                    path: 'doctorList',
                    component: _patientList_patient_list_component__WEBPACK_IMPORTED_MODULE_13__["PatientListComponent"]
                },
                {
                    path: 'Myprofile',
                    component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_12__["ProfileComponent"]
                },
                {
                    path: '',
                    component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
                },
                {
                    path: 'message',
                    component: _message_message_component__WEBPACK_IMPORTED_MODULE_14__["MessageComponent"]
                },
                {
                    path: 'chat',
                    component: _chat_chat_component__WEBPACK_IMPORTED_MODULE_15__["ChatComponent"]
                },
                {
                    path: 'schedule',
                    component: _schedule_schedule_component__WEBPACK_IMPORTED_MODULE_18__["ScheduleComponent"]
                },
                {
                    path: 'conversation',
                    component: _conversations_conversations_component__WEBPACK_IMPORTED_MODULE_16__["ConversationsComponent"],
                    children: [
                        {
                            path: '',
                            component: _conv_list_conv_list_component__WEBPACK_IMPORTED_MODULE_17__["ConvListComponent"]
                        }
                    ]
                },
                {
                    path: 'patient-profile',
                    component: _patient_profile_patient_profile_component__WEBPACK_IMPORTED_MODULE_20__["PatientProfileComponent"]
                }
            ])
        ],
        providers: [
            _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_7__["NavigationService"],
            _HttPService_http_service__WEBPACK_IMPORTED_MODULE_8__["HttpService"],
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"],
            _patientList_patient_list_component__WEBPACK_IMPORTED_MODULE_13__["PatientListComponent"],
            _tab_tab_component__WEBPACK_IMPORTED_MODULE_10__["TabComponent"],
            _fab_fab_component__WEBPACK_IMPORTED_MODULE_11__["FabComponent"],
            _profile_profile_component__WEBPACK_IMPORTED_MODULE_12__["ProfileComponent"],
            _message_message_component__WEBPACK_IMPORTED_MODULE_14__["MessageComponent"],
            _chat_chat_component__WEBPACK_IMPORTED_MODULE_15__["ChatComponent"],
            _conversations_conversations_component__WEBPACK_IMPORTED_MODULE_16__["ConversationsComponent"],
            _conv_list_conv_list_component__WEBPACK_IMPORTED_MODULE_17__["ConvListComponent"],
            _schedule_schedule_component__WEBPACK_IMPORTED_MODULE_18__["ScheduleComponent"],
            _patient_profile_patient_profile_component__WEBPACK_IMPORTED_MODULE_20__["PatientProfileComponent"]
        ]
    })
], HomePageModule);



/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-content {\n  height: 100%;\n  width: 100%;\n  margin: 0px; }\n\nion-row {\n  margin-bottom: -1%; }\n\n.background {\n  margin: 0px;\n  padding: 0px;\n  background-image: url(/assets/path-1.png); }\n\n.center {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center; }\n\n.main-card {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.5);\n  -webkit-transition: -webkit-transform 0.5s;\n  transition: -webkit-transform 0.5s;\n  transition: transform 0.5s;\n  transition: transform 0.5s, -webkit-transform 0.5s;\n  border-radius: 10px;\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d;\n  background: white;\n  margin-top: 10%; }\n\n.mini-card {\n  position: relative;\n  border-radius: 10px;\n  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d;\n  margin-top: 10%;\n  border: whitesmoke solid 2px; }\n\n.icon {\n  width: 35%;\n  height: 35%;\n  margin: 5%; }\n\n.middle-text {\n  text-align: center;\n  font-family: Georgia, 'Times New Roman', Times, serif;\n  margin-top: 2%;\n  margin-bottom: 2%; }\n\n.user-name {\n  color: white;\n  font: 1em Open-sans; }\n\n.grad {\n  margin-left: 10px;\n  padding-left: 10px;\n  margin-top: 10px;\n  --background: linear-gradient(\r\n  to bottom,\r\n  #0a5279 0%,\r\n  #80d3cb 100%)\r\n \r\n; }\n\n.space {\n  padding-bottom: 25px;\n  padding-left: 300px; }\n\n.avat {\n  width: 100% !important;\n  height: 100% !important;\n  max-width: 200px !important;\n  max-height: 200px !important; }\n\n.btn {\n  border-radius: 0.5%; }\n\n.myBackground {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  z-index: 999;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  background: #50b9b6; }\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIiwic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBWTtFQUNaLFdBQVc7RUFDWCxXQUFXLEVBQUE7O0FBR2Y7RUFDSSxrQkFBa0IsRUFBQTs7QUFFdEI7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLHlDQUF5QyxFQUFBOztBQU0zQztFQUNFLG9CQUFhO0VBQWIsYUFBYTtFQUNiLHdCQUF1QjtVQUF2Qix1QkFBdUIsRUFBQTs7QUFFekI7RUFDRSxXQUFVO0VBQ1YsWUFBVztFQUNYLGtCQUFpQjtFQUNqQixpREFBOEM7RUFDOUMsMENBQTBCO0VBQTFCLGtDQUEwQjtFQUExQiwwQkFBMEI7RUFBMUIsa0RBQTBCO0VBQzFCLG1CQUFtQjtFQUNuQixvQ0FBNEI7VUFBNUIsNEJBQTRCO0VBQzVCLGlCQUFnQjtFQUNoQixlQUFlLEVBQUE7O0FBR2pCO0VBQ0Usa0JBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQiwrQ0FBNEM7RUFDNUMsb0NBQTRCO1VBQTVCLDRCQUE0QjtFQUM1QixlQUFlO0VBQ2YsNEJBQTRCLEVBQUE7O0FBRTlCO0VBQ0UsVUFBUztFQUNULFdBQVc7RUFDWCxVQUFVLEVBQUE7O0FBR1o7RUFDRSxrQkFBa0I7RUFDbEIscURBQXFEO0VBQ3JELGNBQWE7RUFDYixpQkFBaUIsRUFBQTs7QUFFbkI7RUFDRSxZQUFZO0VBQ1osbUJBQW1CLEVBQUE7O0FBRXJCO0VBQ0UsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7O0FDTEYsRUFBRTs7QUFFRjtFREdlLG9CQUtkO0VDTkMsbUJBQW1CLEVBQUU7O0FBRXZCO0VEVUUsc0JBQ0Q7RUNUQyx1QkFBdUI7RURVekIsMkJBQUs7RUFDSCw0QkFBcUIsRUFBQTs7QUNQdkI7RURVRSxtQkFBWSxFQUFBOztBQUVkO0VBQ0Usa0JBQWU7RUNSZixXQUFXO0VEVWIsWUFBYTtFQUNYLFlBQVU7RUFDVixvQkFBVTtFQUFWLGFBQVU7RUFDVix5QkFBVztVQUFYLG1CQUFXO0VBQ1gsd0JBQVk7VUFBWix1QkFBWTtFQUNaLG1CQUFhLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnR7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbjogMHB4O1xyXG4gIH1cclxuXHJcbmlvbi1yb3d7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAtMSU7XHJcbn1cclxuLmJhY2tncm91bmR7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbiAgcGFkZGluZzogMHB4O1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvYXNzZXRzL3BhdGgtMS5wbmcpO1xyXG4gIFxyXG5cclxuICBcclxufVxyXG5cclxuLmNlbnRlcntcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcbi5tYWluLWNhcmQge1xyXG4gIHdpZHRoOjEwMCU7XHJcbiAgaGVpZ2h0OjEwMCU7XHJcbiAgcG9zaXRpb246cmVsYXRpdmU7XHJcbiAgYm94LXNoYWRvdzogMTBweCAxMHB4IDEwcHggMHB4IHJnYmEoMCwwLDAsMC41KTtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cztcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XHJcbiAgYmFja2dyb3VuZDp3aGl0ZTtcclxuICBtYXJnaW4tdG9wOiAxMCU7XHJcbiAgXHJcbn1cclxuLm1pbmktY2FyZHtcclxuICBwb3NpdGlvbjpyZWxhdGl2ZTtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIGJveC1zaGFkb3c6IDVweCA1cHggMTBweCAwcHggcmdiYSgwLDAsMCwwLjUpO1xyXG4gIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XHJcbiAgbWFyZ2luLXRvcDogMTAlO1xyXG4gIGJvcmRlcjogd2hpdGVzbW9rZSBzb2xpZCAycHg7XHJcbn1cclxuLmljb257XHJcbiAgd2lkdGg6MzUlO1xyXG4gIGhlaWdodDogMzUlO1xyXG4gIG1hcmdpbjogNSU7XHJcbiAgXHJcbn1cclxuLm1pZGRsZS10ZXh0e1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LWZhbWlseTogR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIFRpbWVzLCBzZXJpZjtcclxuICBtYXJnaW4tdG9wOjIlO1xyXG4gIG1hcmdpbi1ib3R0b206IDIlO1xyXG59XHJcbi51c2VyLW5hbWV7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGZvbnQ6IDFlbSBPcGVuLXNhbnM7XHJcbn1cclxuLmdyYWQgIHtcclxuICBtYXJnaW4tbGVmdDogMTBweDtcclxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICAtLWJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcclxuICB0byBib3R0b20sXHJcbiAgIzBhNTI3OSAwJSxcclxuICAjODBkM2NiIDEwMCUpXHJcbiBcclxufVxyXG5cclxuLnNwYWNle1xyXG4gIC8vICAgbWFyZ2luLXRvcDogMjAwcHg7XHJcbiAgLy8gICBtYXJnaW4tbGVmdDogMjAwO1xyXG4gcGFkZGluZy1ib3R0b206IDI1cHg7XHJcbiAgcGFkZGluZy1sZWZ0OjMwMHB4O1xyXG59XHJcbi5hdmF0e1xyXG4gIHdpZHRoOjEwMCUgIWltcG9ydGFudDsgIFxyXG4gIGhlaWdodCA6IDEwMCUgIWltcG9ydGFudDsgIFxyXG4gIG1heC13aWR0aDogMjAwcHggIWltcG9ydGFudDsgIC8vYW55IHNpemVcclxuICBtYXgtaGVpZ2h0OiAyMDBweCAhaW1wb3J0YW50OyAvL2FueSBzaXplIFxyXG59XHJcbi5idG57XHJcbiAgYm9yZGVyLXJhZGl1czogMC41JTtcclxufVxyXG4ubXlCYWNrZ3JvdW5ke1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB3aWR0aDoxMDAlO1xyXG4gIGhlaWdodDoxMDAlO1xyXG4gIHotaW5kZXg6IDk5OTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZDpyZ2IoODAsIDE4NSwgMTgyKTtcclxuICBcclxuICB9XHJcbiAgXHJcblxyXG5cclxuLy8gLy8gICBpb24tY29se1xyXG4vLyAvLyAgICAgICBiYWNrZ3JvdW5kOiBibHVlO1xyXG5cclxuLy8gLy8gfVxyXG4vLyAvLyBpb24tcm93e1xyXG4vLyAvLyAgICAgYmFja2dyb3VuZDogY2hhcnRyZXVzZTtcclxuLy8gLy8gfVxyXG4gIFxyXG4vLyAgICAgLy8gQGZvbnQtZmFjZSB7XHJcbi8vICAgICAvLyAgIGZvbnQtZmFtaWx5OiBnaWxiZXJ0X2JvbGQtcHJldmlldzU7XHJcbi8vICAgICAvLyAgIHNyYzogdXJsKGFzc2V0cy9naWxiZXJ0X2JvbGQtcHJldmlldzUudHRmKTtcclxuLy8gICAgIC8vIH1cclxuICAgIFxyXG5cclxuLy8gICAuaG9tZXBhZ2Uge1xyXG5cclxuLy8gICBkaXNwbGF5OiBibG9jaztcclxuLy8gICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBvdmVyZmxvdy14OiBhdXRvO1xyXG4vLyAgIG92ZXJmbG93LXk6IGF1dG87XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMzgsIDIzNSwgMjM1LCAxKTtcclxuLy8gICB3aWR0aDogMzc1LjAwcHg7XHJcbi8vIGhlaWdodDogODEyLjAwcHg7XHJcbi8vIGxlZnQ6IDBweDtcclxuLy8gdG9wOiAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmlja2V5Ym9hcmRyZXR1cm4yNHB4IHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgZmlsbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAxKTtcclxuLy8gICBib3gtc2hhZG93OiBub25lO1xyXG4vLyAgIHdpZHRoOiAxMDAlO1xyXG4vLyBoZWlnaHQ6IDEwMHB4O1xyXG4vLyBsZWZ0OiA1LjAwcHg7XHJcbi8vIHRvcDogOC4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC04IHtcclxuXHJcbi8vICAgZGlzcGxheTogYmxvY2s7XHJcbi8vICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbi8vICAgd2lkdGg6IDM3NS4wMHB4O1xyXG4vLyBoZWlnaHQ6IDIyNS4wMHB4O1xyXG4vLyBsZWZ0OiAtMy4wMHB4O1xyXG4vLyB0b3A6IDAuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtOCAucGF0aC0xIHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgZmlsbDogdHJhbnNwYXJlbnQ7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICB3aWR0aDogMzc1LjAwcHg7XHJcbi8vIGhlaWdodDogMjI1LjAwcHg7XHJcbi8vIGxlZnQ6IDAuMDBweDtcclxuLy8gdG9wOiAwLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTggLnRhbGluIHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBmaWxsOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHN0cm9rZTogcmdiYSgxMTIsIDExMiwgMTEyLCAxKTtcclxuLy8gICAgICAgc3Ryb2tlLXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgICAgIHN0cm9rZS1saW5lY2FwOiBidXR0O1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgd2lkdGg6IDEzNC4wMHB4O1xyXG4vLyBoZWlnaHQ6IDEzNy4wMHB4O1xyXG4vLyBsZWZ0OiAxMjEuMDBweDtcclxuLy8gdG9wOiAyMy4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC04IC51c2VyLW5hbWUge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsaW5lLWhlaWdodDogNTcuMDBweDtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMjIuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNDAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIEFyaWFsO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgd2hpdGUtc3BhY2U6IHByZTtcclxuLy8gICB3aWR0aDogMTEwLjAwcHg7XHJcbi8vIGhlaWdodDogMjUuMDBweDtcclxuLy8gbGVmdDogMTMzLjAwcHg7XHJcbi8vIHRvcDogMTUzLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIHtcclxuXHJcbi8vICAgZGlzcGxheTogYmxvY2s7XHJcbi8vICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbi8vICAgd2lkdGg6IDM1MC4wMHB4O1xyXG4vLyBoZWlnaHQ6IDQ2MC4wMHB4O1xyXG4vLyBsZWZ0OiAxMi4wMHB4O1xyXG4vLyB0b3A6IDMxNi4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0yMiAucmVjdGFuZ2xlLTYge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xyXG4vLyAgIGJvcmRlci1ib3R0b20tY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItYm90dG9tLXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLWxlZnQtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLWxlZnQtc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLWxlZnQtd2lkdGg6IDEuMDBweDtcclxuLy8gICBib3JkZXItcmlnaHQtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLXJpZ2h0LXN0eWxlOiBub25lO1xyXG4vLyAgIGJvcmRlci1yaWdodC13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci10b3AtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLXRvcC1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItdG9wLXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMC4wMHB4O1xyXG4vLyAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMC4wMHB4O1xyXG4vLyAgIC13ZWJraXQtZmlsdGVyOiBkcm9wLXNoYWRvdygxMHB4IDEwcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xNjA3ODQzMTM3MjU0OTAyKSk7XHJcbi8vIGZpbHRlcjogZHJvcC1zaGFkb3coMTBweCAxMHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMTYwNzg0MzEzNzI1NDkwMikpO1xyXG4vLyAgIHdpZHRoOiAxNjUuMDBweDtcclxuLy8gaGVpZ2h0OiAxNDAuMDBweDtcclxuLy8gbGVmdDogMC4wMHB4O1xyXG4vLyB0b3A6IDAuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMjIgLnJlY3RhbmdsZS02MSB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMSk7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogcmdiYSgxMTIsIDExMiwgMTEyLCAxKTtcclxuLy8gICBib3JkZXItYm90dG9tLXN0eWxlOiBub25lO1xyXG4vLyAgIGJvcmRlci1ib3R0b20td2lkdGg6IDEuMDBweDtcclxuLy8gICBib3JkZXItbGVmdC1jb2xvcjogcmdiYSgxMTIsIDExMiwgMTEyLCAxKTtcclxuLy8gICBib3JkZXItbGVmdC1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItbGVmdC13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci1yaWdodC1jb2xvcjogcmdiYSgxMTIsIDExMiwgMTEyLCAxKTtcclxuLy8gICBib3JkZXItcmlnaHQtc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLXRvcC1jb2xvcjogcmdiYSgxMTIsIDExMiwgMTEyLCAxKTtcclxuLy8gICBib3JkZXItdG9wLXN0eWxlOiBub25lO1xyXG4vLyAgIGJvcmRlci10b3Atd2lkdGg6IDEuMDBweDtcclxuLy8gICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMC4wMHB4O1xyXG4vLyAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMC4wMHB4O1xyXG4vLyAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwLjAwcHg7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwLjAwcHg7XHJcbi8vICAgLXdlYmtpdC1maWx0ZXI6IGRyb3Atc2hhZG93KDEwcHggMTBweCA2cHggcmdiYSgwLCAwLCAwLCAwLjE2MDc4NDMxMzcyNTQ5MDIpKTtcclxuLy8gZmlsdGVyOiBkcm9wLXNoYWRvdygxMHB4IDEwcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xNjA3ODQzMTM3MjU0OTAyKSk7XHJcbi8vICAgd2lkdGg6IDE2NS4wMHB4O1xyXG4vLyBoZWlnaHQ6IDE0MC4wMHB4O1xyXG4vLyBsZWZ0OiAwLjAwcHg7XHJcbi8vIHRvcDogMTYwLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5yZWN0YW5nbGUtNjIge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xyXG4vLyAgIGJvcmRlci1ib3R0b20tY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItYm90dG9tLXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLWxlZnQtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLWxlZnQtc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLWxlZnQtd2lkdGg6IDEuMDBweDtcclxuLy8gICBib3JkZXItcmlnaHQtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLXJpZ2h0LXN0eWxlOiBub25lO1xyXG4vLyAgIGJvcmRlci1yaWdodC13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci10b3AtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLXRvcC1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItdG9wLXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMC4wMHB4O1xyXG4vLyAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMC4wMHB4O1xyXG4vLyAgIC13ZWJraXQtZmlsdGVyOiBkcm9wLXNoYWRvdygxMHB4IDEwcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xNjA3ODQzMTM3MjU0OTAyKSk7XHJcbi8vIGZpbHRlcjogZHJvcC1zaGFkb3coMTBweCAxMHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMTYwNzg0MzEzNzI1NDkwMikpO1xyXG4vLyAgIHdpZHRoOiAxNjUuMDBweDtcclxuLy8gaGVpZ2h0OiAxNDAuMDBweDtcclxuLy8gbGVmdDogMTg1LjAwcHg7XHJcbi8vIHRvcDogMTYwLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5yZWN0YW5nbGUtNjMge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xyXG4vLyAgIGJvcmRlci1ib3R0b20tY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItYm90dG9tLXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLWxlZnQtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLWxlZnQtc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLWxlZnQtd2lkdGg6IDEuMDBweDtcclxuLy8gICBib3JkZXItcmlnaHQtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLXJpZ2h0LXN0eWxlOiBub25lO1xyXG4vLyAgIGJvcmRlci1yaWdodC13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci10b3AtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLXRvcC1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItdG9wLXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMC4wMHB4O1xyXG4vLyAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMC4wMHB4O1xyXG4vLyAgIC13ZWJraXQtZmlsdGVyOiBkcm9wLXNoYWRvdygxMHB4IDEwcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xNjA3ODQzMTM3MjU0OTAyKSk7XHJcbi8vIGZpbHRlcjogZHJvcC1zaGFkb3coMTBweCAxMHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMTYwNzg0MzEzNzI1NDkwMikpO1xyXG4vLyAgIHdpZHRoOiAxNjUuMDBweDtcclxuLy8gaGVpZ2h0OiAxNDAuMDBweDtcclxuLy8gbGVmdDogMC4wMHB4O1xyXG4vLyB0b3A6IDMyMC4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0yMiAucmVjdGFuZ2xlLTY0IHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAxKTtcclxuLy8gICBib3JkZXItYm90dG9tLWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1ib3R0b20tc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci1sZWZ0LWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1sZWZ0LXN0eWxlOiBub25lO1xyXG4vLyAgIGJvcmRlci1sZWZ0LXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1yaWdodC1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItcmlnaHQtd2lkdGg6IDEuMDBweDtcclxuLy8gICBib3JkZXItdG9wLWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci10b3Atc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLXRvcC13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDEwLjAwcHg7XHJcbi8vICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEwLjAwcHg7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICAtd2Via2l0LWZpbHRlcjogZHJvcC1zaGFkb3coMTBweCAxMHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMTYwNzg0MzEzNzI1NDkwMikpO1xyXG4vLyBmaWx0ZXI6IGRyb3Atc2hhZG93KDEwcHggMTBweCA2cHggcmdiYSgwLCAwLCAwLCAwLjE2MDc4NDMxMzcyNTQ5MDIpKTtcclxuLy8gICB3aWR0aDogMTY1LjAwcHg7XHJcbi8vIGhlaWdodDogMTQwLjAwcHg7XHJcbi8vIGxlZnQ6IDE4NS4wMHB4O1xyXG4vLyB0b3A6IDMyMC4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0yMiAuZ2VuZXJhdGUtY29kZSB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XHJcbi8vICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4vLyAgIGxpbmUtaGVpZ2h0OiA1Ny4wMHB4O1xyXG4vLyAgIGxldHRlci1zcGFjaW5nOiAwLjAwcHg7XHJcbi8vICAgY29sb3I6IHJnYmEoMTQzLCAyMDMsIDI1NSwgMSk7XHJcbi8vICAgLXdlYmtpdC10ZXh0LXN0cm9rZTogdW5zZXQ7XHJcbi8vICAgZm9udC1zaXplOiAyMi4wMHB4O1xyXG4vLyAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbi8vIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuLy8gICBmb250LWZhbWlseTogR2VvcmdpYSwgQXJpYWw7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICBvdmVyZmxvdy14OiB1bnNldDtcclxuLy8gICBvdmVyZmxvdy15OiB1bnNldDtcclxuLy8gICB3aGl0ZS1zcGFjZTogcHJlO1xyXG4vLyAgIHdpZHRoOiAxNDQuMDBweDtcclxuLy8gaGVpZ2h0OiAyNS4wMHB4O1xyXG4vLyBsZWZ0OiAxMC4wMHB4O1xyXG4vLyB0b3A6IDcyLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5hZGQtc2NoZWR1bGUge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsaW5lLWhlaWdodDogNTcuMDBweDtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDE0MywgMjAzLCAyNTUsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMjIuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNDAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIEFyaWFsO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgd2hpdGUtc3BhY2U6IHByZTtcclxuLy8gICB3aWR0aDogMTM0LjAwcHg7XHJcbi8vIGhlaWdodDogMjUuMDBweDtcclxuLy8gbGVmdDogMTUuMDBweDtcclxuLy8gdG9wOiAyMzUuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMjIgLmFkZC1mcmVldGltZXMge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsaW5lLWhlaWdodDogNTcuMDBweDtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDE0MywgMjAzLCAyNTUsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMjIuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNDAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIEFyaWFsO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgd2hpdGUtc3BhY2U6IHByZTtcclxuLy8gICB3aWR0aDogMTQzLjAwcHg7XHJcbi8vIGhlaWdodDogMjUuMDBweDtcclxuLy8gbGVmdDogMTk3LjAwcHg7XHJcbi8vIHRvcDogMjM1LjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5wYXRpZW50c2xpc3Qge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsaW5lLWhlaWdodDogMjUuMDBweDtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDE0MywgMjAzLCAyNTUsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMjIuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNDAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIEFyaWFsO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgd2hpdGUtc3BhY2U6IHByZTtcclxuLy8gICB3aWR0aDogODAuMDBweDtcclxuLy8gaGVpZ2h0OiA1MC4wMHB4O1xyXG4vLyBsZWZ0OiA0Mi4wMHB4O1xyXG4vLyB0b3A6IDQwMS4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0yMiAubWFzc2FnZXMge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsaW5lLWhlaWdodDogMjUuMDBweDtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDE0MywgMjAzLCAyNTUsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMjIuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNDAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIEFyaWFsO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgd2hpdGUtc3BhY2U6IHByZTtcclxuLy8gICB3aWR0aDogOTIuMDBweDtcclxuLy8gaGVpZ2h0OiAyNS4wMHB4O1xyXG4vLyBsZWZ0OiAyMjIuMDBweDtcclxuLy8gdG9wOiA0MDEuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMjIgLmljb24tbWFwLWhlYWx0aCB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGZpbGw6IHJnYmEoMTA5LCA4OSwgODksIDEpO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgd2lkdGg6IDQyLjY3cHg7XHJcbi8vIGhlaWdodDogNDQuMjNweDtcclxuLy8gbGVmdDogNjEuMDBweDtcclxuLy8gdG9wOiAxOS4zM3B4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0yMiAuZ3JvdXAtMTkge1xyXG5cclxuLy8gICBkaXNwbGF5OiBibG9jaztcclxuLy8gICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBvdmVyZmxvdy14OiB1bnNldDtcclxuLy8gICBvdmVyZmxvdy15OiB1bnNldDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuLy8gICB3aWR0aDogMTY1LjAwcHg7XHJcbi8vIGhlaWdodDogMTQwLjAwcHg7XHJcbi8vIGxlZnQ6IDE4NS4wMHB4O1xyXG4vLyB0b3A6IDAuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMjIgLmdyb3VwLTE5IC5yZWN0YW5nbGUtNjRkZThiM2UxIHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAxKTtcclxuLy8gICBib3JkZXItYm90dG9tLWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1ib3R0b20tc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci1sZWZ0LWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1sZWZ0LXN0eWxlOiBub25lO1xyXG4vLyAgIGJvcmRlci1sZWZ0LXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1yaWdodC1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItcmlnaHQtd2lkdGg6IDEuMDBweDtcclxuLy8gICBib3JkZXItdG9wLWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci10b3Atc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLXRvcC13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDEwLjAwcHg7XHJcbi8vICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEwLjAwcHg7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICAtd2Via2l0LWZpbHRlcjogZHJvcC1zaGFkb3coMTBweCAxMHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMTYwNzg0MzEzNzI1NDkwMikpO1xyXG4vLyBmaWx0ZXI6IGRyb3Atc2hhZG93KDEwcHggMTBweCA2cHggcmdiYSgwLCAwLCAwLCAwLjE2MDc4NDMxMzcyNTQ5MDIpKTtcclxuLy8gICB3aWR0aDogMTY1LjAwcHg7XHJcbi8vIGhlaWdodDogMTQwLjAwcHg7XHJcbi8vIGxlZnQ6IDAuMDBweDtcclxuLy8gdG9wOiAwLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5ncm91cC0xOSAuc2NoZWR1bGUge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsaW5lLWhlaWdodDogMjUuMDBweDtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDE0MywgMjAzLCAyNTUsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMjIuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNDAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIEFyaWFsO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgd2hpdGUtc3BhY2U6IHByZTtcclxuLy8gICB3aWR0aDogOTAuMDBweDtcclxuLy8gaGVpZ2h0OiAyNS4wMHB4O1xyXG4vLyBsZWZ0OiAzOC4wMHB4O1xyXG4vLyB0b3A6IDgxLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5ncm91cC0xOSAuaWNvbi1tYXRlcmlhbC1zY2hlZHVsZSB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGZpbGw6IHJnYmEoMTA5LCA4OSwgODksIDEpO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgd2lkdGg6IDQxLjMzcHg7XHJcbi8vIGhlaWdodDogNDMuNjdweDtcclxuLy8gbGVmdDogNjIuMDBweDtcclxuLy8gdG9wOiAxNC4zM3B4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0yMiAuaWNvbi1pb25pYy1pb3MtYWRkLWNpcmNsZS1vdXRsaW5lIHtcclxuXHJcbi8vICAgZGlzcGxheTogYmxvY2s7XHJcbi8vICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbi8vICAgd2lkdGg6IDQ1LjAwcHg7XHJcbi8vIGhlaWdodDogNDUuMDBweDtcclxuLy8gbGVmdDogMjQ2LjAwcHg7XHJcbi8vIHRvcDogMTgzLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5pY29uLWlvbmljLWlvcy1hZGQtY2lyY2xlLW91dGxpbmUgLnBhdGgtMiB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGZpbGw6IHJnYmEoMTA5LCA4OSwgODksIDEpO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgd2lkdGg6IDEwLjczcHg7XHJcbi8vIGhlaWdodDogMTAuNzNweDtcclxuLy8gbGVmdDogMTcuMTRweDtcclxuLy8gdG9wOiAxNy4xNHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0yMiAuaWNvbi1pb25pYy1pb3MtYWRkLWNpcmNsZS1vdXRsaW5lIC5wYXRoLTMge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBmaWxsOiByZ2JhKDEwOSwgODksIDg5LCAxKTtcclxuLy8gICBib3gtc2hhZG93OiBub25lO1xyXG4vLyAgIHdpZHRoOiA0NS4wMHB4O1xyXG4vLyBoZWlnaHQ6IDQ1LjAwcHg7XHJcbi8vIGxlZnQ6IDAuMDBweDtcclxuLy8gdG9wOiAwLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5pY29uLWlvbmljLWlvcy1hZGQtY2lyY2xlLW91dGxpbmUxIHtcclxuXHJcbi8vICAgZGlzcGxheTogYmxvY2s7XHJcbi8vICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbi8vICAgd2lkdGg6IDQ1LjAwcHg7XHJcbi8vIGhlaWdodDogNDUuMDBweDtcclxuLy8gbGVmdDogNTguMDBweDtcclxuLy8gdG9wOiAxODMuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMjIgLmljb24taW9uaWMtaW9zLWFkZC1jaXJjbGUtb3V0bGluZTEgLnBhdGgtMmIxYzAzN2Q2IHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgZmlsbDogcmdiYSgxMDksIDg5LCA4OSwgMSk7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICB3aWR0aDogMTAuNzNweDtcclxuLy8gaGVpZ2h0OiAxMC43M3B4O1xyXG4vLyBsZWZ0OiAxNy4xNHB4O1xyXG4vLyB0b3A6IDE3LjE0cHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5pY29uLWlvbmljLWlvcy1hZGQtY2lyY2xlLW91dGxpbmUxIC5wYXRoLTNiOGQxODJiZCB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGZpbGw6IHJnYmEoMTA5LCA4OSwgODksIDEpO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgd2lkdGg6IDQ1LjAwcHg7XHJcbi8vIGhlaWdodDogNDUuMDBweDtcclxuLy8gbGVmdDogMC4wMHB4O1xyXG4vLyB0b3A6IDAuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMjIgLmljb24tYXdlc29tZS1saXN0IHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgZmlsbDogcmdiYSgxMDksIDg5LCA4OSwgMSk7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICB3aWR0aDogMzYuMDBweDtcclxuLy8gaGVpZ2h0OiAyOS4yNXB4O1xyXG4vLyBsZWZ0OiA2Mi4wMHB4O1xyXG4vLyB0b3A6IDM0OS4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0yMiAuaWNvbi1hd2Vzb21lLWxpc3QxIHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgZmlsbDogcmdiYSgxMDksIDg5LCA4OSwgMSk7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICB3aWR0aDogMzYuMDBweDtcclxuLy8gaGVpZ2h0OiAyOS4yNXB4O1xyXG4vLyBsZWZ0OiAyNTAuMDBweDtcclxuLy8gdG9wOiAzNDkuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuaWNvbi1vcGVuLWFjY291bnQtbG9nb3V0IHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgZmlsbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAxKTtcclxuLy8gICBib3gtc2hhZG93OiBub25lO1xyXG4vLyAgIHdpZHRoOiAyNC4wMHB4O1xyXG4vLyBoZWlnaHQ6IDIwLjUwcHg7XHJcbi8vIGxlZnQ6IDUuMDBweDtcclxuLy8gdG9wOiAxMS4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5sb2dvdXQge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMTYuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNzAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IGdpbGJlcnRfYm9sZC1wcmV2aWV3NSwgQXJpYWw7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICBvdmVyZmxvdy14OiB1bnNldDtcclxuLy8gICBvdmVyZmxvdy15OiB1bnNldDtcclxuLy8gICB3aGl0ZS1zcGFjZTogcHJlO1xyXG4vLyAgIHdpZHRoOiA0MC4wMHB4O1xyXG4vLyBoZWlnaHQ6IDIxLjAwcHg7XHJcbi8vIGxlZnQ6IDMzLjAwcHg7XHJcbi8vIHRvcDogMTAuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMTgge1xyXG5cclxuLy8gICBkaXNwbGF5OiBibG9jaztcclxuLy8gICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBvdmVyZmxvdy14OiB1bnNldDtcclxuLy8gICBvdmVyZmxvdy15OiB1bnNldDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuLy8gICB3aWR0aDogMzQ0LjAwcHg7XHJcbi8vIGhlaWdodDogOTMuMDBweDtcclxuLy8gbGVmdDogMTUuMDBweDtcclxuLy8gdG9wOiAxOTguMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMTggLng0NTgxNyB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMC41Nzk5OTk5ODMzMTA2OTk1O1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBmaWxsOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xyXG4vLyAgIHN0cm9rZTogcmdiYSgxMTIsIDExMiwgMTEyLCAxKTtcclxuLy8gICAgICAgc3Ryb2tlLXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgICAgIHN0cm9rZS1saW5lY2FwOiBidXR0O1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgd2lkdGg6IDMzNi4wMHB4O1xyXG4vLyBoZWlnaHQ6IDkzLjAwcHg7XHJcbi8vIGxlZnQ6IDAuMDBweDtcclxuLy8gdG9wOiAwLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTE4IC5yZXBlYXQtZ3JpZC02IHtcclxuXHJcbi8vICAgZGlzcGxheTogYmxvY2s7XHJcbi8vICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgb3ZlcmZsb3cteDogYXV0bztcclxuLy8gICBvdmVyZmxvdy15OiBhdXRvO1xyXG4vLyAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4vLyAgIHdpZHRoOiAzMjQuMDBweDtcclxuLy8gaGVpZ2h0OiAxOS4wMHB4O1xyXG4vLyBsZWZ0OiAyMC4wMHB4O1xyXG4vLyB0b3A6IDYyLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTE4IC5yZXBlYXQtZ3JpZC02IC54NzJicyB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XHJcbi8vICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4vLyAgIGxldHRlci1zcGFjaW5nOiAwLjAwcHg7XHJcbi8vICAgY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgLXdlYmtpdC10ZXh0LXN0cm9rZTogdW5zZXQ7XHJcbi8vICAgZm9udC1zaXplOiAxNi4wMHB4O1xyXG4vLyAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbi8vIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuLy8gICBmb250LWZhbWlseTogR2VvcmdpYSwgQXJpYWw7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICBvdmVyZmxvdy14OiB1bnNldDtcclxuLy8gICBvdmVyZmxvdy15OiB1bnNldDtcclxuLy8gICB3aGl0ZS1zcGFjZTogcHJlO1xyXG4vLyAgIHdpZHRoOiA0MC4wMHB4O1xyXG4vLyBoZWlnaHQ6IDE5LjAwcHg7XHJcbi8vIGxlZnQ6IC0xLjAwcHg7XHJcbi8vIHRvcDogMC4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0xOCAucmVwZWF0LWdyaWQtNiAueDY1a2cge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMTYuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNDAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIEFyaWFsO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgd2hpdGUtc3BhY2U6IHByZTtcclxuLy8gICB3aWR0aDogMzQuMDBweDtcclxuLy8gaGVpZ2h0OiAxOS4wMHB4O1xyXG4vLyBsZWZ0OiA3MC4wMHB4O1xyXG4vLyB0b3A6IDAuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMTggLnJlcGVhdC1ncmlkLTYgLngxNjJjbSB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XHJcbi8vICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4vLyAgIGxldHRlci1zcGFjaW5nOiAwLjAwcHg7XHJcbi8vICAgY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgLXdlYmtpdC10ZXh0LXN0cm9rZTogdW5zZXQ7XHJcbi8vICAgZm9udC1zaXplOiAxNi4wMHB4O1xyXG4vLyAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbi8vIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuLy8gICBmb250LWZhbWlseTogR2VvcmdpYSwgQXJpYWw7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICBvdmVyZmxvdy14OiB1bnNldDtcclxuLy8gICBvdmVyZmxvdy15OiB1bnNldDtcclxuLy8gICB3aGl0ZS1zcGFjZTogcHJlO1xyXG4vLyAgIHdpZHRoOiA0Ni4wMHB4O1xyXG4vLyBoZWlnaHQ6IDE5LjAwcHg7XHJcbi8vIGxlZnQ6IDEzMi4wMHB4O1xyXG4vLyB0b3A6IDAuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMTggLnJlcGVhdC1ncmlkLTYgLm1hbGUge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMTYuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNDAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIEFyaWFsO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgd2hpdGUtc3BhY2U6IHByZTtcclxuLy8gICB3aWR0aDogMzQuMDBweDtcclxuLy8gaGVpZ2h0OiAxOS4wMHB4O1xyXG4vLyBsZWZ0OiAyMDYuMDBweDtcclxuLy8gdG9wOiAwLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTE4IC5yZXBlYXQtZ3JpZC02IC5vIHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwKTtcclxuLy8gICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbi8vICAgbGV0dGVyLXNwYWNpbmc6IDAuMDBweDtcclxuLy8gICBjb2xvcjogcmdiYSgxMTIsIDExMiwgMTEyLCAxKTtcclxuLy8gICAtd2Via2l0LXRleHQtc3Ryb2tlOiB1bnNldDtcclxuLy8gICBmb250LXNpemU6IDE2LjAwcHg7XHJcbi8vICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuLy8gZm9udC1zdHlsZTogbm9ybWFsO1xyXG4vLyAgIGZvbnQtZmFtaWx5OiBHZW9yZ2lhLCBBcmlhbDtcclxuLy8gICBib3gtc2hhZG93OiBub25lO1xyXG4vLyAgIG92ZXJmbG93LXg6IHVuc2V0O1xyXG4vLyAgIG92ZXJmbG93LXk6IHVuc2V0O1xyXG4vLyAgIHdoaXRlLXNwYWNlOiBwcmU7XHJcbi8vICAgd2lkdGg6IDIwLjAwcHg7XHJcbi8vIGhlaWdodDogMTkuMDBweDtcclxuLy8gbGVmdDogMjgxLjAwcHg7XHJcbi8vIHRvcDogMC4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0xOCAucmVwZWF0LWdyaWQtNyB7XHJcblxyXG4vLyAgIGRpc3BsYXk6IGJsb2NrO1xyXG4vLyAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIG92ZXJmbG93LXg6IGF1dG87XHJcbi8vICAgb3ZlcmZsb3cteTogYXV0bztcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuLy8gICB3aWR0aDogMzEwLjAwcHg7XHJcbi8vIGhlaWdodDogMzkuNzVweDtcclxuLy8gbGVmdDogMTMuMDBweDtcclxuLy8gdG9wOiAxMS4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0xOCAucmVwZWF0LWdyaWQtNyAucmVwZWF0LWdyaWQtNzBjM2Q4OWQ5IHtcclxuXHJcbi8vICAgZGlzcGxheTogYmxvY2s7XHJcbi8vICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4vLyAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuLy8gICB3aWR0aDogMzEwLjAwcHg7XHJcbi8vIGhlaWdodDogMzkuNzVweDtcclxuLy8gbGVmdDogMC4wMHB4O1xyXG4vLyB0b3A6IDAuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMTggLnJlcGVhdC1ncmlkLTcgLnJlcGVhdC1ncmlkLTcwYzNkODlkOSAuaWNvbi1hd2Vzb21lLWhlYXJ0YmVhdCB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGZpbGw6IHJnYmEoODcsIDE3MywgMCwgMSk7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICB3aWR0aDogMzYuMDBweDtcclxuLy8gaGVpZ2h0OiAzMS41MHB4O1xyXG4vLyBsZWZ0OiAwLjAwcHg7XHJcbi8vIHRvcDogOC4yNXB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0xOCAucmVwZWF0LWdyaWQtNyAucmVwZWF0LWdyaWQtNzBjM2Q4OWQ5IC5pY29uLWF3ZXNvbWUtd2VpZ2h0IHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgZmlsbDogcmdiYSg4NywgMTczLCAwLCAxKTtcclxuLy8gICBib3gtc2hhZG93OiBub25lO1xyXG4vLyAgIHdpZHRoOiAzNi4wMHB4O1xyXG4vLyBoZWlnaHQ6IDM2LjAwcHg7XHJcbi8vIGxlZnQ6IDcxLjk5cHg7XHJcbi8vIHRvcDogMi4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0xOCAucmVwZWF0LWdyaWQtNyAucmVwZWF0LWdyaWQtNzBjM2Q4OWQ5IC5pY29uLWF3ZXNvbWUtdGFwZSB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGZpbGw6IHJnYmEoODcsIDE3MywgMCwgMSk7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICB3aWR0aDogNDUuMDBweDtcclxuLy8gaGVpZ2h0OiAzMS41MHB4O1xyXG4vLyBsZWZ0OiAxMzguMjRweDtcclxuLy8gdG9wOiAyLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTE4IC5yZXBlYXQtZ3JpZC03IC5yZXBlYXQtZ3JpZC03MGMzZDg5ZDkgLmljb24tYXdlc29tZS10cmFuc2dlbmRlci1hbHQge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBmaWxsOiByZ2JhKDg3LCAxNzMsIDAsIDEpO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgd2lkdGg6IDMzLjc1cHg7XHJcbi8vIGhlaWdodDogMzYuMDBweDtcclxuLy8gbGVmdDogMjA3LjA1cHg7XHJcbi8vIHRvcDogMi43NXB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0xOCAucmVwZWF0LWdyaWQtNyAucmVwZWF0LWdyaWQtNzBjM2Q4OWQ5IC5vdXRwdXQtb25saW5lcG5ndG9vbHMtMSB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcInNyYy9hc3NldHMvb3V0cHV0LW9ubGluZXBuZ3Rvb2xzLTEucG5nXCIpO1xyXG4vLyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbi8vIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbi8vIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwKTtcclxuLy8gICBib3JkZXItYm90dG9tLWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1ib3R0b20tc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci1sZWZ0LWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1sZWZ0LXN0eWxlOiBub25lO1xyXG4vLyAgIGJvcmRlci1sZWZ0LXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1yaWdodC1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItcmlnaHQtd2lkdGg6IDEuMDBweDtcclxuLy8gICBib3JkZXItdG9wLWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci10b3Atc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLXRvcC13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDAuMDBweDtcclxuLy8gICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMC4wMHB4O1xyXG4vLyAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDAuMDBweDtcclxuLy8gICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMC4wMHB4O1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgd2lkdGg6IDM5LjAwcHg7XHJcbi8vIGhlaWdodDogMzkuMDBweDtcclxuLy8gbGVmdDogMjcxLjAwcHg7XHJcbi8vIHRvcDogMC4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC54MzdkZjY2ZjYge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMTYuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNzAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IGdpbGJlcnRfYm9sZC1wcmV2aWV3NSwgQXJpYWw7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICBvdmVyZmxvdy14OiB1bnNldDtcclxuLy8gICBvdmVyZmxvdy15OiB1bnNldDtcclxuLy8gICB3aGl0ZS1zcGFjZTogcHJlO1xyXG4vLyAgIHdpZHRoOiA2LjAwcHg7XHJcbi8vIGhlaWdodDogMjEuMDBweDtcclxuLy8gbGVmdDogMTg3LjAwcHg7XHJcbi8vIHRvcDogMjU2LjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4iLCJpb24tY29udGVudCB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMHB4OyB9XG5cbmlvbi1yb3cge1xuICBtYXJnaW4tYm90dG9tOiAtMSU7IH1cblxuLmJhY2tncm91bmQge1xuICBtYXJnaW46IDBweDtcbiAgcGFkZGluZzogMHB4O1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL2Fzc2V0cy9wYXRoLTEucG5nKTsgfVxuXG4uY2VudGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cblxuLm1haW4tY2FyZCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm94LXNoYWRvdzogMTBweCAxMHB4IDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXM7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBtYXJnaW4tdG9wOiAxMCU7IH1cblxuLm1pbmktY2FyZCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgYm94LXNoYWRvdzogNXB4IDVweCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XG4gIG1hcmdpbi10b3A6IDEwJTtcbiAgYm9yZGVyOiB3aGl0ZXNtb2tlIHNvbGlkIDJweDsgfVxuXG4uaWNvbiB7XG4gIHdpZHRoOiAzNSU7XG4gIGhlaWdodDogMzUlO1xuICBtYXJnaW46IDUlOyB9XG5cbi5taWRkbGUtdGV4dCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1mYW1pbHk6IEdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBUaW1lcywgc2VyaWY7XG4gIG1hcmdpbi10b3A6IDIlO1xuICBtYXJnaW4tYm90dG9tOiAyJTsgfVxuXG4udXNlci1uYW1lIHtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250OiAxZW0gT3Blbi1zYW5zOyB9XG5cbi5ncmFkIHtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgLS1iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXHJcbiAgdG8gYm90dG9tLFxyXG4gICMwYTUyNzkgMCUsXHJcbiAgIzgwZDNjYiAxMDAlKVxyXG4gXHJcbjsgfVxuXG4uc3BhY2Uge1xuICBwYWRkaW5nLWJvdHRvbTogMjVweDtcbiAgcGFkZGluZy1sZWZ0OiAzMDBweDsgfVxuXG4uYXZhdCB7XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogMTAwJSAhaW1wb3J0YW50O1xuICBtYXgtd2lkdGg6IDIwMHB4ICFpbXBvcnRhbnQ7XG4gIG1heC1oZWlnaHQ6IDIwMHB4ICFpbXBvcnRhbnQ7IH1cblxuLmJ0biB7XG4gIGJvcmRlci1yYWRpdXM6IDAuNSU7IH1cblxuLm15QmFja2dyb3VuZCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgei1pbmRleDogOTk5O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogIzUwYjliNjsgfVxuIl19 */");

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NavService/navigation.service */ "./src/app/home/NavService/navigation.service.ts");
/* harmony import */ var _services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/datastream/datastreaming.service */ "./src/app/services/datastream/datastreaming.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _HttPService_http_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HttPService/http.service */ "./src/app/home/HttPService/http.service.ts");






let HomePage = class HomePage {
    constructor(navigation, datastream, http, addController, docList) {
        this.navigation = navigation;
        this.datastream = datastream;
        this.http = http;
        this.addController = addController;
        this.docList = docList;
    }
    getDocList() {
        const token = this.datastream.getToken();
        console.log("Token to get patient list in home page: ", token);
    }
    NavigateMe(path) {
        this.navigation.navigateTo(path);
        console.log("navigate to ", path);
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
    addPatient() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = this.addController.create({
                header: 'Add your Patient',
                animated: true,
                message: 'Enter patient mobile number',
                inputs: [{
                        type: "text",
                        name: 'val',
                        value: ""
                    }],
                cssClass: "Dark",
                buttons: [{
                        text: 'Add',
                        handler: (data) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                            let token = this.datastream.getToken();
                            let mobile = data.val.replace(/^0+/, '');
                            mobile = "+20" + mobile;
                            console.log("Phone Number: " + mobile);
                            this.http.addPatient(mobile, token).subscribe(response => {
                                console.log("resoince add");
                                //  this.showSplash = true;
                                //  timer(10000).subscribe(()=> this.showSplash = false);
                                console.log('HTTP request completed.' + response.toString());
                            }, err => {
                                let errorMessage = "";
                                if (err.error.message == null) {
                                    errorMessage = "Error in Connection";
                                }
                                else {
                                    errorMessage = err.error.message;
                                }
                                console.log('HTTP Add Patient Error: ', errorMessage);
                                this.presentAlert('HTTP Error: ', errorMessage);
                                // this.presentAlert('HTTP Add Patient Error: ', err.error.message);
                            }, () => {
                                console.log('HTTP to ADD Patient request completed.');
                                this.navigation.navigateTo('home/doctorList');
                            });
                        })
                    },
                    { text: 'Cancel',
                        role: 'cancel'
                    }
                ]
            });
            (yield alert).present();
        });
    }
    newMessage() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const actionSheet = yield this.docList.create({
                header: 'Message Type',
                buttons: [{
                        text: 'Text',
                        // role: 'destructive',
                        icon: 'chatbubbles',
                        handler: () => {
                            console.log('Delete clicked');
                            this.navigation.navigateTo("home/message");
                        }
                    }, {
                        text: 'Voice Call',
                        icon: 'call',
                        handler: () => {
                            console.log('Share clicked');
                        }
                    }, {
                        text: 'Video Call',
                        icon: 'camera',
                        handler: () => {
                            console.log('Play clicked');
                        }
                    }
                ]
            });
            yield actionSheet.present();
        });
    }
};
HomePage.ctorParameters = () => [
    { type: _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"] },
    { type: _services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_3__["DatastreamingService"] },
    { type: _HttPService_http_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ActionSheetController"] }
];
HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./home.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"],
        _services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_3__["DatastreamingService"],
        _HttPService_http_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ActionSheetController"]])
], HomePage);



/***/ }),

/***/ "./src/app/home/message/message.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/home/message/message.component.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".cont {\n  background-color: white;\n  height: 100%;\n  width: 100%; }\n\n.loader {\n  position: absolute;\n  margin-top: 20%;\n  margin-left: 22%;\n  height: 100%;\n  width: 100%; }\n\n.typing {\n  width: 100%;\n  border: thick solid #3cb8b8;\n  border-radius: 20%;\n  resize: none;\n  margin-bottom: 20%; }\n\n.sub {\n  width: 100%;\n  border: thick solid #3cb8b8;\n  border-radius: 20%; }\n\n.spaces {\n  margin-top: 120%; }\n\n.btn {\n  margin-bottom: 100%;\n  --padding-start:1em;\n  --padding-end: 1em;\n  color: #3cb8b8; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9ob21lL21lc3NhZ2UvbWVzc2FnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHVCQUFzQjtFQUN0QixZQUFZO0VBQ1osV0FBVyxFQUFBOztBQU1iO0VBRUUsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLFdBQVcsRUFBQTs7QUEyQ2I7RUFDSSxXQUFXO0VBQ1gsMkJBQXNDO0VBQ3RDLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osa0JBQWtCLEVBQUE7O0FBR3RCO0VBQ0ksV0FBVztFQUNYLDJCQUFzQztFQUN0QyxrQkFBa0IsRUFBQTs7QUFFdEI7RUFDSSxnQkFBZ0IsRUFBQTs7QUFFcEI7RUFFSSxtQkFBbUI7RUFDbkIsbUJBQWdCO0VBQ2hCLGtCQUFjO0VBQ2QsY0FBd0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2hvbWUvbWVzc2FnZS9tZXNzYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnR7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIFxyXG4gIC5sb2FkZXIge1xyXG4gICBcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIG1hcmdpbi10b3A6IDIwJTtcclxuICAgIG1hcmdpbi1sZWZ0OiAyMiU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbi8vICAgLmRvY0J1dHRvbntcclxuLy8gICAgICAgd2lkdGg6IDIwJTtcclxuLy8gICB9XHJcbiAgXHJcbiAgLy8gLmxpbmUge1xyXG4gIC8vICAgYW5pbWF0aW9uOiBleHBhbmQgMXMgZWFzZS1pbi1vdXQgaW5maW5pdGU7XHJcbiAgLy8gICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIC8vICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIC8vICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGNlbnRlcjtcclxuICAvLyAgIG1hcmdpbjogMCAyMHB4O1xyXG4gIC8vICAgd2lkdGg6IDIwcHg7XHJcbiAgLy8gICBoZWlnaHQ6IDcwcHg7XHJcbiAgLy8gfVxyXG4gIFxyXG4gIC8vIC5saW5lOm50aC1jaGlsZCgxKSB7XHJcbiAgLy8gICBiYWNrZ3JvdW5kOiAjYjZmM2NmO1xyXG4gIC8vIH1cclxuICBcclxuICAvLyAubGluZTpudGgtY2hpbGQoMikge1xyXG4gIC8vICAgYW5pbWF0aW9uLWRlbGF5OiAxODBtcztcclxuICAvLyAgIGJhY2tncm91bmQ6ICMzZGVhZjA7XHJcbiAgLy8gfVxyXG4gIFxyXG4gIC8vIC5saW5lOm50aC1jaGlsZCgzKSB7XHJcbiAgLy8gICBhbmltYXRpb24tZGVsYXk6IDM2MG1zO1xyXG4gIC8vICAgYmFja2dyb3VuZDogIzlhZDE4NDtcclxuICAvLyB9XHJcbiAgXHJcbiAgLy8gLmxpbmU6bnRoLWNoaWxkKDQpIHtcclxuICAvLyAgIGFuaW1hdGlvbi1kZWxheTogNTQwbXM7XHJcbiAgLy8gICBiYWNrZ3JvdW5kOiAjMGI5OWEzO1xyXG4gIC8vIH1cclxuICBcclxuICAvLyBAa2V5ZnJhbWVzIGV4cGFuZCB7XHJcbiAgLy8gICAwJSB7XHJcbiAgLy8gICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gICAyNSUge1xyXG4gIC8vICAgICB0cmFuc2Zvcm06IHNjYWxlKDIpO1xyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxuICAudHlwaW5ne1xyXG4gICAgICB3aWR0aCA6MTAwJTtcclxuICAgICAgYm9yZGVyOiB0aGljayBzb2xpZCAgcmdiKDYwLCAxODQsIDE4NCk7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDIwJTtcclxuICAgICAgcmVzaXplOiBub25lO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAyMCU7XHJcblxyXG4gIH1cclxuICAuc3Vie1xyXG4gICAgICB3aWR0aCA6MTAwJTtcclxuICAgICAgYm9yZGVyOiB0aGljayBzb2xpZCAgcmdiKDYwLCAxODQsIDE4NCk7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDIwJTtcclxuICB9XHJcbiAgLnNwYWNlc3tcclxuICAgICAgbWFyZ2luLXRvcDogMTIwJTtcclxuICB9XHJcbiAgLmJ0bntcclxuICAgIC8vICAgbWFyZ2luLXJpZ2h0OiAxMDAlO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxMDAlO1xyXG4gICAgICAtLXBhZGRpbmctc3RhcnQ6MWVtO1xyXG4gICAgICAtLXBhZGRpbmctZW5kOiAxZW07XHJcbiAgICAgIGNvbG9yOiByZ2IoNjAsIDE4NCwgMTg0KTtcclxuICB9XHJcbiAgXHJcbiAgXHJcblxyXG4gICJdfQ== */");

/***/ }),

/***/ "./src/app/home/message/message.component.ts":
/*!***************************************************!*\
  !*** ./src/app/home/message/message.component.ts ***!
  \***************************************************/
/*! exports provided: MessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageComponent", function() { return MessageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/datacommunication/interaction.service */ "./src/app/services/datacommunication/interaction.service.ts");
/* harmony import */ var _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../NavService/navigation.service */ "./src/app/home/NavService/navigation.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _HttPService_http_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../HttPService/http.service */ "./src/app/home/HttPService/http.service.ts");
/* harmony import */ var src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/datastream/datastreaming.service */ "./src/app/services/datastream/datastreaming.service.ts");







let MessageComponent = class MessageComponent {
    constructor(navigation, 
    // private docList:ActionSheetController,
    addController, interactiveCommunication, httpService, doctorDataStream) {
        this.navigation = navigation;
        this.addController = addController;
        this.interactiveCommunication = interactiveCommunication;
        this.httpService = httpService;
        this.doctorDataStream = doctorDataStream;
        this.newMessages = [];
    }
    ngOnInit() {
        this.doctorId = this.doctorDataStream.getDoctorId();
        this.doctorName = this.doctorDataStream.getDoctorName();
        const that = this;
        this.interactiveCommunication.data.subscribe((docData) => {
            that.patientRow = docData;
            console.log("doc data ", docData);
            console.log(this.patientRow);
            that.setDocList();
        });
        // this.Reciever_from_dr_list="Dr.Mahmoud"
        this.Content_from_text_area = "";
        this.Subject_from_input = "";
        // this.Reciever_from_dr_list="";
    }
    setDocList() {
        // this.eachDoctorData=this.doctorRow;
        console.log("type each patient data is " + typeof (this.patientRow));
        console.log("Name: " + this.patientRow.name);
        this.Reciever_from_pat_list = this.patientRow.name;
        console.log("Reciever_from_pat_list: " + this.Reciever_from_pat_list);
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
    send() {
        if (this.Reciever_from_pat_list == "" || this.Content_from_text_area == "" || this.Subject_from_input == "") {
            this.presentAlert('Can not send message', "Make sure you typed your Subject, Message and choose your Patient.");
        }
        else {
            this.thread = {
                reciever_id: this.patientRow.patientId,
                msg_subject: this.Subject_from_input,
                is_readed: 0,
                reciever_name: this.Reciever_from_pat_list,
                sender_name: this.doctorName,
                msg_body: this.Content_from_text_area
            };
            this.newMessages.push(this.thread);
            console.log(this.Content_from_text_area);
            console.log(this.newMessages);
            //post new message in data base
            this.data = {
                sender_id: this.doctorId,
                reciever_id: this.thread.reciever_id,
                msg_body: this.thread.msg_body,
                thread_subject: this.Subject_from_input,
                fcm_token: this.patientRow.fcmtoken
            };
            //  console.log("tthread"+this.thread.reciever_name)
            //  console.log("data"+this.data.sender_id)
            this.httpService.postThread(this.thread, this.doctorId).subscribe((res) => {
                console.log("new thread data", res);
                this.interactiveCommunication.getThreadIdfromMessageorConvListtoChat(res.insertId);
                console.log("hey tehre:", this.data);
                this.httpService.postReply(this.data, res.insertId).subscribe((msg) => {
                    console.log("heyyyyloo");
                    console.log("first thread message", msg);
                    console.log("NAVIGATIOM11");
                    this.navigation.navigateTo('home/chat');
                });
            });
            //send message content to chat component
            this.interactiveCommunication.sendMSG(this.newMessages);
            console.log("NAVIGATIOM");
        }
        console.log(this.Content_from_text_area);
    }
};
MessageComponent.ctorParameters = () => [
    { type: _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_3__["NavigationService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] },
    { type: src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_2__["InteractionService"] },
    { type: _HttPService_http_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"] },
    { type: src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_6__["DatastreamingService"] }
];
MessageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-message',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./message.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/message/message.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./message.component.scss */ "./src/app/home/message/message.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_3__["NavigationService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"],
        src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_2__["InteractionService"],
        _HttPService_http_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"],
        src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_6__["DatastreamingService"]])
], MessageComponent);



/***/ }),

/***/ "./src/app/home/patient-profile/patient-profile.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/home/patient-profile/patient-profile.component.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-toolbar {\n  --background: #2cc67b;\n  color: white;\n  font-family: Georgia, 'Times New Roman', Times, serif; }\n\n.profile-img-frame {\n  display: -webkit-box;\n  display: flex;\n  align-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  width: 120px;\n  height: 120px;\n  min-height: 70px;\n  min-width: 70px;\n  margin: 1em auto;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center center;\n  border-radius: 50%;\n  box-shadow: inset 0 0 0 5px white; }\n\n.profile-img-holder {\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 50%;\n  background-color: #2cc67b;\n  max-width: 100px;\n  max-height: 100px;\n  min-width: 70px;\n  min-height: 70px;\n  overflow: hidden; }\n\n.profile-img {\n  display: inline;\n  width: 100%;\n  height: auto; }\n\nion-col {\n  display: -webkit-box;\n  display: flex;\n  align-content: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  background-repeat: no-repeat;\n  -webkit-box-align: center;\n          align-items: center; }\n\n.element {\n  background-color: #2cc67b;\n  border-radius: 50%;\n  display: -webkit-box;\n  display: flex;\n  height: 50px;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  align-content: center;\n  width: 50px;\n  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25), -8px -8px 12px 0 rgba(255, 255, 255, 0.3); }\n\n.personal-data {\n  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.3), -8px -8px 12px 0 rgba(255, 255, 255, 0.3);\n  z-index: 1;\n  padding: 2%;\n  border-radius: 10%; }\n\nion-item {\n  --border-radius:10%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9ob21lL3BhdGllbnQtcHJvZmlsZS9wYXRpZW50LXByb2ZpbGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxxQkFBYTtFQUNiLFlBQVk7RUFDWixxREFBcUQsRUFBQTs7QUFFdkQ7RUFDSSxvQkFBYTtFQUFiLGFBQWE7RUFDZixxQkFBcUI7RUFDckIseUJBQW1CO1VBQW5CLG1CQUFtQjtFQUNuQix3QkFBdUI7VUFBdkIsdUJBQXVCO0VBQ3JCLFlBQVk7RUFDWixhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsc0JBQXNCO0VBQ3RCLDRCQUE0QjtFQUM1QixrQ0FBa0M7RUFDbEMsa0JBQWtCO0VBQ2xCLGlDQUFpQyxFQUFBOztBQUdyQztFQUNFLG9CQUFpQjtLQUFqQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHlCQUEwQjtFQUMxQixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsZ0JBQWdCLEVBQUE7O0FBRWxCO0VBQ0UsZUFBZTtFQUNmLFdBQVc7RUFDWCxZQUFZLEVBQUE7O0FBSWQ7RUFDRSxvQkFBYTtFQUFiLGFBQWE7RUFDYixxQkFBcUI7RUFDckIsd0JBQXVCO1VBQXZCLHVCQUF1QjtFQUN2Qiw0QkFBNEI7RUFDNUIseUJBQW1CO1VBQW5CLG1CQUFtQixFQUFBOztBQUVyQjtFQUNFLHlCQUEwQjtFQUMxQixrQkFBa0I7RUFDbEIsb0JBQWE7RUFBYixhQUFhO0VBQ2IsWUFBWTtFQUNaLHdCQUF1QjtVQUF2Qix1QkFBdUI7RUFDdkIseUJBQW1CO1VBQW5CLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsV0FBVztFQUNYLDJGQUVpRCxFQUFBOztBQUVuRDtFQUVFLDBGQUVpRDtFQUNqRCxVQUFVO0VBQ1YsV0FBVztFQUNiLGtCQUFrQixFQUFBOztBQUdsQjtFQUNFLG1CQUFnQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9wYXRpZW50LXByb2ZpbGUvcGF0aWVudC1wcm9maWxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLXRvb2xiYXJ7XG4gIC0tYmFja2dyb3VuZDogIzJjYzY3YjtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LWZhbWlseTogR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIFRpbWVzLCBzZXJpZjtcbn1cbi5wcm9maWxlLWltZy1mcmFtZXtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIHdpZHRoOiAxMjBweDtcbiAgICBoZWlnaHQ6IDEyMHB4O1xuICAgIG1pbi1oZWlnaHQ6IDcwcHg7XG4gICAgbWluLXdpZHRoOiA3MHB4O1xuICAgIG1hcmdpbjogMWVtIGF1dG87XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDVweCB3aGl0ZTtcblxufVxuLnByb2ZpbGUtaW1nLWhvbGRlcntcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogICMyY2M2N2I7XG4gIG1heC13aWR0aDogMTAwcHg7XG4gIG1heC1oZWlnaHQ6IDEwMHB4O1xuICBtaW4td2lkdGg6IDcwcHg7XG4gIG1pbi1oZWlnaHQ6IDcwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4ucHJvZmlsZS1pbWd7XG4gIGRpc3BsYXk6IGlubGluZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcblxuXG59XG5pb24tY29se1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmVsZW1lbnQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmNjNjdiIDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDUwcHg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiA1MHB4O1xuICBib3gtc2hhZG93OlxuICAgICAgICAgIDEycHggMTJweCAxNnB4IDAgcmdiYSgwLCAwLCAwLCAwLjI1KSxcbiAgICAgICAgICAtOHB4IC04cHggMTJweCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbn1cbi5wZXJzb25hbC1kYXRhe1xuICAvL2JveC1zaGFkb3c6IDFweCAycHggMTBweCAwcHggcmdiYSgwLDAsMCwwLjMpO1xuICBib3gtc2hhZG93OlxuICAgICAgICAgIDEycHggMTJweCAxNnB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpICxcbiAgICAgICAgICAtOHB4IC04cHggMTJweCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKSA7XG4gIHotaW5kZXg6IDE7XG4gIHBhZGRpbmc6IDIlO1xuYm9yZGVyLXJhZGl1czogMTAlO1xufVxuXG5pb24taXRlbXtcbiAgLS1ib3JkZXItcmFkaXVzOjEwJTtcbn1cbiJdfQ== */");

/***/ }),

/***/ "./src/app/home/patient-profile/patient-profile.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/home/patient-profile/patient-profile.component.ts ***!
  \*******************************************************************/
/*! exports provided: PatientProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientProfileComponent", function() { return PatientProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/datacommunication/interaction.service */ "./src/app/services/datacommunication/interaction.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../NavService/navigation.service */ "./src/app/home/NavService/navigation.service.ts");





let PatientProfileComponent = class PatientProfileComponent {
    constructor(dataShare, addController, navigation) {
        this.dataShare = dataShare;
        this.addController = addController;
        this.navigation = navigation;
        this.spinnerState = true;
    }
    ngOnInit() {
        console.log("Profile component Initiated");
        new Promise((resolve, reject) => {
            this.patientData = this.dataShare.getPatientData();
            if (this.patientData == undefined) {
                // this.presentAlert('Data Interaction Error','doctor data undefined');
                reject('patient data undefined');
            }
            else {
                resolve();
            }
        }).then(() => { this.spinnerState = false; console.log("patient data from profile", this.patientData); }).catch((err) => this.presentAlert('data stream error', err));
    }
    consultDoc() {
        this.dataShare.sendPatientNamefromconvtoMessage(this.patientData);
        console.log("doctor data from profile" + this.patientData);
        this.navigation.navigateTo("home/message");
    }
    ngOnDestroy() {
        console.log(" profile destroyed");
    }
    presentAlert(subtitleString, messageString) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log('alert holding screen ');
            const alert = yield this.addController.create({
                header: 'ERROR',
                subHeader: subtitleString,
                message: messageString,
                buttons: [
                    {
                        text: 'Ok',
                        handler: () => {
                            this.spinnerState = false;
                            this.navigation.navigateTo('home/doctorList');
                        }
                    },
                ]
            });
            yield alert.present();
        });
    }
};
PatientProfileComponent.ctorParameters = () => [
    { type: _services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_2__["InteractionService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
    { type: _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_4__["NavigationService"] }
];
PatientProfileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-patient-profile',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./patient-profile.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/patient-profile/patient-profile.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./patient-profile.component.scss */ "./src/app/home/patient-profile/patient-profile.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_2__["InteractionService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
        _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_4__["NavigationService"]])
], PatientProfileComponent);



/***/ }),

/***/ "./src/app/home/patientList/patient-list.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/home/patientList/patient-list.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("@font-face {\n  font-family: Forte;\n  src: url(/assets/fonts/FORTE.ttf); }\n\nion-content {\n  height: 100%;\n  width: 100%;\n  margin: 0px; }\n\n.grid {\n  display: grid;\n  grid-template-rows: auto;\n  grid-gap: 10px; }\n\n#item {\n  display: grid;\n  color: white;\n  font-family: Georgia, 'Times New Roman', Times, serif; }\n\n#item2 {\n  display: grid;\n  font-family: Georgia, 'Times New Roman', Times, serif; }\n\n.icon {\n  margin-bottom: -60%; }\n\n.middle-text {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  font-family: Georgia, 'Times New Roman', Times, serif;\n  font-size: larger; }\n\n.background {\n  height: 100%;\n  overflow: scroll; }\n\n.f-row {\n  background: #25b7d3;\n  margin: -5px;\n  font-size: 2em; }\n\n.small-icon {\n  width: 100%;\n  height: 100%; }\n\n.card {\n  box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.3);\n  overflow: hidden;\n  color: rgba(0, 0, 0, 0.6);\n  font-family: 'Open Sans', Helvetica, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  background: white;\n  border-radius: 20px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9ob21lL3BhdGllbnRMaXN0L3BhdGllbnQtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQixpQ0FBaUMsRUFBQTs7QUFHbkM7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLFdBQVcsRUFBQTs7QUFHYjtFQUNFLGFBQVk7RUFDWix3QkFBd0I7RUFDeEIsY0FBYSxFQUFBOztBQUlmO0VBQ0UsYUFBWTtFQUNaLFlBQVk7RUFDWixxREFBcUQsRUFBQTs7QUFFdkQ7RUFDRSxhQUFhO0VBQ2IscURBQXFELEVBQUE7O0FBR3ZEO0VBQ0UsbUJBQW1CLEVBQUE7O0FBSXJCO0VBQ0Usb0JBQVk7RUFBWixhQUFZO0VBQ1oseUJBQW1CO1VBQW5CLG1CQUFtQjtFQUNuQix3QkFBdUI7VUFBdkIsdUJBQXVCO0VBQ3ZCLHFEQUFxRDtFQUNyRCxpQkFBaUIsRUFBQTs7QUFJbkI7RUFFRSxZQUFZO0VBQ1osZ0JBQWdCLEVBQUE7O0FBR2xCO0VBQ0UsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixjQUFjLEVBQUE7O0FBRWhCO0VBQ0UsV0FBVztFQUNYLFlBQVcsRUFBQTs7QUFHYjtFQUNFLCtDQUE0QztFQUM1QyxnQkFBZ0I7RUFFaEIseUJBQXNCO0VBQ3RCLCtDQUErQztFQUMvQyxtQ0FBbUM7RUFDbkMsa0NBQWtDO0VBQ2xDLGlCQUFpQjtFQUNqQixtQkFBbUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2hvbWUvcGF0aWVudExpc3QvcGF0aWVudC1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGZvbnQtZmFjZSB7XHJcbiAgZm9udC1mYW1pbHk6IEZvcnRlO1xyXG4gIHNyYzogdXJsKC9hc3NldHMvZm9udHMvRk9SVEUudHRmKTtcclxufVxyXG5cclxuaW9uLWNvbnRlbnR7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1hcmdpbjogMHB4O1xyXG59XHJcbi8vdG8gY29udHJvbCByb3dzIGhlaWdodFxyXG4uZ3JpZCB7XHJcbiAgZGlzcGxheTpncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0bztcclxuICBncmlkLWdhcDoxMHB4O1xyXG4gIC8vaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTBweCk7XHJcbn1cclxuXHJcbiNpdGVte1xyXG4gIGRpc3BsYXk6Z3JpZDtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZm9udC1mYW1pbHk6IEdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBUaW1lcywgc2VyaWY7XHJcbn1cclxuI2l0ZW0yIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGZvbnQtZmFtaWx5OiBHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgVGltZXMsIHNlcmlmO1xyXG59XHJcblxyXG4uaWNvbntcclxuICBtYXJnaW4tYm90dG9tOiAtNjAlO1xyXG59XHJcblxyXG4vL3RpdGxlXHJcbi5taWRkbGUtdGV4dHtcclxuICBkaXNwbGF5OmZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBmb250LWZhbWlseTogR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIFRpbWVzLCBzZXJpZjtcclxuICBmb250LXNpemU6IGxhcmdlcjtcclxuXHJcbn1cclxuLy9tYWluIGJhY2tncm91bmRcclxuLmJhY2tncm91bmR7XHJcbiAgLy9iYWNrZ3JvdW5kOiAjZTdlN2U3O1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBvdmVyZmxvdzogc2Nyb2xsO1xyXG59XHJcbi8vZmlyc3Qgcm93XHJcbi5mLXJvd3tcclxuICBiYWNrZ3JvdW5kOiAjMjViN2QzO1xyXG4gIG1hcmdpbjogLTVweDtcclxuICBmb250LXNpemU6IDJlbTtcclxufVxyXG4uc21hbGwtaWNvbntcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6MTAwJTtcclxuICAvL21hcmdpbi10b3A6IDIwJTtcclxufVxyXG4uY2FyZHtcclxuICBib3gtc2hhZG93OiAxcHggMnB4IDEwcHggMHB4IHJnYmEoMCwwLDAsMC4zKTtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIC8vY29sb3I6ICMzYWEwODc7XHJcbiAgY29sb3I6IHJnYmEoMCwwLDAsMC42KTtcclxuICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcclxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcclxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbn1cclxuLy9pb24gc2VhcmNoIGJhciBzdHlsZSBhdCBnbG9iYWwgc3R5bGUgc2hlZXRcclxuXHJcblxyXG4iXX0= */");

/***/ }),

/***/ "./src/app/home/patientList/patient-list.component.ts":
/*!************************************************************!*\
  !*** ./src/app/home/patientList/patient-list.component.ts ***!
  \************************************************************/
/*! exports provided: PatientListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientListComponent", function() { return PatientListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/datastream/datastreaming.service */ "./src/app/services/datastream/datastreaming.service.ts");
/* harmony import */ var _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../NavService/navigation.service */ "./src/app/home/NavService/navigation.service.ts");
/* harmony import */ var _HttPService_http_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../HttPService/http.service */ "./src/app/home/HttPService/http.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/datacommunication/interaction.service */ "./src/app/services/datacommunication/interaction.service.ts");


// import { IDoctor } from '../DataModels';






let PatientListComponent = class PatientListComponent {
    constructor(datastream, navigation, addController, http, dataShare) {
        this.datastream = datastream;
        this.navigation = navigation;
        this.addController = addController;
        this.http = http;
        this.dataShare = dataShare;
        this.patientArrayList = new Array();
        this.patientRow = new Array();
        // this.patientRow = this.datastream.getPatientList();      
    }
    ngOnInit() { }
    ionViewWillEnter() {
        let that = this;
        let token = this.datastream.getToken();
        this.http.getPatientList(token)
            .subscribe((response) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.datastream.clearPatientList();
            yield response.forEach(element => {
                this.datastream.addToPatientList(element);
            });
            this.patientRow = this.datastream.getPatientList();
            this.patientArrayList = this.patientRow;
            console.log("patient list ", this.patientRow);
        }), err => {
            let errorMessage = "";
            if (err.error.message == null) {
                errorMessage = "Error in Connection";
            }
            else {
                errorMessage = err.error.message;
            }
            console.log('HTTP Patient List Error: ', errorMessage);
            this.presentAlert('HTTP Error: ', errorMessage);
        }, () => {
            this.datastream.savePatientListToDataStore();
            console.log('HTTP request completed.');
        });
    }
    initializeList() {
        this.patientArrayList = this.patientRow;
    }
    filterList(event) {
        this.initializeList();
        const searchTerm = event.srcElement.value;
        if (!searchTerm) { //if the user didn't input anything
            return;
        }
        this.patientArrayList = this.patientArrayList.filter(currentGoal => {
            if (currentGoal.name && searchTerm) {
                if (currentGoal.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
    }
    consultDoc(item) {
        this.dataShare.sendPatientNamefromconvtoMessage(item);
        console.log("doctor data from profile" + item);
        this.navigation.navigateTo("home/message");
    }
    GotoPatientProfile(item) {
        this.dataShare.sendPatientData(item);
        console.log("item from patient list", item);
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__await"])(this.navigation.navigateTo('home/patient-profile'));
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
};
PatientListComponent.ctorParameters = () => [
    { type: src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_2__["DatastreamingService"] },
    { type: _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_3__["NavigationService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _HttPService_http_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"] },
    { type: _services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_6__["InteractionService"] }
];
PatientListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-patient-list',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./patient-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/patientList/patient-list.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./patient-list.component.scss */ "./src/app/home/patientList/patient-list.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_2__["DatastreamingService"],
        _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_3__["NavigationService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"],
        _HttPService_http_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"],
        _services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_6__["InteractionService"]])
], PatientListComponent);



/***/ }),

/***/ "./src/app/home/profile/profile.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/home/profile/profile.component.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-toolbar {\n  --background: #c2d8f3;\n  color: white;\n  font-family: Georgia, 'Times New Roman', Times, serif; }\n\n.ion-content {\n  --background: #c2d8f3;\n  font-size: 30px;\n  max-font-size: 30px;\n  min-font-size: 25px; }\n\n.fab {\n  margin-bottom: 3%; }\n\n.wrapper {\n  position: relative; }\n\n.profile-img-frame {\n  display: -webkit-box;\n  display: flex;\n  align-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  width: 170px;\n  height: 170px;\n  min-height: 90px;\n  min-width: 90px;\n  margin: 1em auto;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center center;\n  border-radius: 50%;\n  box-shadow: inset 0 0 0 5px white; }\n\n.profile-img-holder {\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 50%;\n  background-color: #2cc67b;\n  max-width: 150px;\n  max-height: 150px;\n  min-width: 100px;\n  min-height: 100px;\n  overflow: hidden; }\n\n.profile-img {\n  display: inline;\n  width: 100%;\n  height: auto; }\n\n.camera {\n  position: absolute;\n  top: 85%;\n  right: 30%;\n  display: -webkit-box;\n  display: flex;\n  align-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  border-radius: 50%;\n  width: 50px;\n  height: 50px;\n  background: linear-gradient(145deg, #d0e7ff, #afc2db);\n  box-shadow: 3px 3px 3px #9dafc5,\r -3px -3px 3px #e7ffff;\n  color: white; }\n\n.inputs {\n  display: -webkit-box;\n  display: flex;\n  align-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center; }\n\n.ion-input {\n  margin-top: 2%;\n  margin-bottom: 2%;\n  margin-left: 7%;\n  margin-right: 7%;\n  border-radius: 15px;\n  width: 100%; }\n\n.buttons-tool_bar {\n  display: -webkit-box;\n  display: flex;\n  align-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  width: 100%; }\n\n.ion-button {\n  border-radius: 15px;\n  display: -webkit-box;\n  display: flex;\n  height: 50px;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  align-content: center;\n  margin-left: 10%;\n  width: 100px;\n  background: linear-gradient(145deg, #d0e7ff, #afc2db);\n  box-shadow: 3px 3px 3px #9dafc5,\r -3px -3px 3px #e7ffff; }\n\n.paragraph {\n  padding: 0px;\n  margin-bottom: 0px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9ob21lL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvaG9tZS9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUdBO0VBQ0UscUJBQWE7RUFDYixZQUFZO0VBQ1oscURBQXNELEVBQUE7O0FBRXhEO0VBQ0UscUJBQWE7RUFDYixlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLG1CQUFtQixFQUFBOztBQUlyQjtFQUNFLGlCQUFpQixFQUFBOztBQUVuQjtFQUNFLGtCQUFrQixFQUFBOztBQUVwQjtFQUNFLG9CQUFhO0VBQWIsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQix5QkFBbUI7VUFBbkIsbUJBQW1CO0VBQ25CLHdCQUF1QjtVQUF2Qix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixzQkFBc0I7RUFDdEIsNEJBQTRCO0VBQzVCLGtDQUFrQztFQUNsQyxrQkFBa0I7RUFDbEIsaUNBQWlDLEVBQUE7O0FBSW5DO0VBQ0Usb0JBQWlCO0tBQWpCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIseUJBQTBCO0VBQzFCLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixnQkFBZ0IsRUFBQTs7QUFFbEI7RUFDRSxlQUFlO0VBQ2YsV0FBVztFQUNYLFlBQVksRUFBQTs7QUFJZDtFQUNFLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsVUFBVTtFQUNWLG9CQUFhO0VBQWIsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQix5QkFBbUI7VUFBbkIsbUJBQW1CO0VBQ25CLHdCQUF1QjtVQUF2Qix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0VBQ1oscURBQXFEO0VBQ3JELHVEQUdEO0VDaEhDLFlBQVksRUFBRTs7QUFFaEI7RURpSEUsb0JBQWE7RUFBYixhQUFhO0VBQ2IscUJBQW1CO0VBQ25CLHlCQUFpQjtVQUFqQixtQkFBaUI7RUMvR2pCLHdCQUF1QjtVQUF2Qix1QkFBdUIsRUFBRTs7QUFFM0I7RURpSEUsY0FBYTtFQUNiLGlCQUFlO0VBQ2YsZUFBYztFQUNkLGdCQUFjO0VBQ2QsbUJBRUQ7RUNqSEMsV0FBVyxFQUFFOztBQUVmO0VEa0hFLG9CQUFhO0VBQWIsYUFBYTtFQUNiLHFCQUFtQjtFQUNuQix5QkFBaUI7VUFBakIsbUJBQWlCO0VBQ2pCLHdCQUVEO1VBRkMsdUJBRUQ7RUNsSEMsV0FBVyxFQUFFOztBQUVmO0VEbUhFLG1CQUFhO0VBQ2Isb0JBQVk7RUFBWixhQUFZO0VBQ1osWUFBQTtFQUNBLHdCQUFtQjtVQUFuQix1QkFBbUI7RUFDbkIseUJBQWU7VUFBZixtQkFBZTtFQUNmLHFCQUFnQjtFQUNoQixnQkFBWTtFQUNaLFlBQVk7RUFDWixxREFBYTtFQ2pIYix1RERvSFEsRUFBQTs7QUNqSFY7RUFDRSxZQUFZO0VBQ1osa0JBQWtCLEVBQUUiLCJmaWxlIjoic3JjL2FwcC9ob21lL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vXHJcbi8vLmNvbnR7XHJcbi8vICBoZWlnaHQ6IDEwMCU7XHJcbi8vICB3aWR0aDogMTAwJTtcclxuLy8gIG1hcmdpbjogLTEwJTtcclxuLy99XHJcbi8vXHJcbi8vLy8gLmNvbnRhaW5lciB7XHJcbi8vLy8gICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuLy8vLyAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4vLy8vICAgICBjb2xvcjogd2hpdGU7XHJcbi8vLy8gICAgIGhlaWdodDogMTAwJTtcclxuLy8vLyAgICAgd2lkdGg6IDEwMCU7XHJcbi8vLy8gICAgIG1hcmdpbjogMHB4O1xyXG4vLy8vICAgICBwYWRkaW5nOiAwJTtcclxuLy8vLyAgIH1cclxuLy8uY2VudGVyZWQge1xyXG4vLyAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgbWFyZ2luLWxlZnQ6IDUwJTtcclxuLy8gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0zMCUsIC00MCUpO1xyXG4vLyAgY29sb3I6IGJsYWNrO1xyXG4vLyAgLy8gdGV4dC1hbGlnbjogY2VudGVyO1xyXG4vLyAgLy8gbWFyZ2luLXRvcDotMTAwJTtcclxuLy8gIC8vIGZvbnQtZmFtaWx5OiBHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgVGltZXMsIHNlcmlmO1xyXG4vL31cclxuLy8uYXZhdHtcclxuLy8gIHdpZHRoOjEwMCUgIWltcG9ydGFudDtcclxuLy8gIGhlaWdodCA6IDEwMCUgIWltcG9ydGFudDtcclxuLy8gIG1heC13aWR0aDogMTUwcHggIWltcG9ydGFudDtcclxuLy8gIG1heC1oZWlnaHQ6IDE1MHB4ICFpbXBvcnRhbnQ7XHJcbi8vfVxyXG4vLy5zcGFjZXtcclxuLy8gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gIG1hcmdpbi1sZWZ0OiAxMCU7XHJcbi8vICBtYXJnaW4tdG9wOiAxMCU7XHJcbi8vfVxyXG4vLy5pdHtcclxuLy8gIHBhZGRpbmctdG9wOiAyJTtcclxuLy99XHJcbi8vLmdyYWQgIHtcclxuLy8gIC0tYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxyXG4vLyAgICAgICAgICAgICAgICAgIHRvIGJvdHRvbSxcclxuLy8gICAgICAgICAgICAgICAgICAjMGE1Mjc5IDAlLFxyXG4vLyAgICAgICAgICAgICAgICAgICM4MGQzY2IgMTAwJSlcclxuLy9cclxuLy99XHJcbi8vXHJcbi8vLmJhY2t7XHJcbi8vICBtYXJnaW4tdG9wOiA1MCU7XHJcbi8vICBtYXJnaW4tbGVmdDogMTAlO1xyXG4vL31cclxuLy9cclxuLy8uZWRpdHtcclxuLy8gIG1hcmdpbi1sZWZ0OiA3JTtcclxuLy8gIG1hcmdpbi10b3A6IDkwJTtcclxuLy99XHJcbi8vLnBhZHtcclxuLy8gIG1hcmdpbi1sZWZ0OiAxMCU7XHJcbi8vICBwYWRkaW5nLXJpZ2h0OiAzJTtcclxuLy99XHJcbi8vLndyYXBwZXIge1xyXG4vLyAgd2lkdGg6IDUwMHB4O1xyXG4vLyAgaGVpZ2h0OiA1MDBweDtcclxuLy8gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gIGxlZnQ6IDUwJTtcclxuLy8gIHRvcDogNTAlO1xyXG4vLyAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbi8vICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbi8vICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCByZ2IoODAsIDE4NSwgMTgyKSAwJSwgI2ZmZmZmZiAxMDAlKTtcclxuLy8gIG92ZXJmbG93OiBoaWRkZW47XHJcbi8vICBib3JkZXItcmFkaXVzOiAyMCU7XHJcbi8vfVxyXG4vL1xyXG4vLy53YXZlIHtcclxuLy8gIHdpZHRoOiAxMDAwcHg7XHJcbi8vICBoZWlnaHQ6IDEwMDBweDtcclxuLy8gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gIHRvcDogLTI1JTtcclxuLy8gIGxlZnQ6IDUwJTtcclxuLy8gIG1hcmdpbi1sZWZ0OiAtNTAwcHg7XHJcbi8vICBtYXJnaW4tdG9wOiAtNTAwcHg7XHJcbi8vICBib3JkZXItcmFkaXVzOiAzNSU7XHJcbi8vICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIC43NSk7XHJcbi8vICBhbmltYXRpb246IHdhdmUgMTVzIGluZmluaXRlIGxpbmVhcjtcclxuLy99XHJcbi8vXHJcbi8vQGtleWZyYW1lcyB3YXZlIHtcclxuLy8gIGZyb20geyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTt9XHJcbi8vICBmcm9tIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTt9XHJcbi8vfVxyXG4vLy5teXJvd3tcclxuLy8gIHBhZGRpbmctYm90dG9tOiA2MCU7XHJcbi8vfVxyXG4vLy5Tcm93e1xyXG4vLyAgd2lkdGg6IDUwMHB4O1xyXG4vLyAgaGVpZ2h0OiA1MDBweDtcclxuLy8gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gIG1hcmdpbi1sZWZ0OiAxMDAlO1xyXG4vLyAgbWFyZ2luLXRvcDogMTMwJTtcclxuLy8gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4vLyAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiKDgwLCAxODUsIDE4MikgMCUsICNmZmZmZmYgMTAwJSk7XHJcbi8vICBvdmVyZmxvdzogaGlkZGVuO1xyXG4vLyAgYm9yZGVyLXJhZGl1czogMjAlO1xyXG4vL31cclxuXHJcbmlvbi10b29sYmFye1xyXG4gIC0tYmFja2dyb3VuZDogI2MyZDhmMztcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZm9udC1mYW1pbHk6IEdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBUaW1lcywgc2VyaWYgO1xyXG59XHJcbi5pb24tY29udGVudHtcclxuICAtLWJhY2tncm91bmQ6ICNjMmQ4ZjM7XHJcbiAgZm9udC1zaXplOiAzMHB4O1xyXG4gIG1heC1mb250LXNpemU6IDMwcHg7XHJcbiAgbWluLWZvbnQtc2l6ZTogMjVweDtcclxuXHJcblxyXG59XHJcbi5mYWJ7XHJcbiAgbWFyZ2luLWJvdHRvbTogMyU7XHJcbn1cclxuLndyYXBwZXJ7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcbi5wcm9maWxlLWltZy1mcmFtZXtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIHdpZHRoOiAxNzBweDtcclxuICBoZWlnaHQ6IDE3MHB4O1xyXG4gIG1pbi1oZWlnaHQ6IDkwcHg7XHJcbiAgbWluLXdpZHRoOiA5MHB4O1xyXG4gIG1hcmdpbjogMWVtIGF1dG87XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDVweCB3aGl0ZTtcclxuXHJcbn1cclxuXHJcbi5wcm9maWxlLWltZy1ob2xkZXJ7XHJcbiAgb2JqZWN0LWZpdDogY292ZXI7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICAjMmNjNjdiO1xyXG4gIG1heC13aWR0aDogMTUwcHg7XHJcbiAgbWF4LWhlaWdodDogMTUwcHg7XHJcbiAgbWluLXdpZHRoOiAxMDBweDtcclxuICBtaW4taGVpZ2h0OiAxMDBweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcbi5wcm9maWxlLWltZ3tcclxuICBkaXNwbGF5OiBpbmxpbmU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG5cclxuXHJcbn1cclxuLmNhbWVyYXtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiA4NSU7XHJcbiAgcmlnaHQ6IDMwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICB3aWR0aDogNTBweDtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE0NWRlZywgI2QwZTdmZiwgI2FmYzJkYik7XHJcbiAgYm94LXNoYWRvdzogIDNweCAzcHggM3B4ICM5ZGFmYzUsXHJcbiAgLTNweCAtM3B4IDNweCAjZTdmZmZmO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG4uaW5wdXRze1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuLmlvbi1pbnB1dHtcclxuICBtYXJnaW4tdG9wOiAyJTtcclxuICBtYXJnaW4tYm90dG9tOiAyJTtcclxuICBtYXJnaW4tbGVmdDogNyU7XHJcbiAgbWFyZ2luLXJpZ2h0OiA3JTtcclxuICBib3JkZXItcmFkaXVzOjE1cHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcblxyXG59XHJcbi5idXR0b25zLXRvb2xfYmFye1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgd2lkdGg6IDEwMCU7XHJcblxyXG59XHJcbi5pb24tYnV0dG9uIHtcclxuICBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gIG1hcmdpbi1sZWZ0OiAxMCU7XHJcbiAgd2lkdGg6IDEwMHB4O1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxNDVkZWcsICNkMGU3ZmYsICNhZmMyZGIpO1xyXG4gIGJveC1zaGFkb3c6ICAzcHggM3B4IDNweCAjOWRhZmM1LFxyXG4gIC0zcHggLTNweCAzcHggI2U3ZmZmZjtcclxufVxyXG4ucGFyYWdyYXBoe1xyXG4gIHBhZGRpbmc6IDBweDtcclxuICBtYXJnaW4tYm90dG9tOiAwcHg7XHJcbn1cclxuXHJcbiIsImlvbi10b29sYmFyIHtcbiAgLS1iYWNrZ3JvdW5kOiAjYzJkOGYzO1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtZmFtaWx5OiBHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgVGltZXMsIHNlcmlmOyB9XG5cbi5pb24tY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogI2MyZDhmMztcbiAgZm9udC1zaXplOiAzMHB4O1xuICBtYXgtZm9udC1zaXplOiAzMHB4O1xuICBtaW4tZm9udC1zaXplOiAyNXB4OyB9XG5cbi5mYWIge1xuICBtYXJnaW4tYm90dG9tOiAzJTsgfVxuXG4ud3JhcHBlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxuXG4ucHJvZmlsZS1pbWctZnJhbWUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogMTcwcHg7XG4gIGhlaWdodDogMTcwcHg7XG4gIG1pbi1oZWlnaHQ6IDkwcHg7XG4gIG1pbi13aWR0aDogOTBweDtcbiAgbWFyZ2luOiAxZW0gYXV0bztcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCA1cHggd2hpdGU7IH1cblxuLnByb2ZpbGUtaW1nLWhvbGRlciB7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyY2M2N2I7XG4gIG1heC13aWR0aDogMTUwcHg7XG4gIG1heC1oZWlnaHQ6IDE1MHB4O1xuICBtaW4td2lkdGg6IDEwMHB4O1xuICBtaW4taGVpZ2h0OiAxMDBweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuXG4ucHJvZmlsZS1pbWcge1xuICBkaXNwbGF5OiBpbmxpbmU7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IGF1dG87IH1cblxuLmNhbWVyYSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA4NSU7XG4gIHJpZ2h0OiAzMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgd2lkdGg6IDUwcHg7XG4gIGhlaWdodDogNTBweDtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE0NWRlZywgI2QwZTdmZiwgI2FmYzJkYik7XG4gIGJveC1zaGFkb3c6IDNweCAzcHggM3B4ICM5ZGFmYzUsXHIgLTNweCAtM3B4IDNweCAjZTdmZmZmO1xuICBjb2xvcjogd2hpdGU7IH1cblxuLmlucHV0cyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cblxuLmlvbi1pbnB1dCB7XG4gIG1hcmdpbi10b3A6IDIlO1xuICBtYXJnaW4tYm90dG9tOiAyJTtcbiAgbWFyZ2luLWxlZnQ6IDclO1xuICBtYXJnaW4tcmlnaHQ6IDclO1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICB3aWR0aDogMTAwJTsgfVxuXG4uYnV0dG9ucy10b29sX2JhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlOyB9XG5cbi5pb24tYnV0dG9uIHtcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogMTAlO1xuICB3aWR0aDogMTAwcHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxNDVkZWcsICNkMGU3ZmYsICNhZmMyZGIpO1xuICBib3gtc2hhZG93OiAzcHggM3B4IDNweCAjOWRhZmM1LFxyIC0zcHggLTNweCAzcHggI2U3ZmZmZjsgfVxuXG4ucGFyYWdyYXBoIHtcbiAgcGFkZGluZzogMHB4O1xuICBtYXJnaW4tYm90dG9tOiAwcHg7IH1cbiJdfQ== */");

/***/ }),

/***/ "./src/app/home/profile/profile.component.ts":
/*!***************************************************!*\
  !*** ./src/app/home/profile/profile.component.ts ***!
  \***************************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../NavService/navigation.service */ "./src/app/home/NavService/navigation.service.ts");
/* harmony import */ var src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/datastream/datastreaming.service */ "./src/app/services/datastream/datastreaming.service.ts");
/* harmony import */ var _HttPService_http_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../HttPService/http.service */ "./src/app/home/HttPService/http.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");






let ProfileComponent = class ProfileComponent {
    constructor(navigation, datastream, editPatientService, savedata) {
        this.navigation = navigation;
        this.datastream = datastream;
        this.editPatientService = editPatientService;
        this.savedata = savedata;
        this.spinnerState = true;
        this.save_state = true;
    }
    ngOnInit() {
        new Promise((resolve, reject) => {
            this.DataSet();
            console.log("data set has ended");
            if (this.InputData == undefined) {
                reject("undefined User Data");
            }
            else {
                resolve();
            }
        }).then(() => { this.spinnerState = false; console.log("resolved"); }).catch((err) => alert('data stream error' + err));
    }
    DataSet() {
        console.log("data set has started");
        this.InputData = [{
                label: "Name",
                value: this.datastream.getDoctorName(),
                type: "string"
            },
            {
                label: "Mobile",
                value: this.datastream.getDoctorMobile(),
                type: "number"
            },
            {
                label: "Specialization",
                value: "",
                type: "string"
            },
            {
                label: "Years of Experience",
                value: this.datastream.getDoctorYearsOfExperience(),
                type: "number"
            },
            {
                label: "Clinic Address 1",
                value: "",
                type: "string"
            },
            {
                label: "Clinic Address 2",
                value: "",
                type: "string"
            },
            {
                label: "Clinic Address 3",
                value: "",
                type: "string"
            },
        ];
    }
    edit() {
        this.save_state = false;
    }
    save() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = this.savedata.create({
                header: 'Are you sure you want to save edits?',
                animated: true,
                buttons: [{ text: 'Cancel',
                        handler: (data) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                            this.DataSet();
                            this.save_state = true;
                        })
                    },
                    {
                        text: 'Save',
                        handler: async => {
                            this.save_state = true;
                            let token = this.datastream.getToken();
                            console.log("data to save  ", this.InputData);
                            //to delete after habiba solves thr cors error from back
                            this.datastream.changeDoctorData(this.InputData[0].value, this.InputData[3].value);
                            ////////////////////////////////////////////
                            this.editPatientService.editDoctorProfile(this.InputData[0].value, this.InputData[3].value, token).subscribe(response => {
                                // this.datastream.setToken(response.token);
                                console.log("http request to Change patient Data: " + JSON.stringify(response));
                                this.datastream.changeDoctorData(this.InputData[0].value, this.InputData[3].value);
                            }, err => {
                                console.log('HTTP Edit profile Error: ', err.error.message);
                            });
                        }
                    }
                ]
            });
            (yield alert).present();
        });
    }
};
ProfileComponent.ctorParameters = () => [
    { type: _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"] },
    { type: src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_3__["DatastreamingService"] },
    { type: _HttPService_http_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonSegment"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonSegment"])
], ProfileComponent.prototype, "ionSegment", void 0);
ProfileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-profile',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./profile.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/profile/profile.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./profile.component.scss */ "./src/app/home/profile/profile.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"],
        src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_3__["DatastreamingService"],
        _HttPService_http_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"]])
], ProfileComponent);



/***/ }),

/***/ "./src/app/home/schedule/schedule.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/home/schedule/schedule.component.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvc2NoZWR1bGUvc2NoZWR1bGUuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/home/schedule/schedule.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/home/schedule/schedule.component.ts ***!
  \*****************************************************/
/*! exports provided: ScheduleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScheduleComponent", function() { return ScheduleComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ScheduleComponent = class ScheduleComponent {
    constructor() { }
    ngOnInit() { }
};
ScheduleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-schedule',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./schedule.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/schedule/schedule.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./schedule.component.scss */ "./src/app/home/schedule/schedule.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], ScheduleComponent);



/***/ }),

/***/ "./src/app/home/tab/tab.component.scss":
/*!*********************************************!*\
  !*** ./src/app/home/tab/tab.component.scss ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvdGFiL3RhYi5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/home/tab/tab.component.ts":
/*!*******************************************!*\
  !*** ./src/app/home/tab/tab.component.ts ***!
  \*******************************************/
/*! exports provided: TabComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabComponent", function() { return TabComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../NavService/navigation.service */ "./src/app/home/NavService/navigation.service.ts");



let TabComponent = class TabComponent {
    constructor(navigation) {
        this.navigation = navigation;
    }
    ngOnInit() { }
    // vitalClick(){
    //   this.navigation.navigateTo('home/vitals');
    // }
    homeClick() {
        this.navigation.navigateTo('home');
    }
    dlistClick() {
        this.navigation.navigateTo('home/profile');
    }
    tlistClick() {
        this.navigation.navigateTo('home/patient');
        console.log("trainer list");
    }
};
TabComponent.ctorParameters = () => [
    { type: _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"] }
];
TabComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-tab',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./tab.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/tab/tab.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./tab.component.scss */ "./src/app/home/tab/tab.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"]])
], TabComponent);



/***/ }),

/***/ "./src/app/services/EventEmitterService/event-emitter.service.ts":
/*!***********************************************************************!*\
  !*** ./src/app/services/EventEmitterService/event-emitter.service.ts ***!
  \***********************************************************************/
/*! exports provided: EventEmitterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventEmitterService", function() { return EventEmitterService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let EventEmitterService = class EventEmitterService {
    constructor() {
        this.FunctionCaller = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    OnComponentCall(state) {
        this.FunctionCaller.emit(state);
    }
};
EventEmitterService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], EventEmitterService);



/***/ }),

/***/ "./src/app/services/datacommunication/interaction.service.ts":
/*!*******************************************************************!*\
  !*** ./src/app/services/datacommunication/interaction.service.ts ***!
  \*******************************************************************/
/*! exports provided: InteractionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InteractionService", function() { return InteractionService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");



let InteractionService = class InteractionService {
    constructor() {
        this.intComp = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this.msg = this.intComp.asObservable();
        this.getDocData = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({});
        this.data = this.getDocData.asObservable();
        this.CoversationState = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](1);
        this.currentStateConversation = this.CoversationState.asObservable();
        this.communication = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.getId = this.communication.asObservable();
        this.Edit = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        this.getName = this.Edit.asObservable();
        this.patient = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
    }
    UpdateName(name) {
        this.Edit.next(name);
        console.log(name);
    }
    sendMSG(message) {
        this.intComp.next(message);
        console.log(message);
    }
    sendConversationState(state) {
        this.CoversationState.next(state);
        console.log(state);
    }
    sendPatientNamefromconvtoMessage(patientListfromconv) {
        this.getDocData.next(patientListfromconv);
        console.log(patientListfromconv);
    }
    getThreadIdfromMessageorConvListtoChat(id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.communication.next(id);
            console.log(id);
        });
    }
    sendPatientData(data) {
        this.patient.next(data);
    }
    getPatientData() {
        return this.patient.getValue();
    }
};
InteractionService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], InteractionService);



/***/ })

}]);
//# sourceMappingURL=home-home-module-es2015.js.map