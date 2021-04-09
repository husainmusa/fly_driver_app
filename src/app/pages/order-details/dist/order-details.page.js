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
exports.OrderDetailsPage = void 0;
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
var moment = require("moment");
var verify_page_1 = require("../verify/verify.page");
var OrderDetailsPage = /** @class */ (function () {
    function OrderDetailsPage(route, navCtrl, util, api, iab, modalCtrl, router) {
        var _this = this;
        this.route = route;
        this.navCtrl = navCtrl;
        this.util = util;
        this.api = api;
        this.iab = iab;
        this.modalCtrl = modalCtrl;
        this.router = router;
        this.orderDetail = [];
        this.orders = [];
        this.storestatus = "false";
        this.orderStatus = [];
        this.driver_statuss = "false";
        this.route.queryParams.subscribe(function (data) {
            console.log(data);
            _this.id = data.id;
            _this.itemStatus = data.itemStatus;
        });
    }
    OrderDetailsPage.prototype.ionViewWillEnter = function () {
        this.getOrderDetail();
    };
    OrderDetailsPage.prototype.getOrderDetail = function () {
        if (this.id) {
            this.driver_status(this.id);
            console.log("item Status", this.itemStatus);
            this.loaded = false;
            this.getOrder();
            console.log('userdinfo', this.util.userInfo);
            if (this.util.userInfo && this.util.userInfo.first_name) {
                this.statusText = ' by driver ' + this.util.userInfo.first_name + ' ' + this.util.userInfo.last_name;
            }
        }
        else {
            this.navCtrl.back();
        }
    };
    OrderDetailsPage.prototype.driver_status = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var param;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = {
                            id: id
                        };
                        console.log(param, "param");
                        return [4 /*yield*/, this.api.post('acceptedorders/getByOrderId', param).subscribe(function (data) {
                                console.log("driver_status data", data.data[0]['status'], id);
                                _this.driver_statuss = data.data[0]['status'];
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderDetailsPage.prototype.accepted = function (order_id, status) {
        var _this = this;
        var orderParam = {
            id: order_id
        };
        var driver_id = localStorage.getItem('uid');
        this.api.post('acceptedorders/getByOrderId', orderParam).subscribe(function (orderdata) {
            if (orderdata && orderdata.status === 200 && orderdata.data.length > 0) {
                orderdata.data.forEach(function (orderElement) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (orderElement.driver_id == driver_id) {
                            this.acceptNotify = "You have Already accepted";
                        }
                        else {
                            this.acceptNotify = "Another Driver Already accepted";
                        }
                        return [2 /*return*/];
                    });
                }); });
            }
            else {
                console.log(order_id, "order id");
                var param = {
                    driver_id: localStorage.getItem('uid'),
                    order_id: order_id,
                    date_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                    status: "accepted"
                };
                console.log(param, "param");
                _this.api.post('acceptedorders/save', param).subscribe(function (data) {
                    console.log("accepted data", data);
                    console.log("accepted status", data.data[0].status);
                    if (data.data[0].status == "accepted") {
                        _this.acceptNotify = "You have successfully accepted the order";
                        // const navData: NavigationExtras = {
                        //   queryParams: {
                        //     id: order_id,
                        //     itemStatus : JSON.parse(status)[0].status
                        //   }
                        // };
                        // this.navCtrl.navigateForward('tabs/tab2');
                        _this.ionViewWillEnter();
                    }
                });
            }
        });
    };
    OrderDetailsPage.prototype.degreesToRadians = function (degrees) {
        return degrees * Math.PI / 180;
    };
    OrderDetailsPage.prototype.distanceInKmBetweenEarthCoordinates = function (lat1, lon1, lat2, lon2) {
        console.log(lat1, lon1, lat2, lon2);
        var earthRadiusKm = 6371;
        var dLat = this.degreesToRadians(lat2 - lat1);
        var dLon = this.degreesToRadians(lon2 - lon1);
        lat1 = this.degreesToRadians(lat1);
        lat2 = this.degreesToRadians(lat2);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadiusKm * c;
    };
    OrderDetailsPage.prototype.getOrder = function () {
        var _this = this;
        var param = {
            id: this.id
        };
        this.api.post('orders/getById', param).subscribe(function (data) {
            console.log(data);
            _this.loaded = true;
            if (data && data.status === 200 && data.data.length > 0) {
                var info = data.data[0];
                _this.grandTotal = info.grand_total;
                console.log(info);
                _this.orderDetail = JSON.parse(info.notes);
                var order = JSON.parse(info.orders);
                // this.orders = order.filter(x => x.store_id === info.assignee);
                var assinee = JSON.parse(info.assignee);
                console.log('assinee', assinee);
                for (var i = 0; i < assinee[0].driver.length; i++) {
                    if (assinee[0].driver[i] == localStorage.getItem('uid')) {
                        _this.storestatus = "true";
                        _this.assignee = assinee[0].assignee;
                    }
                }
                if (_this.storestatus == "true") {
                    // console.log("inside");
                    // const storeInfo = assinee.filter( x => x.driver === localStorage.getItem('uid'));
                    // console.log('storeinfo===>>', storeInfo);
                    _this.storeId = _this.assignee;
                    _this.orders = order.filter(function (x) { return x.store_id === _this.storeId; });
                    var total_1 = 0;
                    _this.orders.forEach(function (element) {
                        var price = 0;
                        if (element.variations && element.variations !== '' && typeof element.variations === 'string') {
                            console.log('strings', element.id);
                            element.variations = JSON.parse(element.variations);
                            console.log(element['variant']);
                            if (element["variant"] === undefined) {
                                element['variant'] = 0;
                            }
                        }
                        if (element && element.discount === '0') {
                            if (element.size === '1' || element.size === 1) {
                                if (element.variations[0].items[element.variant].discount && element.variations[0].items[element.variant].discount !== 0) {
                                    price = price + (parseFloat(element.variations[0].items[element.variant].discount) * element.quantiy);
                                }
                                else {
                                    price = price + (parseFloat(element.variations[0].items[element.variant].price) * element.quantiy);
                                }
                            }
                            else {
                                price = price + (parseFloat(element.original_price) * element.quantiy);
                            }
                        }
                        else {
                            if (element.size === '1' || element.size === 1) {
                                if (element.variations[0].items[element.variant].discount && element.variations[0].items[element.variant].discount !== 0) {
                                    price = price + (parseFloat(element.variations[0].items[element.variant].discount) * element.quantiy);
                                }
                                else {
                                    price = price + (parseFloat(element.variations[0].items[element.variant].price) * element.quantiy);
                                }
                            }
                            else {
                                price = price + (parseFloat(element.sell_price) * element.quantiy);
                            }
                        }
                        console.log('PRICEEE-->', price);
                        console.log(total_1, price);
                        total_1 = total_1 + price;
                        console.log("total", total_1);
                        console.log("price", price);
                    });
                    console.log('==>', total_1);
                    // this.grandTotal = total.toFixed(2);
                    var storeStatus = JSON.parse(info.status);
                    _this.orderStatus = storeStatus;
                    var orderStatus = storeStatus.filter(function (x) { return x.id === _this.assignee; });
                    _this.status = orderStatus[0].status;
                    console.log('status-------------------->', _this.status);
                    _this.getStoreInfo();
                }
                // this.storeId = info.assignee;
                console.log('order=====>>', _this.orders);
                // this.status = info.status;
                _this.datetime = moment(info.date_time).format('dddd, MMMM Do YYYY');
                _this.payMethod = info.paid_method === 'cod' ? 'COD' : 'PAID';
                _this.orderAt = info.order_to;
                if (info.uid) {
                    var userinfo = {
                        id: info.uid
                    };
                    _this.api.post('users/getById', userinfo).subscribe(function (data) {
                        console.log('user info=>', data);
                        if (data && data.status === 200 && data.data && data.data.length) {
                            _this.userInfo = data.data[0];
                            console.log(_this.userInfo);
                        }
                    }, function (error) {
                        console.log(error);
                    });
                }
                if (_this.orderAt === 'home') {
                    var address = JSON.parse(info.address);
                    console.log('---address', address);
                    if (address && address.address) {
                        _this.userLat = address.lat;
                        _this.userLng = address.lng;
                        _this.address = address.landmark + ' ' + address.house + ' ' + address.address + ' ' + address.pincode;
                        // this.getDrivers();
                    }
                }
            }
            else {
                _this.util.errorToast(_this.util.getString('Something went wrong'));
            }
        }, function (error) {
            console.log(error);
            _this.loaded = true;
            _this.util.errorToast(_this.util.getString('Something went wrong'));
        });
    };
    OrderDetailsPage.prototype.direction = function (type) {
        console.log(type);
        if (type === 'store') {
            var navData = {
                queryParams: {
                    lat: this.storeInfo.lat,
                    lng: this.storeInfo.lng,
                    who: type,
                    id: this.storeInfo.uid,
                    orderId: this.id,
                    grandTotal: this.grandTotal,
                    payMethod: this.payMethod,
                    address: ''
                }
            };
            this.router.navigate(['direction'], navData);
        }
        else {
            var navData = {
                queryParams: {
                    lat: this.userLat,
                    lng: this.userLng,
                    who: type,
                    id: this.storeInfo.uid,
                    orderId: this.id,
                    grandTotal: this.grandTotal,
                    payMethod: this.payMethod,
                    address: this.address
                }
            };
            this.router.navigate(['direction'], navData);
        }
    };
    OrderDetailsPage.prototype.getStoreInfo = function () {
        var _this = this;
        console.log('getStoreInfo');
        var param = {
            id: this.storeId
        };
        this.api.post('stores/getByUid', param).subscribe(function (data) {
            console.log(data);
            if (data && data.status === 200 && data.data.length > 0) {
                _this.storeInfo = data.data[0];
                console.log('store info=====>>', _this.storeInfo);
            }
        }, function (error) {
            console.log(error);
            _this.util.errorToast(_this.util.getString('Something went wrong'));
        });
    };
    OrderDetailsPage.prototype.ngOnInit = function () {
    };
    OrderDetailsPage.prototype.back = function () {
        this.util.publishNewOrder();
        this.navCtrl.navigateForward('/tabs/tab1');
    };
    OrderDetailsPage.prototype.call = function () {
        if (this.userInfo.mobile) {
            // window.open('tel:' + this.userInfo.mobile);
            this.iab.create('tel:' + this.userInfo.mobile, '_blank');
        }
        else {
            this.util.errorToast(this.util.getString('Number not found'));
        }
    };
    OrderDetailsPage.prototype.email = function () {
        if (this.userInfo.email) {
            // window.open('mailto:' + this.userInfo.email);
            this.iab.create('mailto:' + this.userInfo.email, '_blank');
        }
        else {
            this.util.errorToast(this.util.getString('Email not found'));
        }
    };
    OrderDetailsPage.prototype.printOrder = function () {
        console.log('print order');
    };
    OrderDetailsPage.prototype.updateDriver = function (uid, value) {
        var param = {
            id: uid,
            current: value
        };
        console.log('param', param);
        this.api.post('drivers/edit_profile', param).subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    OrderDetailsPage.prototype.sendNotification = function (value) {
        if (this.userInfo && this.userInfo.fcm_token) {
            this.api.sendNotification('Your order #' + this.id + ' ' + value, 'Order ' + value, this.userInfo.fcm_token)
                .subscribe(function (data) {
                console.log('onesignal', data);
            }, function (error) {
                console.log('onesignal error', error);
            });
        }
    };
    OrderDetailsPage.prototype.openModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: verify_page_1.VerifyPage,
                            componentProps: { mobile: this.userInfo.mobile }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            if (data && data.role === 'success') {
                                console.log('normal delivery');
                                _this.orderStatus.forEach(function (element) {
                                    if (element.id === _this.storeId) {
                                        element.status = _this.changeStatusOrder;
                                    }
                                });
                                if (_this.changeStatusOrder !== 'ongoing' && _this.orderAt === 'home') {
                                    // release driver from this order
                                    console.log('relase driver');
                                    var newOrderNotes = {
                                        status: 1,
                                        value: 'Order ' + _this.changeStatusOrder + _this.statusText,
                                        time: moment().format('lll')
                                    };
                                    _this.orderDetail.push(newOrderNotes);
                                    _this.util.show();
                                    var param = {
                                        id: _this.id,
                                        notes: JSON.stringify(_this.orderDetail),
                                        status: JSON.stringify(_this.orderStatus)
                                    };
                                    _this.api.post('orders/editList', param).subscribe(function (data) {
                                        console.log('order', data);
                                        _this.util.hide();
                                        _this.updateDriver(localStorage.getItem('uid'), 'active');
                                        if (data && data.status === 200) {
                                            _this.sendNotification(_this.changeStatusOrder);
                                            _this.back();
                                        }
                                        else {
                                            _this.util.errorToast(_this.util.getString('Something went wrong'));
                                        }
                                    }, function (error) {
                                        console.log(error);
                                        _this.util.hide();
                                        _this.util.errorToast(_this.util.getString('Something went wrong'));
                                    });
                                }
                                else {
                                    var newOrderNotes = {
                                        status: 1,
                                        value: 'Order ' + _this.changeStatusOrder + _this.statusText,
                                        time: moment().format('lll')
                                    };
                                    _this.orderDetail.push(newOrderNotes);
                                    _this.util.show();
                                    var param = {
                                        id: _this.id,
                                        notes: JSON.stringify(_this.orderDetail),
                                        status: JSON.stringify(_this.orderStatus)
                                    };
                                    _this.api.post('orders/editList', param).subscribe(function (data) {
                                        console.log('order', data);
                                        _this.util.hide();
                                        if (data && data.status === 200) {
                                            _this.sendNotification(_this.changeStatusOrder);
                                            _this.back();
                                        }
                                        else {
                                            _this.util.errorToast(_this.util.getString('Something went wrong'));
                                        }
                                    }, function (error) {
                                        console.log(error);
                                        _this.util.hide();
                                        _this.util.errorToast(_this.util.getString('Something went wrong'));
                                    });
                                }
                            }
                        });
                        modal.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderDetailsPage.prototype.changeOrderStatus = function () {
        var _this = this;
        console.log(this.changeStatusOrder);
        console.log(this.orderDetail);
        if (this.changeStatusOrder) {
            if (this.changeStatusOrder === 'delivered' && this.util.delivery === '1') {
                console.log('do delivery', this.userInfo.mobile);
                this.openModal();
            }
            else {
                console.log('normal delivery');
                this.orderStatus.forEach(function (element) {
                    if (element.id === _this.storeId) {
                        element.status = _this.changeStatusOrder;
                    }
                });
                if (this.changeStatusOrder !== 'ongoing' && this.orderAt === 'home') {
                    // release driver from this order
                    console.log('relase driver');
                    var newOrderNotes = {
                        status: 1,
                        value: 'Order ' + this.changeStatusOrder + this.statusText,
                        time: moment().format('lll')
                    };
                    this.orderDetail.push(newOrderNotes);
                    this.util.show();
                    var param = {
                        id: this.id,
                        notes: JSON.stringify(this.orderDetail),
                        status: JSON.stringify(this.orderStatus)
                    };
                    this.api.post('orders/editList', param).subscribe(function (data) {
                        console.log('order', data);
                        _this.util.hide();
                        _this.updateDriver(localStorage.getItem('uid'), 'active');
                        if (data && data.status === 200) {
                            _this.sendNotification(_this.changeStatusOrder);
                            _this.back();
                        }
                        else {
                            _this.util.errorToast(_this.util.getString('Something went wrong'));
                        }
                    }, function (error) {
                        console.log(error);
                        _this.util.hide();
                        _this.util.errorToast(_this.util.getString('Something went wrong'));
                    });
                }
                else {
                    var newOrderNotes = {
                        status: 1,
                        value: 'Order ' + this.changeStatusOrder + this.statusText,
                        time: moment().format('lll')
                    };
                    this.orderDetail.push(newOrderNotes);
                    this.util.show();
                    var param = {
                        id: this.id,
                        notes: JSON.stringify(this.orderDetail),
                        status: JSON.stringify(this.orderStatus)
                    };
                    this.api.post('orders/editList', param).subscribe(function (data) {
                        console.log('order', data);
                        _this.util.hide();
                        if (data && data.status === 200) {
                            _this.sendNotification(_this.changeStatusOrder);
                            _this.back();
                        }
                        else {
                            _this.util.errorToast(_this.util.getString('Something went wrong'));
                        }
                    }, function (error) {
                        console.log(error);
                        _this.util.hide();
                        _this.util.errorToast(_this.util.getString('Something went wrong'));
                    });
                }
            }
        }
    };
    OrderDetailsPage.prototype.contact = function () {
        this.iab.create('tel:' + this.storeInfo.mobile, '_blank');
    };
    OrderDetailsPage = __decorate([
        core_1.Component({
            selector: 'app-order-details',
            templateUrl: './order-details.page.html',
            styleUrls: ['./order-details.page.scss']
        })
    ], OrderDetailsPage);
    return OrderDetailsPage;
}());
exports.OrderDetailsPage = OrderDetailsPage;
