"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LanguagesPage = void 0;
/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
var core_1 = require("@angular/core");
var LanguagesPage = /** @class */ (function () {
    function LanguagesPage(util, api, navCtrl) {
        this.util = util;
        this.api = api;
        this.navCtrl = navCtrl;
        this.dummy = [];
        this.langs = [];
        this.selected = localStorage.getItem('language');
        this.getLangs();
    }
    LanguagesPage.prototype.ngOnInit = function () {
    };
    LanguagesPage.prototype.getLangs = function () {
        var _this = this;
        this.dummy = Array(10);
        this.api.get('lang').subscribe(function (data) {
            console.log(data);
            _this.dummy = [];
            if (data && data.status === 200) {
                var info = data.data.filter(function (x) { return x.status === '1'; });
                _this.langs = info;
            }
        }, function (error) {
            _this.dummy = [];
            console.log(error);
            _this.util.errorToast(_this.util.getString('Something went wrong'));
        });
    };
    LanguagesPage.prototype.openMenu = function () {
        this.util.openMenu();
    };
    LanguagesPage.prototype.changed = function () {
        var _this = this;
        console.log(this.selected);
        var item = this.langs.filter(function (x) { return x.file === _this.selected; });
        if (item && item.length > 0) {
            this.util.direction = item[0].positions === '1' ? 'ltr' : 'rtl';
            document.documentElement.dir = this.util.direction;
            localStorage.setItem('language', this.selected);
            localStorage.setItem('language_id', item[0].id);
            window.location.reload();
        }
    };
    LanguagesPage.prototype.back = function () {
        this.navCtrl.back();
    };
    LanguagesPage = __decorate([
        core_1.Component({
            selector: 'app-languages',
            templateUrl: './languages.page.html',
            styleUrls: ['./languages.page.scss']
        })
    ], LanguagesPage);
    return LanguagesPage;
}());
exports.LanguagesPage = LanguagesPage;
