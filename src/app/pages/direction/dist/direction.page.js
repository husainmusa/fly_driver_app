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
exports.DirectionPage = void 0;
var core_1 = require("@angular/core");
var DirectionPage = /** @class */ (function () {
    function DirectionPage(api, util, route, navCtrl, iab, platform, androidPermissions, geolocation, alertController) {
        var _this = this;
        this.api = api;
        this.util = util;
        this.route = route;
        this.navCtrl = navCtrl;
        this.iab = iab;
        this.platform = platform;
        this.androidPermissions = androidPermissions;
        this.geolocation = geolocation;
        this.alertController = alertController;
        this.route.queryParams.subscribe(function (data) {
            console.log(data);
            if (data && data.id && data.lat && data.lng && data.who) {
                _this.uid = data.id;
                _this.orderId = data.orderId;
                _this.who = data.who;
                _this.grandTotal = data.grandTotal;
                _this.payMethod = data.payMethod;
                _this.oppLng = parseFloat(data.lat);
                _this.oppLng = parseFloat(data.lng);
                if (_this.who === 'store') {
                    _this.oppLat = parseFloat(data.lat);
                    _this.oppLng = parseFloat(data.lng);
                    var param = {
                        id: _this.uid
                    };
                    _this.api.post('stores/getByUid', param).subscribe(function (data) {
                        console.log('*******************', data);
                        if (data && data.status === 200 && data.data && data.data.length) {
                            _this.oppLng = parseFloat(data.data[0].lat);
                            _this.oppLng = parseFloat(data.data[0].lng);
                            _this.storeInfo = data.data[0];
                            _this.getMyLocation();
                        }
                    }, function (error) {
                        console.log(error);
                    });
                }
                else {
                    _this.oppLat = parseFloat(data.lat);
                    _this.oppLng = parseFloat(data.lng);
                    _this.userAddress = data.address;
                    var param = {
                        id: _this.uid
                    };
                    _this.api.post('users/getById', param).subscribe(function (data) {
                        console.log('user info=>', data);
                        if (data && data.status === 200 && data.data && data.data.length) {
                            _this.userInfo = data.data[0];
                        }
                    }, function (error) {
                        console.log(error);
                    });
                    _this.getMyLocation();
                }
            }
            else {
                _this.navCtrl.back();
            }
        });
    }
    DirectionPage.prototype.callUser = function () {
        this.iab.create('tel:' + this.userInfo.mobile, '_blank');
    };
    DirectionPage.prototype.callStore = function () {
        this.iab.create('tel:' + this.storeInfo.mobile, '_blank');
    };
    DirectionPage.prototype.getMyLocation = function () {
        var _this = this;
        console.log("inside getMyLocation");
        this.platform.ready().then(function () {
            if (_this.platform.is('android')) {
                _this.androidPermissions.checkPermission(_this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(function (result) { return console.log('Has permission?', result.hasPermission); }, function (err) { return _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION); });
                _this.grantRequest();
            }
            else if (_this.platform.is('ios')) {
                _this.grantRequest();
            }
            else {
                console.log("not in listed device device");
                _this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 10000, enableHighAccuracy: true }).then(function (resp) {
                    if (resp) {
                        console.log('resp', resp);
                        _this.myLat = resp.coords.latitude;
                        _this.myLng = resp.coords.longitude;
                        _this.loadMap(_this.myLat, _this.myLng, _this.oppLat, _this.oppLng);
                    }
                })["catch"](function (error) {
                    console.log(error);
                    _this.grantRequest();
                });
                var watch = _this.geolocation.watchPosition();
                watch.subscribe(function (data) {
                    if (data && data.coords) {
                        console.log('update', data.coords);
                        _this.myLat = data.coords.latitude;
                        _this.myLng = data.coords.longitude;
                    }
                });
            }
        });
    };
    DirectionPage.prototype.grantRequest = function () {
        var _this = this;
        console.log("inside grantRequest");
        this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 10000, enableHighAccuracy: true }).then(function (resp) {
            if (resp) {
                console.log('resp 1', resp);
                _this.myLat = resp.coords.latitude;
                _this.myLng = resp.coords.longitude;
                _this.loadMap(_this.myLat, _this.myLng, _this.oppLat, _this.oppLng);
            }
        })["catch"](function (error) {
            console.log(error);
            console.log('ASK Permission');
            if (_this.platform.is('ios')) {
                _this.iOSAlert();
            }
            else {
                _this.presentAlertConfirm();
            }
        });
        var watch = this.geolocation.watchPosition();
        watch.subscribe(function (data) {
            if (data && data.coords) {
                console.log('update', data.coords);
                _this.myLat = data.coords.latitude;
                _this.myLng = data.coords.longitude;
            }
        });
    };
    DirectionPage.prototype.iOSAlert = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Error',
                            subHeader: 'Location error',
                            message: 'Please Enable Location Service from settings for best experience',
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
    DirectionPage.prototype.presentAlertConfirm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Alert',
                            message: 'Please Enable Location Service for best experience',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Okay',
                                    handler: function () {
                                        console.log('Confirm Okay');
                                        _this.askPermission();
                                    }
                                }
                            ]
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
    DirectionPage.prototype.askPermission = function () {
        this.getMyLocation();
    };
    DirectionPage.prototype.loadMap = function (latOri, lngOri, latDest, lngDest) {
        var _this = this;
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay = new google.maps.DirectionsRenderer();
        var bounds = new google.maps.LatLngBounds;
        var origin1 = { lat: parseFloat(latOri), lng: parseFloat(lngOri) };
        var destinationA = { lat: latDest, lng: lngDest };
        var maps = new google.maps.Map(this.mapElement.nativeElement, {
            center: { lat: latOri, lng: lngOri },
            disableDefaultUI: true,
            zoom: 100
        });
        var custPos = new google.maps.LatLng(latOri, lngOri);
        var restPos = new google.maps.LatLng(latDest, lngDest);
        var logo = {
            url: 'assets/marker.png',
            scaledSize: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0) // anchor
        };
        var marker = new google.maps.Marker({
            map: maps,
            position: custPos,
            animation: google.maps.Animation.DROP,
            icon: logo
        });
        var markerCust = new google.maps.Marker({
            map: maps,
            position: restPos,
            animation: google.maps.Animation.DROP
        });
        marker.setMap(maps);
        markerCust.setMap(maps);
        directionsDisplay.setMap(maps);
        // directionsDisplay.setOptions({ suppressMarkers: true });
        directionsDisplay.setOptions({
            polylineOptions: {
                strokeWeight: 4,
                strokeOpacity: 1,
                strokeColor: '#44C261'
            },
            suppressMarkers: true
        });
        var geocoder = new google.maps.Geocoder;
        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
            origins: [origin1],
            destinations: [destinationA],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function (response, status) {
            if (status !== 'OK') {
                alert('Error was: ' + status);
            }
            else {
                var originList = response.originAddresses;
                var destinationList = response.destinationAddresses;
                var showGeocodedAddressOnMap = function (asDestination) {
                    return function (results, status) {
                        if (status === 'OK') {
                            maps.fitBounds(bounds.extend(results[0].geometry.location));
                        }
                        else {
                            alert('Geocode was not successful due to: ' + status);
                        }
                    };
                };
                directionsService.route({
                    origin: origin1,
                    destination: destinationA,
                    travelMode: 'DRIVING'
                }, function (response, status) {
                    if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                    }
                    else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
                for (var i = 0; i < originList.length; i++) {
                    var results = response.rows[i].elements;
                    geocoder.geocode({ 'address': originList[i] }, showGeocodedAddressOnMap(false));
                    for (var j = 0; j < results.length; j++) {
                        geocoder.geocode({ 'address': destinationList[j] }, showGeocodedAddressOnMap(true));
                    }
                }
            }
        });
        this.interval = setInterval(function () {
            var param = {
                lat: _this.myLat,
                lng: _this.myLng,
                id: localStorage.getItem('uid')
            };
            _this.api.post('drivers/edit_profile', param).subscribe(function (data) {
                console.log(data);
                _this.changeMyMarker(marker, maps);
            }, function (error) {
                console.log(error);
            });
        }, 12000);
    };
    DirectionPage.prototype.ionViewDidLeave = function () {
        console.log('leaved');
        clearInterval(this.interval);
    };
    DirectionPage.prototype.changeMyMarker = function (marker, map) {
        var latlng = new google.maps.LatLng(this.myLat, this.myLng);
        map.setCenter(latlng);
        marker.setPosition(latlng);
    };
    DirectionPage.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.ViewChild('map', { static: true })
    ], DirectionPage.prototype, "mapElement");
    DirectionPage = __decorate([
        core_1.Component({
            selector: 'app-direction',
            templateUrl: './direction.page.html',
            styleUrls: ['./direction.page.scss']
        })
    ], DirectionPage);
    return DirectionPage;
}());
exports.DirectionPage = DirectionPage;
