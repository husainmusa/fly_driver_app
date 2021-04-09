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
exports.HomePage = void 0;
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
var HomePage = /** @class */ (function () {
    function HomePage(api, util, router, zone, navCtrl) {
        this.api = api;
        this.util = util;
        this.router = router;
        this.zone = zone;
        this.navCtrl = navCtrl;
        this.segId = 1;
        this.orders = [];
        this.dummy = Array(50);
        this.assignee_id = [];
        this.driver_statuss = "";
        this.driver_statuss_id = "";
    }
    HomePage.prototype.ngOnInit = function () {
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.getMyOrder();
    };
    HomePage.prototype.getMyOrder = function () {
        var _this = this;
        this.dummy = Array(50);
        this.oldOrders = [];
        this.orders = [];
        var param = {
            id: localStorage.getItem('uid')
        };
        var driver_id = localStorage.getItem('uid');
        // this.api.getAllOrders('orders/getByDriverId', param);
        this.api.post('orders/getByDriverId', param).subscribe(function (data) {
            console.log(data, "observable data");
            _this.dummy = [];
            if (data && data.status === 200 && data.data.length > 0) {
                data.data.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                    var orderParam;
                    var _this = this;
                    return __generator(this, function (_a) {
                        orderParam = {
                            id: element.id
                        };
                        this.api.post('acceptedorders/getByOrderId', orderParam).subscribe(function (accepteddata) {
                            console.log("accepted driver data", accepteddata.data);
                            if (accepteddata && accepteddata.status === 200 && accepteddata.data.length > 0) {
                                accepteddata.data.forEach(function (acceptedElement) { return __awaiter(_this, void 0, void 0, function () {
                                    var assinee, assinee_id, storeInfo_1, storeStatus, orderStatus, stat;
                                    return __generator(this, function (_a) {
                                        console.log("true", acceptedElement);
                                        if (acceptedElement.driver_id == driver_id) {
                                            if ((function (x) { try {
                                                JSON.parse(x);
                                                return true;
                                            }
                                            catch (e) {
                                                return false;
                                            } })(element.orders)) {
                                                element.orders = JSON.parse(element.orders);
                                                element.date_time = moment(element.date_time).format('dddd, MMMM Do YYYY');
                                                if ((function (x) { try {
                                                    JSON.parse(x);
                                                    return true;
                                                }
                                                catch (e) {
                                                    return false;
                                                } })(element.status)) {
                                                    if (element.assignee != '') {
                                                        assinee = JSON.parse(element.assignee);
                                                        assinee_id = assinee[0].driver.split(',');
                                                        storeInfo_1 = JSON.parse(element.assignee);
                                                        console.log(storeInfo_1, "Store info");
                                                        storeStatus = JSON.parse(element.status);
                                                        console.log('storestatus>', storeStatus);
                                                        orderStatus = storeStatus.filter(function (x) { return x.id === storeInfo_1[0].assignee; });
                                                        console.log('orderStatus=?', orderStatus);
                                                        if (orderStatus && orderStatus.length) {
                                                            element.orders.forEach(function (order) {
                                                                console.log(element.id, '=>', order.variations);
                                                                if (order.variations && order.variations !== '' && typeof order.variations === 'string') {
                                                                    console.log('strings', element.id);
                                                                    order.variations = JSON.parse(order.variations);
                                                                    console.log(order['variant']);
                                                                    if (order["variant"] === undefined) {
                                                                        order['variant'] = 0;
                                                                    }
                                                                }
                                                            });
                                                            stat = orderStatus[0].status;
                                                            console.log('orderstatus===>', stat);
                                                            element['orderStatus'] = stat;
                                                            element.orders = element.orders.filter(function (x) { return x.store_id === storeInfo_1[0].assignee; });
                                                            console.log("orders pushed", "starting", this.orders);
                                                            console.log("orders pushed", "starting", this.oldOrders);
                                                            if ((stat === 'delivered' || stat === 'cancelled' || stat === 'rejected' || stat === 'refund') && acceptedElement.status == "accepted") {
                                                                element['driverAccepted'] = "true";
                                                                this.oldOrders.push(element);
                                                            }
                                                            else {
                                                                this.orders.push(element);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        return [2 /*return*/];
                                    });
                                }); });
                            }
                            else {
                                console.log("element", element.assignee);
                                if ((function (x) { try {
                                    JSON.parse(x);
                                    return true;
                                }
                                catch (e) {
                                    return false;
                                } })(element.orders)) {
                                    element.orders = JSON.parse(element.orders);
                                    element.date_time = moment(element.date_time).format('dddd, MMMM Do YYYY');
                                    if ((function (x) { try {
                                        JSON.parse(x);
                                        return true;
                                    }
                                    catch (e) {
                                        return false;
                                    } })(element.status)) {
                                        if (element.assignee != '') {
                                            var assinee = JSON.parse(element.assignee);
                                            var assinee_id = assinee[0].driver.split(',');
                                            console.log("asignee id", assinee_id);
                                            for (var i = 0; i < assinee_id.length; i++) {
                                                console.log("asignee id inside", assinee_id[i]);
                                                if (driver_id == assinee_id[i]) {
                                                    _this.driver_assigned = "true";
                                                }
                                            }
                                            if (_this.driver_assigned == "true") {
                                                var storeInfo_2 = JSON.parse(element.assignee);
                                                console.log(storeInfo_2, "Store info");
                                                var storeStatus = JSON.parse(element.status);
                                                console.log('storestatus>', storeStatus);
                                                var orderStatus = storeStatus.filter(function (x) { return x.id === storeInfo_2[0].assignee; });
                                                console.log('orderStatus=?', orderStatus);
                                                if (orderStatus && orderStatus.length) {
                                                    element.orders.forEach(function (order) {
                                                        console.log(element.id, '=>', order.variations);
                                                        if (order.variations && order.variations !== '' && typeof order.variations === 'string') {
                                                            console.log('strings', element.id);
                                                            order.variations = JSON.parse(order.variations);
                                                            console.log(order['variant']);
                                                            if (order["variant"] === undefined) {
                                                                order['variant'] = 0;
                                                            }
                                                        }
                                                    });
                                                    var stat = orderStatus[0].status;
                                                    console.log('orderstatus===>', stat);
                                                    element['orderStatus'] = stat;
                                                    element.orders = element.orders.filter(function (x) { return x.store_id === storeInfo_2[0].assignee; });
                                                    console.log("orders pushed", "starting", _this.orders);
                                                    console.log("orders pushed", "starting", _this.oldOrders);
                                                    if (stat === 'delivered' || stat === 'cancelled' || stat === 'rejected' || stat === 'refund') {
                                                        _this.oldOrders.push(element);
                                                        console.log("oldorders pushed", stat, _this.oldOrders);
                                                    }
                                                    else {
                                                        element['driverAccepted'] = "false";
                                                        _this.orders.push(element);
                                                        console.log("orders pushed", stat, _this.orders);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
            }
        }, function (error) {
            console.log(error);
            _this.dummy = [];
            _this.util.errorToast(_this.util.getString('Something went wrong'));
        });
    };
    HomePage.prototype.accepted = function (order_id, status) {
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
    HomePage.prototype.doRefresh = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.getMyOrder();
            event.target.complete();
        }, 1500);
    };
    HomePage.prototype.goToOrder = function (ids) {
        var navData = {
            queryParams: {
                id: ids.id,
                itemStatus: JSON.parse(ids.status)[0].status
            }
        };
        this.router.navigate(['/order-details'], navData);
    };
    HomePage.prototype.driver_status = function (id) {
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
                        return [2 /*return*/, this.driver_statuss];
                }
            });
        });
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss']
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
