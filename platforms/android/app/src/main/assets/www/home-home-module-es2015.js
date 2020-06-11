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
        this.resized = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
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
            clone.style.overflow = 'hidden';
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
                const heightStyle = height + 'px';
                /** @type {?} */
                const important = this.useImportant ? 'important' : '';
                this.textAreaEl.style.setProperty('height', heightStyle, important);
                this.resized.emit(height);
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
    resized: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
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
/* harmony default export */ __webpack_exports__["default"] = ("<!--<ion-content [scrollEvents]=\"true\" class=\"cont\">-->\r\n\r\n<!--  <ion-grid>-->\r\n<!--     <ion-row >-->\r\n<!--        <ion-toolbar class=\"tool\" align-items-center> -->\r\n<!--           {{patName}}-->\r\n<!--         <ion-buttons slot=\"start\">-->\r\n<!--            <ion-back-button defaultHref=\"home\" (click)=\"goConv()\"></ion-back-button>-->\r\n<!--         </ion-buttons>-->\r\n<!--        </ion-toolbar>-->\r\n<!--     </ion-row>-->\r\n\r\n\r\n<!--     <ion-row *ngFor=\"let newMsgs of newMessages\">-->\r\n<!--         <ion-col offset=\"3\" size=\"9\" *ngIf=\"newMsgs.sender_id===dId \">-->\r\n<!--         <div  class=\"speech-bubble\">-->\r\n<!--           -->\r\n<!--          -->\r\n<!--          <p class =\"Cspace\">{{newMsgs.msg_body}}</p><br>-->\r\n<!--          <div class=\"time\" text-right>-->\r\n<!--            {{newMsgs.created_date}}-->\r\n<!--          </div>-->\r\n<!--         </div>-->\r\n<!--         </ion-col>-->\r\n<!--         <ion-col  size=\"9\" *ngIf=\"newMsgs.sender_id!==dId \">-->\r\n<!--          <div color=\"sub.severityLevel\" class=\"speech-bubbleR\">-->\r\n<!--          -->\r\n<!--          <p class =\"Cspace\">{{newMsgs.msg_body}}</p><br>-->\r\n<!--          <div class=\"time\" text-right>-->\r\n<!--            {{newMsgs.created_date}}-->\r\n<!--          </div>-->\r\n<!--         </div>-->\r\n<!--         </ion-col>-->\r\n<!--    -->\r\n<!--     </ion-row>-->\r\n\r\n<!--  </ion-grid>-->\r\n<!--</ion-content>-->\r\n<!--<ion-footer>-->\r\n<!-- <ion-toolbar>-->\r\n<!--     <ion-row  align-items-center no-padding no-margin>-->\r\n<!--       <ion-col size=\"10\">-->\r\n<!--         <ion-item>-->\r\n<!--            <ion-textarea  [(ngModel)]=\"replyContent\" placeholder=\"Type your Message here...\"  cols =\"8\" rows=\"2\" class=\"typing\"></ion-textarea>-->\r\n<!--         </ion-item>-->\r\n<!--       </ion-col>-->\r\n<!--       <ion-col size=\"2\">-->\r\n<!--         <ion-button class=\"btn\" color=\"sub.severityLevel\"  [disabled]=\"replyContent===''\" (click)=\"sendReplyFun()\">-->\r\n<!--            <ion-icon name=\"paper-plane\" ></ion-icon>-->\r\n<!--         </ion-button>-->\r\n<!--       </ion-col>-->\r\n<!--     </ion-row>-->\r\n<!-- </ion-toolbar>-->\r\n<!--</ion-footer>-->\r\n\r\n<ion-header >\r\n    <ion-toolbar class=\"tool\" >\r\n        <ion-grid>\r\n            <ion-row>\r\n                <ion-col size=\"10\" sizeXs=\"9\" sizeLg=\"4\" no-padding padding-horizontal>\r\n                    <div class=\"wrapper\">\r\n                        <div class=\"profile-img-frame\">\r\n                            <div class=\"profile-img-holder\">\r\n                                <img  *ngIf=\"pat_img\" class=\"profile-img\" src=\"{{pat_img}}\" alt=\"profile image\">\r\n                                <img  *ngIf=\"!pat_img\" class=\"profile-img\" src=\"assets/avatar.jpg\" alt=\"profile image\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"title\">\r\n\r\n                        <ion-title text-right> {{patName}}</ion-title>\r\n                    </div>\r\n\r\n                </ion-col>\r\n            </ion-row>\r\n        </ion-grid>\r\n\r\n\r\n    </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content [scrollEvents]=\"true\" class=\"cont\">\r\n    <p class=\"ion-refresher\">\r\n        <ion-refresher  slot=\"fixed\"  pullFactor=\"0.5\" pullMin=\"10\" pullMax=\"20\" (ionRefresh)=\"doRefresh($event)\" >\r\n            <ion-refresher-content pullingIcon=\"chevron-down-circle-outline\"  padding-bottom margin-bottom ></ion-refresher-content>\r\n        </ion-refresher>\r\n    </p>\r\n    <ion-grid>\r\n\r\n        <ion-row *ngFor=\"let newMsgs of newMessages;let i=index;\">\r\n            <!--         //////////////Sender Part -->\r\n\r\n            <ion-col offset=\"3\" size=\"9\" *ngIf=\"newMsgs.sender_id===dId \">\r\n\r\n                <ion-icon name=\"radio-button-on\" size=\"medium\" style=\"color: #94C2ED;\"></ion-icon>\r\n                <span class=\"message-data-name\" >You</span>\r\n                <!--             /////////////////////////////////////////////////////-->\r\n\r\n                <!--         //////////////// Msg Body Part-->\r\n                <div  class=\"speech-bubble\" *ngIf=\"newMsgs.msg_body\">\r\n                    <div class =\"Cspace\">{{newMsgs.msg_body}}</div>\r\n                    <div class=\"time\">\r\n                        <span > {{newMsgs.created_date}}</span>\r\n                    </div>\r\n                </div>\r\n                <!--         //////////////// Media Part-->\r\n                <div *ngIf=\"newMsgs.media\" class=\"media-wrapper\">\r\n                    <img src=\"{{newMsgs.media}}\"  class=\"profile-img\"/>\r\n\r\n                </div>\r\n                <ion-spinner  *ngIf=\"loading && i+1==newMessages.length \" name=\"crescent\" style=\"color: #02C39A;\" ></ion-spinner>\r\n\r\n            </ion-col>\r\n            <!--         ////////////////////////////////////////-->\r\n\r\n            <!--         ////////////////////Receiver Part -->\r\n            <ion-col  size=\"9\" *ngIf=\"newMsgs.sender_id!==dId \">\r\n                <ion-icon name=\"radio-button-on\" size=\"medium\"  style=\"color: #2cc67b\"></ion-icon>\r\n                <span class=\"message-data-name\" >{{patName}}</span>\r\n\r\n                <!--         //////////////// Msg Body Part-->\r\n                <div color=\"sub.severityLevel\" class=\"speech-bubbleR\" *ngIf=\"newMsgs.msg_body\">\r\n                    <div class =\"Cspace\">{{newMsgs.msg_body}}</div>\r\n                    <div class=\"time\">\r\n                        <span > {{newMsgs.created_date}}</span>\r\n                    </div>\r\n                </div>\r\n\r\n                <!--         //////////////// Media Part-->\r\n                <div *ngIf=\"newMsgs.media\" class=\"media-wrapper\">\r\n                    <img src=\"{{newMsgs.media}}\"  class=\"profile-img\"/>\r\n\r\n                </div>\r\n\r\n            </ion-col>\r\n\r\n        </ion-row>\r\n    </ion-grid>\r\n</ion-content>\r\n\r\n\r\n\r\n\r\n<ion-footer no-border>\r\n    <ion-toolbar  class=\"ion-footer\">\r\n        <ion-grid >\r\n            <ion-row class=\"ion-align-items-center ion-no-margin ion-no-padding\" >\r\n                <ion-col size=\"9\" no-padding padding-horizontal >\r\n                    <ion-item class=\"typing\" text-start no-padding>\r\n                        <ion-textarea no-padding padding-horizontal [(ngModel)]=\"replyContent\" placeholder=\"Type your Message here...\"  cols =\"8\" rows=\"2\" ></ion-textarea>\r\n                    </ion-item>\r\n\r\n                </ion-col>\r\n                <ion-col size=\"3\" no-padding >\r\n                    <div class=\"buttons-tool_bar\">\r\n                        <ion-buttons no-padding >\r\n                            <ion-button class=\"ion-button\" (click)=\"sendReplyFun()\"> <ion-icon name=\"send\">\r\n\r\n                            </ion-icon> </ion-button>\r\n                            <ion-button class=\"ion-button\"  style=\" margin-left: 5px; margin-right: 10px\" (click)=\"selectImage()\">\r\n                                <ion-icon name=\"attach\">\r\n\r\n                                </ion-icon>  </ion-button>\r\n                        </ion-buttons>\r\n\r\n                    </div>\r\n                </ion-col>\r\n                <!--             <ion-col size=\"1.5\">-->\r\n                <!--                 <img src=\"assets/attach.png\" (click)=\"selectImage()\"/>-->\r\n                <!--             </ion-col>-->\r\n                <!--             <ion-col size=\"1.5\">-->\r\n                <!--                 <img src=\"assets/circle-content.webp\"  (click)=\"sendReplyFun()\"/>-->\r\n                <!--             </ion-col>-->\r\n            </ion-row>\r\n\r\n        </ion-grid>\r\n\r\n\r\n    </ion-toolbar>\r\n</ion-footer>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/conv-list/conv-list.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/conv-list/conv-list.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content [scrollEvents]=\"true\" >\r\n    <ion-refresher slot=\"fixed\"  pullFactor=\"0.3\" pullMin=\"100\" pullMax=\"200\" (ionRefresh)=\"doRefresh($event)\">\r\n        <ion-refresher-content\r\n                pullingIcon=\"chevron-down-circle-outline\"\r\n                pullingText=\"Pull to refresh\"\r\n                refreshingSpinner=\"circles\"\r\n                refreshingText=\"Refreshing...\"></ion-refresher-content>\r\n    </ion-refresher>\r\n    <ion-list >\r\n        <ion-item *ngFor=\"let account of convList;let i=index; \"class=\"card card-1\" (click)=\"reply(account)\">\r\n            <ion-avatar slot=\"start\" justify-content-center align-items-center>\r\n                <img  *ngIf=\"!account.profile_img && state==0\" class=\"img\" src=\"assets/avatar.jpg\">\r\n                <img *ngIf=\"account.profile_img && state==0\" class=\"img\" src=\"{{account.profile_img}}\">\r\n                <img *ngIf=\"state\" class=\"img\" src=\"{{DoctortData.doctor.profile_img}}\">\r\n                <img *ngIf=\"state && !DoctortData.doctor.profile_img\" class=\"img\" src=\"assets/avatar.jpg\">\r\n            </ion-avatar>\r\n            <ion-label>\r\n                <h2>{{ account.sender_name}}</h2>\r\n                <h3>{{account.msg_subject}}</h3>\r\n                <p>{{account.msg_body}}</p>\r\n            </ion-label>\r\n        </ion-item>\r\n\r\n    </ion-list>\r\n\r\n\r\n    <ion-infinite-scroll  (ionInfinite)=\"loadData($event)\">\r\n        <ion-infinite-scroll-content\r\n                loadingSpinner=\"bubbles\"\r\n                loadingText=\"Loading more data...\">\r\n        </ion-infinite-scroll-content>\r\n    </ion-infinite-scroll>\r\n</ion-content>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/conversations/conversations.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/conversations/conversations.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header translucent no-padding>\r\n    <ion-toolbar no-padding >\r\n\r\n        <ion-title margin-horizontal padding-horizontal margin-start style=\"margin-left: 40px;\">Consultations</ion-title>\r\n        <ion-buttons slot=\"end\"  margin-horizontal  >\r\n            <ion-button slot=\"start\" class=\"new\" (click)=\"CreateNew()\" size=\"small\" style=\"font-size: xx-small; color:white;\" text-center   >\r\n                <div class=\"wrapper\">\r\n                    <ion-icon  name=\"add\" size=\"large\" (click)=\"CreateNew()\"   ></ion-icon>\r\n                </div>\r\n            </ion-button>\r\n        </ion-buttons>\r\n    </ion-toolbar>\r\n    <ion-toolbar>\r\n        <ion-buttons class=\"tabs\">\r\n            <ion-button slot=\"start\" class=\"tab\" style=\"border-right:1px white solid; \" (click)=\"inbox()\">\r\n                <ion-label>Inbox</ion-label>\r\n            </ion-button>\r\n            <ion-button slot=\"end\"  class=\"tab\" (click)=\"sent()\">\r\n                <ion-label>Sent</ion-label>\r\n            </ion-button>\r\n\r\n        </ion-buttons>\r\n    </ion-toolbar>\r\n</ion-header>\r\n<!--            <ion-header >-->\r\n<!--            <ion-toolbar class=\"header\">-->\r\n<!--                <ion-buttons slot=\"end\">-->\r\n<!--                 <ion-button (click)=\"CreateNew()\">-->\r\n<!--                  <ion-col class=\"Floating-icon\" (click)=\"CreateNew()\">-->\r\n<!--                    <ion-icon name=\"create\" size=\"large\"  ></ion-icon>-->\r\n<!--                                   </ion-col>-->\r\n<!--                                    Create new-->\r\n<!--                               </ion-button>-->\r\n<!--                              -->\r\n<!--                -->\r\n<!--                   -->\r\n<!--               -->\r\n<!--                  -->\r\n<!--                </ion-buttons>-->\r\n<!--                -->\r\n<!--                -->\r\n<!--            </ion-toolbar>-->\r\n<!--            <ion-toolbar>-->\r\n<!--                <ion-grid>-->\r\n<!--                        <ion-row>-->\r\n<!--                             <ion-col size=\"8\">-->\r\n<!--                                       <ion-title>My Consultations</ion-title>-->\r\n<!--                                  </ion-col>-->\r\n<!--                             <ion-col size=\"4\">-->\r\n<!--                                       <img class=\"vital\" src=\"assets/vitals_n.png\" class=\"Floating-icon\">-->\r\n<!--                                 </ion-col>     -->\r\n<!--                            </ion-row>-->\r\n<!--                         </ion-grid>-->\r\n\r\n<!--               </ion-toolbar>-->\r\n\r\n<!--            <ion-toolbar>-->\r\n<!--            <ion-grid>-->\r\n<!--                <ion-row>-->\r\n<!--                    <ion-col size=\"6\" class=\"middle-text\">-->\r\n<!--                            <ion-title (click)=\"inbox()\">Inbox</ion-title>-->\r\n\r\n<!--                           </ion-col>-->\r\n<!--                    <ion-col size=\"6\" class=\"middle-text\">-->\r\n<!--                            <ion-title (click)=\"sent()\">Sent</ion-title>-->\r\n\r\n<!--                           </ion-col>-->\r\n<!--                    </ion-row>-->\r\n<!--              </ion-grid>-->\r\n<!--               -->\r\n<!--            </ion-toolbar>-->\r\n<!--            </ion-header>-->\r\n\r\n<ion-content>\r\n    <ion-app>\r\n\r\n        <ion-router-outlet></ion-router-outlet>\r\n\r\n    </ion-app>\r\n</ion-content>\r\n");

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
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n<div *ngIf=\"showSplash\" class=\"myBackground\">\r\n    <div>\r\n    <img src=\"/assets/giphy.gif\">\r\n</div> \r\n</div> \r\n  <ion-grid class=\"background\">\r\n    <ion-row>\r\n\r\n        <ion-col size=\"3\" sizeLg=\"3\" sizeSm=\"1\" sizeMd=\"2\" sizeXs=\"2\"></ion-col>\r\n        <ion-col size=\"6\" sizeLg=\"6\" sizeMd=\"8\" sizeSm=\"10\" sizeXs=\"8\">\r\n            <ion-toolbar text-center>\r\n                <div class=\"wrapper\">\r\n                    <div class=\"profile-img-frame\">\r\n                        <div class=\"profile-img-holder\">\r\n                            <img *ngIf=\"datastream.doctor.profile_img\" class=\"profile-img\"  src=\"{{datastream.doctor.profile_img}}\" alt=\"profile image\" (click)=\"NavigateMe('home/profile')\">\r\n                            <img *ngIf=\"!datastream.doctor.profile_img\" src=\"assets/avatar.jpg\" (click)=\"NavigateMe('home/profile')\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <h1 class=\"middle-text user-name\">{{datastream.doctor.name}}</h1>\r\n\r\n            </ion-toolbar>\r\n\r\n        </ion-col>\r\n        <ion-col size=\"3\" sizeLg=\"3\" sizeSm=\"1\" sizeMd=\"2\" sizeXs=\"2\"></ion-col>\r\n\r\n    </ion-row>\r\n  </ion-grid >\r\n  <ion-row class=\"main-card\">\r\n    <ion-grid>\r\n      <ion-row>\r\n          <ion-col col-6 >\r\n              <div class=\"mini-card\" (click)=\"NavigateMe('home/doctorList')\" >\r\n                <div class=\"center\" >\r\n                    <img class=\"icon\" src=\"assets/vitals2.png\">\r\n\r\n                </div>\r\n                \r\n                <div class=\"middle-text\">\r\n                  Patient List\r\n                </div>\r\n\r\n                  \r\n              </div>\r\n            </ion-col>\r\n            <ion-col col-6 >\r\n              <div  class=\"mini-card\" (click)=\"addPatient()\">\r\n                  <div class=\"center\" >\r\n                      <img class=\"icon\" src=\"assets/addDoc.jpeg\">\r\n  \r\n                  </div>\r\n                  \r\n                  <div class=\"middle-text\">\r\n                     Add Patient\r\n                  </div>\r\n              </div>\r\n            </ion-col>\r\n      </ion-row>\r\n      <ion-row>\r\n          <ion-col col-6 >\r\n              <div class=\"mini-card\" (click)=\"NavigateMe('home/conversation')\">\r\n                  <div class=\"center\" >\r\n                      <img class=\"icon\" src=\"assets/message.png\">\r\n  \r\n                  </div>\r\n                  \r\n                  <div class=\"middle-text\">\r\n                     Conversations\r\n                  </div>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col col-6 >\r\n              <div  class=\"mini-card\" (click)=\"newMessage(NavigateMe('home/message'))\" >\r\n                  <div class=\"center\" >\r\n                      <img class=\"icon\" src=\"assets/message.png\">\r\n  \r\n                  </div>\r\n                  \r\n                  <div class=\"middle-text\">\r\n                     New Message\r\n                  </div>\r\n              </div>\r\n            </ion-col>\r\n\r\n      </ion-row>\r\n      \r\n    </ion-grid>\r\n  </ion-row>\r\n\r\n   <app-fab></app-fab>\r\n\r\n\r\n\r\n</ion-content>\r\n<!-- <ion-content>\r\n  <ion-grid>\r\n    <ion-row>\r\n          \r\n              <app-tab>\r\n          \r\n              </app-tab>\r\n            \r\n     \r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-content> -->\r\n\r\n\r\n");

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
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n  <ion-toolbar>\r\n    <ion-row class=\"f-row\">\r\n      <ion-col >\r\n        <ion-grid id=\"item\">\r\n          <ion-row>\r\n            <ion-col size=\"4\">\r\n            </ion-col>\r\n            <ion-col size=\"8\">\r\n              <h1>My Patients</h1>\r\n            </ion-col>\r\n          </ion-row>\r\n\r\n          <ion-row >\r\n            <ion-col size=\"12\">\r\n              <ion-searchbar\r\n                      (ionInput)=\"filterList($event)\"\r\n              ></ion-searchbar>\r\n\r\n            </ion-col>\r\n\r\n\r\n\r\n\r\n          </ion-row>\r\n        </ion-grid>\r\n\r\n\r\n\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-toolbar>\r\n\r\n</ion-header>\r\n\r\n<ion-content >\r\n  <div class=\"background\">\r\n\r\n    <ion-grid class=\"grid\">\r\n      <ion-row *ngFor=\"let item of patientArrayList; let i=index\">\r\n        <ion-grid >\r\n          <!--        //first nested row-->\r\n          <ion-row >\r\n            <ion-col size=\"12\" class=\"card\" >\r\n              <ion-grid >\r\n                <!--          //second nested row    -->\r\n                <ion-row >\r\n                  <ion-col size=\"3\">\r\n                    <img  *ngIf=\"item.user_img\" class=\"profile-img\" src=\"{{item.user_img}}\" align-self-sm-center alt=\"??\">\r\n                  </ion-col>\r\n                  <ion-col size=\"9\">\r\n\r\n                    <ion-grid  id=\"item2\">\r\n\r\n                      <ion-row (click)=\"GotoPatientProfile(item)\" >\r\n                        <h3>{{item.name}}</h3>\r\n                      </ion-row>\r\n                      <ion-row>\r\n\r\n                      </ion-row>\r\n\r\n                      <ion-row >\r\n                        <ion-col size=\"3\"  sizeSm=\"1\" >\r\n\r\n                        </ion-col>\r\n                        <ion-col sizeLg=\"9\" sizeMd=\"9\" sizeSm=\"11\">\r\n                          <ion-grid  >\r\n                            <ion-row >\r\n                              <ion-col (click)=\"consultDoc(item)\">\r\n                                <ion-icon class=\"icon\" name=\"chatboxes\" size=\"large\" ></ion-icon>\r\n\r\n                              </ion-col>\r\n                              <ion-col>\r\n                                <ion-icon class=\"icon\" name=\"call\" size=\"large\"></ion-icon>\r\n                              </ion-col>\r\n                              <ion-col>\r\n                                <ion-icon class=\"icon\" name=\"calendar\"size=\"large\"></ion-icon>\r\n\r\n                              </ion-col>\r\n                            </ion-row>\r\n                          </ion-grid>\r\n\r\n\r\n\r\n                        </ion-col>\r\n                      </ion-row>\r\n                    </ion-grid>\r\n                  </ion-col>\r\n\r\n                </ion-row>\r\n                <!--              -->\r\n              </ion-grid>\r\n\r\n            </ion-col>\r\n          </ion-row>\r\n          <!--        -->\r\n        </ion-grid>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n      </ion-row>\r\n      <!--    -->\r\n    </ion-grid>\r\n  </div>\r\n\r\n</ion-content>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/profile/profile.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/profile/profile.component.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--<ion-content class=\"cont\" >-->\r\n<!--    <div *ngIf=\"showSplash\" class=\"myBackground\">-->\r\n<!--        <div>-->\r\n<!--            <img src=\"/assets/giphy.gif\">-->\r\n<!--        </div>-->\r\n<!--    </div>-->\r\n<!--    <ion-grid>-->\r\n<!--        <ion-row class =\"myrow\" >-->\r\n<!--            <ion-col size=\"12\">-->\r\n<!--                <div class=\"wrapper\" >-->\r\n<!--                    <div class=\"wave\"></div>-->\r\n<!--                    <div>-->\r\n\r\n<!--                        <ion-button class=\"back\" (click)= \"backClick()\"  shape=\"round\" color=\"sub.severityLevel\" style=\"color:black\">-->\r\n<!--                            <ion-icon name=\"arrow-round-back\" ></ion-icon>-->\r\n\r\n<!--                        </ion-button>-->\r\n<!--                    </div>-->\r\n\r\n<!--                    <div >-->\r\n<!--                        <h1 class=\"centered\">-->\r\n<!--                            <ion-input clearInput #Name disabled={{notEnable}} (ionChange)=\"changeName()\" #Name [(ngModel)]=\"myName\" floating>-->\r\n<!--                                {{doctorName}}-->\r\n<!--                            </ion-input>-->\r\n<!--                        </h1>-->\r\n<!--                        <div class=\"space\">-->\r\n<!--                            <ion-avatar class=\"avat\"  >-->\r\n<!--                                <img src=\"assets/images.jpg\" >-->\r\n<!--                            </ion-avatar>-->\r\n<!--                        </div>-->\r\n<!--                    </div>-->\r\n\r\n<!--                </div>-->\r\n<!--            </ion-col>-->\r\n<!--        </ion-row>-->\r\n<!--        <ion-row>-->\r\n<!--            <ion-col size=\"6\">-->\r\n<!--                <div class=\"Srow\">-->\r\n\r\n<!--                    <ion-item color=\"sub.severityLevel\" >-->\r\n<!--                        <ion-icon name=\"business\" class=\"pad\"></ion-icon>-->\r\n\r\n<!--                        <ion-input  clearInput  [(ngModel)]=\"myYears\" (ionChange)=\"changeExp()\" #Years  disabled={{notEnable}}  floating>-->\r\n<!--                            Years of Experience: {{years_experience}}-->\r\n<!--                        </ion-input>-->\r\n\r\n<!--                    </ion-item>-->\r\n\r\n<!--                    <ion-item  color=\"sub.severityLevel\" >-->\r\n<!--                        <ion-icon name=\"call\" class=\"pad\"></ion-icon>-->\r\n<!--                        <ion-label>-->\r\n<!--                            Mobile: {{mobile}}-->\r\n<!--                        </ion-label>-->\r\n<!--                    </ion-item>-->\r\n\r\n<!--                    <ion-item  color=\"sub.severityLevel\" >-->\r\n<!--                        <ion-icon name=\"alarm\" class=\"pad\"></ion-icon>-->\r\n<!--                        <ion-label>-->\r\n<!--                            Coming session Date:12/12/2019-->\r\n<!--                        </ion-label>-->\r\n<!--                        <ion-icon name=\"construct\" ></ion-icon>-->\r\n<!--                    </ion-item>-->\r\n\r\n<!--                    <ion-item color=\"sub.severityLevel\" >-->\r\n<!--                        <ion-icon name=\"clock\" class=\"pad\"></ion-icon>-->\r\n\r\n<!--                        Latest session Date:12/12/2019-->\r\n\r\n<!--                    </ion-item>-->\r\n\r\n\r\n<!--                </div>-->\r\n<!--            </ion-col>-->\r\n<!--        </ion-row>-->\r\n<!--        <ion-row class=\"edit\">-->\r\n<!--            <ion-col size=\"4\">-->\r\n<!--                <ion-button shape=\"round\" (click)=\"edit()\" color=\"sub.severityLevel\" style=\"color:black\"> Edit </ion-button>-->\r\n<!--            </ion-col>-->\r\n<!--            <ion-col size=\"4\" class=\"cancel\">-->\r\n<!--                <ion-button  shape=\"round\" (click)=\"save(Name.value,Years.value)\" color=\"sub.severityLevel\" style=\"color:black\"> Save </ion-button>-->\r\n<!--            </ion-col>-->\r\n<!--            <ion-col size =\"4\" class=\"fab\">-->\r\n<!--                <app-fab></app-fab>-->\r\n\r\n<!--            </ion-col>-->\r\n\r\n<!--        </ion-row>-->\r\n\r\n<!--    </ion-grid>-->\r\n<!--</ion-content>-->\r\n<div *ngIf=\"spinnerState\" class=\"myBackground\">\r\n    <div>\r\n        <img src=\"/assets/giphy.gif\">\r\n    </div>\r\n</div>\r\n<ion-content class=\"ion-content\">\r\n    <ion-grid>\r\n        <ion-row>\r\n            <ion-col size=\"3\" sizeLg=\"3\" sizeSm=\"1\" sizeMd=\"2\" sizeXs=\"2\"></ion-col>\r\n            <ion-col size=\"6\" sizeLg=\"6\" sizeMd=\"8\" sizeSm=\"10\" sizeXs=\"8\">\r\n                <ion-toolbar text-center>\r\n                    <p>My Profile</p>\r\n                    <div class=\"wrapper\">\r\n                        <div class=\"profile-img-frame\">\r\n                            <div class=\"profile-img-holder\">\r\n                                <img *ngIf=\"image\" class=\"profile-img\" src=\"{{image.path}}\" alt=\"profile image\">\r\n                                <img *ngIf=\"!image\" class=\"profile-img\" src=\"assets/avatar.jpg\" alt=\"profile image\">\r\n\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"camera\" (click)=\"selectImage()\" >\r\n                            <ion-icon name=\"camera\"  color=\"white\" size=\"large\"></ion-icon>\r\n                        </div>\r\n                    </div>\r\n                    <p style=\"font-size: 0.9em\" class=\"paragraph\">{{InputData[0].value}} </p>\r\n                    <span style=\"font-size: 0.6em\">{{InputData[2].value}} </span>\r\n\r\n                </ion-toolbar>\r\n\r\n            </ion-col>\r\n            <ion-col size=\"3\" sizeLg=\"3\" sizeSm=\"1\" sizeMd=\"2\" sizeXs=\"2\"></ion-col>\r\n\r\n\r\n        </ion-row>\r\n        <ion-row class=\"inputs\">\r\n\r\n            <ion-item *ngFor=\"let item of InputData ;\" class=\"ion-input\">\r\n                <ion-label position=\"floating\">{{item.label}}</ion-label>\r\n                <ion-input [(ngModel)]=item.value  type=\"{{item.type}}\" #input  disabled=\"{{save_state}}\"></ion-input>\r\n            </ion-item>\r\n        </ion-row>\r\n        <ion-row  >\r\n            <ion-toolbar >\r\n                <div class=\"buttons-tool_bar\">\r\n                    <ion-buttons >\r\n                        <ion-button class=\"ion-button\" (click)=\"save()\" > save </ion-button>\r\n                        <ion-button class=\"ion-button\" (click)=\"edit()\"> Edit </ion-button>\r\n                    </ion-buttons>\r\n\r\n\r\n                </div>\r\n\r\n            </ion-toolbar>\r\n\r\n        </ion-row>\r\n\r\n    </ion-grid>\r\n\r\n\r\n</ion-content>\r\n");

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

/***/ "./src/app/home/DataModels.ts":
/*!************************************!*\
  !*** ./src/app/home/DataModels.ts ***!
  \************************************/
/*! exports provided: ImagePath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImagePath", function() { return ImagePath; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

class ImagePath {
}


/***/ }),

/***/ "./src/app/home/chat/chat.component.scss":
/*!***********************************************!*\
  !*** ./src/app/home/chat/chat.component.scss ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".cont {\n  background-color: #F2F5F8; }\n\n.ion-refresher {\n  color: #000000 !important; }\n\n.typing {\n  border-radius: 80px;\n  resize: none;\n  margin-top: 1%;\n  margin-bottom: 1%; }\n\n.typing_wrapper {\n  width: 100%;\n  height: 20%; }\n\n.media-wrapper {\n  display: flex;\n  align-content: center;\n  justify-content: center;\n  align-items: center;\n  -o-object-fit: cover;\n     object-fit: cover;\n  max-width: 100%;\n  max-height: 100%;\n  min-width: 50px;\n  min-height: 50px;\n  overflow: auto; }\n\n.ion-footer {\n  --background: #25b7d3; }\n\n.tool {\n  --background: #25b7d3;\n  color: white;\n  font-family: Georgia, 'Times New Roman', Times, serif; }\n\n.sub {\n  width: 100%;\n  border: thick solid #3cb8b8;\n  border-radius: 20%; }\n\n.spaces {\n  margin-top: 120%; }\n\n.btn {\n  --padding-start:1em;\n  --padding-end: 1em;\n  color: #3cb8b8; }\n\n.message {\n  padding: 10%;\n  border-radius: 10%;\n  margin-bottom: 4%;\n  white-space: pre-wrap; }\n\n.mySender {\n  background-color: white;\n  border: thick solid #3cb8b8;\n  border-radius: 20%;\n  color: black; }\n\n.myReciever {\n  background-color: #3cb8b8;\n  border: thick solid white;\n  border-radius: 20%;\n  color: black; }\n\n.time {\n  display: flex;\n  align-items: flex-end;\n  justify-content: flex-end;\n  align-content: flex-end;\n  color: rgba(0, 0, 0, 0.65);\n  padding-left: 6px;\n  margin-right: 5%;\n  font-size: small; }\n\n.message-data-name {\n  color: #92959E; }\n\n.Cspace {\n  margin-left: 5%; }\n\n.Sspace {\n  margin-left: 2%; }\n\n.speech-bubble {\n  position: relative;\n  background-color: #36c1dc;\n  height: -webkit-fit-content;\n  height: -moz-fit-content;\n  height: fit-content;\n  color: white;\n  padding: 4% 4%;\n  line-height: 26px;\n  font-size: 16px;\n  border-radius: 20px;\n  margin-bottom: 7%;\n  margin-top: 2%; }\n\n.speech-bubble:after {\n    bottom: 100%;\n    left: 10%;\n    border: solid transparent;\n    content: \" \";\n    height: 0;\n    width: 0;\n    position: absolute;\n    pointer-events: none;\n    border-bottom-color: #36c1dc;\n    border-width: 10px;\n    margin-left: -10px; }\n\n.speech-bubbleR {\n  position: relative;\n  background-color: #f3f3f3;\n  height: -webkit-fit-content;\n  height: -moz-fit-content;\n  height: fit-content;\n  color: rgba(0, 0, 0, 0.65);\n  padding: 4% 4%;\n  line-height: 26px;\n  font-size: 16px;\n  border-radius: 20px;\n  margin-bottom: 7%;\n  margin-top: 2%; }\n\n.speech-bubbleR:before {\n    bottom: 100%;\n    left: 10%;\n    border: solid transparent;\n    content: \" \";\n    height: 0;\n    width: 0;\n    position: absolute;\n    pointer-events: none;\n    border-bottom-color: #f3f3f3;\n    border-width: 10px;\n    margin-left: -10px; }\n\n.skeleton {\n  width: 100%;\n  margin-bottom: 10%;\n  border-radius: 10%; }\n\n.outer {\n  margin-bottom: 10%;\n  color: black;\n  position: absolute; }\n\n.wrapper {\n  position: relative; }\n\n.profile-img-frame {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  justify-content: center;\n  width: 50px;\n  height: 50px;\n  min-height: 45px;\n  min-width: 45px;\n  margin-left: 15%;\n  margin-top: 0.5%;\n  margin-bottom: 0.5%;\n  background-size: cover;\n  background-repeat: no-repeat;\n  border-radius: 50%;\n  box-shadow: inset 0 0 0 5px white; }\n\n.profile-img-holder {\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 50%;\n  background-color: #25b7d3;\n  max-width: 30px;\n  max-height: 30px;\n  min-width: 25px;\n  min-height: 25px;\n  overflow: hidden; }\n\n.profile-img {\n  display: inline;\n  width: 100%;\n  height: auto; }\n\n.title {\n  position: absolute;\n  top: 35%;\n  left: 30%;\n  display: flex;\n  align-items: flex-end;\n  justify-content: flex-end;\n  align-content: flex-end;\n  color: rgba(0, 0, 0, 0.65);\n  padding-left: 6px;\n  margin-right: 5%;\n  color: rgba(0, 0, 0, 0.65); }\n\n.buttons-tool_bar {\n  display: flex;\n  align-content: flex-start;\n  align-items: flex-start;\n  justify-content: flex-start;\n  width: 100%;\n  margin-left: -2%; }\n\n.ion-button {\n  border-radius: 15px;\n  display: flex;\n  height: 40px;\n  justify-content: center;\n  align-items: center;\n  align-content: center;\n  width: 40px;\n  background: linear-gradient(145deg, #28c4e2, #21a5be);\n  box-shadow: -3px -3px 2px #1f9cb3,\r 3px 3px 2px #2bd2f3;\n  color: white; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9ob21lL2NoYXQvY2hhdC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvaG9tZS9jaGF0L2NoYXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0E7RUFDRSx5QkFBd0IsRUFBQTs7QUFHMUI7RUFFRSx5QkFBeUIsRUFBQTs7QUFHM0I7RUFFRSxtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLGNBQWM7RUFDZCxpQkFBaUIsRUFBQTs7QUFJbkI7RUFDRSxXQUFXO0VBQ1gsV0FBVyxFQUFBOztBQUdiO0VBQ0UsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLG9CQUFpQjtLQUFqQixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGNBQWMsRUFBQTs7QUFHaEI7RUFDRSxxQkFBYSxFQUFBOztBQUVmO0VBQ0UscUJBQWE7RUFDYixZQUFZO0VBQ1oscURBQXNELEVBQUE7O0FBRXhEO0VBQ0UsV0FBVztFQUNYLDJCQUFxQztFQUNyQyxrQkFBa0IsRUFBQTs7QUFFcEI7RUFDRSxnQkFBZ0IsRUFBQTs7QUFFbEI7RUFHRSxtQkFBZ0I7RUFDaEIsa0JBQWM7RUFDZCxjQUF3QixFQUFBOztBQUUxQjtFQUNFLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLHFCQUFxQixFQUFBOztBQUV2QjtFQUVFLHVCQUF1QjtFQUN2QiwyQkFBcUM7RUFDckMsa0JBQWtCO0VBQ2xCLFlBQVksRUFBQTs7QUFHZDtFQUNFLHlCQUFtQztFQUNuQyx5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLFlBQVksRUFBQTs7QUFFZDtFQUNFLGFBQWE7RUFDYixxQkFBcUI7RUFDckIseUJBQXlCO0VBQ3pCLHVCQUF1QjtFQUN2QiwwQkFBdUI7RUFDdkIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixnQkFBZ0IsRUFBQTs7QUFFbEI7RUFDRSxjQTVGWSxFQUFBOztBQThGZDtFQUNFLGVBQWUsRUFBQTs7QUFFakI7RUFDRSxlQUFlLEVBQUE7O0FBRWpCO0VBQ0Usa0JBQWtCO0VBQ2xCLHlCQUFrQztFQUNsQywyQkFBbUI7RUFBbkIsd0JBQW1CO0VBQW5CLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osY0FBYztFQUNkLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixjQUFjLEVBQUE7O0FBVmhCO0lBYUksWUFBWTtJQUNaLFNBQVM7SUFDVCx5QkFBeUI7SUFDekIsWUFBWTtJQUNaLFNBQVM7SUFDVCxRQUFRO0lBQ1Isa0JBQWtCO0lBQ2xCLG9CQUFvQjtJQUNwQiw0QkFBc0M7SUFDdEMsa0JBQWtCO0lBQ2xCLGtCQUFrQixFQUFBOztBQVF0QjtFQUNFLGtCQUFrQjtFQUNsQix5QkFBd0I7RUFDeEIsMkJBQW1CO0VBQW5CLHdCQUFtQjtFQUFuQixtQkFBbUI7RUFDbkIsMEJBQXVCO0VBQ3ZCLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsZUFBZTtFQUNmLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsY0FBYyxFQUFBOztBQVZoQjtJQVlJLFlBQVk7SUFDWixTQUFTO0lBQ1QseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixTQUFTO0lBQ1QsUUFBUTtJQUNSLGtCQUFrQjtJQUNsQixvQkFBb0I7SUFDcEIsNEJBQTRCO0lBQzVCLGtCQUFrQjtJQUNsQixrQkFBa0IsRUFBQTs7QUFNdEI7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGtCQUFrQixFQUFBOztBQUVwQjtFQUNFLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osa0JBQWtCLEVBQUE7O0FBR3BCO0VBQ0Usa0JBQWtCLEVBQUE7O0FBR3BCO0VBQ0UsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFdBQVc7RUFDWCxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsNEJBQTRCO0VBRTVCLGtCQUFrQjtFQUNsQixpQ0FBaUMsRUFBQTs7QUFLbkM7RUFDRSxvQkFBaUI7S0FBakIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQix5QkFBMEI7RUFDMUIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGdCQUFnQixFQUFBOztBQUVsQjtFQUNFLGVBQWU7RUFDZixXQUFXO0VBQ1gsWUFBWSxFQUFBOztBQUlkO0VBQ0Usa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixTQUFTO0VBQ1QsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQix5QkFBeUI7RUFDekIsdUJBQXVCO0VBQ3ZCLDBCQUF1QjtFQUN2QixpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLDBCQUF1QixFQUFBOztBQUV6QjtFQUNFLGFBQWE7RUFDYix5QkFBeUI7RUFDekIsdUJBQXVCO0VBQ3ZCLDJCQUEyQjtFQUMzQixXQUFXO0VBQ1gsZ0JBQWdCLEVBQUE7O0FBR2xCO0VBQ0UsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixZQUFZO0VBQ1osdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsV0FBVztFQUNYLHFEQUFxRDtFQUNyRCx1REFHRDtFQ3RDQyxZQUFZLEVBQUUiLCJmaWxlIjoic3JjL2FwcC9ob21lL2NoYXQvY2hhdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiRncmVlbjogIzAyQzM5QTtcclxuJGJsdWU6IzI1YjdkMztcclxuJG9yYW5nZTogI0UzODk2ODtcclxuJGdyYXk6ICM5Mjk1OUU7XHJcblxyXG4uY29udHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiNGMkY1Rjg7XHJcblxyXG59XHJcbi5pb24tcmVmcmVzaGVyIHtcclxuXHJcbiAgY29sb3I6ICMwMDAwMDAgIWltcG9ydGFudDtcclxuXHJcbn1cclxuLnR5cGluZ3tcclxuXHJcbiAgYm9yZGVyLXJhZGl1czogODBweDtcclxuICByZXNpemU6IG5vbmU7XHJcbiAgbWFyZ2luLXRvcDogMSU7XHJcbiAgbWFyZ2luLWJvdHRvbTogMSU7XHJcblxyXG5cclxufVxyXG4udHlwaW5nX3dyYXBwZXJ7XHJcbiAgd2lkdGggOjEwMCU7XHJcbiAgaGVpZ2h0OiAyMCU7XHJcblxyXG59XHJcbi5tZWRpYS13cmFwcGVye1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgb2JqZWN0LWZpdDogY292ZXI7XHJcbiAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gIG1heC1oZWlnaHQ6IDEwMCU7XHJcbiAgbWluLXdpZHRoOiA1MHB4O1xyXG4gIG1pbi1oZWlnaHQ6IDUwcHg7XHJcbiAgb3ZlcmZsb3c6IGF1dG87XHJcblxyXG59XHJcbi5pb24tZm9vdGVye1xyXG4gIC0tYmFja2dyb3VuZDogIzI1YjdkMztcclxufVxyXG4udG9vbHtcclxuICAtLWJhY2tncm91bmQ6ICMyNWI3ZDM7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGZvbnQtZmFtaWx5OiBHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgVGltZXMsIHNlcmlmIDtcclxufVxyXG4uc3Vie1xyXG4gIHdpZHRoIDoxMDAlO1xyXG4gIGJvcmRlcjogdGhpY2sgc29saWQgcmdiKDYwLCAxODQsIDE4NCk7XHJcbiAgYm9yZGVyLXJhZGl1czogMjAlO1xyXG59XHJcbi5zcGFjZXN7XHJcbiAgbWFyZ2luLXRvcDogMTIwJTtcclxufVxyXG4uYnRue1xyXG4gIC8vICAgbWFyZ2luLXJpZ2h0OiAxMCU7XHJcbiAgLy8gICBtYXJnaW4tdG9wOiA1JTtcclxuICAtLXBhZGRpbmctc3RhcnQ6MWVtO1xyXG4gIC0tcGFkZGluZy1lbmQ6IDFlbTtcclxuICBjb2xvcjogcmdiKDYwLCAxODQsIDE4NCk7XHJcbn1cclxuLm1lc3NhZ2V7XHJcbiAgcGFkZGluZzogMTAlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwJTtcclxuICBtYXJnaW4tYm90dG9tOiA0JTtcclxuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XHJcbn1cclxuLm15U2VuZGVye1xyXG5cclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICBib3JkZXI6IHRoaWNrIHNvbGlkIHJnYig2MCwgMTg0LCAxODQpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDIwJTtcclxuICBjb2xvcjogYmxhY2s7XHJcblxyXG59XHJcbi5teVJlY2lldmVye1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig2MCwgMTg0LCAxODQpO1xyXG4gIGJvcmRlcjogdGhpY2sgc29saWQgd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogMjAlO1xyXG4gIGNvbG9yOiBibGFjaztcclxufVxyXG4udGltZXtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gIGNvbG9yOiByZ2JhKDAsMCwwLDAuNjUpO1xyXG4gIHBhZGRpbmctbGVmdDogNnB4O1xyXG4gIG1hcmdpbi1yaWdodDogNSU7XHJcbiAgZm9udC1zaXplOiBzbWFsbDtcclxufVxyXG4ubWVzc2FnZS1kYXRhLW5hbWV7XHJcbiAgY29sb3I6ICRncmF5O1xyXG59XHJcbi5Dc3BhY2V7XHJcbiAgbWFyZ2luLWxlZnQ6IDUlO1xyXG59XHJcbi5Tc3BhY2V7XHJcbiAgbWFyZ2luLWxlZnQ6IDIlO1xyXG59XHJcbi5zcGVlY2gtYnViYmxlIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjpsaWdodGVuKCRibHVlLDUlKSA7XHJcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgcGFkZGluZzogNCUgNCU7XHJcbiAgbGluZS1oZWlnaHQ6IDI2cHg7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogNyU7XHJcbiAgbWFyZ2luLXRvcDogMiU7XHJcblxyXG4gICY6YWZ0ZXIge1xyXG4gICAgYm90dG9tOiAxMDAlO1xyXG4gICAgbGVmdDogMTAlO1xyXG4gICAgYm9yZGVyOiBzb2xpZCB0cmFuc3BhcmVudDtcclxuICAgIGNvbnRlbnQ6IFwiIFwiO1xyXG4gICAgaGVpZ2h0OiAwO1xyXG4gICAgd2lkdGg6IDA7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6IGxpZ2h0ZW4oJGJsdWUsNSUpO1xyXG4gICAgYm9yZGVyLXdpZHRoOiAxMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IC0xMHB4O1xyXG4gIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcbi5zcGVlY2gtYnViYmxlUiB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6I2YzZjNmMztcclxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xyXG4gIGNvbG9yOiByZ2JhKDAsMCwwLDAuNjUpO1xyXG4gIHBhZGRpbmc6IDQlIDQlO1xyXG4gIGxpbmUtaGVpZ2h0OiAyNnB4O1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDclO1xyXG4gIG1hcmdpbi10b3A6IDIlO1xyXG4gICY6YmVmb3JlIHtcclxuICAgIGJvdHRvbTogMTAwJTtcclxuICAgIGxlZnQ6IDEwJTtcclxuICAgIGJvcmRlcjogc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICBjb250ZW50OiBcIiBcIjtcclxuICAgIGhlaWdodDogMDtcclxuICAgIHdpZHRoOiAwO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiAjZjNmM2YzO1xyXG4gICAgYm9yZGVyLXdpZHRoOiAxMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IC0xMHB4O1xyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG4uc2tlbGV0b257XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTAlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwJTtcclxufVxyXG4ub3V0ZXIge1xyXG4gIG1hcmdpbi1ib3R0b206IDEwJTtcclxuICBjb2xvcjogYmxhY2s7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG5cclxufVxyXG4ud3JhcHBlcntcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi5wcm9maWxlLWltZy1mcmFtZXtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIHdpZHRoOiA1MHB4O1xyXG4gIGhlaWdodDogNTBweDtcclxuICBtaW4taGVpZ2h0OiA0NXB4O1xyXG4gIG1pbi13aWR0aDogNDVweDtcclxuICBtYXJnaW4tbGVmdDogMTUlO1xyXG4gIG1hcmdpbi10b3A6IDAuNSU7XHJcbiAgbWFyZ2luLWJvdHRvbTogMC41JTtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgLy9iYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCA1cHggd2hpdGU7XHJcblxyXG5cclxufVxyXG5cclxuLnByb2ZpbGUtaW1nLWhvbGRlcntcclxuICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogICMyNWI3ZDM7XHJcbiAgbWF4LXdpZHRoOiAzMHB4O1xyXG4gIG1heC1oZWlnaHQ6IDMwcHg7XHJcbiAgbWluLXdpZHRoOiAyNXB4O1xyXG4gIG1pbi1oZWlnaHQ6IDI1cHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG4ucHJvZmlsZS1pbWd7XHJcbiAgZGlzcGxheTogaW5saW5lO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogYXV0bztcclxuXHJcblxyXG59XHJcbi50aXRsZXtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAzNSU7XHJcbiAgbGVmdDogMzAlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbiAgYWxpZ24tY29udGVudDogZmxleC1lbmQ7XHJcbiAgY29sb3I6IHJnYmEoMCwwLDAsMC42NSk7XHJcbiAgcGFkZGluZy1sZWZ0OiA2cHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiA1JTtcclxuICBjb2xvcjogcmdiYSgwLDAsMCwwLjY1KTtcclxufVxyXG4uYnV0dG9ucy10b29sX2JhcntcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1hcmdpbi1sZWZ0OiAtMiU7XHJcblxyXG59XHJcbi5pb24tYnV0dG9uIHtcclxuICBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gIHdpZHRoOiA0MHB4O1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxNDVkZWcsICMyOGM0ZTIsICMyMWE1YmUpO1xyXG4gIGJveC1zaGFkb3c6ICAtM3B4IC0zcHggMnB4ICMxZjljYjMsXHJcbiAgM3B4IDNweCAycHggIzJiZDJmMztcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuIiwiLmNvbnQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjJGNUY4OyB9XG5cbi5pb24tcmVmcmVzaGVyIHtcbiAgY29sb3I6ICMwMDAwMDAgIWltcG9ydGFudDsgfVxuXG4udHlwaW5nIHtcbiAgYm9yZGVyLXJhZGl1czogODBweDtcbiAgcmVzaXplOiBub25lO1xuICBtYXJnaW4tdG9wOiAxJTtcbiAgbWFyZ2luLWJvdHRvbTogMSU7IH1cblxuLnR5cGluZ193cmFwcGVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMjAlOyB9XG5cbi5tZWRpYS13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWF4LWhlaWdodDogMTAwJTtcbiAgbWluLXdpZHRoOiA1MHB4O1xuICBtaW4taGVpZ2h0OiA1MHB4O1xuICBvdmVyZmxvdzogYXV0bzsgfVxuXG4uaW9uLWZvb3RlciB7XG4gIC0tYmFja2dyb3VuZDogIzI1YjdkMzsgfVxuXG4udG9vbCB7XG4gIC0tYmFja2dyb3VuZDogIzI1YjdkMztcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LWZhbWlseTogR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIFRpbWVzLCBzZXJpZjsgfVxuXG4uc3ViIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogdGhpY2sgc29saWQgIzNjYjhiODtcbiAgYm9yZGVyLXJhZGl1czogMjAlOyB9XG5cbi5zcGFjZXMge1xuICBtYXJnaW4tdG9wOiAxMjAlOyB9XG5cbi5idG4ge1xuICAtLXBhZGRpbmctc3RhcnQ6MWVtO1xuICAtLXBhZGRpbmctZW5kOiAxZW07XG4gIGNvbG9yOiAjM2NiOGI4OyB9XG5cbi5tZXNzYWdlIHtcbiAgcGFkZGluZzogMTAlO1xuICBib3JkZXItcmFkaXVzOiAxMCU7XG4gIG1hcmdpbi1ib3R0b206IDQlO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7IH1cblxuLm15U2VuZGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGJvcmRlcjogdGhpY2sgc29saWQgIzNjYjhiODtcbiAgYm9yZGVyLXJhZGl1czogMjAlO1xuICBjb2xvcjogYmxhY2s7IH1cblxuLm15UmVjaWV2ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2NiOGI4O1xuICBib3JkZXI6IHRoaWNrIHNvbGlkIHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAyMCU7XG4gIGNvbG9yOiBibGFjazsgfVxuXG4udGltZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgYWxpZ24tY29udGVudDogZmxleC1lbmQ7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNjUpO1xuICBwYWRkaW5nLWxlZnQ6IDZweDtcbiAgbWFyZ2luLXJpZ2h0OiA1JTtcbiAgZm9udC1zaXplOiBzbWFsbDsgfVxuXG4ubWVzc2FnZS1kYXRhLW5hbWUge1xuICBjb2xvcjogIzkyOTU5RTsgfVxuXG4uQ3NwYWNlIHtcbiAgbWFyZ2luLWxlZnQ6IDUlOyB9XG5cbi5Tc3BhY2Uge1xuICBtYXJnaW4tbGVmdDogMiU7IH1cblxuLnNwZWVjaC1idWJibGUge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzNmMxZGM7XG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgcGFkZGluZzogNCUgNCU7XG4gIGxpbmUtaGVpZ2h0OiAyNnB4O1xuICBmb250LXNpemU6IDE2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIG1hcmdpbi1ib3R0b206IDclO1xuICBtYXJnaW4tdG9wOiAyJTsgfVxuICAuc3BlZWNoLWJ1YmJsZTphZnRlciB7XG4gICAgYm90dG9tOiAxMDAlO1xuICAgIGxlZnQ6IDEwJTtcbiAgICBib3JkZXI6IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgIGhlaWdodDogMDtcbiAgICB3aWR0aDogMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogIzM2YzFkYztcbiAgICBib3JkZXItd2lkdGg6IDEwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IC0xMHB4OyB9XG5cbi5zcGVlY2gtYnViYmxlUiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YzZjNmMztcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42NSk7XG4gIHBhZGRpbmc6IDQlIDQlO1xuICBsaW5lLWhlaWdodDogMjZweDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBtYXJnaW4tYm90dG9tOiA3JTtcbiAgbWFyZ2luLXRvcDogMiU7IH1cbiAgLnNwZWVjaC1idWJibGVSOmJlZm9yZSB7XG4gICAgYm90dG9tOiAxMDAlO1xuICAgIGxlZnQ6IDEwJTtcbiAgICBib3JkZXI6IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgIGhlaWdodDogMDtcbiAgICB3aWR0aDogMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogI2YzZjNmMztcbiAgICBib3JkZXItd2lkdGg6IDEwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IC0xMHB4OyB9XG5cbi5za2VsZXRvbiB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW4tYm90dG9tOiAxMCU7XG4gIGJvcmRlci1yYWRpdXM6IDEwJTsgfVxuXG4ub3V0ZXIge1xuICBtYXJnaW4tYm90dG9tOiAxMCU7XG4gIGNvbG9yOiBibGFjaztcbiAgcG9zaXRpb246IGFic29sdXRlOyB9XG5cbi53cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XG5cbi5wcm9maWxlLWltZy1mcmFtZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiA1MHB4O1xuICBoZWlnaHQ6IDUwcHg7XG4gIG1pbi1oZWlnaHQ6IDQ1cHg7XG4gIG1pbi13aWR0aDogNDVweDtcbiAgbWFyZ2luLWxlZnQ6IDE1JTtcbiAgbWFyZ2luLXRvcDogMC41JTtcbiAgbWFyZ2luLWJvdHRvbTogMC41JTtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCA1cHggd2hpdGU7IH1cblxuLnByb2ZpbGUtaW1nLWhvbGRlciB7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyNWI3ZDM7XG4gIG1heC13aWR0aDogMzBweDtcbiAgbWF4LWhlaWdodDogMzBweDtcbiAgbWluLXdpZHRoOiAyNXB4O1xuICBtaW4taGVpZ2h0OiAyNXB4O1xuICBvdmVyZmxvdzogaGlkZGVuOyB9XG5cbi5wcm9maWxlLWltZyB7XG4gIGRpc3BsYXk6IGlubGluZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bzsgfVxuXG4udGl0bGUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMzUlO1xuICBsZWZ0OiAzMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgYWxpZ24tY29udGVudDogZmxleC1lbmQ7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNjUpO1xuICBwYWRkaW5nLWxlZnQ6IDZweDtcbiAgbWFyZ2luLXJpZ2h0OiA1JTtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42NSk7IH1cblxuLmJ1dHRvbnMtdG9vbF9iYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLWxlZnQ6IC0yJTsgfVxuXG4uaW9uLWJ1dHRvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogNDBweDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDQwcHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxNDVkZWcsICMyOGM0ZTIsICMyMWE1YmUpO1xuICBib3gtc2hhZG93OiAtM3B4IC0zcHggMnB4ICMxZjljYjMsXHIgM3B4IDNweCAycHggIzJiZDJmMztcbiAgY29sb3I6IHdoaXRlOyB9XG4iXX0= */");

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
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/file/ngx */ "./node_modules/@ionic-native/file/ngx/index.js");
/* harmony import */ var _ionic_native_ionic_webview_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/ionic-webview/ngx */ "./node_modules/@ionic-native/ionic-webview/ngx/index.js");
/* harmony import */ var _ionic_native_file_path_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/file-path/ngx */ "./node_modules/@ionic-native/file-path/ngx/index.js");
/* harmony import */ var _services_Network_network_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../services/Network/network.service */ "./src/app/services/Network/network.service.ts");
/* harmony import */ var _DataModels__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../DataModels */ "./src/app/home/DataModels.ts");















const STORAGE_KEY = 'my_image';
let ChatComponent = class ChatComponent {
    constructor(intComp, navigation, httpService, dataStream, communication, camera, file, webview, actionSheetController, toastController, storage, plt, ref, filePath, network) {
        this.intComp = intComp;
        this.navigation = navigation;
        this.httpService = httpService;
        this.dataStream = dataStream;
        this.communication = communication;
        this.camera = camera;
        this.file = file;
        this.webview = webview;
        this.actionSheetController = actionSheetController;
        this.toastController = toastController;
        this.storage = storage;
        this.plt = plt;
        this.ref = ref;
        this.filePath = filePath;
        this.network = network;
        this.images = [];
        this.img = new _DataModels__WEBPACK_IMPORTED_MODULE_13__["ImagePath"]();
        this.newMessages = [];
        this.patientArray = new Array();
        this.showSplash = false;
        this.loading = false;
        this.scrollingPosition = 0;
        this.pat_img = '';
    }
    ngOnInit() {
        this.plt.ready().then(() => {
            this.loadStoredImages();
        });
    }
    loadStoredImages() {
        this.storage.get(STORAGE_KEY).then(images => {
            if (images) {
                let arr = JSON.parse(images);
                this.images = [];
                for (let img of arr) {
                    let filePath = this.file.dataDirectory + img;
                    let resPath = this.pathForImage(filePath);
                    this.images.push({ name: img, path: resPath, filePath: filePath });
                }
            }
        });
    }
    ionViewWillEnter() {
        this.showSplash = true;
        new Promise((resolve, reject) => {
            this.dId = this.dataStream.getDoctorId();
            if (this.dId == undefined) {
                reject('patient undefined');
            }
            else {
                resolve();
            }
        }).then(() => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.patientArray = this.dataStream.getPatientList();
            console.log("chat doctor list ", this.patientArray);
            yield this.communication.msg.subscribe((massagesFromMessageOrConvList) => {
                console.log("replies in chat: ", massagesFromMessageOrConvList);
                this.newMessages = massagesFromMessageOrConvList.newMessages;
                this.thread = massagesFromMessageOrConvList.thread;
                this.thread_id = massagesFromMessageOrConvList.thread_id;
                this.showSplash = true;
                console.log("msg received  " + massagesFromMessageOrConvList);
                this.setMessege();
            });
        })).then(() => this.showSplash = false);
    }
    ionViewDidEnter() {
        console.log("ion view did enter");
        this.ScrollToBottom();
    }
    ScrollToBottom() {
        setTimeout(() => {
            this.bigContent.scrollToBottom(100);
        }, 1000);
    }
    ////////////////////
    setMessege() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.newMsgs = this.newMessages[0];
            console.log("newMsgs: ", this.newMsgs);
            if (this.newMsgs.sender_id == undefined) {
                this.newMsgs.sender_id = this.dId;
                console.log("newMsgs.sender_id" + this.newMsgs.sender_id);
                console.log("newMsgs if denderid is undefined" + this.newMsgs);
            }
            console.log("myMsgs", this.newMsgs);
            yield (this.userToRecieve = this.patientArray.find(patient => patient.patientId == this.newMsgs.receiver_id || patient.patientId == this.newMsgs.sender_id));
            this.patName = this.userToRecieve.name;
            this.pat_img = this.userToRecieve.user_img;
            console.log("patient to receive: ", this.patientArray);
            console.log("newMsgs.sender_id" + this.newMsgs.sender_id);
            console.log("sender", this.dId);
        });
    }
    back() {
        this.navigation.navigateTo('home');
    }
    sendReplyFun() {
        this.sendReply(this.thread_id);
    }
    sendReply(threadId) {
        console.log("this.tId: ", threadId);
        console.log(this.newMessages);
        console.log("userToRecieve in send reply" + this.userToRecieve);
        //////////////////////////////////
        this.data = {
            sender_id: this.dId,
            receiver_id: this.userToRecieve.patientId,
            msg_body: this.replyContent,
            thread_subject: this.thread.msg_subject,
            fcm_token: this.userToRecieve.fcmtoken
        };
        console.log("Data  for reply: ", this.data);
        this.httpService.postReply(this.data, threadId).subscribe((res) => {
            console.log("posted", res);
            this.newMessages.push(this.data);
        });
        this.replyContent = "";
        this.ScrollToBottom();
        ////////////////////////////////////////////////////////////////////////////////////
    }
    goConv() {
        this.navigation.navigateTo("home/conversation");
    }
    selectImage() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const actionSheet = yield this.actionSheetController.create({
                header: "Select Image source",
                buttons: [{
                        text: 'Load from Library',
                        handler: () => {
                            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                        }
                    },
                    {
                        text: 'Use Camera',
                        handler: () => {
                            this.takePicture(this.camera.PictureSourceType.CAMERA);
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    }
                ]
            });
            yield actionSheet.present();
        });
    }
    takePicture(sourceType) {
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(imagePath => {
            if (this.network.NetworkStateGetter()) {
                if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                    this.filePath.resolveNativePath(imagePath)
                        .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.img = {
                            path: correctPath + currentName,
                            currentName: currentName,
                            correctPath: correctPath
                        };
                        this.startUpload(this.img.path);
                        this.image = {
                            sender_id: this.dId,
                            receiver_id: this.userToRecieve.patientId,
                            msg_body: "",
                            fcm_token: this.userToRecieve.fcmtoken,
                            media: this.pathForImage(this.img.path)
                        };
                        this.newMessages.push(this.image);
                        this.loading = true;
                        this.ref.detectChanges();
                        this.ScrollToBottom();
                        // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
                }
                else {
                    var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                    var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                    this.img = {
                        path: correctPath + currentName,
                        currentName: currentName,
                        correctPath: correctPath
                    };
                    this.startUpload(this.img.path);
                    this.image = {
                        sender_id: this.dId,
                        receiver_id: this.userToRecieve.patientId,
                        msg_body: "",
                        fcm_token: this.userToRecieve.fcmtoken,
                        media: this.pathForImage(this.img.path)
                    };
                    this.newMessages.push(this.image);
                    this.loading = true;
                    this.ref.detectChanges();
                    this.ScrollToBottom();
                    // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                }
            }
            else {
                alert("you are Offline");
            }
        });
    }
    pathForImage(img) {
        if (img === null) {
            return '';
        }
        else {
            let converted = this.webview.convertFileSrc(img);
            return converted;
        }
    }
    createFileName() {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    }
    copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
            this.updateStoredImages(newFileName);
        }, error => {
            this.presentToast('Error while storing file.');
        });
    }
    updateStoredImages(name) {
        this.storage.get(STORAGE_KEY).then(images => {
            let arr = JSON.parse(images);
            if (!arr) {
                let newImages = [name];
                this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
            }
            else {
                arr.push(name);
                this.storage.set(STORAGE_KEY, JSON.stringify(arr));
            }
            let filePath = this.file.dataDirectory + name;
            let resPath = this.pathForImage(filePath);
            let newEntry = {
                name: name,
                path: resPath,
                filePath: filePath
            };
            console.log("newEntry" + newEntry);
            this.images = [newEntry, ...this.images];
            this.newMessages.find(msg => msg.media == this.pathForImage(this.img.path)).media = resPath;
            this.loading = false;
            this.ref.detectChanges();
        });
    }
    startUpload(imgEntry) {
        console.log("upload" + JSON.stringify(imgEntry));
        this.file.resolveLocalFilesystemUrl(imgEntry)
            .then(entry => {
            entry.file(file => this.readFile(file));
        })
            .catch(err => {
            this.presentToast('Error while reading file.');
        });
    }
    json() {
        return {
            "thread_id": this.thread_id,
            "sender_id": this.dId,
            "receiver_id": this.userToRecieve.patientId,
            "msg_body": "",
            "fcm_token": this.userToRecieve.fcmtoken
        };
    }
    readFile(file) {
        const that = this;
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log("ressssssss" + reader.result);
            const formData = new FormData();
            const imgBlob = new Blob([reader.result], { type: file.type });
            console.log("blob" + JSON.stringify(imgBlob));
            formData.append('file', imgBlob, file.name);
            formData.append('data', JSON.stringify(this.json()));
            this.httpService.UplaodingMediaMsg(formData, this.thread_id).subscribe((data) => {
                console.log(" allData ", data);
                that.url = data.url;
                this.showSplash = false;
                console.log("Data Came: ", that.url);
                that.setMessege();
                this.ScrollToBottom();
                this.copyFileToLocalDir(this.img.correctPath, this.img.currentName, this.createFileName());
            }, (err) => {
                console.log("ERROR Occured will sending your msg");
            }, () => {
                console.log("Completed");
                console.log("Data Came3: ", that.newMessages);
                console.log("Data Came:2 ", this.image);
            });
            console.log("form  " + JSON.stringify(formData.getAll('file')));
        };
        reader.readAsArrayBuffer(file);
        console.log("Data Came:2 ", that.url);
        console.log("Data Came:2 ", this.image);
    }
    doRefresh(event) {
        console.log("scrolling to top event", event);
        this.scrollingPosition = this.scrollingPosition + 10;
        console.log("all msgs before refresh", this.newMessages);
        this.httpService.getReplies(this.thread_id, this.scrollingPosition).subscribe((res) => {
            let msgs = res.reverse();
            console.log("msgs", msgs);
            if (msgs.length) {
                this.newMessages = msgs.concat(this.newMessages);
                console.log("all msgs", this.newMessages);
                event.target.complete();
                this.ref.detectChanges();
                return;
            }
            event.target.complete();
            this.ref.detectChanges();
        });
    }
    presentToast(text) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: text,
                position: 'bottom',
                duration: 3000
            });
            toast.present();
        });
    }
};
ChatComponent.ctorParameters = () => [
    { type: src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_2__["InteractionService"] },
    { type: _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_3__["NavigationService"] },
    { type: _HttPService_http_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"] },
    { type: src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_6__["DatastreamingService"] },
    { type: src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_2__["InteractionService"] },
    { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_8__["Camera"] },
    { type: _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_9__["File"] },
    { type: _ionic_native_ionic_webview_ngx__WEBPACK_IMPORTED_MODULE_10__["WebView"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ActionSheetController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
    { type: _ionic_native_file_path_ngx__WEBPACK_IMPORTED_MODULE_11__["FilePath"] },
    { type: _services_Network_network_service__WEBPACK_IMPORTED_MODULE_12__["NetworkService"] }
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
        src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_2__["InteractionService"],
        _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_8__["Camera"],
        _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_9__["File"],
        _ionic_native_ionic_webview_ngx__WEBPACK_IMPORTED_MODULE_10__["WebView"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ActionSheetController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"],
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
        _ionic_native_file_path_ngx__WEBPACK_IMPORTED_MODULE_11__["FilePath"], _services_Network_network_service__WEBPACK_IMPORTED_MODULE_12__["NetworkService"]])
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
/* harmony default export */ __webpack_exports__["default"] = (".card {\n  background: #fff;\n  border-radius: 2px; }\n\n.card-1 {\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }\n\n.card-1:hover {\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); }\n\n.msg {\n  max-height: 50px;\n  overflow: hidden; }\n\n.img {\n  display: inline; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9ob21lL2NvbnYtbGlzdC9jb252LWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsa0JBQWtCLEVBQUE7O0FBR3BCO0VBQ0Usd0VBQWtFO0VBQ2xFLHFEQUErQyxFQUFBOztBQUVqRDtFQUVFLDRFQUFzRSxFQUFBOztBQUd4RTtFQUNFLGdCQUFlO0VBQ2YsZ0JBQWdCLEVBQUE7O0FBSWxCO0VBQ0UsZUFBZSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9jb252LWxpc3QvY29udi1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQge1xyXG4gIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xyXG59XHJcblxyXG4uY2FyZC0xIHtcclxuICBib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLDAsMCwwLjEyKSwgMCAxcHggMnB4IHJnYmEoMCwwLDAsMC4yNCk7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7XHJcbn1cclxuLmNhcmQtMTpob3ZlciB7XHJcblxyXG4gIGJveC1zaGFkb3c6IDAgMTRweCAyOHB4IHJnYmEoMCwwLDAsMC4yNSksIDAgMTBweCAxMHB4IHJnYmEoMCwwLDAsMC4yMik7XHJcbn1cclxuXHJcbi5tc2cge1xyXG4gIG1heC1oZWlnaHQ6NTBweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG5cclxuXHJcbn1cclxuLmltZ3tcclxuICBkaXNwbGF5OiBpbmxpbmU7XHJcblxyXG59XHJcbiJdfQ== */");

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
    constructor(httpService, DoctortData, navigation, eventEmitterService, dateInteraction, addController, detectChange) {
        this.httpService = httpService;
        this.DoctortData = DoctortData;
        this.navigation = navigation;
        this.eventEmitterService = eventEmitterService;
        this.dateInteraction = dateInteraction;
        this.addController = addController;
        this.detectChange = detectChange;
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
            this.state = 0;
            // at the fist time we need to assign the part of code we need to invoke every time the event emitter emits value
            // tslint:disable-next-line:triple-equals
            if (this.eventEmitterService.Subscribtion == undefined) {
                console.log('subscribing to the event emitter');
                // when the event emitter emits new value only the part of the code that the subscriber hold will be invoked
                this.eventEmitterService.Subscribtion = this.eventEmitterService.FunctionCaller.subscribe((state) => {
                    this.state = state;
                    this.GetData(state);
                    console.log('event emitter listener invoked');
                });
            }
        }).catch((err) => this.presentAlert('data stream error', err.message))
            .finally(() => { this.detectChange.detectChanges(); console.log("finally"); });
    }
    ngOnDestroy() {
        this.eventEmitterService.Subscribtion = undefined;
    }
    ionViewWillEnter() {
        console.log('convlist ion view will enter');
    }
    GetData(state) {
        console.log('get data function');
        this.page = 0;
        if (state == 0) {
            console.log('page', this.page);
            console.log('interaction works');
            this.httpService.getInbox(this.docId, this.page).subscribe(res => {
                if (res.length) {
                    this.convList = res;
                }
                else {
                    this.convList = [res];
                }
                console.log("Get Inbox res", res);
                this.detectChange.detectChanges();
            }, error1 => { alert("http error get inbox" + error1); console.log("error", error1); });
        }
        else {
            console.log('page', this.page);
            this.httpService.getSent(this.docId, this.page).subscribe(res => {
                if (res.length) {
                    this.convList = res;
                }
                else {
                    this.convList = [res];
                }
                console.log("Get sent res", res);
                this.detectChange.detectChanges();
            }, error1 => this.presentAlert('http error get sent', error1));
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
    doRefresh(event) {
        console.log('Begin async operation');
        new Promise((resolve, reject) => {
            console.log("state", this.state);
            this.GetData(this.state);
            console.log('Async operation has ended');
            resolve();
        }).then(() => { event.target.complete(); this.detectChange.detectChanges(); });
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
            yield this.httpService.getReplies(thread.thread_id, 0).subscribe((res) => {
                let newThread = {
                    newMessages: res.reverse(),
                    thread: thread,
                    thread_id: thread.thread_id
                };
                this.dateInteraction.sendMSG(newThread);
                console.log('replies', res);
                this.navigation.navigateTo('home/chat');
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
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] }
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
        src_app_services_datacommunication_interaction_service__WEBPACK_IMPORTED_MODULE_4__["InteractionService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
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
/* harmony default export */ __webpack_exports__["default"] = ("ion-content {\n  height: 100%;\n  width: 100%;\n  margin: 0px; }\n\n.inbox {\n  background-color: paleturquoise;\n  width: 100%;\n  height: 30%;\n  border-radius: 10%;\n  margin-left: -20%; }\n\n.sent {\n  background-color: paleturquoise;\n  width: 100%;\n  height: 30%;\n  border-radius: 10%;\n  margin-left: 20%; }\n\n.myRow {\n  height: 100%; }\n\n.myFab {\n  margin-bottom: 50%; }\n\n.sentText {\n  margin-left: 30%;\n  font-size: 120%; }\n\n.inboxText {\n  margin-left: 50%;\n  font-size: 120%; }\n\n.middle-text {\n  text-align: center;\n  font-family: Georgia, 'Times New Roman', Times, serif;\n  margin-top: 2%;\n  margin-bottom: 2%; }\n\n.header {\n  background-color: #25b7d3; }\n\n.Floating-icon {\n  -webkit-animation: flickr 0.7s ease-in-out 0.1s 1 alternate both;\n  animation: flickr 0.7s ease-in-out 0.1s 1 alternate both;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite; }\n\n@keyframes flickr {\n  0% {\n    left: 0px;\n    top: 0px; }\n  50% {\n    left: -5px; }\n  100% {\n    right: 5px; } }\n\n@-webkit-keyframes flickr {\n  0% {\n    left: 0px;\n    top: 0px; }\n  50% {\n    left: -5px; }\n  100% {\n    right: 5px; } }\n\n.icon {\n  margin-right: 10%;\n  --padding-start:5em;\n  --padding-end: 5em; }\n\n.ion-icon {\n  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2); }\n\nion-toolbar {\n  --background: #25b7d3;\n  color: white; }\n\nion-header {\n  --background: #25b7d3; }\n\nion-item {\n  --background: #25b7d3; }\n\n.new {\n  height: 100%;\n  width: 100%; }\n\nion-tabs {\n  --background:  #25b7d3; }\n\nion-tab-bar {\n  --background:  #25b7d3;\n  border: 0px; }\n\n.tab {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  align-content: center;\n  font-size: larger;\n  --background: #25b7d3;\n  height: 100%;\n  width: 50%;\n  border: 0px; }\n\n.tabs {\n  width: 100%; }\n\n.wrapper {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content;\n  height: -webkit-fit-content;\n  height: -moz-fit-content;\n  height: fit-content;\n  padding: 15%;\n  margin: 7%;\n  background: linear-gradient(145deg, #28c4e2, #21a5be);\n  box-shadow: -3px -3px 2px #1f9cb3,\r 3px 3px 2px #2bd2f3;\n  z-index: 3; }\n\nion-icon {\n  color: white; }\n\n.tab:hover ion-label {\n  border-bottom: 1px solid; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9ob21lL2NvbnZlcnNhdGlvbnMvY29udmVyc2F0aW9ucy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvaG9tZS9jb252ZXJzYXRpb25zL2NvbnZlcnNhdGlvbnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLFdBQVcsRUFBQTs7QUFFYjtFQUNFLCtCQUE4QjtFQUM5QixXQUFXO0VBQ1gsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixpQkFBaUIsRUFBQTs7QUFHbkI7RUFDRSwrQkFBK0I7RUFDL0IsV0FBVztFQUNYLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsZ0JBQWdCLEVBQUE7O0FBR2xCO0VBQ0UsWUFBWSxFQUFBOztBQUVkO0VBQ0Usa0JBQWlCLEVBQUE7O0FBRW5CO0VBQ0UsZ0JBQWdCO0VBQ2hCLGVBQWUsRUFBQTs7QUFHakI7RUFDRSxnQkFBZ0I7RUFDaEIsZUFBZSxFQUFBOztBQUdqQjtFQUNFLGtCQUFrQjtFQUNsQixxREFBcUQ7RUFDckQsY0FBYTtFQUNiLGlCQUFpQixFQUFBOztBQUduQjtFQUNFLHlCQUF5QixFQUFBOztBQU0zQjtFQUVFLGdFQUFnRTtFQUNoRSx3REFBd0Q7RUFDeEQsMkNBQW1DO1VBQW5DLG1DQUFtQyxFQUFBOztBQUlyQztFQUNFO0lBQU0sU0FBUTtJQUFFLFFBQU8sRUFBQTtFQUN2QjtJQUFPLFVBQVMsRUFBQTtFQUNoQjtJQUFPLFVBQVMsRUFBQSxFQUFBOztBQUVsQjtFQUNFO0lBQU0sU0FBUTtJQUFFLFFBQU8sRUFBQTtFQUN2QjtJQUFPLFVBQVMsRUFBQTtFQUNoQjtJQUFPLFVBQVMsRUFBQSxFQUFBOztBQUdsQjtFQUNFLGlCQUFnQjtFQUNoQixtQkFBZ0I7RUFDaEIsa0JBQWMsRUFBQTs7QUFFaEI7RUFDRSw4Q0FBMkMsRUFBQTs7QUFJN0M7RUFDRSxxQkFBYTtFQUNiLFlBQVksRUFBQTs7QUFFZDtFQUNFLHFCQUFhLEVBQUE7O0FBRWY7RUFFRSxxQkFBYSxFQUFBOztBQUVmO0VBQ0UsWUFBWTtFQUNaLFdBQVcsRUFBQTs7QUFFYjtFQUNFLHNCQUFhLEVBQUE7O0FBRWY7RUFDRSxzQkFBYTtFQUNiLFdBQVcsRUFBQTs7QUFLYjtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLHFCQUFxQjtFQUNyQixpQkFBaUI7RUFDakIscUJBQWE7RUFDYixZQUFZO0VBQ1osVUFBVTtFQUNWLFdBQVcsRUFBQTs7QUFJYjtFQUNFLFdBQVcsRUFBQTs7QUFHYjtFQUNFLGFBQWE7RUFDYixxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsMEJBQWtCO0VBQWxCLHVCQUFrQjtFQUFsQixrQkFBa0I7RUFDbEIsMkJBQW1CO0VBQW5CLHdCQUFtQjtFQUFuQixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLFVBQVU7RUFDVixxREFBcUQ7RUFDckQsdURBSUQ7RUNqQkMsVUFBVSxFQUFFOztBQUVkO0VBQ0UsWUFBWSxFQUFFOztBQUVoQjtFQUNFLHdCQUF3QixFQUFFIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9jb252ZXJzYXRpb25zL2NvbnZlcnNhdGlvbnMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkYmx1ZTojMjViN2QzO1xyXG5pb24tY29udGVudHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbn1cclxuLmluYm94e1xyXG4gIGJhY2tncm91bmQtY29sb3I6cGFsZXR1cnF1b2lzZTtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDMwJTtcclxuICBib3JkZXItcmFkaXVzOiAxMCU7XHJcbiAgbWFyZ2luLWxlZnQ6IC0yMCU7XHJcblxyXG59XHJcbi5zZW50e1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHBhbGV0dXJxdW9pc2U7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAzMCU7XHJcbiAgYm9yZGVyLXJhZGl1czogMTAlO1xyXG4gIG1hcmdpbi1sZWZ0OiAyMCU7XHJcblxyXG59XHJcbi5teVJvd3tcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuLm15RmFie1xyXG4gIG1hcmdpbi1ib3R0b206NTAlO1xyXG59XHJcbi5zZW50VGV4dHtcclxuICBtYXJnaW4tbGVmdDogMzAlO1xyXG4gIGZvbnQtc2l6ZTogMTIwJTtcclxuXHJcbn1cclxuLmluYm94VGV4dHtcclxuICBtYXJnaW4tbGVmdDogNTAlO1xyXG4gIGZvbnQtc2l6ZTogMTIwJTtcclxuXHJcbn1cclxuLm1pZGRsZS10ZXh0e1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LWZhbWlseTogR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIFRpbWVzLCBzZXJpZjtcclxuICBtYXJnaW4tdG9wOjIlO1xyXG4gIG1hcmdpbi1ib3R0b206IDIlO1xyXG5cclxufVxyXG4uaGVhZGVye1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNWI3ZDM7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi5GbG9hdGluZy1pY29ue1xyXG5cclxuICAtd2Via2l0LWFuaW1hdGlvbjogZmxpY2tyIDAuN3MgZWFzZS1pbi1vdXQgMC4xcyAxIGFsdGVybmF0ZSBib3RoO1xyXG4gIGFuaW1hdGlvbjogZmxpY2tyIDAuN3MgZWFzZS1pbi1vdXQgMC4xcyAxIGFsdGVybmF0ZSBib3RoO1xyXG4gIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xyXG5cclxufVxyXG5cclxuQGtleWZyYW1lcyBmbGlja3Ige1xyXG4gIDAlICAge2xlZnQ6MHB4OyB0b3A6MHB4O31cclxuICA1MCUgIHsgbGVmdDotNXB4O31cclxuICAxMDAlIHsgcmlnaHQ6NXB4O31cclxufVxyXG5ALXdlYmtpdC1rZXlmcmFtZXMgZmxpY2tyIHtcclxuICAwJSAgIHtsZWZ0OjBweDsgdG9wOjBweDt9XHJcbiAgNTAlICB7IGxlZnQ6LTVweDt9XHJcbiAgMTAwJSB7IHJpZ2h0OjVweDt9XHJcbn1cclxuXHJcbi5pY29ue1xyXG4gIG1hcmdpbi1yaWdodDoxMCU7XHJcbiAgLS1wYWRkaW5nLXN0YXJ0OjVlbTtcclxuICAtLXBhZGRpbmctZW5kOiA1ZW07XHJcbn1cclxuLmlvbi1pY29uIHtcclxuICBib3gtc2hhZG93OiAwcHggMHB4IDNweCAwcHggcmdiYSgwLDAsMCwwLjIpO1xyXG5cclxuXHJcbn1cclxuaW9uLXRvb2xiYXJ7XHJcbiAgLS1iYWNrZ3JvdW5kOiAjMjViN2QzO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5pb24taGVhZGVye1xyXG4gIC0tYmFja2dyb3VuZDogIzI1YjdkMztcclxufVxyXG5pb24taXRlbXtcclxuXHJcbiAgLS1iYWNrZ3JvdW5kOiAjMjViN2QzO1xyXG59XHJcbi5uZXd7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbmlvbi10YWJze1xyXG4gIC0tYmFja2dyb3VuZDogICMyNWI3ZDM7XHJcbn1cclxuaW9uLXRhYi1iYXJ7XHJcbiAgLS1iYWNrZ3JvdW5kOiAgIzI1YjdkMztcclxuICBib3JkZXI6IDBweDtcclxuXHJcblxyXG5cclxufVxyXG4udGFie1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiBsYXJnZXI7XHJcbiAgLS1iYWNrZ3JvdW5kOiAjMjViN2QzO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICB3aWR0aDogNTAlO1xyXG4gIGJvcmRlcjogMHB4O1xyXG5cclxuXHJcbn1cclxuLnRhYnN7XHJcbiAgd2lkdGg6IDEwMCU7XHJcblxyXG59XHJcbi53cmFwcGVye1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIHdpZHRoOiBmaXQtY29udGVudDtcclxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xyXG4gIHBhZGRpbmc6IDE1JTtcclxuICBtYXJnaW46IDclO1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxNDVkZWcsICMyOGM0ZTIsICMyMWE1YmUpO1xyXG4gIGJveC1zaGFkb3c6ICAtM3B4IC0zcHggMnB4ICMxZjljYjMsXHJcbiAgM3B4IDNweCAycHggIzJiZDJmMztcclxuICB6LWluZGV4OiAzO1xyXG5cclxufVxyXG5cclxuaW9uLWljb257XHJcblxyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG4udGFiOmhvdmVyIHtcclxuICBpb24tbGFiZWx7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgO1xyXG5cclxuICB9XHJcblxyXG59XHJcbiIsImlvbi1jb250ZW50IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAwcHg7IH1cblxuLmluYm94IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcGFsZXR1cnF1b2lzZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMzAlO1xuICBib3JkZXItcmFkaXVzOiAxMCU7XG4gIG1hcmdpbi1sZWZ0OiAtMjAlOyB9XG5cbi5zZW50IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcGFsZXR1cnF1b2lzZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMzAlO1xuICBib3JkZXItcmFkaXVzOiAxMCU7XG4gIG1hcmdpbi1sZWZ0OiAyMCU7IH1cblxuLm15Um93IHtcbiAgaGVpZ2h0OiAxMDAlOyB9XG5cbi5teUZhYiB7XG4gIG1hcmdpbi1ib3R0b206IDUwJTsgfVxuXG4uc2VudFRleHQge1xuICBtYXJnaW4tbGVmdDogMzAlO1xuICBmb250LXNpemU6IDEyMCU7IH1cblxuLmluYm94VGV4dCB7XG4gIG1hcmdpbi1sZWZ0OiA1MCU7XG4gIGZvbnQtc2l6ZTogMTIwJTsgfVxuXG4ubWlkZGxlLXRleHQge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtZmFtaWx5OiBHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgVGltZXMsIHNlcmlmO1xuICBtYXJnaW4tdG9wOiAyJTtcbiAgbWFyZ2luLWJvdHRvbTogMiU7IH1cblxuLmhlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyNWI3ZDM7IH1cblxuLkZsb2F0aW5nLWljb24ge1xuICAtd2Via2l0LWFuaW1hdGlvbjogZmxpY2tyIDAuN3MgZWFzZS1pbi1vdXQgMC4xcyAxIGFsdGVybmF0ZSBib3RoO1xuICBhbmltYXRpb246IGZsaWNrciAwLjdzIGVhc2UtaW4tb3V0IDAuMXMgMSBhbHRlcm5hdGUgYm90aDtcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7IH1cblxuQGtleWZyYW1lcyBmbGlja3Ige1xuICAwJSB7XG4gICAgbGVmdDogMHB4O1xuICAgIHRvcDogMHB4OyB9XG4gIDUwJSB7XG4gICAgbGVmdDogLTVweDsgfVxuICAxMDAlIHtcbiAgICByaWdodDogNXB4OyB9IH1cblxuQC13ZWJraXQta2V5ZnJhbWVzIGZsaWNrciB7XG4gIDAlIHtcbiAgICBsZWZ0OiAwcHg7XG4gICAgdG9wOiAwcHg7IH1cbiAgNTAlIHtcbiAgICBsZWZ0OiAtNXB4OyB9XG4gIDEwMCUge1xuICAgIHJpZ2h0OiA1cHg7IH0gfVxuXG4uaWNvbiB7XG4gIG1hcmdpbi1yaWdodDogMTAlO1xuICAtLXBhZGRpbmctc3RhcnQ6NWVtO1xuICAtLXBhZGRpbmctZW5kOiA1ZW07IH1cblxuLmlvbi1pY29uIHtcbiAgYm94LXNoYWRvdzogMHB4IDBweCAzcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTsgfVxuXG5pb24tdG9vbGJhciB7XG4gIC0tYmFja2dyb3VuZDogIzI1YjdkMztcbiAgY29sb3I6IHdoaXRlOyB9XG5cbmlvbi1oZWFkZXIge1xuICAtLWJhY2tncm91bmQ6ICMyNWI3ZDM7IH1cblxuaW9uLWl0ZW0ge1xuICAtLWJhY2tncm91bmQ6ICMyNWI3ZDM7IH1cblxuLm5ldyB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7IH1cblxuaW9uLXRhYnMge1xuICAtLWJhY2tncm91bmQ6ICAjMjViN2QzOyB9XG5cbmlvbi10YWItYmFyIHtcbiAgLS1iYWNrZ3JvdW5kOiAgIzI1YjdkMztcbiAgYm9yZGVyOiAwcHg7IH1cblxuLnRhYiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogbGFyZ2VyO1xuICAtLWJhY2tncm91bmQ6ICMyNWI3ZDM7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDUwJTtcbiAgYm9yZGVyOiAwcHg7IH1cblxuLnRhYnMge1xuICB3aWR0aDogMTAwJTsgfVxuXG4ud3JhcHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xuICBwYWRkaW5nOiAxNSU7XG4gIG1hcmdpbjogNyU7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxNDVkZWcsICMyOGM0ZTIsICMyMWE1YmUpO1xuICBib3gtc2hhZG93OiAtM3B4IC0zcHggMnB4ICMxZjljYjMsXHIgM3B4IDNweCAycHggIzJiZDJmMztcbiAgei1pbmRleDogMzsgfVxuXG5pb24taWNvbiB7XG4gIGNvbG9yOiB3aGl0ZTsgfVxuXG4udGFiOmhvdmVyIGlvbi1sYWJlbCB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZDsgfVxuIl19 */");

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
                        this.receiver = row.name;
                        console.log("Patient: " + this.receiver);
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
/* harmony import */ var _services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/datastream/datastreaming.service */ "./src/app/services/datastream/datastreaming.service.ts");




let FabComponent = class FabComponent {
    constructor(navigation, datastream) {
        this.navigation = navigation;
        this.datastream = datastream;
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
        this.datastream.clearData();
        this.navigation.navigateTo('cover');
        console.log("trainer list");
    }
};
FabComponent.ctorParameters = () => [
    { type: _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"] },
    { type: _services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_3__["DatastreamingService"] }
];
FabComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-fab',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./fab.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/fab/fab.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./fab.component.scss */ "./src/app/home/fab/fab.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"], _services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_3__["DatastreamingService"]])
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
/* harmony import */ var _services_Network_network_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../services/Network/network.service */ "./src/app/services/Network/network.service.ts");






















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
                    path: 'profile',
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
            _services_Network_network_service__WEBPACK_IMPORTED_MODULE_21__["NetworkService"],
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
/* harmony default export */ __webpack_exports__["default"] = ("ion-content {\n  height: 100%;\n  width: 100%;\n  margin: 0px; }\n\nion-row {\n  margin-bottom: -1%; }\n\nion-toolbar {\n  --background:#25b7d3; }\n\n.background {\n  margin: 0px;\n  padding: 0px;\n  background: #25b7d3; }\n\n.center {\n  display: flex;\n  justify-content: center; }\n\n.main-card {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.5);\n  transition: transform 0.5s;\n  border-radius: 10px;\n  transform-style: preserve-3d;\n  background: white;\n  margin-top: 10%; }\n\n.mini-card {\n  position: relative;\n  border-radius: 10px;\n  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);\n  transform-style: preserve-3d;\n  margin-top: 10%;\n  border: whitesmoke solid 2px; }\n\n.icon {\n  width: 35%;\n  height: 35%;\n  margin: 5%; }\n\n.middle-text {\n  text-align: center;\n  font-family: Georgia, 'Times New Roman', Times, serif;\n  margin-top: 2%;\n  margin-bottom: 2%; }\n\n.user-name {\n  color: white;\n  font: 1em Open-sans; }\n\n.grad {\n  margin-left: 10px;\n  padding-left: 10px;\n  margin-top: 10px;\n  --background: linear-gradient(\r\n  to bottom,\r\n  #0a5279 0%,\r\n  #80d3cb 100%)\r\n \r\n; }\n\n.space {\n  padding-bottom: 25px;\n  padding-left: 300px; }\n\n.avat {\n  width: 100% !important;\n  height: 100% !important;\n  max-width: 200px !important;\n  max-height: 200px !important; }\n\n.btn {\n  border-radius: 0.5%; }\n\n.myBackground {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  z-index: 999;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #50b9b6; }\n\n.wrapper {\n  position: relative; }\n\n.profile-img-frame {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  justify-content: center;\n  width: 170px;\n  height: 170px;\n  min-height: 90px;\n  min-width: 90px;\n  margin: 1em auto;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center center;\n  border-radius: 50%;\n  box-shadow: inset 0 0 0 5px white; }\n\n.profile-img-holder {\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 50%;\n  background-color: #02C39A;\n  max-width: 150px;\n  max-height: 150px;\n  min-width: 100px;\n  min-height: 100px;\n  overflow: hidden; }\n\n.profile-img {\n  display: inline;\n  width: 100%;\n  height: auto; }\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIiwic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBWTtFQUNaLFdBQVc7RUFDWCxXQUFXLEVBQUE7O0FBR2Y7RUFDSSxrQkFBa0IsRUFBQTs7QUFFdEI7RUFDRSxvQkFBYSxFQUFBOztBQUVmO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixtQkFBa0IsRUFBQTs7QUFJcEI7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCLEVBQUE7O0FBRXpCO0VBQ0UsV0FBVTtFQUNWLFlBQVc7RUFDWCxrQkFBaUI7RUFDakIsaURBQThDO0VBQzlDLDBCQUEwQjtFQUMxQixtQkFBbUI7RUFDbkIsNEJBQTRCO0VBQzVCLGlCQUFnQjtFQUNoQixlQUFlLEVBQUE7O0FBR2pCO0VBQ0Usa0JBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQiwrQ0FBNEM7RUFDNUMsNEJBQTRCO0VBQzVCLGVBQWU7RUFDZiw0QkFBNEIsRUFBQTs7QUFFOUI7RUFDRSxVQUFTO0VBQ1QsV0FBVztFQUNYLFVBQVUsRUFBQTs7QUFHWjtFQUNFLGtCQUFrQjtFQUNsQixxREFBcUQ7RUFDckQsY0FBYTtFQUNiLGlCQUFpQixFQUFBOztBQUVuQjtFQUNFLFlBQVk7RUFDWixtQkFBbUIsRUFBQTs7QUFFckI7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7Ozs7QUNIRixFQUFFOztBQUVGO0VEQ2Usb0JBS2Q7RUNKQyxtQkFBbUIsRUFBRTs7QUFFdkI7RURRRSxzQkFDRDtFQ1BDLHVCQUF1QjtFRFF6QiwyQkFBSztFQUNILDRCQUFxQixFQUFBOztBQ0x2QjtFRFFFLG1CQUFZLEVBQUE7O0FBRWQ7RUFDRSxrQkFBZTtFQ05mLFdBQVc7RURRYixZQUFhO0VBQ1gsWUFBVTtFQUNWLGFBQVU7RUFDVixtQkFBVztFQUNYLHVCQUFZO0VBQ1osbUJBQWEsRUFBQTs7QUNMZjtFRFFFLGtCQUFXLEVBQWlCOztBQUk5QjtFQUNFLGFBQVU7RUNSVixxQkFBcUI7RURVdkIsbUJBQWtCO0VBQ2hCLHVCQUFhO0VBQ2IsWUFBQTtFQUNBLGFBQWE7RUFDYixnQkFBZTtFQUNmLGVBQVk7RUFDWixnQkFBYTtFQUNiLHNCQUFnQjtFQUNoQiw0QkFBZTtFQUNmLGtDQUFnQjtFQUNoQixrQkFBaUI7RUFDakIsaUNBQTRCLEVBQUE7O0FDUDlCO0VEVUUsb0JBQVk7S0FBWixpQkFBWTtFQ1JaLGtCQUFrQjtFRFlwQix5QkFBbUI7RUFDakIsZ0JBQVk7RUFDWixpQkFBZTtFQUNmLGdCQUFnQjtFQUNoQixpQkFBZ0I7RUFDaEIsZ0JBQVksRUFBSzs7QUNUbkI7RURZRSxlQUFVO0VDVlYsV0FBVztFRFliLFlBQVksRUFBQSIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tY29udGVudHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWFyZ2luOiAwcHg7XHJcbiAgfVxyXG5cclxuaW9uLXJvd3tcclxuICAgIG1hcmdpbi1ib3R0b206IC0xJTtcclxufVxyXG5pb24tdG9vbGJhcntcclxuICAtLWJhY2tncm91bmQ6IzI1YjdkMztcclxufVxyXG4uYmFja2dyb3VuZHtcclxuICBtYXJnaW46IDBweDtcclxuICBwYWRkaW5nOiAwcHg7XHJcbiAgYmFja2dyb3VuZDojMjViN2QzO1xyXG5cclxufVxyXG5cclxuLmNlbnRlcntcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcbi5tYWluLWNhcmQge1xyXG4gIHdpZHRoOjEwMCU7XHJcbiAgaGVpZ2h0OjEwMCU7XHJcbiAgcG9zaXRpb246cmVsYXRpdmU7XHJcbiAgYm94LXNoYWRvdzogMTBweCAxMHB4IDEwcHggMHB4IHJnYmEoMCwwLDAsMC41KTtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cztcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XHJcbiAgYmFja2dyb3VuZDp3aGl0ZTtcclxuICBtYXJnaW4tdG9wOiAxMCU7XHJcbiAgXHJcbn1cclxuLm1pbmktY2FyZHtcclxuICBwb3NpdGlvbjpyZWxhdGl2ZTtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIGJveC1zaGFkb3c6IDVweCA1cHggMTBweCAwcHggcmdiYSgwLDAsMCwwLjUpO1xyXG4gIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XHJcbiAgbWFyZ2luLXRvcDogMTAlO1xyXG4gIGJvcmRlcjogd2hpdGVzbW9rZSBzb2xpZCAycHg7XHJcbn1cclxuLmljb257XHJcbiAgd2lkdGg6MzUlO1xyXG4gIGhlaWdodDogMzUlO1xyXG4gIG1hcmdpbjogNSU7XHJcbiAgXHJcbn1cclxuLm1pZGRsZS10ZXh0e1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LWZhbWlseTogR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIFRpbWVzLCBzZXJpZjtcclxuICBtYXJnaW4tdG9wOjIlO1xyXG4gIG1hcmdpbi1ib3R0b206IDIlO1xyXG59XHJcbi51c2VyLW5hbWV7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGZvbnQ6IDFlbSBPcGVuLXNhbnM7XHJcbn1cclxuLmdyYWQgIHtcclxuICBtYXJnaW4tbGVmdDogMTBweDtcclxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICAtLWJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcclxuICB0byBib3R0b20sXHJcbiAgIzBhNTI3OSAwJSxcclxuICAjODBkM2NiIDEwMCUpXHJcbiBcclxufVxyXG5cclxuLnNwYWNle1xyXG4gIC8vICAgbWFyZ2luLXRvcDogMjAwcHg7XHJcbiAgLy8gICBtYXJnaW4tbGVmdDogMjAwO1xyXG4gcGFkZGluZy1ib3R0b206IDI1cHg7XHJcbiAgcGFkZGluZy1sZWZ0OjMwMHB4O1xyXG59XHJcbi5hdmF0e1xyXG4gIHdpZHRoOjEwMCUgIWltcG9ydGFudDsgIFxyXG4gIGhlaWdodCA6IDEwMCUgIWltcG9ydGFudDsgIFxyXG4gIG1heC13aWR0aDogMjAwcHggIWltcG9ydGFudDsgIC8vYW55IHNpemVcclxuICBtYXgtaGVpZ2h0OiAyMDBweCAhaW1wb3J0YW50OyAvL2FueSBzaXplIFxyXG59XHJcbi5idG57XHJcbiAgYm9yZGVyLXJhZGl1czogMC41JTtcclxufVxyXG4ubXlCYWNrZ3JvdW5ke1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB3aWR0aDoxMDAlO1xyXG4gIGhlaWdodDoxMDAlO1xyXG4gIHotaW5kZXg6IDk5OTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZDpyZ2IoODAsIDE4NSwgMTgyKTtcclxuICBcclxuICB9XHJcblxyXG4ud3JhcHBlcntcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuLnByb2ZpbGUtaW1nLWZyYW1le1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgd2lkdGg6IDE3MHB4O1xyXG4gIGhlaWdodDogMTcwcHg7XHJcbiAgbWluLWhlaWdodDogOTBweDtcclxuICBtaW4td2lkdGg6IDkwcHg7XHJcbiAgbWFyZ2luOiAxZW0gYXV0bztcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgNXB4IHdoaXRlO1xyXG5cclxufVxyXG5cclxuLnByb2ZpbGUtaW1nLWhvbGRlcntcclxuICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogICMwMkMzOUE7XHJcbiAgbWF4LXdpZHRoOiAxNTBweDtcclxuICBtYXgtaGVpZ2h0OiAxNTBweDtcclxuICBtaW4td2lkdGg6IDEwMHB4O1xyXG4gIG1pbi1oZWlnaHQ6IDEwMHB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuLnByb2ZpbGUtaW1ne1xyXG4gIGRpc3BsYXk6IGlubGluZTtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IGF1dG87XHJcblxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuLy8gLy8gICBpb24tY29se1xyXG4vLyAvLyAgICAgICBiYWNrZ3JvdW5kOiBibHVlO1xyXG5cclxuLy8gLy8gfVxyXG4vLyAvLyBpb24tcm93e1xyXG4vLyAvLyAgICAgYmFja2dyb3VuZDogY2hhcnRyZXVzZTtcclxuLy8gLy8gfVxyXG4gIFxyXG4vLyAgICAgLy8gQGZvbnQtZmFjZSB7XHJcbi8vICAgICAvLyAgIGZvbnQtZmFtaWx5OiBnaWxiZXJ0X2JvbGQtcHJldmlldzU7XHJcbi8vICAgICAvLyAgIHNyYzogdXJsKGFzc2V0cy9naWxiZXJ0X2JvbGQtcHJldmlldzUudHRmKTtcclxuLy8gICAgIC8vIH1cclxuICAgIFxyXG5cclxuLy8gICAuaG9tZXBhZ2Uge1xyXG5cclxuLy8gICBkaXNwbGF5OiBibG9jaztcclxuLy8gICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBvdmVyZmxvdy14OiBhdXRvO1xyXG4vLyAgIG92ZXJmbG93LXk6IGF1dG87XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMzgsIDIzNSwgMjM1LCAxKTtcclxuLy8gICB3aWR0aDogMzc1LjAwcHg7XHJcbi8vIGhlaWdodDogODEyLjAwcHg7XHJcbi8vIGxlZnQ6IDBweDtcclxuLy8gdG9wOiAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmlja2V5Ym9hcmRyZXR1cm4yNHB4IHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgZmlsbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAxKTtcclxuLy8gICBib3gtc2hhZG93OiBub25lO1xyXG4vLyAgIHdpZHRoOiAxMDAlO1xyXG4vLyBoZWlnaHQ6IDEwMHB4O1xyXG4vLyBsZWZ0OiA1LjAwcHg7XHJcbi8vIHRvcDogOC4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC04IHtcclxuXHJcbi8vICAgZGlzcGxheTogYmxvY2s7XHJcbi8vICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbi8vICAgd2lkdGg6IDM3NS4wMHB4O1xyXG4vLyBoZWlnaHQ6IDIyNS4wMHB4O1xyXG4vLyBsZWZ0OiAtMy4wMHB4O1xyXG4vLyB0b3A6IDAuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtOCAucGF0aC0xIHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgZmlsbDogdHJhbnNwYXJlbnQ7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICB3aWR0aDogMzc1LjAwcHg7XHJcbi8vIGhlaWdodDogMjI1LjAwcHg7XHJcbi8vIGxlZnQ6IDAuMDBweDtcclxuLy8gdG9wOiAwLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTggLnRhbGluIHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBmaWxsOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHN0cm9rZTogcmdiYSgxMTIsIDExMiwgMTEyLCAxKTtcclxuLy8gICAgICAgc3Ryb2tlLXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgICAgIHN0cm9rZS1saW5lY2FwOiBidXR0O1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgd2lkdGg6IDEzNC4wMHB4O1xyXG4vLyBoZWlnaHQ6IDEzNy4wMHB4O1xyXG4vLyBsZWZ0OiAxMjEuMDBweDtcclxuLy8gdG9wOiAyMy4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC04IC51c2VyLW5hbWUge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsaW5lLWhlaWdodDogNTcuMDBweDtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMjIuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNDAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIEFyaWFsO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgd2hpdGUtc3BhY2U6IHByZTtcclxuLy8gICB3aWR0aDogMTEwLjAwcHg7XHJcbi8vIGhlaWdodDogMjUuMDBweDtcclxuLy8gbGVmdDogMTMzLjAwcHg7XHJcbi8vIHRvcDogMTUzLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIHtcclxuXHJcbi8vICAgZGlzcGxheTogYmxvY2s7XHJcbi8vICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbi8vICAgd2lkdGg6IDM1MC4wMHB4O1xyXG4vLyBoZWlnaHQ6IDQ2MC4wMHB4O1xyXG4vLyBsZWZ0OiAxMi4wMHB4O1xyXG4vLyB0b3A6IDMxNi4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0yMiAucmVjdGFuZ2xlLTYge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xyXG4vLyAgIGJvcmRlci1ib3R0b20tY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItYm90dG9tLXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLWxlZnQtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLWxlZnQtc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLWxlZnQtd2lkdGg6IDEuMDBweDtcclxuLy8gICBib3JkZXItcmlnaHQtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLXJpZ2h0LXN0eWxlOiBub25lO1xyXG4vLyAgIGJvcmRlci1yaWdodC13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci10b3AtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLXRvcC1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItdG9wLXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMC4wMHB4O1xyXG4vLyAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMC4wMHB4O1xyXG4vLyAgIC13ZWJraXQtZmlsdGVyOiBkcm9wLXNoYWRvdygxMHB4IDEwcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xNjA3ODQzMTM3MjU0OTAyKSk7XHJcbi8vIGZpbHRlcjogZHJvcC1zaGFkb3coMTBweCAxMHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMTYwNzg0MzEzNzI1NDkwMikpO1xyXG4vLyAgIHdpZHRoOiAxNjUuMDBweDtcclxuLy8gaGVpZ2h0OiAxNDAuMDBweDtcclxuLy8gbGVmdDogMC4wMHB4O1xyXG4vLyB0b3A6IDAuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMjIgLnJlY3RhbmdsZS02MSB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMSk7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogcmdiYSgxMTIsIDExMiwgMTEyLCAxKTtcclxuLy8gICBib3JkZXItYm90dG9tLXN0eWxlOiBub25lO1xyXG4vLyAgIGJvcmRlci1ib3R0b20td2lkdGg6IDEuMDBweDtcclxuLy8gICBib3JkZXItbGVmdC1jb2xvcjogcmdiYSgxMTIsIDExMiwgMTEyLCAxKTtcclxuLy8gICBib3JkZXItbGVmdC1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItbGVmdC13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci1yaWdodC1jb2xvcjogcmdiYSgxMTIsIDExMiwgMTEyLCAxKTtcclxuLy8gICBib3JkZXItcmlnaHQtc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLXRvcC1jb2xvcjogcmdiYSgxMTIsIDExMiwgMTEyLCAxKTtcclxuLy8gICBib3JkZXItdG9wLXN0eWxlOiBub25lO1xyXG4vLyAgIGJvcmRlci10b3Atd2lkdGg6IDEuMDBweDtcclxuLy8gICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMC4wMHB4O1xyXG4vLyAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMC4wMHB4O1xyXG4vLyAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwLjAwcHg7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwLjAwcHg7XHJcbi8vICAgLXdlYmtpdC1maWx0ZXI6IGRyb3Atc2hhZG93KDEwcHggMTBweCA2cHggcmdiYSgwLCAwLCAwLCAwLjE2MDc4NDMxMzcyNTQ5MDIpKTtcclxuLy8gZmlsdGVyOiBkcm9wLXNoYWRvdygxMHB4IDEwcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xNjA3ODQzMTM3MjU0OTAyKSk7XHJcbi8vICAgd2lkdGg6IDE2NS4wMHB4O1xyXG4vLyBoZWlnaHQ6IDE0MC4wMHB4O1xyXG4vLyBsZWZ0OiAwLjAwcHg7XHJcbi8vIHRvcDogMTYwLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5yZWN0YW5nbGUtNjIge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xyXG4vLyAgIGJvcmRlci1ib3R0b20tY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItYm90dG9tLXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLWxlZnQtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLWxlZnQtc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLWxlZnQtd2lkdGg6IDEuMDBweDtcclxuLy8gICBib3JkZXItcmlnaHQtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLXJpZ2h0LXN0eWxlOiBub25lO1xyXG4vLyAgIGJvcmRlci1yaWdodC13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci10b3AtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLXRvcC1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItdG9wLXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMC4wMHB4O1xyXG4vLyAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMC4wMHB4O1xyXG4vLyAgIC13ZWJraXQtZmlsdGVyOiBkcm9wLXNoYWRvdygxMHB4IDEwcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xNjA3ODQzMTM3MjU0OTAyKSk7XHJcbi8vIGZpbHRlcjogZHJvcC1zaGFkb3coMTBweCAxMHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMTYwNzg0MzEzNzI1NDkwMikpO1xyXG4vLyAgIHdpZHRoOiAxNjUuMDBweDtcclxuLy8gaGVpZ2h0OiAxNDAuMDBweDtcclxuLy8gbGVmdDogMTg1LjAwcHg7XHJcbi8vIHRvcDogMTYwLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5yZWN0YW5nbGUtNjMge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xyXG4vLyAgIGJvcmRlci1ib3R0b20tY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItYm90dG9tLXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLWxlZnQtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLWxlZnQtc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLWxlZnQtd2lkdGg6IDEuMDBweDtcclxuLy8gICBib3JkZXItcmlnaHQtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLXJpZ2h0LXN0eWxlOiBub25lO1xyXG4vLyAgIGJvcmRlci1yaWdodC13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci10b3AtY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgYm9yZGVyLXRvcC1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItdG9wLXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMC4wMHB4O1xyXG4vLyAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMC4wMHB4O1xyXG4vLyAgIC13ZWJraXQtZmlsdGVyOiBkcm9wLXNoYWRvdygxMHB4IDEwcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xNjA3ODQzMTM3MjU0OTAyKSk7XHJcbi8vIGZpbHRlcjogZHJvcC1zaGFkb3coMTBweCAxMHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMTYwNzg0MzEzNzI1NDkwMikpO1xyXG4vLyAgIHdpZHRoOiAxNjUuMDBweDtcclxuLy8gaGVpZ2h0OiAxNDAuMDBweDtcclxuLy8gbGVmdDogMC4wMHB4O1xyXG4vLyB0b3A6IDMyMC4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0yMiAucmVjdGFuZ2xlLTY0IHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAxKTtcclxuLy8gICBib3JkZXItYm90dG9tLWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1ib3R0b20tc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci1sZWZ0LWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1sZWZ0LXN0eWxlOiBub25lO1xyXG4vLyAgIGJvcmRlci1sZWZ0LXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1yaWdodC1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItcmlnaHQtd2lkdGg6IDEuMDBweDtcclxuLy8gICBib3JkZXItdG9wLWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci10b3Atc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLXRvcC13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDEwLjAwcHg7XHJcbi8vICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEwLjAwcHg7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICAtd2Via2l0LWZpbHRlcjogZHJvcC1zaGFkb3coMTBweCAxMHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMTYwNzg0MzEzNzI1NDkwMikpO1xyXG4vLyBmaWx0ZXI6IGRyb3Atc2hhZG93KDEwcHggMTBweCA2cHggcmdiYSgwLCAwLCAwLCAwLjE2MDc4NDMxMzcyNTQ5MDIpKTtcclxuLy8gICB3aWR0aDogMTY1LjAwcHg7XHJcbi8vIGhlaWdodDogMTQwLjAwcHg7XHJcbi8vIGxlZnQ6IDE4NS4wMHB4O1xyXG4vLyB0b3A6IDMyMC4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0yMiAuZ2VuZXJhdGUtY29kZSB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XHJcbi8vICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4vLyAgIGxpbmUtaGVpZ2h0OiA1Ny4wMHB4O1xyXG4vLyAgIGxldHRlci1zcGFjaW5nOiAwLjAwcHg7XHJcbi8vICAgY29sb3I6IHJnYmEoMTQzLCAyMDMsIDI1NSwgMSk7XHJcbi8vICAgLXdlYmtpdC10ZXh0LXN0cm9rZTogdW5zZXQ7XHJcbi8vICAgZm9udC1zaXplOiAyMi4wMHB4O1xyXG4vLyAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbi8vIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuLy8gICBmb250LWZhbWlseTogR2VvcmdpYSwgQXJpYWw7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICBvdmVyZmxvdy14OiB1bnNldDtcclxuLy8gICBvdmVyZmxvdy15OiB1bnNldDtcclxuLy8gICB3aGl0ZS1zcGFjZTogcHJlO1xyXG4vLyAgIHdpZHRoOiAxNDQuMDBweDtcclxuLy8gaGVpZ2h0OiAyNS4wMHB4O1xyXG4vLyBsZWZ0OiAxMC4wMHB4O1xyXG4vLyB0b3A6IDcyLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5hZGQtc2NoZWR1bGUge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsaW5lLWhlaWdodDogNTcuMDBweDtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDE0MywgMjAzLCAyNTUsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMjIuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNDAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIEFyaWFsO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgd2hpdGUtc3BhY2U6IHByZTtcclxuLy8gICB3aWR0aDogMTM0LjAwcHg7XHJcbi8vIGhlaWdodDogMjUuMDBweDtcclxuLy8gbGVmdDogMTUuMDBweDtcclxuLy8gdG9wOiAyMzUuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMjIgLmFkZC1mcmVldGltZXMge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsaW5lLWhlaWdodDogNTcuMDBweDtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDE0MywgMjAzLCAyNTUsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMjIuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNDAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIEFyaWFsO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgd2hpdGUtc3BhY2U6IHByZTtcclxuLy8gICB3aWR0aDogMTQzLjAwcHg7XHJcbi8vIGhlaWdodDogMjUuMDBweDtcclxuLy8gbGVmdDogMTk3LjAwcHg7XHJcbi8vIHRvcDogMjM1LjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5wYXRpZW50c2xpc3Qge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsaW5lLWhlaWdodDogMjUuMDBweDtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDE0MywgMjAzLCAyNTUsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMjIuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNDAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIEFyaWFsO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgd2hpdGUtc3BhY2U6IHByZTtcclxuLy8gICB3aWR0aDogODAuMDBweDtcclxuLy8gaGVpZ2h0OiA1MC4wMHB4O1xyXG4vLyBsZWZ0OiA0Mi4wMHB4O1xyXG4vLyB0b3A6IDQwMS4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0yMiAubWFzc2FnZXMge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsaW5lLWhlaWdodDogMjUuMDBweDtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDE0MywgMjAzLCAyNTUsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMjIuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNDAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIEFyaWFsO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgd2hpdGUtc3BhY2U6IHByZTtcclxuLy8gICB3aWR0aDogOTIuMDBweDtcclxuLy8gaGVpZ2h0OiAyNS4wMHB4O1xyXG4vLyBsZWZ0OiAyMjIuMDBweDtcclxuLy8gdG9wOiA0MDEuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMjIgLmljb24tbWFwLWhlYWx0aCB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGZpbGw6IHJnYmEoMTA5LCA4OSwgODksIDEpO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgd2lkdGg6IDQyLjY3cHg7XHJcbi8vIGhlaWdodDogNDQuMjNweDtcclxuLy8gbGVmdDogNjEuMDBweDtcclxuLy8gdG9wOiAxOS4zM3B4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0yMiAuZ3JvdXAtMTkge1xyXG5cclxuLy8gICBkaXNwbGF5OiBibG9jaztcclxuLy8gICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBvdmVyZmxvdy14OiB1bnNldDtcclxuLy8gICBvdmVyZmxvdy15OiB1bnNldDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuLy8gICB3aWR0aDogMTY1LjAwcHg7XHJcbi8vIGhlaWdodDogMTQwLjAwcHg7XHJcbi8vIGxlZnQ6IDE4NS4wMHB4O1xyXG4vLyB0b3A6IDAuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMjIgLmdyb3VwLTE5IC5yZWN0YW5nbGUtNjRkZThiM2UxIHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAxKTtcclxuLy8gICBib3JkZXItYm90dG9tLWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1ib3R0b20tc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci1sZWZ0LWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1sZWZ0LXN0eWxlOiBub25lO1xyXG4vLyAgIGJvcmRlci1sZWZ0LXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1yaWdodC1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItcmlnaHQtd2lkdGg6IDEuMDBweDtcclxuLy8gICBib3JkZXItdG9wLWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci10b3Atc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLXRvcC13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDEwLjAwcHg7XHJcbi8vICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEwLjAwcHg7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTAuMDBweDtcclxuLy8gICAtd2Via2l0LWZpbHRlcjogZHJvcC1zaGFkb3coMTBweCAxMHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMTYwNzg0MzEzNzI1NDkwMikpO1xyXG4vLyBmaWx0ZXI6IGRyb3Atc2hhZG93KDEwcHggMTBweCA2cHggcmdiYSgwLCAwLCAwLCAwLjE2MDc4NDMxMzcyNTQ5MDIpKTtcclxuLy8gICB3aWR0aDogMTY1LjAwcHg7XHJcbi8vIGhlaWdodDogMTQwLjAwcHg7XHJcbi8vIGxlZnQ6IDAuMDBweDtcclxuLy8gdG9wOiAwLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5ncm91cC0xOSAuc2NoZWR1bGUge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsaW5lLWhlaWdodDogMjUuMDBweDtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDE0MywgMjAzLCAyNTUsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMjIuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNDAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIEFyaWFsO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgd2hpdGUtc3BhY2U6IHByZTtcclxuLy8gICB3aWR0aDogOTAuMDBweDtcclxuLy8gaGVpZ2h0OiAyNS4wMHB4O1xyXG4vLyBsZWZ0OiAzOC4wMHB4O1xyXG4vLyB0b3A6IDgxLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5ncm91cC0xOSAuaWNvbi1tYXRlcmlhbC1zY2hlZHVsZSB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGZpbGw6IHJnYmEoMTA5LCA4OSwgODksIDEpO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgd2lkdGg6IDQxLjMzcHg7XHJcbi8vIGhlaWdodDogNDMuNjdweDtcclxuLy8gbGVmdDogNjIuMDBweDtcclxuLy8gdG9wOiAxNC4zM3B4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0yMiAuaWNvbi1pb25pYy1pb3MtYWRkLWNpcmNsZS1vdXRsaW5lIHtcclxuXHJcbi8vICAgZGlzcGxheTogYmxvY2s7XHJcbi8vICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbi8vICAgd2lkdGg6IDQ1LjAwcHg7XHJcbi8vIGhlaWdodDogNDUuMDBweDtcclxuLy8gbGVmdDogMjQ2LjAwcHg7XHJcbi8vIHRvcDogMTgzLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5pY29uLWlvbmljLWlvcy1hZGQtY2lyY2xlLW91dGxpbmUgLnBhdGgtMiB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGZpbGw6IHJnYmEoMTA5LCA4OSwgODksIDEpO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgd2lkdGg6IDEwLjczcHg7XHJcbi8vIGhlaWdodDogMTAuNzNweDtcclxuLy8gbGVmdDogMTcuMTRweDtcclxuLy8gdG9wOiAxNy4xNHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0yMiAuaWNvbi1pb25pYy1pb3MtYWRkLWNpcmNsZS1vdXRsaW5lIC5wYXRoLTMge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBmaWxsOiByZ2JhKDEwOSwgODksIDg5LCAxKTtcclxuLy8gICBib3gtc2hhZG93OiBub25lO1xyXG4vLyAgIHdpZHRoOiA0NS4wMHB4O1xyXG4vLyBoZWlnaHQ6IDQ1LjAwcHg7XHJcbi8vIGxlZnQ6IDAuMDBweDtcclxuLy8gdG9wOiAwLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5pY29uLWlvbmljLWlvcy1hZGQtY2lyY2xlLW91dGxpbmUxIHtcclxuXHJcbi8vICAgZGlzcGxheTogYmxvY2s7XHJcbi8vICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbi8vICAgd2lkdGg6IDQ1LjAwcHg7XHJcbi8vIGhlaWdodDogNDUuMDBweDtcclxuLy8gbGVmdDogNTguMDBweDtcclxuLy8gdG9wOiAxODMuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMjIgLmljb24taW9uaWMtaW9zLWFkZC1jaXJjbGUtb3V0bGluZTEgLnBhdGgtMmIxYzAzN2Q2IHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgZmlsbDogcmdiYSgxMDksIDg5LCA4OSwgMSk7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICB3aWR0aDogMTAuNzNweDtcclxuLy8gaGVpZ2h0OiAxMC43M3B4O1xyXG4vLyBsZWZ0OiAxNy4xNHB4O1xyXG4vLyB0b3A6IDE3LjE0cHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTIyIC5pY29uLWlvbmljLWlvcy1hZGQtY2lyY2xlLW91dGxpbmUxIC5wYXRoLTNiOGQxODJiZCB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGZpbGw6IHJnYmEoMTA5LCA4OSwgODksIDEpO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgd2lkdGg6IDQ1LjAwcHg7XHJcbi8vIGhlaWdodDogNDUuMDBweDtcclxuLy8gbGVmdDogMC4wMHB4O1xyXG4vLyB0b3A6IDAuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMjIgLmljb24tYXdlc29tZS1saXN0IHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgZmlsbDogcmdiYSgxMDksIDg5LCA4OSwgMSk7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICB3aWR0aDogMzYuMDBweDtcclxuLy8gaGVpZ2h0OiAyOS4yNXB4O1xyXG4vLyBsZWZ0OiA2Mi4wMHB4O1xyXG4vLyB0b3A6IDM0OS4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0yMiAuaWNvbi1hd2Vzb21lLWxpc3QxIHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgZmlsbDogcmdiYSgxMDksIDg5LCA4OSwgMSk7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICB3aWR0aDogMzYuMDBweDtcclxuLy8gaGVpZ2h0OiAyOS4yNXB4O1xyXG4vLyBsZWZ0OiAyNTAuMDBweDtcclxuLy8gdG9wOiAzNDkuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuaWNvbi1vcGVuLWFjY291bnQtbG9nb3V0IHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgZmlsbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAxKTtcclxuLy8gICBib3gtc2hhZG93OiBub25lO1xyXG4vLyAgIHdpZHRoOiAyNC4wMHB4O1xyXG4vLyBoZWlnaHQ6IDIwLjUwcHg7XHJcbi8vIGxlZnQ6IDUuMDBweDtcclxuLy8gdG9wOiAxMS4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5sb2dvdXQge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMTYuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNzAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IGdpbGJlcnRfYm9sZC1wcmV2aWV3NSwgQXJpYWw7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICBvdmVyZmxvdy14OiB1bnNldDtcclxuLy8gICBvdmVyZmxvdy15OiB1bnNldDtcclxuLy8gICB3aGl0ZS1zcGFjZTogcHJlO1xyXG4vLyAgIHdpZHRoOiA0MC4wMHB4O1xyXG4vLyBoZWlnaHQ6IDIxLjAwcHg7XHJcbi8vIGxlZnQ6IDMzLjAwcHg7XHJcbi8vIHRvcDogMTAuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMTgge1xyXG5cclxuLy8gICBkaXNwbGF5OiBibG9jaztcclxuLy8gICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBvdmVyZmxvdy14OiB1bnNldDtcclxuLy8gICBvdmVyZmxvdy15OiB1bnNldDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuLy8gICB3aWR0aDogMzQ0LjAwcHg7XHJcbi8vIGhlaWdodDogOTMuMDBweDtcclxuLy8gbGVmdDogMTUuMDBweDtcclxuLy8gdG9wOiAxOTguMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMTggLng0NTgxNyB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMC41Nzk5OTk5ODMzMTA2OTk1O1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBmaWxsOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xyXG4vLyAgIHN0cm9rZTogcmdiYSgxMTIsIDExMiwgMTEyLCAxKTtcclxuLy8gICAgICAgc3Ryb2tlLXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgICAgIHN0cm9rZS1saW5lY2FwOiBidXR0O1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgd2lkdGg6IDMzNi4wMHB4O1xyXG4vLyBoZWlnaHQ6IDkzLjAwcHg7XHJcbi8vIGxlZnQ6IDAuMDBweDtcclxuLy8gdG9wOiAwLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTE4IC5yZXBlYXQtZ3JpZC02IHtcclxuXHJcbi8vICAgZGlzcGxheTogYmxvY2s7XHJcbi8vICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgb3ZlcmZsb3cteDogYXV0bztcclxuLy8gICBvdmVyZmxvdy15OiBhdXRvO1xyXG4vLyAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4vLyAgIHdpZHRoOiAzMjQuMDBweDtcclxuLy8gaGVpZ2h0OiAxOS4wMHB4O1xyXG4vLyBsZWZ0OiAyMC4wMHB4O1xyXG4vLyB0b3A6IDYyLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTE4IC5yZXBlYXQtZ3JpZC02IC54NzJicyB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XHJcbi8vICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4vLyAgIGxldHRlci1zcGFjaW5nOiAwLjAwcHg7XHJcbi8vICAgY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgLXdlYmtpdC10ZXh0LXN0cm9rZTogdW5zZXQ7XHJcbi8vICAgZm9udC1zaXplOiAxNi4wMHB4O1xyXG4vLyAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbi8vIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuLy8gICBmb250LWZhbWlseTogR2VvcmdpYSwgQXJpYWw7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICBvdmVyZmxvdy14OiB1bnNldDtcclxuLy8gICBvdmVyZmxvdy15OiB1bnNldDtcclxuLy8gICB3aGl0ZS1zcGFjZTogcHJlO1xyXG4vLyAgIHdpZHRoOiA0MC4wMHB4O1xyXG4vLyBoZWlnaHQ6IDE5LjAwcHg7XHJcbi8vIGxlZnQ6IC0xLjAwcHg7XHJcbi8vIHRvcDogMC4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0xOCAucmVwZWF0LWdyaWQtNiAueDY1a2cge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMTYuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNDAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIEFyaWFsO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgd2hpdGUtc3BhY2U6IHByZTtcclxuLy8gICB3aWR0aDogMzQuMDBweDtcclxuLy8gaGVpZ2h0OiAxOS4wMHB4O1xyXG4vLyBsZWZ0OiA3MC4wMHB4O1xyXG4vLyB0b3A6IDAuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMTggLnJlcGVhdC1ncmlkLTYgLngxNjJjbSB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XHJcbi8vICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4vLyAgIGxldHRlci1zcGFjaW5nOiAwLjAwcHg7XHJcbi8vICAgY29sb3I6IHJnYmEoMTEyLCAxMTIsIDExMiwgMSk7XHJcbi8vICAgLXdlYmtpdC10ZXh0LXN0cm9rZTogdW5zZXQ7XHJcbi8vICAgZm9udC1zaXplOiAxNi4wMHB4O1xyXG4vLyAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbi8vIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuLy8gICBmb250LWZhbWlseTogR2VvcmdpYSwgQXJpYWw7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICBvdmVyZmxvdy14OiB1bnNldDtcclxuLy8gICBvdmVyZmxvdy15OiB1bnNldDtcclxuLy8gICB3aGl0ZS1zcGFjZTogcHJlO1xyXG4vLyAgIHdpZHRoOiA0Ni4wMHB4O1xyXG4vLyBoZWlnaHQ6IDE5LjAwcHg7XHJcbi8vIGxlZnQ6IDEzMi4wMHB4O1xyXG4vLyB0b3A6IDAuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMTggLnJlcGVhdC1ncmlkLTYgLm1hbGUge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMTYuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNDAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIEFyaWFsO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgb3ZlcmZsb3cteDogdW5zZXQ7XHJcbi8vICAgb3ZlcmZsb3cteTogdW5zZXQ7XHJcbi8vICAgd2hpdGUtc3BhY2U6IHByZTtcclxuLy8gICB3aWR0aDogMzQuMDBweDtcclxuLy8gaGVpZ2h0OiAxOS4wMHB4O1xyXG4vLyBsZWZ0OiAyMDYuMDBweDtcclxuLy8gdG9wOiAwLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTE4IC5yZXBlYXQtZ3JpZC02IC5vIHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwKTtcclxuLy8gICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbi8vICAgbGV0dGVyLXNwYWNpbmc6IDAuMDBweDtcclxuLy8gICBjb2xvcjogcmdiYSgxMTIsIDExMiwgMTEyLCAxKTtcclxuLy8gICAtd2Via2l0LXRleHQtc3Ryb2tlOiB1bnNldDtcclxuLy8gICBmb250LXNpemU6IDE2LjAwcHg7XHJcbi8vICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuLy8gZm9udC1zdHlsZTogbm9ybWFsO1xyXG4vLyAgIGZvbnQtZmFtaWx5OiBHZW9yZ2lhLCBBcmlhbDtcclxuLy8gICBib3gtc2hhZG93OiBub25lO1xyXG4vLyAgIG92ZXJmbG93LXg6IHVuc2V0O1xyXG4vLyAgIG92ZXJmbG93LXk6IHVuc2V0O1xyXG4vLyAgIHdoaXRlLXNwYWNlOiBwcmU7XHJcbi8vICAgd2lkdGg6IDIwLjAwcHg7XHJcbi8vIGhlaWdodDogMTkuMDBweDtcclxuLy8gbGVmdDogMjgxLjAwcHg7XHJcbi8vIHRvcDogMC4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0xOCAucmVwZWF0LWdyaWQtNyB7XHJcblxyXG4vLyAgIGRpc3BsYXk6IGJsb2NrO1xyXG4vLyAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIG92ZXJmbG93LXg6IGF1dG87XHJcbi8vICAgb3ZlcmZsb3cteTogYXV0bztcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuLy8gICB3aWR0aDogMzEwLjAwcHg7XHJcbi8vIGhlaWdodDogMzkuNzVweDtcclxuLy8gbGVmdDogMTMuMDBweDtcclxuLy8gdG9wOiAxMS4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0xOCAucmVwZWF0LWdyaWQtNyAucmVwZWF0LWdyaWQtNzBjM2Q4OWQ5IHtcclxuXHJcbi8vICAgZGlzcGxheTogYmxvY2s7XHJcbi8vICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4vLyAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuLy8gICB3aWR0aDogMzEwLjAwcHg7XHJcbi8vIGhlaWdodDogMzkuNzVweDtcclxuLy8gbGVmdDogMC4wMHB4O1xyXG4vLyB0b3A6IDAuMDBweDtcclxuXHJcbi8vIH1cclxuXHJcbi8vIC5ob21lcGFnZSAuZ3JvdXAtMTggLnJlcGVhdC1ncmlkLTcgLnJlcGVhdC1ncmlkLTcwYzNkODlkOSAuaWNvbi1hd2Vzb21lLWhlYXJ0YmVhdCB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGZpbGw6IHJnYmEoODcsIDE3MywgMCwgMSk7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICB3aWR0aDogMzYuMDBweDtcclxuLy8gaGVpZ2h0OiAzMS41MHB4O1xyXG4vLyBsZWZ0OiAwLjAwcHg7XHJcbi8vIHRvcDogOC4yNXB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0xOCAucmVwZWF0LWdyaWQtNyAucmVwZWF0LWdyaWQtNzBjM2Q4OWQ5IC5pY29uLWF3ZXNvbWUtd2VpZ2h0IHtcclxuLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgZmlsbDogcmdiYSg4NywgMTczLCAwLCAxKTtcclxuLy8gICBib3gtc2hhZG93OiBub25lO1xyXG4vLyAgIHdpZHRoOiAzNi4wMHB4O1xyXG4vLyBoZWlnaHQ6IDM2LjAwcHg7XHJcbi8vIGxlZnQ6IDcxLjk5cHg7XHJcbi8vIHRvcDogMi4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0xOCAucmVwZWF0LWdyaWQtNyAucmVwZWF0LWdyaWQtNzBjM2Q4OWQ5IC5pY29uLWF3ZXNvbWUtdGFwZSB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIG9wYWNpdHk6IDE7XHJcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4vLyAgIG1hcmdpbi10b3A6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tcmlnaHQ6IDAuMDBweDtcclxuLy8gICBtYXJnaW4tYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWxlZnQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXRvcDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctbGVmdDogMC4wMHB4O1xyXG4vLyAgIGZpbGw6IHJnYmEoODcsIDE3MywgMCwgMSk7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICB3aWR0aDogNDUuMDBweDtcclxuLy8gaGVpZ2h0OiAzMS41MHB4O1xyXG4vLyBsZWZ0OiAxMzguMjRweDtcclxuLy8gdG9wOiAyLjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAuaG9tZXBhZ2UgLmdyb3VwLTE4IC5yZXBlYXQtZ3JpZC03IC5yZXBlYXQtZ3JpZC03MGMzZDg5ZDkgLmljb24tYXdlc29tZS10cmFuc2dlbmRlci1hbHQge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBmaWxsOiByZ2JhKDg3LCAxNzMsIDAsIDEpO1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgd2lkdGg6IDMzLjc1cHg7XHJcbi8vIGhlaWdodDogMzYuMDBweDtcclxuLy8gbGVmdDogMjA3LjA1cHg7XHJcbi8vIHRvcDogMi43NXB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC5ncm91cC0xOCAucmVwZWF0LWdyaWQtNyAucmVwZWF0LWdyaWQtNzBjM2Q4OWQ5IC5vdXRwdXQtb25saW5lcG5ndG9vbHMtMSB7XHJcbi8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuLy8gICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMC4wMGRlZyk7XHJcbi8vIHRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4vLyAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcInNyYy9hc3NldHMvb3V0cHV0LW9ubGluZXBuZ3Rvb2xzLTEucG5nXCIpO1xyXG4vLyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbi8vIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbi8vIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbi8vICAgb3BhY2l0eTogMTtcclxuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XHJcbi8vICAgbWFyZ2luLXRvcDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1yaWdodDogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1ib3R0b206IDAuMDBweDtcclxuLy8gICBtYXJnaW4tbGVmdDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctdG9wOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1yaWdodDogMC4wMHB4O1xyXG4vLyAgIHBhZGRpbmctYm90dG9tOiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwKTtcclxuLy8gICBib3JkZXItYm90dG9tLWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1ib3R0b20tc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci1sZWZ0LWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1sZWZ0LXN0eWxlOiBub25lO1xyXG4vLyAgIGJvcmRlci1sZWZ0LXdpZHRoOiAxLjAwcHg7XHJcbi8vICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci1yaWdodC1zdHlsZTogbm9uZTtcclxuLy8gICBib3JkZXItcmlnaHQtd2lkdGg6IDEuMDBweDtcclxuLy8gICBib3JkZXItdG9wLWNvbG9yOiByZ2JhKDExMiwgMTEyLCAxMTIsIDEpO1xyXG4vLyAgIGJvcmRlci10b3Atc3R5bGU6IG5vbmU7XHJcbi8vICAgYm9yZGVyLXRvcC13aWR0aDogMS4wMHB4O1xyXG4vLyAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDAuMDBweDtcclxuLy8gICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMC4wMHB4O1xyXG4vLyAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDAuMDBweDtcclxuLy8gICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMC4wMHB4O1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgd2lkdGg6IDM5LjAwcHg7XHJcbi8vIGhlaWdodDogMzkuMDBweDtcclxuLy8gbGVmdDogMjcxLjAwcHg7XHJcbi8vIHRvcDogMC4wMHB4O1xyXG5cclxuLy8gfVxyXG5cclxuLy8gLmhvbWVwYWdlIC54MzdkZjY2ZjYge1xyXG4vLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbi8vICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDAuMDBkZWcpO1xyXG4vLyB0cmFuc2Zvcm06IHJvdGF0ZSgwLjAwZGVnKTtcclxuLy8gLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbi8vIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuLy8gICBvcGFjaXR5OiAxO1xyXG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcclxuLy8gICBtYXJnaW4tdG9wOiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgbWFyZ2luLWJvdHRvbTogMC4wMHB4O1xyXG4vLyAgIG1hcmdpbi1sZWZ0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy10b3A6IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLXJpZ2h0OiAwLjAwcHg7XHJcbi8vICAgcGFkZGluZy1ib3R0b206IDAuMDBweDtcclxuLy8gICBwYWRkaW5nLWxlZnQ6IDAuMDBweDtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4vLyAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICBsZXR0ZXItc3BhY2luZzogMC4wMHB4O1xyXG4vLyAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xyXG4vLyAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHVuc2V0O1xyXG4vLyAgIGZvbnQtc2l6ZTogMTYuMDBweDtcclxuLy8gICBmb250LXdlaWdodDogNzAwO1xyXG4vLyBmb250LXN0eWxlOiBub3JtYWw7XHJcbi8vICAgZm9udC1mYW1pbHk6IGdpbGJlcnRfYm9sZC1wcmV2aWV3NSwgQXJpYWw7XHJcbi8vICAgYm94LXNoYWRvdzogbm9uZTtcclxuLy8gICBvdmVyZmxvdy14OiB1bnNldDtcclxuLy8gICBvdmVyZmxvdy15OiB1bnNldDtcclxuLy8gICB3aGl0ZS1zcGFjZTogcHJlO1xyXG4vLyAgIHdpZHRoOiA2LjAwcHg7XHJcbi8vIGhlaWdodDogMjEuMDBweDtcclxuLy8gbGVmdDogMTg3LjAwcHg7XHJcbi8vIHRvcDogMjU2LjAwcHg7XHJcblxyXG4vLyB9XHJcblxyXG4iLCJpb24tY29udGVudCB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMHB4OyB9XG5cbmlvbi1yb3cge1xuICBtYXJnaW4tYm90dG9tOiAtMSU7IH1cblxuaW9uLXRvb2xiYXIge1xuICAtLWJhY2tncm91bmQ6IzI1YjdkMzsgfVxuXG4uYmFja2dyb3VuZCB7XG4gIG1hcmdpbjogMHB4O1xuICBwYWRkaW5nOiAwcHg7XG4gIGJhY2tncm91bmQ6ICMyNWI3ZDM7IH1cblxuLmNlbnRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XG5cbi5tYWluLWNhcmQge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJveC1zaGFkb3c6IDEwcHggMTBweCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgbWFyZ2luLXRvcDogMTAlOyB9XG5cbi5taW5pLWNhcmQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGJveC1zaGFkb3c6IDVweCA1cHggMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjUpO1xuICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xuICBtYXJnaW4tdG9wOiAxMCU7XG4gIGJvcmRlcjogd2hpdGVzbW9rZSBzb2xpZCAycHg7IH1cblxuLmljb24ge1xuICB3aWR0aDogMzUlO1xuICBoZWlnaHQ6IDM1JTtcbiAgbWFyZ2luOiA1JTsgfVxuXG4ubWlkZGxlLXRleHQge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtZmFtaWx5OiBHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgVGltZXMsIHNlcmlmO1xuICBtYXJnaW4tdG9wOiAyJTtcbiAgbWFyZ2luLWJvdHRvbTogMiU7IH1cblxuLnVzZXItbmFtZSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udDogMWVtIE9wZW4tc2FuczsgfVxuXG4uZ3JhZCB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIC0tYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxyXG4gIHRvIGJvdHRvbSxcclxuICAjMGE1Mjc5IDAlLFxyXG4gICM4MGQzY2IgMTAwJSlcclxuIFxyXG47IH1cblxuLnNwYWNlIHtcbiAgcGFkZGluZy1ib3R0b206IDI1cHg7XG4gIHBhZGRpbmctbGVmdDogMzAwcHg7IH1cblxuLmF2YXQge1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcbiAgbWF4LXdpZHRoOiAyMDBweCAhaW1wb3J0YW50O1xuICBtYXgtaGVpZ2h0OiAyMDBweCAhaW1wb3J0YW50OyB9XG5cbi5idG4ge1xuICBib3JkZXItcmFkaXVzOiAwLjUlOyB9XG5cbi5teUJhY2tncm91bmQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHotaW5kZXg6IDk5OTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJhY2tncm91bmQ6ICM1MGI5YjY7IH1cblxuLndyYXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cblxuLnByb2ZpbGUtaW1nLWZyYW1lIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDE3MHB4O1xuICBoZWlnaHQ6IDE3MHB4O1xuICBtaW4taGVpZ2h0OiA5MHB4O1xuICBtaW4td2lkdGg6IDkwcHg7XG4gIG1hcmdpbjogMWVtIGF1dG87XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgNXB4IHdoaXRlOyB9XG5cbi5wcm9maWxlLWltZy1ob2xkZXIge1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDJDMzlBO1xuICBtYXgtd2lkdGg6IDE1MHB4O1xuICBtYXgtaGVpZ2h0OiAxNTBweDtcbiAgbWluLXdpZHRoOiAxMDBweDtcbiAgbWluLWhlaWdodDogMTAwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47IH1cblxuLnByb2ZpbGUtaW1nIHtcbiAgZGlzcGxheTogaW5saW5lO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBhdXRvOyB9XG4iXX0= */");

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
                            this.http.addPatient(mobile).subscribe(response => {
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
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.Reciever_from_pat_list == "" || this.Content_from_text_area == "" || this.Subject_from_input == "") {
                this.presentAlert('Can not send message', "Make sure you typed your Subject, Message and choose your Patient.");
            }
            else {
                this.thread = {
                    sender_id: this.doctorId,
                    receiver_id: this.patientRow.patientId,
                    msg_subject: this.Subject_from_input,
                    is_readed: 0,
                    receiver_name: this.Reciever_from_pat_list,
                    sender_name: this.doctorName,
                    msg_body: this.Content_from_text_area,
                    fcm_token: this.patientRow.fcmtoken
                };
                this.newMessages.push(this.thread);
                console.log(this.Content_from_text_area);
                console.log(this.newMessages);
                console.log("thread to go", this.thread);
                // //post new message in data base
                //  this.data={
                //   sender_id:this.doctorId,
                //   receiver_id:this.thread.receiver_id,
                //   msg_body:this.thread.msg_body,
                //   thread_subject:this.Subject_from_input,
                //   fcm_token:this.patientRow.fcmtoken
                //
                //  };
                //  console.log("tthread"+this.thread.reciever_name)
                //  console.log("data"+this.data.sender_id)
                yield this.httpService.postThread(this.thread, this.doctorId).subscribe((res) => {
                    console.log("post thread res", res);
                    this.thread_id = res.insertId;
                    console.log("thread id created", this.thread_id);
                    let newThread = {
                        newMessages: this.newMessages.reverse(),
                        thread: this.thread,
                        thread_id: this.thread_id
                    };
                    console.log("thread for chatting", newThread);
                    this.interactiveCommunication.sendMSG(newThread);
                    this.navigation.navigateTo('home/chat');
                    // this.httpService.postReply(this.data,res.insertId).subscribe((msg)=>{
                    //  console.log("heyyyyloo");
                    //  console.log("first thread message",msg);
                    //  console.log("NAVIGATIOM11");
                    //
                    //
                    //
                    //  });
                });
                //send message content to chat component
                console.log("NAVIGATIOM");
            }
            console.log(this.Content_from_text_area);
        });
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
/* harmony default export */ __webpack_exports__["default"] = ("ion-toolbar {\n  --background: #2cc67b;\n  color: white;\n  font-family: Georgia, 'Times New Roman', Times, serif; }\n\n.profile-img-frame {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  justify-content: center;\n  width: 120px;\n  height: 120px;\n  min-height: 70px;\n  min-width: 70px;\n  margin: 1em auto;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center center;\n  border-radius: 50%;\n  box-shadow: inset 0 0 0 5px white; }\n\n.profile-img-holder {\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 50%;\n  background-color: #2cc67b;\n  max-width: 100px;\n  max-height: 100px;\n  min-width: 70px;\n  min-height: 70px;\n  overflow: hidden; }\n\n.profile-img {\n  display: inline;\n  width: 100%;\n  height: auto; }\n\nion-col {\n  display: flex;\n  align-content: center;\n  justify-content: center;\n  background-repeat: no-repeat;\n  align-items: center; }\n\n.element {\n  background-color: #2cc67b;\n  border-radius: 50%;\n  display: flex;\n  height: 50px;\n  justify-content: center;\n  align-items: center;\n  align-content: center;\n  width: 50px;\n  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25), -8px -8px 12px 0 rgba(255, 255, 255, 0.3); }\n\n.personal-data {\n  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.3), -8px -8px 12px 0 rgba(255, 255, 255, 0.3);\n  z-index: 1;\n  padding: 2%;\n  border-radius: 10%; }\n\nion-item {\n  --border-radius:10%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9ob21lL3BhdGllbnQtcHJvZmlsZS9wYXRpZW50LXByb2ZpbGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxxQkFBYTtFQUNiLFlBQVk7RUFDWixxREFBcUQsRUFBQTs7QUFFdkQ7RUFDSSxhQUFhO0VBQ2YscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDckIsWUFBWTtFQUNaLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixzQkFBc0I7RUFDdEIsNEJBQTRCO0VBQzVCLGtDQUFrQztFQUNsQyxrQkFBa0I7RUFDbEIsaUNBQWlDLEVBQUE7O0FBR3JDO0VBQ0Usb0JBQWlCO0tBQWpCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIseUJBQTBCO0VBQzFCLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixnQkFBZ0IsRUFBQTs7QUFFbEI7RUFDRSxlQUFlO0VBQ2YsV0FBVztFQUNYLFlBQVksRUFBQTs7QUFJZDtFQUNFLGFBQWE7RUFDYixxQkFBcUI7RUFDckIsdUJBQXVCO0VBQ3ZCLDRCQUE0QjtFQUM1QixtQkFBbUIsRUFBQTs7QUFFckI7RUFDRSx5QkFBMEI7RUFDMUIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixZQUFZO0VBQ1osdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsV0FBVztFQUNYLDJGQUVpRCxFQUFBOztBQUVuRDtFQUVFLDBGQUVpRDtFQUNqRCxVQUFVO0VBQ1YsV0FBVztFQUNiLGtCQUFrQixFQUFBOztBQUdsQjtFQUNFLG1CQUFnQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9wYXRpZW50LXByb2ZpbGUvcGF0aWVudC1wcm9maWxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLXRvb2xiYXJ7XG4gIC0tYmFja2dyb3VuZDogIzJjYzY3YjtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LWZhbWlseTogR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIFRpbWVzLCBzZXJpZjtcbn1cbi5wcm9maWxlLWltZy1mcmFtZXtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIHdpZHRoOiAxMjBweDtcbiAgICBoZWlnaHQ6IDEyMHB4O1xuICAgIG1pbi1oZWlnaHQ6IDcwcHg7XG4gICAgbWluLXdpZHRoOiA3MHB4O1xuICAgIG1hcmdpbjogMWVtIGF1dG87XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDVweCB3aGl0ZTtcblxufVxuLnByb2ZpbGUtaW1nLWhvbGRlcntcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogICMyY2M2N2I7XG4gIG1heC13aWR0aDogMTAwcHg7XG4gIG1heC1oZWlnaHQ6IDEwMHB4O1xuICBtaW4td2lkdGg6IDcwcHg7XG4gIG1pbi1oZWlnaHQ6IDcwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4ucHJvZmlsZS1pbWd7XG4gIGRpc3BsYXk6IGlubGluZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcblxuXG59XG5pb24tY29se1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmVsZW1lbnQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmNjNjdiIDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDUwcHg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiA1MHB4O1xuICBib3gtc2hhZG93OlxuICAgICAgICAgIDEycHggMTJweCAxNnB4IDAgcmdiYSgwLCAwLCAwLCAwLjI1KSxcbiAgICAgICAgICAtOHB4IC04cHggMTJweCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbn1cbi5wZXJzb25hbC1kYXRhe1xuICAvL2JveC1zaGFkb3c6IDFweCAycHggMTBweCAwcHggcmdiYSgwLDAsMCwwLjMpO1xuICBib3gtc2hhZG93OlxuICAgICAgICAgIDEycHggMTJweCAxNnB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpICxcbiAgICAgICAgICAtOHB4IC04cHggMTJweCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKSA7XG4gIHotaW5kZXg6IDE7XG4gIHBhZGRpbmc6IDIlO1xuYm9yZGVyLXJhZGl1czogMTAlO1xufVxuXG5pb24taXRlbXtcbiAgLS1ib3JkZXItcmFkaXVzOjEwJTtcbn1cbiJdfQ== */");

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
/* harmony default export */ __webpack_exports__["default"] = ("@font-face {\n  font-family: Forte;\n  src: url(/assets/fonts/FORTE.ttf); }\n\nion-content {\n  height: 100%;\n  width: 100%;\n  margin: 0px; }\n\n.grid {\n  display: grid;\n  grid-template-rows: auto;\n  grid-gap: 10px; }\n\n#item {\n  display: grid;\n  color: white;\n  font-family: Georgia, 'Times New Roman', Times, serif; }\n\n#item2 {\n  display: grid;\n  font-family: Georgia, 'Times New Roman', Times, serif; }\n\n.icon {\n  margin-bottom: -60%; }\n\n.middle-text {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: Georgia, 'Times New Roman', Times, serif;\n  font-size: larger; }\n\n.background {\n  height: 100%;\n  overflow: scroll; }\n\n.f-row {\n  background: #25b7d3;\n  margin: -5px;\n  font-size: 2em; }\n\n.small-icon {\n  width: 100%;\n  height: 100%; }\n\n.card {\n  box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.3);\n  overflow: hidden;\n  color: rgba(0, 0, 0, 0.6);\n  font-family: 'Open Sans', Helvetica, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  background: white;\n  border-radius: 20px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9ob21lL3BhdGllbnRMaXN0L3BhdGllbnQtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLGtCQUFrQjtFQUNsQixpQ0FBaUMsRUFBQTs7QUFHbkM7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLFdBQVcsRUFBQTs7QUFHYjtFQUNFLGFBQVk7RUFDWix3QkFBd0I7RUFDeEIsY0FBYSxFQUFBOztBQUlmO0VBQ0UsYUFBWTtFQUNaLFlBQVk7RUFDWixxREFBcUQsRUFBQTs7QUFFdkQ7RUFDRSxhQUFhO0VBQ2IscURBQXFELEVBQUE7O0FBR3ZEO0VBQ0UsbUJBQW1CLEVBQUE7O0FBSXJCO0VBQ0UsYUFBWTtFQUNaLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIscURBQXFEO0VBQ3JELGlCQUFpQixFQUFBOztBQUluQjtFQUVFLFlBQVk7RUFDWixnQkFBZ0IsRUFBQTs7QUFHbEI7RUFDRSxtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLGNBQWMsRUFBQTs7QUFFaEI7RUFDRSxXQUFXO0VBQ1gsWUFBVyxFQUFBOztBQUdiO0VBQ0UsK0NBQTRDO0VBQzVDLGdCQUFnQjtFQUVoQix5QkFBc0I7RUFDdEIsK0NBQStDO0VBQy9DLG1DQUFtQztFQUNuQyxrQ0FBa0M7RUFDbEMsaUJBQWlCO0VBQ2pCLG1CQUFtQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9wYXRpZW50TGlzdC9wYXRpZW50LWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkYmx1ZTojMjViN2QzO1xyXG5AZm9udC1mYWNlIHtcclxuICBmb250LWZhbWlseTogRm9ydGU7XHJcbiAgc3JjOiB1cmwoL2Fzc2V0cy9mb250cy9GT1JURS50dGYpO1xyXG59XHJcblxyXG5pb24tY29udGVudHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbn1cclxuLy90byBjb250cm9sIHJvd3MgaGVpZ2h0XHJcbi5ncmlkIHtcclxuICBkaXNwbGF5OmdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvO1xyXG4gIGdyaWQtZ2FwOjEwcHg7XHJcbiAgLy9oZWlnaHQ6IGNhbGMoMTAwdmggLSAxMHB4KTtcclxufVxyXG5cclxuI2l0ZW17XHJcbiAgZGlzcGxheTpncmlkO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBmb250LWZhbWlseTogR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIFRpbWVzLCBzZXJpZjtcclxufVxyXG4jaXRlbTIge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZm9udC1mYW1pbHk6IEdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBUaW1lcywgc2VyaWY7XHJcbn1cclxuXHJcbi5pY29ue1xyXG4gIG1hcmdpbi1ib3R0b206IC02MCU7XHJcbn1cclxuXHJcbi8vdGl0bGVcclxuLm1pZGRsZS10ZXh0e1xyXG4gIGRpc3BsYXk6ZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGZvbnQtZmFtaWx5OiBHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgVGltZXMsIHNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogbGFyZ2VyO1xyXG5cclxufVxyXG4vL21haW4gYmFja2dyb3VuZFxyXG4uYmFja2dyb3VuZHtcclxuICAvL2JhY2tncm91bmQ6ICNlN2U3ZTc7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIG92ZXJmbG93OiBzY3JvbGw7XHJcbn1cclxuLy9maXJzdCByb3dcclxuLmYtcm93e1xyXG4gIGJhY2tncm91bmQ6ICMyNWI3ZDM7XHJcbiAgbWFyZ2luOiAtNXB4O1xyXG4gIGZvbnQtc2l6ZTogMmVtO1xyXG59XHJcbi5zbWFsbC1pY29ue1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDoxMDAlO1xyXG4gIC8vbWFyZ2luLXRvcDogMjAlO1xyXG59XHJcbi5jYXJke1xyXG4gIGJveC1zaGFkb3c6IDFweCAycHggMTBweCAwcHggcmdiYSgwLDAsMCwwLjMpO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgLy9jb2xvcjogIzNhYTA4NztcclxuICBjb2xvcjogcmdiYSgwLDAsMCwwLjYpO1xyXG4gIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xyXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xyXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcclxufVxyXG4vL2lvbiBzZWFyY2ggYmFyIHN0eWxlIGF0IGdsb2JhbCBzdHlsZSBzaGVldFxyXG5cclxuXHJcbiJdfQ== */");

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


// import { IDoctor } from '../DataModels';




let PatientListComponent = class PatientListComponent {
    constructor(datastream, navigation, addController, http) {
        this.datastream = datastream;
        this.navigation = navigation;
        this.addController = addController;
        this.http = http;
        this.patientArrayList = new Array();
        this.patientRow = new Array();
        // this.patientRow = this.datastream.getPatientList();      
    }
    ngOnInit() { }
    ionViewWillEnter() {
        let that = this;
        this.datastream.clearPatientList();
        this.http.getPatientList().subscribe((patient) => {
            this.datastream.patientList.push(patient);
        }, err => {
            let errorMessage = "";
            if (err.error.message == null) {
                errorMessage = "Error in Connection";
            }
            else {
                errorMessage = err.error.message;
            }
            console.log('HTTP Patient List Error: ', errorMessage);
            alert('HTTP Error: ' + errorMessage);
        }, () => {
            this.patientRow = this.datastream.getPatientList();
            this.patientArrayList = this.patientRow;
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
    backClick() {
        this.navigation.navigateTo('home');
    }
};
PatientListComponent.ctorParameters = () => [
    { type: src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_2__["DatastreamingService"] },
    { type: _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_3__["NavigationService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _HttPService_http_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"] }
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
        _HttPService_http_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"]])
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
/* harmony default export */ __webpack_exports__["default"] = ("ion-toolbar {\n  --background: #25b7d3;\n  color: white;\n  font-family: Georgia, 'Times New Roman', Times, serif; }\n\n.ion-content {\n  --background: #25b7d3;\n  font-size: 30px;\n  max-font-size: 30px;\n  min-font-size: 25px; }\n\n.fab {\n  margin-bottom: 3%; }\n\n.wrapper {\n  position: relative; }\n\n.profile-img-frame {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  justify-content: center;\n  width: 170px;\n  height: 170px;\n  min-height: 90px;\n  min-width: 90px;\n  margin: 1em auto;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center center;\n  border-radius: 50%;\n  box-shadow: inset 0 0 0 5px white; }\n\n.profile-img-holder {\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 50%;\n  background-color: #25b7d3;\n  max-width: 150px;\n  max-height: 150px;\n  min-width: 100px;\n  min-height: 100px;\n  overflow: hidden; }\n\n.profile-img {\n  display: inline;\n  width: 100%;\n  height: auto; }\n\n.camera {\n  position: absolute;\n  top: 85%;\n  right: 30%;\n  display: flex;\n  align-content: center;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  width: 50px;\n  height: 50px;\n  background: linear-gradient(145deg, #28c4e2, #21a5be);\n  box-shadow: -3px -3px 2px #1f9cb3,\r 3px 3px 2px #2bd2f3;\n  color: white; }\n\n.inputs {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  justify-content: center; }\n\n.ion-input {\n  margin-top: 2%;\n  margin-bottom: 2%;\n  margin-left: 7%;\n  margin-right: 7%;\n  border-radius: 15px;\n  width: 100%; }\n\n.buttons-tool_bar {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  justify-content: center;\n  width: 100%; }\n\n.ion-button {\n  border-radius: 15px;\n  display: flex;\n  height: 50px;\n  justify-content: center;\n  align-items: center;\n  align-content: center;\n  margin-left: 10%;\n  width: 100px;\n  background: linear-gradient(145deg, #28c4e2, #21a5be);\n  box-shadow: 3px 3px 3px #1d91a7,\r -3px -3px 3px #2dddff; }\n\n.paragraph {\n  padding: 0px;\n  margin-bottom: 0px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NvaGlsYS9Eb2N1bWVudHMvR1AtVGFza3MvRG9jdG9yX1BsYXRmb3JtL0dyYWR1YXRpb24tUHJvamVjdC1Eb2N0b3Ivc3JjL2FwcC9ob21lL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvaG9tZS9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUdBO0VBQ0UscUJBQWE7RUFDYixZQUFZO0VBQ1oscURBQXNELEVBQUE7O0FBRXhEO0VBQ0UscUJBQWE7RUFDYixlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLG1CQUFtQixFQUFBOztBQUlyQjtFQUNFLGlCQUFpQixFQUFBOztBQUVuQjtFQUNFLGtCQUFrQixFQUFBOztBQUVwQjtFQUNFLGFBQWE7RUFDYixxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtFQUN0Qiw0QkFBNEI7RUFDNUIsa0NBQWtDO0VBQ2xDLGtCQUFrQjtFQUNsQixpQ0FBaUMsRUFBQTs7QUFJbkM7RUFDRSxvQkFBaUI7S0FBakIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQix5QkFBMEI7RUFDMUIsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGdCQUFnQixFQUFBOztBQUVsQjtFQUNFLGVBQWU7RUFDZixXQUFXO0VBQ1gsWUFBWSxFQUFBOztBQUlkO0VBQ0Usa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixVQUFVO0VBQ1YsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWTtFQUNaLHFEQUFxRDtFQUNyRCx1REFHRDtFQ2hIQyxZQUFZLEVBQUU7O0FBRWhCO0VEaUhFLGFBQWE7RUFDYixxQkFBbUI7RUFDbkIsbUJBQWlCO0VDL0dqQix1QkFBdUIsRUFBRTs7QUFFM0I7RURpSEUsY0FBYTtFQUNiLGlCQUFlO0VBQ2YsZUFBYztFQUNkLGdCQUFjO0VBQ2QsbUJBRUQ7RUNqSEMsV0FBVyxFQUFFOztBQUVmO0VEa0hFLGFBQWE7RUFDYixxQkFBbUI7RUFDbkIsbUJBQWlCO0VBQ2pCLHVCQUVEO0VDbEhDLFdBQVcsRUFBRTs7QUFFZjtFRG1IRSxtQkFBYTtFQUNiLGFBQVk7RUFDWixZQUFBO0VBQ0EsdUJBQW1CO0VBQ25CLG1CQUFlO0VBQ2YscUJBQWdCO0VBQ2hCLGdCQUFZO0VBQ1osWUFBWTtFQUNaLHFEQUFhO0VDakhiLHVERG9IUSxFQUFBOztBQ2pIVjtFQUNFLFlBQVk7RUFDWixrQkFBa0IsRUFBRSIsImZpbGUiOiJzcmMvYXBwL2hvbWUvcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cclxuLy8uY29udHtcclxuLy8gIGhlaWdodDogMTAwJTtcclxuLy8gIHdpZHRoOiAxMDAlO1xyXG4vLyAgbWFyZ2luOiAtMTAlO1xyXG4vL31cclxuLy9cclxuLy8vLyAuY29udGFpbmVyIHtcclxuLy8vLyAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4vLy8vICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbi8vLy8gICAgIGNvbG9yOiB3aGl0ZTtcclxuLy8vLyAgICAgaGVpZ2h0OiAxMDAlO1xyXG4vLy8vICAgICB3aWR0aDogMTAwJTtcclxuLy8vLyAgICAgbWFyZ2luOiAwcHg7XHJcbi8vLy8gICAgIHBhZGRpbmc6IDAlO1xyXG4vLy8vICAgfVxyXG4vLy5jZW50ZXJlZCB7XHJcbi8vICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICBtYXJnaW4tbGVmdDogNTAlO1xyXG4vLyAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTMwJSwgLTQwJSk7XHJcbi8vICBjb2xvcjogYmxhY2s7XHJcbi8vICAvLyB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbi8vICAvLyBtYXJnaW4tdG9wOi0xMDAlO1xyXG4vLyAgLy8gZm9udC1mYW1pbHk6IEdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBUaW1lcywgc2VyaWY7XHJcbi8vfVxyXG4vLy5hdmF0e1xyXG4vLyAgd2lkdGg6MTAwJSAhaW1wb3J0YW50O1xyXG4vLyAgaGVpZ2h0IDogMTAwJSAhaW1wb3J0YW50O1xyXG4vLyAgbWF4LXdpZHRoOiAxNTBweCAhaW1wb3J0YW50O1xyXG4vLyAgbWF4LWhlaWdodDogMTUwcHggIWltcG9ydGFudDtcclxuLy99XHJcbi8vLnNwYWNle1xyXG4vLyAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgbWFyZ2luLWxlZnQ6IDEwJTtcclxuLy8gIG1hcmdpbi10b3A6IDEwJTtcclxuLy99XHJcbi8vLml0e1xyXG4vLyAgcGFkZGluZy10b3A6IDIlO1xyXG4vL31cclxuLy8uZ3JhZCAge1xyXG4vLyAgLS1iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXHJcbi8vICAgICAgICAgICAgICAgICAgdG8gYm90dG9tLFxyXG4vLyAgICAgICAgICAgICAgICAgICMwYTUyNzkgMCUsXHJcbi8vICAgICAgICAgICAgICAgICAgIzgwZDNjYiAxMDAlKVxyXG4vL1xyXG4vL31cclxuLy9cclxuLy8uYmFja3tcclxuLy8gIG1hcmdpbi10b3A6IDUwJTtcclxuLy8gIG1hcmdpbi1sZWZ0OiAxMCU7XHJcbi8vfVxyXG4vL1xyXG4vLy5lZGl0e1xyXG4vLyAgbWFyZ2luLWxlZnQ6IDclO1xyXG4vLyAgbWFyZ2luLXRvcDogOTAlO1xyXG4vL31cclxuLy8ucGFke1xyXG4vLyAgbWFyZ2luLWxlZnQ6IDEwJTtcclxuLy8gIHBhZGRpbmctcmlnaHQ6IDMlO1xyXG4vL31cclxuLy8ud3JhcHBlciB7XHJcbi8vICB3aWR0aDogNTAwcHg7XHJcbi8vICBoZWlnaHQ6IDUwMHB4O1xyXG4vLyAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgbGVmdDogNTAlO1xyXG4vLyAgdG9wOiA1MCU7XHJcbi8vICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuLy8gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuLy8gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsIHJnYig4MCwgMTg1LCAxODIpIDAlLCAjZmZmZmZmIDEwMCUpO1xyXG4vLyAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuLy8gIGJvcmRlci1yYWRpdXM6IDIwJTtcclxuLy99XHJcbi8vXHJcbi8vLndhdmUge1xyXG4vLyAgd2lkdGg6IDEwMDBweDtcclxuLy8gIGhlaWdodDogMTAwMHB4O1xyXG4vLyAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgdG9wOiAtMjUlO1xyXG4vLyAgbGVmdDogNTAlO1xyXG4vLyAgbWFyZ2luLWxlZnQ6IC01MDBweDtcclxuLy8gIG1hcmdpbi10b3A6IC01MDBweDtcclxuLy8gIGJvcmRlci1yYWRpdXM6IDM1JTtcclxuLy8gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgLjc1KTtcclxuLy8gIGFuaW1hdGlvbjogd2F2ZSAxNXMgaW5maW5pdGUgbGluZWFyO1xyXG4vL31cclxuLy9cclxuLy9Aa2V5ZnJhbWVzIHdhdmUge1xyXG4vLyAgZnJvbSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO31cclxuLy8gIGZyb20geyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO31cclxuLy99XHJcbi8vLm15cm93e1xyXG4vLyAgcGFkZGluZy1ib3R0b206IDYwJTtcclxuLy99XHJcbi8vLlNyb3d7XHJcbi8vICB3aWR0aDogNTAwcHg7XHJcbi8vICBoZWlnaHQ6IDUwMHB4O1xyXG4vLyAgcG9zaXRpb246IGFic29sdXRlO1xyXG4vLyAgbWFyZ2luLWxlZnQ6IDEwMCU7XHJcbi8vICBtYXJnaW4tdG9wOiAxMzAlO1xyXG4vLyAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbi8vICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCByZ2IoODAsIDE4NSwgMTgyKSAwJSwgI2ZmZmZmZiAxMDAlKTtcclxuLy8gIG92ZXJmbG93OiBoaWRkZW47XHJcbi8vICBib3JkZXItcmFkaXVzOiAyMCU7XHJcbi8vfVxyXG5cclxuaW9uLXRvb2xiYXJ7XHJcbiAgLS1iYWNrZ3JvdW5kOiAjMjViN2QzO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBmb250LWZhbWlseTogR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIFRpbWVzLCBzZXJpZiA7XHJcbn1cclxuLmlvbi1jb250ZW50e1xyXG4gIC0tYmFja2dyb3VuZDogIzI1YjdkMztcclxuICBmb250LXNpemU6IDMwcHg7XHJcbiAgbWF4LWZvbnQtc2l6ZTogMzBweDtcclxuICBtaW4tZm9udC1zaXplOiAyNXB4O1xyXG5cclxuXHJcbn1cclxuLmZhYntcclxuICBtYXJnaW4tYm90dG9tOiAzJTtcclxufVxyXG4ud3JhcHBlcntcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuLnByb2ZpbGUtaW1nLWZyYW1le1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgd2lkdGg6IDE3MHB4O1xyXG4gIGhlaWdodDogMTcwcHg7XHJcbiAgbWluLWhlaWdodDogOTBweDtcclxuICBtaW4td2lkdGg6IDkwcHg7XHJcbiAgbWFyZ2luOiAxZW0gYXV0bztcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgNXB4IHdoaXRlO1xyXG5cclxufVxyXG5cclxuLnByb2ZpbGUtaW1nLWhvbGRlcntcclxuICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogICMyNWI3ZDM7XHJcbiAgbWF4LXdpZHRoOiAxNTBweDtcclxuICBtYXgtaGVpZ2h0OiAxNTBweDtcclxuICBtaW4td2lkdGg6IDEwMHB4O1xyXG4gIG1pbi1oZWlnaHQ6IDEwMHB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuLnByb2ZpbGUtaW1ne1xyXG4gIGRpc3BsYXk6IGlubGluZTtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IGF1dG87XHJcblxyXG5cclxufVxyXG4uY2FtZXJhe1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDg1JTtcclxuICByaWdodDogMzAlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIHdpZHRoOiA1MHB4O1xyXG4gIGhlaWdodDogNTBweDtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTQ1ZGVnLCAjMjhjNGUyLCAjMjFhNWJlKTtcclxuICBib3gtc2hhZG93OiAgLTNweCAtM3B4IDJweCAjMWY5Y2IzLFxyXG4gIDNweCAzcHggMnB4ICMyYmQyZjM7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcbi5pbnB1dHN7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG4uaW9uLWlucHV0e1xyXG4gIG1hcmdpbi10b3A6IDIlO1xyXG4gIG1hcmdpbi1ib3R0b206IDIlO1xyXG4gIG1hcmdpbi1sZWZ0OiA3JTtcclxuICBtYXJnaW4tcmlnaHQ6IDclO1xyXG4gIGJvcmRlci1yYWRpdXM6MTVweDtcclxuICB3aWR0aDogMTAwJTtcclxuXHJcbn1cclxuLmJ1dHRvbnMtdG9vbF9iYXJ7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICB3aWR0aDogMTAwJTtcclxuXHJcbn1cclxuLmlvbi1idXR0b24ge1xyXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgbWFyZ2luLWxlZnQ6IDEwJTtcclxuICB3aWR0aDogMTAwcHg7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE0NWRlZywgIzI4YzRlMiwgIzIxYTViZSk7XHJcbiAgYm94LXNoYWRvdzogIDNweCAzcHggM3B4ICMxZDkxYTcsXHJcbiAgLTNweCAtM3B4IDNweCAjMmRkZGZmO1xyXG59XHJcbi5wYXJhZ3JhcGh7XHJcbiAgcGFkZGluZzogMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDBweDtcclxufVxyXG5cclxuIiwiaW9uLXRvb2xiYXIge1xuICAtLWJhY2tncm91bmQ6ICMyNWI3ZDM7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1mYW1pbHk6IEdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBUaW1lcywgc2VyaWY7IH1cblxuLmlvbi1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiAjMjViN2QzO1xuICBmb250LXNpemU6IDMwcHg7XG4gIG1heC1mb250LXNpemU6IDMwcHg7XG4gIG1pbi1mb250LXNpemU6IDI1cHg7IH1cblxuLmZhYiB7XG4gIG1hcmdpbi1ib3R0b206IDMlOyB9XG5cbi53cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XG5cbi5wcm9maWxlLWltZy1mcmFtZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiAxNzBweDtcbiAgaGVpZ2h0OiAxNzBweDtcbiAgbWluLWhlaWdodDogOTBweDtcbiAgbWluLXdpZHRoOiA5MHB4O1xuICBtYXJnaW46IDFlbSBhdXRvO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDVweCB3aGl0ZTsgfVxuXG4ucHJvZmlsZS1pbWctaG9sZGVyIHtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI1YjdkMztcbiAgbWF4LXdpZHRoOiAxNTBweDtcbiAgbWF4LWhlaWdodDogMTUwcHg7XG4gIG1pbi13aWR0aDogMTAwcHg7XG4gIG1pbi1oZWlnaHQ6IDEwMHB4O1xuICBvdmVyZmxvdzogaGlkZGVuOyB9XG5cbi5wcm9maWxlLWltZyB7XG4gIGRpc3BsYXk6IGlubGluZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bzsgfVxuXG4uY2FtZXJhIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDg1JTtcbiAgcmlnaHQ6IDMwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB3aWR0aDogNTBweDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTQ1ZGVnLCAjMjhjNGUyLCAjMjFhNWJlKTtcbiAgYm94LXNoYWRvdzogLTNweCAtM3B4IDJweCAjMWY5Y2IzLFxyIDNweCAzcHggMnB4ICMyYmQyZjM7XG4gIGNvbG9yOiB3aGl0ZTsgfVxuXG4uaW5wdXRzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxuXG4uaW9uLWlucHV0IHtcbiAgbWFyZ2luLXRvcDogMiU7XG4gIG1hcmdpbi1ib3R0b206IDIlO1xuICBtYXJnaW4tbGVmdDogNyU7XG4gIG1hcmdpbi1yaWdodDogNyU7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIHdpZHRoOiAxMDAlOyB9XG5cbi5idXR0b25zLXRvb2xfYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7IH1cblxuLmlvbi1idXR0b24ge1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDUwcHg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbi1sZWZ0OiAxMCU7XG4gIHdpZHRoOiAxMDBweDtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE0NWRlZywgIzI4YzRlMiwgIzIxYTViZSk7XG4gIGJveC1zaGFkb3c6IDNweCAzcHggM3B4ICMxZDkxYTcsXHIgLTNweCAtM3B4IDNweCAjMmRkZGZmOyB9XG5cbi5wYXJhZ3JhcGgge1xuICBwYWRkaW5nOiAwcHg7XG4gIG1hcmdpbi1ib3R0b206IDBweDsgfVxuIl19 */");

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
/* harmony import */ var _DataModels__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../DataModels */ "./src/app/home/DataModels.ts");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/file/ngx */ "./node_modules/@ionic-native/file/ngx/index.js");
/* harmony import */ var _ionic_native_ionic_webview_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/ionic-webview/ngx */ "./node_modules/@ionic-native/ionic-webview/ngx/index.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var _ionic_native_file_path_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/file-path/ngx */ "./node_modules/@ionic-native/file-path/ngx/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _services_Network_network_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../services/Network/network.service */ "./src/app/services/Network/network.service.ts");














const STORAGE_KEY = 'my_image';
let ProfileComponent = class ProfileComponent {
    constructor(navigation, datastream, editPatientService, savedata, camera, file, webview, actionSheetController, toastController, storage, plt, loadingController, ref, filePath, http, network) {
        this.navigation = navigation;
        this.datastream = datastream;
        this.editPatientService = editPatientService;
        this.savedata = savedata;
        this.camera = camera;
        this.file = file;
        this.webview = webview;
        this.actionSheetController = actionSheetController;
        this.toastController = toastController;
        this.storage = storage;
        this.plt = plt;
        this.loadingController = loadingController;
        this.ref = ref;
        this.filePath = filePath;
        this.http = http;
        this.network = network;
        this.spinnerState = true;
        this.save_state = true;
        this.profileImage = new _DataModels__WEBPACK_IMPORTED_MODULE_6__["ImagePath"]();
    }
    ngOnInit() {
        this.plt.ready().then(() => {
            this.loadStoredImages();
        });
        new Promise((resolve, reject) => {
            this.DataSet();
            console.log("data set has ended");
            if (this.InputData == undefined) {
                reject("undefined User Data");
            }
            else {
                resolve();
            }
        }).then(() => { this.spinnerState = false; console.log("resolved", this.InputData); }).catch((err) => alert('data stream error' + err));
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
                type: "string"
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
                            this.editPatientService.editDoctorProfile(this.InputData[0].value, this.InputData[3].value).subscribe(response => {
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
    //Searching for image in our app storage first
    loadStoredImages() {
        console.log("load stored images");
        this.storage.get(STORAGE_KEY).then(images => {
            if (images) {
                console.log('stored images', images);
                const arr = JSON.parse(images);
                this.image = "";
                for (const img of arr) {
                    //path of our app directory
                    const filePath = this.file.dataDirectory + img;
                    // get path for image on our app directory
                    const resPath = this.pathForImage(filePath);
                    this.image = { name: img, path: resPath, filePath };
                    this.ref.detectChanges();
                }
            }
        });
    }
    //get image path to render image from
    pathForImage(img) {
        if (img === null) {
            return '';
        }
        else {
            //convert image pah of file:// to WebView Path
            const converted = this.webview.convertFileSrc(img);
            return converted;
        }
    }
    ////action sheet for Choosing How to Capture the image
    selectImage() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log("select image");
            const actionSheet = yield this.actionSheetController.create({
                header: "Select Image source",
                buttons: [{
                        text: 'Load from Library',
                        handler: () => {
                            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                        }
                    },
                    {
                        text: 'Use Camera',
                        handler: () => {
                            this.takePicture(this.camera.PictureSourceType.CAMERA);
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    }
                ]
            });
            yield actionSheet.present();
        });
    }
    /////setting Camera Options
    takePicture(sourceType) {
        //storing Image as URI not base64 to save storage
        console.log("take pics");
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // get copy of the original selected image to our app directory
        this.camera.getPicture(options).then(imagePath => {
            if (this.network.NetworkStateGetter()) {
                if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                    this.filePath.resolveNativePath(imagePath)
                        .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.profileImage = {
                            path: correctPath + currentName,
                            currentName: currentName,
                            correctPath: correctPath
                        };
                        this.startUpload(this.profileImage.path);
                    });
                }
                else {
                    var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                    var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                    this.profileImage = {
                        path: correctPath + currentName,
                        currentName: currentName,
                        correctPath: correctPath
                    };
                    this.startUpload(this.profileImage.path);
                }
            }
            else {
                alert("you are Offline");
            }
        });
    }
    //create new file name for the image to be stored in our app storage
    createFileName() {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    }
    //copy image with new name and path to our app directory
    copyFileToLocalDir(namePath, currentName, newFileName) {
        console.log("copy to local directory");
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
            //Updating Local Storage
            this.updateStoredImages(newFileName);
        }, error => {
            alert('Error while storing file.' + error);
        });
    }
    updateStoredImages(name) {
        console.log("update stored image ");
        new Promise((resolve, reject) => {
            this.storage.get(STORAGE_KEY).then(images => {
                let arr = JSON.parse(images);
                let newImage = [name];
                this.storage.set(STORAGE_KEY, JSON.stringify(newImage));
                let filePath = this.file.dataDirectory + name;
                let resPath = this.pathForImage(filePath);
                // Data Object to hold new image data
                this.image = {
                    name: name,
                    path: resPath,
                    filePath: filePath
                };
                this.ref.detectChanges(); // trigger change detection cycle
                this.datastream.changeDoctorProfileImage(this.image.path);
                if (this.image == undefined) {
                    reject("undefined image file");
                }
                else {
                    resolve();
                }
            }).catch(err => { alert(err); });
        });
    }
    startUpload(imgEntry) {
        console.log("start up upload");
        console.log("image data to be uploaded", imgEntry);
        this.file.resolveLocalFilesystemUrl(imgEntry)
            .then(entry => {
            entry.file(file => this.readFile(file));
        })
            .catch(err => {
            alert('Error while reading file ' + err);
        });
    }
    readFile(file) {
        console.log("read file ");
        const reader = new FileReader();
        reader.onload = () => {
            const formData = new FormData();
            const imgBlob = new Blob([reader.result], {
                type: file.type
            });
            formData.append('file', imgBlob);
            this.uploadImageData(formData).then(() => console.log("returned from uploading"));
        };
        reader.readAsArrayBuffer(file);
    }
    uploadImageData(formData) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log("upload image data image");
            const loading = yield this.loadingController.create({
                message: 'Uploading image...',
            });
            yield loading.present();
            //http goes here
            this.http.postProfileImage(formData).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_12__["finalize"])(() => {
                console.log("Finalize");
                loading.dismiss();
            })).subscribe(res => {
                console.log("http post image");
                console.log(res);
                this.copyFileToLocalDir(this.profileImage.correctPath, this.profileImage.currentName, this.createFileName());
            }, error1 => { alert(error1 + 'http error'); });
        });
    }
};
ProfileComponent.ctorParameters = () => [
    { type: _NavService_navigation_service__WEBPACK_IMPORTED_MODULE_2__["NavigationService"] },
    { type: src_app_services_datastream_datastreaming_service__WEBPACK_IMPORTED_MODULE_3__["DatastreamingService"] },
    { type: _HttPService_http_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_7__["Camera"] },
    { type: _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_8__["File"] },
    { type: _ionic_native_ionic_webview_ngx__WEBPACK_IMPORTED_MODULE_9__["WebView"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ActionSheetController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ToastController"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_10__["Storage"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["LoadingController"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
    { type: _ionic_native_file_path_ngx__WEBPACK_IMPORTED_MODULE_11__["FilePath"] },
    { type: _HttPService_http_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"] },
    { type: _services_Network_network_service__WEBPACK_IMPORTED_MODULE_13__["NetworkService"] }
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
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"],
        _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_7__["Camera"], _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_8__["File"], _ionic_native_ionic_webview_ngx__WEBPACK_IMPORTED_MODULE_9__["WebView"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ActionSheetController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ToastController"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_10__["Storage"], _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"], _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["LoadingController"],
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _ionic_native_file_path_ngx__WEBPACK_IMPORTED_MODULE_11__["FilePath"], _HttPService_http_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"], _services_Network_network_service__WEBPACK_IMPORTED_MODULE_13__["NetworkService"]])
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

/***/ "./src/app/services/Network/network.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/services/Network/network.service.ts ***!
  \*****************************************************/
/*! exports provided: NetworkService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkService", function() { return NetworkService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/network/ngx */ "./node_modules/@ionic-native/network/ngx/index.js");



let NetworkService = class NetworkService {
    constructor(network) {
        this.network = network;
        this.NetworkSubscription();
    }
    NetworkStateSetter(state) {
        this.NetworkState = state;
        console.log("Network State", this.NetworkState);
    }
    NetworkStateGetter() {
        return this.NetworkState;
    }
    NetworkSubscription() {
        console.log("network check subscription");
        // watch network for a disconnection
        this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
            console.log('network was disconnected :-(');
            this.NetworkStateSetter(false);
        });
        // watch network for a connection
        this.connectSubscription = this.network.onConnect().subscribe(() => {
            console.log('network connected!');
            this.NetworkStateSetter(true);
            // We just got a connection but we need to wait briefly
            // before we determine the connection type. Might need to wait.
            // prior to doing any api requests as well.
            setTimeout(() => {
                if (this.network.type === 'wifi') {
                    console.log('we got a wifi connection, woohoo!');
                }
            }, 3000);
        });
    }
    Unsubscribe() {
        console.log("network check Unsubscription");
        // stop connect watch
        this.connectSubscription.unsubscribe();
        // stop disconnect watch
        this.disconnectSubscription.unsubscribe();
    }
    networkCheck() {
        console.log("network check");
        console.log("network state in service", this.NetworkState);
        return this.NetworkState;
    }
    ngOnDestroy() {
        this.Unsubscribe();
    }
};
NetworkService.ctorParameters = () => [
    { type: _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_2__["Network"] }
];
NetworkService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_2__["Network"]])
], NetworkService);



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