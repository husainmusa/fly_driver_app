"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AppComponent = void 0;
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
var environment_1 = require("src/environments/environment");
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, navCtrl, api, util, oneSignal, router, nativeAudio, actionSheetController) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.navCtrl = navCtrl;
        this.api = api;
        this.util = util;
        this.oneSignal = oneSignal;
        this.router = router;
        this.nativeAudio = nativeAudio;
        this.actionSheetController = actionSheetController;
        this.appPages = [];
        this.selectedIndex = 0;
        var uid = localStorage.getItem('uid');
        if ((uid == "") || (uid === null)) {
            this.util.isLoggedIn = false;
            console.log("not logged");
        }
        else {
            this.util.isLoggedIn = true;
            console.log("logged");
        }
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            if (_this.platform.is('cordova')) {
                console.log('platform is okk');
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.oneSignal.startInit(environment_1.environment.onesignal.appId, environment_1.environment.onesignal.googleProjectNumber)];
                            case 1:
                                _a.sent();
                                this.oneSignal.getIds().then(function (data) {
                                    console.log('-----------------------------------', data);
                                    localStorage.setItem('fcm', data.userId);
                                    var uid = localStorage.getItem('uid');
                                    if (uid && uid !== null && uid !== 'null') {
                                        var param = {
                                            id: uid,
                                            fcm_token: data.userId
                                        };
                                        _this.api.post('drivers/edit_profile', param).subscribe(function (data) {
                                            console.log('user info=>', data);
                                        }, function (error) {
                                            console.log(error);
                                        });
                                    }
                                });
                                this.oneSignal.enableSound(true);
                                return [4 /*yield*/, this.oneSignal.endInit()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, 1000);
                _this.nativeAudio.preloadSimple('audio', 'assets/alert.mp3').then(function (data) {
                    console.log('dupletx', data);
                }, function (error) {
                    console.log(error);
                })["catch"](function (error) {
                    console.log(error);
                });
                _this.oneSignal.handleNotificationReceived().subscribe(function (data) {
                    console.log('got order', data);
                    _this.nativeAudio.play('audio', function () { return console.log('audio is done playing'); })["catch"](function (error) { return console.log(error); });
                    _this.nativeAudio.setVolumeForComplexAsset('audio', 1);
                    _this.presentActionSheet();
                });
                _this.oneSignal.inFocusDisplaying(2);
            }
            _this.appPages = _this.util.appPage;
            console.log('%c Copyright and Good Faith Purchasers © 2020-present initappz. ', 'background: #222; color: #bada55');
            var lng = localStorage.getItem('language');
            if (!lng || lng === null) {
                _this.api.get('users/getDefaultSettings').subscribe(function (data) {
                    console.log('get default settings', data);
                    if (data && data.status === 200 && data.data) {
                        var manage = data.data.manage;
                        var language = data.data.lang;
                        if (manage && manage.length > 0) {
                            if (manage[0].app_close === 0 || manage[0].app_close === '0') {
                                _this.util.appClosed = true;
                                _this.util.appClosedMessage = manage[0].message;
                            }
                            else {
                                _this.util.appClosed = false;
                            }
                        }
                        else {
                            _this.util.appClosed = false;
                        }
                        if (language) {
                            _this.util.translations = language;
                            localStorage.setItem('language', data.data.file);
                            localStorage.setItem('language_id', data.data.langid);
                        }
                        if (data.data.lang_position) {
                            if (data.data.lang_position == "0") {
                                _this.util.direction = "rtl";
                                _this.util.cside = "left";
                            }
                            else {
                                _this.util.direction = "ltr";
                                _this.util.cside = "right";
                            }
                        }
                        var settings = data.data.settings;
                        if (settings && settings.length > 0) {
                            var info = settings[0];
                            // this.util.direction = info.appDirection;
                            // this.util.cside = info.currencySide;
                            _this.util.currecny = info.currencySymbol;
                            _this.util.logo = info.logo;
                            _this.util.twillo = info.twillo;
                            _this.util.delivery = info.delivery;
                            document.documentElement.dir = _this.util.direction;
                        }
                        else {
                            _this.util.direction = 'ltr';
                            _this.util.cside = 'right';
                            _this.util.currecny = '$';
                            document.documentElement.dir = _this.util.direction;
                        }
                        var general = data.data.general;
                        console.log('generalllll============================>', general);
                        if (general && general.length > 0) {
                            var info = general[0];
                            _this.util.general = info;
                        }
                        console.log('app is closed', _this.util.appClosed);
                    }
                    console.log(_this.util.translations);
                    console.log(_this.util.direction);
                    console.log(_this.util.cside);
                    console.log(_this.util.appClosed);
                    console.log(_this.util.appClosedMessage);
                }, function (error) {
                    console.log('default settings', error);
                });
            }
            else {
                var param = {
                    id: localStorage.getItem('language_id')
                };
                _this.api.post('users/getDefaultSettingsById', param).subscribe(function (data) {
                    console.log('get default settings by id', data);
                    if (data && data.status === 200 && data.data) {
                        var manage = data.data.manage;
                        var language = data.data.lang;
                        if (manage && manage.length > 0) {
                            if (manage[0].app_close === 0 || manage[0].app_close === '0') {
                                _this.util.appClosed = true;
                                _this.util.appClosedMessage = manage[0].message;
                            }
                            else {
                                _this.util.appClosed = false;
                            }
                        }
                        else {
                            _this.util.appClosed = false;
                        }
                        if (language) {
                            _this.util.translations = language;
                        }
                        var settings = data.data.settings;
                        console.log('-->', settings);
                        if (data.data.lang_position) {
                            if (data.data.lang_position == "0") {
                                _this.util.direction = "rtl";
                                _this.util.cside = "left";
                            }
                            else {
                                _this.util.direction = "ltr";
                                _this.util.cside = "right";
                            }
                        }
                        if (settings && settings.length > 0) {
                            var info = settings[0];
                            // this.util.direction = info.appDirection;
                            // this.util.cside = info.currencySide;
                            _this.util.currecny = info.currencySymbol;
                            _this.util.logo = info.logo;
                            _this.util.twillo = info.twillo;
                            _this.util.delivery = info.delivery;
                            document.documentElement.dir = _this.util.direction;
                            console.log('wont');
                        }
                        else {
                            _this.util.direction = 'ltr';
                            _this.util.cside = 'right';
                            _this.util.currecny = '$';
                            document.documentElement.dir = _this.util.direction;
                        }
                        var general = data.data.general;
                        console.log('generalllll============================>', general);
                        if (general && general.length > 0) {
                            var info = general[0];
                            _this.util.general = info;
                        }
                        console.log('app is closed', _this.util.appClosed);
                    }
                    console.log(_this.util.translations);
                    console.log(_this.util.direction, "cside");
                    console.log(_this.util.cside, "cside");
                    console.log(_this.util.appClosed);
                    console.log(_this.util.appClosedMessage);
                }, function (error) {
                    console.log('default settings by id', error);
                    _this.util.appClosed = false;
                    _this.util.direction = 'ltr';
                    _this.util.cside = 'right';
                    _this.util.currecny = '$';
                    document.documentElement.dir = _this.util.direction;
                });
            }
            var uid = localStorage.getItem('uid');
            if (uid && uid !== null && uid !== 'null') {
                var param = {
                    id: uid
                };
                _this.api.post('drivers/getById', param).subscribe(function (data) {
                    console.log('*******************', data);
                    if (data && data.status === 200 && data.data && data.data.length) {
                        _this.util.userInfo = data.data[0];
                    }
                }, function (error) {
                    console.log('==>>', error);
                });
            }
            _this.platform.backButton.subscribe(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log('asd', this.router.url, 'ad', this.router.isActive('/tabs/', true));
                    if (this.router.url.includes('/tabs/') || this.router.url.includes('/login')) {
                        navigator['app'].exitApp();
                    }
                    return [2 /*return*/];
                });
            }); });
        });
    };
    AppComponent.prototype.presentActionSheet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: this.util.getString('Update Status'),
                            mode: 'md',
                            buttons: [{
                                    text: this.util.getString('OK'),
                                    icon: 'volume-mute',
                                    handler: function () {
                                        console.log('Delete clicked');
                                        _this.nativeAudio.stop('audio').then(function () { return console.log('done'); }, function () { return console.log('error'); });
                                    }
                                }, {
                                    text: this.util.getString('Cancel'),
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                        _this.nativeAudio.stop('audio').then(function () { return console.log('done'); }, function () { return console.log('error'); });
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.logout = function () {
        localStorage.clear();
        this.navCtrl.navigateRoot(['/login']);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
