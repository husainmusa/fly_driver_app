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
exports.UtilService = void 0;
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
var rxjs_1 = require("rxjs");
var UtilService = /** @class */ (function () {
    function UtilService(loadingCtrl, alertCtrl, toastCtrl, router, navCtrl, menuCtrl, storage) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.router = router;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.storage = storage;
        this.isLoading = false;
        this.address = new rxjs_1.Subject();
        this.coupon = new rxjs_1.Subject();
        this.review = new rxjs_1.Subject();
        this.changeLocation = new rxjs_1.Subject();
        this.loggedIn = new rxjs_1.Subject();
        this.profile = new rxjs_1.Subject();
        this.newOrder = new rxjs_1.Subject();
        this.appPage = [];
        this.appClosedMessage = '';
        this.translations = [];
        this.selectedCity = new rxjs_1.Subject();
        this.isLoggedIn = false;
        this.appPage = [
            {
                title: 'Home',
                url: 'tabs/tab1',
                icon: 'assets/sidemenu/home.png',
                icon2: 'assets/sidemenu/home2.png',
                icn: 'home-outline'
            },
            {
                title: 'History',
                url: 'tabs/tab1',
                icon: 'assets/sidemenu/home.png',
                icon2: 'assets/sidemenu/home2.png',
                icn: 'document-text-outline'
            },
            {
                title: 'Profile',
                url: 'tabs/tab2/edit-profile',
                icon: 'assets/sidemenu/user.png',
                icon2: 'assets/sidemenu/user2.png',
                icn: 'person-outline'
            },
            {
                title: 'Language',
                url: 'tabs/tab2/languages',
                icon: 'assets/sidemenu/language.png',
                icon2: 'assets/sidemenu/language2.png',
                icn: 'language-outline'
            },
            {
                title: 'About',
                url: 'tabs/tab2/about',
                icon: 'assets/sidemenu/info.png',
                icon2: 'assets/sidemenu/info2.png',
                icn: 'alert-circle-outline'
            },
            {
                title: 'Contact us',
                url: 'tabs/tab2/contact',
                icon: 'assets/sidemenu/contact.png',
                icon2: 'assets/sidemenu/contact2.png',
                icn: 'mail-outline'
            },
            {
                title: 'FAQs',
                url: 'tabs/tab2/faqs',
                icon: 'assets/sidemenu/contact.png',
                icon2: 'assets/sidemenu/contact2.png',
                icn: 'flag-outline'
            },
            {
                title: 'Help',
                url: 'tabs/tab2/help',
                icon: 'assets/sidemenu/contact.png',
                icon2: 'assets/sidemenu/contact2.png',
                icn: 'help-circle-outline'
            },
        ];
    }
    UtilService.prototype.publishAddress = function (data) {
        this.address.next(data);
    };
    UtilService.prototype.publishNewOrder = function () {
        this.newOrder.next();
    };
    UtilService.prototype.subscribeOrder = function () {
        return this.newOrder;
    };
    UtilService.prototype.publishReview = function (data) {
        this.review.next(data);
    };
    UtilService.prototype.publishProfile = function (data) {
        this.profile.next(data);
    };
    UtilService.prototype.observProfile = function () {
        return this.profile;
    };
    UtilService.prototype.getReviewObservable = function () {
        return this.review;
    };
    UtilService.prototype.publishLocation = function (data) {
        this.changeLocation.next(data);
    };
    UtilService.prototype.subscribeLocation = function () {
        return this.changeLocation;
    };
    UtilService.prototype.publishLoggedIn = function (data) {
        this.loggedIn.next(data);
    };
    UtilService.prototype.subscribeLoggedIn = function () {
        return this.loggedIn;
    };
    UtilService.prototype.publishCity = function (data) {
        this.selectedCity.next(data);
    };
    UtilService.prototype.subscribeCity = function () {
        return this.selectedCity;
    };
    UtilService.prototype.getObservable = function () {
        return this.address;
    };
    UtilService.prototype.publishCoupon = function (data) {
        this.coupon.next(data);
    };
    UtilService.prototype.getCouponObservable = function () {
        return this.coupon;
    };
    UtilService.prototype.setOrders = function (data) {
        this.orders = null;
        this.orders = data;
    };
    UtilService.prototype.openMenu = function () {
        this.menuCtrl.toggle();
    };
    UtilService.prototype.getKeys = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get(key).then(function (data) {
                resolve(data);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    UtilService.prototype.clearKeys = function (key) {
        this.storage.remove(key);
    };
    UtilService.prototype.setKeys = function (key, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.set(key, value).then(function (data) {
                resolve(data);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    UtilService.prototype.gerOrder = function () {
        return this.orders;
    };
    UtilService.prototype.show = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        return [4 /*yield*/, this.loadingCtrl.create({
                                message: msg,
                                spinner: 'bubbles'
                            }).then(function (a) {
                                a.present().then(function () {
                                    //console.log('presented');
                                    if (!_this.isLoading) {
                                        a.dismiss().then(function () { return console.log('abort presenting'); });
                                    }
                                });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UtilService.prototype.hide = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = false;
                        return [4 /*yield*/, this.loadingCtrl.dismiss().then(function () { return console.log('dismissed'); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
      Show Warning Alert Message
      param : msg = message to display
      Call this method to show Warning Alert,
      */
    UtilService.prototype.showWarningAlert = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Warning',
                            message: msg,
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UtilService.prototype.showSimpleAlert = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: '',
                            message: msg,
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
     Show Error Alert Message
     param : msg = message to display
     Call this method to show Error Alert,
     */
    UtilService.prototype.showErrorAlert = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Error',
                            message: msg,
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
       param : email = email to verify
       Call this method to get verify email
       */
    UtilService.prototype.getEmailFilter = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var emailfilter, alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
                        if (!!(emailfilter.test(email))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Warning',
                                message: 'Please enter valid email',
                                buttons: ['OK']
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/, true];
                }
            });
        });
    };
    /*
      Show Toast Message on Screen
       param : msg = message to display, color= background
       color of toast example dark,danger,light. position  = position of message example top,bottom
       Call this method to show toast message
       */
    UtilService.prototype.showToast = function (msg, colors, positon) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: msg,
                            duration: 2000,
                            color: colors,
                            position: positon
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    UtilService.prototype.shoNotification = function (msg, colors, positon) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: msg,
                            duration: 4000,
                            color: colors,
                            position: positon,
                            buttons: [
                                {
                                    text: 'Ok',
                                    role: 'cancel',
                                    handler: function () {
                                        // console.log('Cancel clicked');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    UtilService.prototype.errorToast = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: msg,
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    UtilService.prototype.apiErrorHandler = function (err) {
        // console.log('Error got in service =>', err)
        if (err.status === -1) {
            this.showErrorAlert('Failed To Connect With Server');
        }
        else if (err.status === 401) {
            this.showErrorAlert('Unauthorized Request!');
            this.navCtrl.navigateRoot('/login');
        }
        else if (err.status === 500) {
            this.showErrorAlert('Somethimg Went Wrong..');
        }
    };
    UtilService.prototype.makeid = function (length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    UtilService.prototype.getString = function (str) {
        if (this.translations[str]) {
            return this.translations[str];
        }
        return str;
    };
    UtilService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UtilService);
    return UtilService;
}());
exports.UtilService = UtilService;
