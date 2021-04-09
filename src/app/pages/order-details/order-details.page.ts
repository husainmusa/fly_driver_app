/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { VerifyPage } from '../verify/verify.page';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  id: any;
  loaded: boolean;
  orderDetail: any[] = [];
  DriversIds: any[] = [];
  orders: any[] = [];
  payMethod: any;
  status: any;
  datetime: any;
  orderAt: any;
  address: any;
  userInfo: any;
  storeInfo: any;
  storeId: any;
  changeStatusOrder: any;
  userLat: any;
  userLng: any;
  storestatus:any = "false";
  assignee:any;
  acceptNotify:any;
  statusText: any;
  orderStatus: any[] = [];
  grandTotal: any;
  itemStatus: any;
  driver_statuss:any = "false";
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public util: UtilService,
    public api: ApiService,
    private iab: InAppBrowser,
    private modalCtrl: ModalController,
    private router: Router,
    private launchNavigator: LaunchNavigator,
    private callNumber: CallNumber
  ) {
    this.route.queryParams.subscribe((data) => {
      console.log(data);
      this.id = data.id;
      this.itemStatus = data.itemStatus.toString().trim();
    });
    // setTimeout(()=>{
    //   this.getOrderDetail();
    // },300)
    
  }

  ionViewWillEnter(){
    this.getOrderDetail();
   // this.getOrderDetail();
    // alert(this.itemStatus);
    // alert(this.driver_statuss)
  }

  getOrderDetail(){
    if (this.id) {
      this.driver_status(this.id);      
      this.loaded = false;
      this.getOrder();
      console.log('userdinfo', this.util.userInfo);
      if (this.util.userInfo && this.util.userInfo.first_name) {
        this.statusText =  this.util.userInfo.first_name + ' ' + this.util.userInfo.last_name;
      }
    } else {
      this.navCtrl.back();
    }
  }

  async driver_status(id){
    const param = {
      id: id
    };
    console.log(param, "param");
    await this.api.post('acceptedorders/getByOrderId', param).subscribe((data: any) => {
      console.log("driver_status data", data.data[0]['status'], id);
      this.driver_statuss = data.data[0]['status'];
    });
  }
  
  accepted(order_id, status){
    const orderParam = {
     id : order_id
    };
    let driver_id = localStorage.getItem('uid');
    console.log('this.orderDetail:===========',this.orderDetail)
    this.api.post('acceptedorders/getByOrderId', orderParam).subscribe((orderdata: any) => {
      if (orderdata && orderdata.status === 200 && orderdata.data.length > 0) {
        orderdata.data.forEach(async (orderElement) => {
          if(orderElement.driver_id == driver_id){
          
            this.acceptNotify = "You have Already accepted";
          }else{
            this.acceptNotify = "Another Driver Already accepted";
          }
        });
      }else{
        console.log(order_id,"order id");
        const param = {
          driver_id: localStorage.getItem('uid'),
          order_id: order_id,
          date_time: moment().format('YYYY-MM-DD HH:mm:ss'),
          status: "accepted"
        };
        console.log(param, "param");  
        this.api.post('acceptedorders/save', param).subscribe((data: any) => {
          this.util.delivery = '1'
          console.log("accepted data", data);
          // console.log("accepted status", data.data[0].status);
          this.DriversIds.forEach(id =>{
            this.api.updateDriverOrderStatus(id,'NOTPLAY');
          })
          this.ionViewWillEnter();
          // if(data.data[0].status == "accepted"){
          //   this.acceptNotify = "You have successfully accepted the order";
          //   DriversIds.forEach(id =>{
          //     this.api.updateDriverOrderStatus(id);
          //   })
          //   this.ionViewWillEnter();
          // }
        });
      }
    });
  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    console.log(lat1, lon1, lat2, lon2);
    const earthRadiusKm = 6371;
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

  getOrder() {
    const param = {
      id: this.id
    };
    this.api.post('orders/getById', param).subscribe((data: any) => {
      
      console.log('orders/getById====> ::getOrder',data);
      this.loaded = true;
      if (data && data.status === 200 && data.data.length > 0) {
        const info = data.data[0];
        console.log('info======>',info)
        this.DriversIds = info.driver_id.split(',')
        this.grandTotal = info.grand_total;
        console.log(info);
        this.orderDetail = JSON.parse(info.notes);
        const order = JSON.parse(info.orders);
        // this.orders = order.filter(x => x.store_id === info.assignee);
        const assinee = JSON.parse(info.assignee);
        console.log('assinee', assinee);
        console.log(' this.orderDetail &&&&&&&&&&&&&&&', this.orderDetail )
        for(let i = 0 ;i <this.DriversIds.length; i++){
            if(this.DriversIds[i] == localStorage.getItem('uid')){
              this.storestatus = "true";
              this.assignee = assinee[0].assignee;
          }

        }

        if(this.storestatus == "true"){
          console.log('===================================================================')
          console.log("inside");
          const storeInfo = assinee.filter( x => x.driver === localStorage.getItem('uid'));
          console.log('storeinfo===>>', storeInfo);
           
          this.storeId = this.assignee;
          this.orders = order.filter(x => x.store_id === this.storeId);
          let total = 0;
          this.orders.forEach((element) => {
            let price = 0;
            if (element.variations && element.variations !== '' && typeof element.variations === 'string') {
              console.log('strings', element.id);
              element.variations = JSON.parse(element.variations);
              console.log(element['variant']);
              if (element["variant"] === undefined) {
                element['variant'] = 0;
              }
            }
            if (element.second_variation  && element.second_variation !== '') {
              if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(element.second_variation)) {
                element.second_variation = JSON.parse(element.second_variation);
                console.log('element.second_variation=>',element.second_variation)
                element.second_variation.forEach(elementInner => {
                  elementInner.sub_category = JSON.parse(elementInner.sub_category);
                })
              } else {
                element.second_variation = [];
               // element['variant'] = 1;
              }
              
            } 
            if (element && element.discount === '0') {
              if (element.size === '1' || element.size === 1) {
                if (element.variations[0].items[element.variant].discount && element.variations[0].items[element.variant].discount !== 0) {
                  price = price + (parseFloat(element.variations[0].items[element.variant].discount) * element.quantiy);
                } else {
                  price = price + (parseFloat(element.variations[0].items[element.variant].price) * element.quantiy);
                }
              } else {
                price = price + (parseFloat(element.original_price) * element.quantiy);
              }
            } else {
              if (element.size === '1' || element.size === 1) {
                if (element.variations[0].items[element.variant].discount && element.variations[0].items[element.variant].discount !== 0) {
                  price = price + (parseFloat(element.variations[0].items[element.variant].discount) * element.quantiy);
                } else {
                  price = price + (parseFloat(element.variations[0].items[element.variant].price) * element.quantiy);
                }
              } else {
                price = price + (parseFloat(element.sell_price) * element.quantiy);
              }
            }
            console.log('PRICEEE-->', price);
            console.log(total, price);
            total = total + price;
            console.log("total", total);
            console.log("price", price);
          });
          console.log('==>', total);
          // this.grandTotal = total.toFixed(2);
          const storeStatus = JSON.parse(info.status);
          this.orderStatus = storeStatus;
          const orderStatus = storeStatus.filter(x => x.id === this.assignee);
          this.status = orderStatus[0].status;
          console.log('status-------------------->', this.status);
          this.getStoreInfo();
        }
        
        // this.storeId = info.assignee;
        console.log('order=====>>', this.orders);
        // this.status = info.status;
        this.datetime = moment(info.date_time).format('dddd, MMMM Do YYYY');
        this.payMethod = info.paid_method === 'cod' ? this.util.getString('COD') : 'PAID';
        this.orderAt = info.order_to;
        if (info.uid) {
          const userinfo = {
            id: info.uid
          };
          this.api.post('users/getById', userinfo).subscribe((data: any) => {
            console.log('user info=>', data);
            if (data && data.status === 200 && data.data && data.data.length) {
              this.userInfo = data.data[0];
              this.userInfo.mobile = '+'+this.userInfo.mobile;
              // console.log('========userInfo============>',this.userInfo);
            }
          }, error => {
            console.log(error);
          });
        }
        if (this.orderAt === 'home') {
          const address = JSON.parse(info.address);
          console.log('---address', address);
          if (address && address.address) {
            this.userLat = address.lat;
            this.userLng = address.lng;
            this.address = address.landmark + ' ' + address.house + ' ' + address.address + ' ' + address.pincode;
            // this.getDrivers();
          }
        }
      } else {
        this.util.errorToast(this.util.getString('Something went wrong'));
      }
    }, error => {
      console.log(error);
      this.loaded = true;
      this.util.errorToast(this.util.getString('Something went wrong'));
    });
  }

  // direction(type) {
  //   console.log(type);
  //   if (type === 'store') {
  //     const navData: NavigationExtras = {
  //       queryParams: {
  //         lat: this.storeInfo.lat,
  //         lng: this.storeInfo.lng,
  //         who: type,
  //         id: this.storeInfo.uid,
  //         orderId: this.id,
  //         grandTotal: this.grandTotal,
  //         payMethod: this.payMethod,
  //         address: ''
  //       }
  //     };
  //     this.router.navigate(['direction'], navData);
  //   } else {
  //     const navData: NavigationExtras = {
  //       queryParams: {
  //         lat: this.userLat,
  //         lng: this.userLng,
  //         who: type,
  //         id: this.storeInfo.uid,
  //         orderId: this.id,
  //         grandTotal: this.grandTotal,
  //         payMethod: this.payMethod,
  //         address: this.address
  //       }
  //     };
  //     this.router.navigate(['direction'], navData);
  //   }
  // }


  direction(type) {
    if (type === 'store') {
      this.launchNavigator.navigate([this.storeInfo.lat, this.storeInfo.lng]);
    } else {
      this.launchNavigator.navigate([this.userLat, this.userLng]);
    }
  }




  getStoreInfo() {
    console.log('getStoreInfo');
    const param = {
      id: this.storeId
    };
    this.api.post('stores/getByUid', param).subscribe((data: any) => {
      console.log(data);
      if (data && data.status === 200 && data.data.length > 0) {
        this.storeInfo = data.data[0];
        this.storeInfo.mobile = '0'+ this.storeInfo.mobile
        // console.log('store info=====>>', this.storeInfo);
      }
    }, error => {
      console.log(error);
      this.util.errorToast(this.util.getString('Something went wrong'));
    });
  }

  ngOnInit() {
  }

  back() {
    this.util.publishNewOrder();
    this.navCtrl.navigateForward('/tabs/tab1');
  }

  call(number) {
    if(number[0] != '+' && number[0] != '0'){
      number = '0'+number;
    }
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  email() {
    if (this.userInfo.email) {
      // window.open('mailto:' + this.userInfo.email);
      this.iab.create('mailto:' + this.userInfo.email, '_blank');
    } else {
      this.util.errorToast(this.util.getString('Email not found'));
    }
  }

  printOrder() {
    console.log('print order');
  }

  updateDriver(uid, value) {
    const param = {
      id: uid,
      current: value
    };
    console.log('param', param);
    this.api.post('drivers/edit_profile', param).subscribe((data: any) => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  sendNotification(value) {
    let sValue= value+"__ED" ;
    sValue =sValue.trim();
    if (this.userInfo && this.userInfo.fcm_token) {
      this.api.sendNotification(this.util.getString('Your order #') + this.id + ' ' + this.util.getString(sValue), this.util.getString('Order_ED')+' ' + this.util.getString(sValue), this.userInfo.fcm_token)
        .subscribe((data: any) => {
          console.log('onesignal', data);
        }, error => {
          console.log('onesignal error', error);
        });
    }
  }

  // async openModal() {
  //   const modal = await this.modalCtrl.create({
  //     component: VerifyPage,
  //     componentProps: { mobile: this.userInfo.mobile }
  //   });

  //   modal.onDidDismiss().then((data) => {
  //     if (data && data.role === 'success') {
  //       console.log('normal delivery');
  //       this.orderStatus.forEach(element => {
  //         if (element.id === this.storeId) {
  //           element.status = this.changeStatusOrder;
  //         }
  //       });
  //       if (this.changeStatusOrder !== 'ongoing' && this.orderAt === 'home') {
  //         // release driver from this order
  //         console.log('relase driver');

  //         const newOrderNotes = {
  //           status: 1,
  //           value: 'Order ' + this.changeStatusOrder + this.statusText,
  //           time: moment().format('lll'),
  //         };
  //         this.orderDetail.push(newOrderNotes);

  //         this.util.show();
  //         const param = {
  //           id: this.id,
  //           notes: JSON.stringify(this.orderDetail),
  //           status: JSON.stringify(this.orderStatus),
  //         };
  //         this.api.post('orders/editList', param).subscribe((data: any) => {
  //           console.log('order', data);
  //           this.util.hide();
  //           this.updateDriver(localStorage.getItem('uid'), 'active');
  //           if (data && data.status === 200) {
  //             this.sendNotification(this.changeStatusOrder);
  //             this.back();
  //           } else {
  //             this.util.errorToast(this.util.getString('Something went wrong'));
  //           }
  //         }, error => {
  //           console.log(error);
  //           this.util.hide();
  //           this.util.errorToast(this.util.getString('Something went wrong'));
  //         });
  //       } else {
  //         const newOrderNotes = {
  //           status: 1,
  //           value: 'Order ' + this.changeStatusOrder + this.statusText,
  //           time: moment().format('lll'),
  //         };
  //         this.orderDetail.push(newOrderNotes);

  //         this.util.show();
  //         const param = {
  //           id: this.id,
  //           notes: JSON.stringify(this.orderDetail),
  //           status: JSON.stringify(this.orderStatus),
  //         };
  //         this.api.post('orders/editList', param).subscribe((data: any) => {
  //           console.log('order', data);
  //           this.util.hide();
  //           if (data && data.status === 200) {
  //             this.sendNotification(this.changeStatusOrder);
  //             this.back();
  //           } else {
  //             this.util.errorToast(this.util.getString('Something went wrong'));
  //           }
  //         }, error => {
  //           console.log(error);
  //           this.util.hide();
  //           this.util.errorToast(this.util.getString('Something went wrong'));
  //         });
  //       }
  //     }
  //   });

  //   modal.present();
  // }

  changeOrderStatus() {
    console.log(this.changeStatusOrder);
    console.log(this.orderDetail);
    if (this.changeStatusOrder) {
      console.log('this.util.delivery ===',this.util.delivery)
      // if (this.changeStatusOrder === 'delivered' && this.util.delivery === '1') {
      //   console.log('do delivery', this.userInfo.mobile);
      //   this.openModal();
      // } else {
        console.log('normal delivery',this.orderStatus);
        this.orderStatus.forEach(element => {
          console.log('element=>',element)
          if (element.id === this.storeId) {
            element.status = this.changeStatusOrder;
          }
        });
        console.log('this.orderAt',this.orderAt)
        if (this.changeStatusOrder !== 'ongoing' && this.orderAt === 'home') {
          // release driver from this order
          console.log('relase driver');

          const newOrderNotes = {
            status: 1,
            value: 'Order ' + this.changeStatusOrder + this.statusText,
            default:"Order "+ this.changeStatusOrder+' by driver ',
            user:this.statusText,
            time: moment().format('lll'),
          };
          this.orderDetail.push(newOrderNotes);

          this.util.show();
          const param = {
            id: this.id,
            notes: JSON.stringify(this.orderDetail),
            status: JSON.stringify(this.orderStatus),
          };

          console.log('newOrderNotes:====================>',newOrderNotes)
          this.api.post('orders/editList', param).subscribe((data: any) => {
            console.log('order', data);
            this.util.hide();
            this.updateDriver(localStorage.getItem('uid'), 'active');
            if (data && data.status === 200) {
              this.sendNotification(this.changeStatusOrder);
              this.back();
            } else {
              this.util.errorToast(this.util.getString('Something went wrong'));
            }
          }, error => {
            console.log(error);
            this.util.hide();
            this.util.errorToast(this.util.getString('Something went wrong'));
          });
        } else {
          
          const newOrderNotes = {
            status: 1,
            value: 'Order ' + this.changeStatusOrder + this.statusText,
            default:"Order "+ this.changeStatusOrder+' by driver ',
            user:this.statusText,
            time: moment().format('lll'),
          };

          console.log('newOrderNotes====>',newOrderNotes)
          this.orderDetail.push(newOrderNotes);

          this.util.show();
          const param = {
            id: this.id,
            notes: JSON.stringify(this.orderDetail),
            status: JSON.stringify(this.orderStatus),
          };
          this.api.post('orders/editList', param).subscribe((data: any) => {
            console.log('order', data);
            this.util.hide();
            if (data && data.status === 200) {
              this.sendNotification(this.changeStatusOrder);
              this.back();
            } else {
              this.util.errorToast(this.util.getString('Something went wrong'));
            }
          }, error => {
            console.log(error);
            this.util.hide();
            this.util.errorToast(this.util.getString('Something went wrong'));
          });
        }
      }
    // }
  }

  contact() {
  
  }
}
