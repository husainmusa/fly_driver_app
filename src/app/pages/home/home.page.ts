/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  segId: any = 1;
  orders: any[] = [];
  oldOrders: any;
  dummy = Array(50);
  assignee_id: any = [];
  driver_assigned:any;
  driver_statuss:any = "";
  driver_statuss_id:any = "";
  acceptNotify:any;
  constructor(
    public api: ApiService,
    public util: UtilService,
    private router: Router,
    private zone: NgZone,
    private navCtrl: NavController,
  ) {
    this.api.events.subscribe((res)=>{
      //  console.log('change',res)
      console.log('event subscribe')
          this.getMyOrder(); 
      })
  }

  ngOnInit(){

  }
  ionViewWillEnter() {
    this.getMyOrder();
  }

  getMyOrder() {
    this.dummy = Array(50);
    this.oldOrders = [];
    this.orders = [];
    const param = {
      id: localStorage.getItem('uid')
    };
    let driver_id = localStorage.getItem('uid');
    // this.api.getAllOrders('orders/getByDriverId', param);
    this.api.post('orders/getByDriverId', param).subscribe((data: any) => {
      console.log(data, "observable data");
      this.dummy = [];
      if (data && data.status === 200 && data.data.length > 0) {
        data.data.forEach(async (element) => {
          const orderParam = {
            id: element.id
          };
          this.api.post('acceptedorders/getByOrderId', orderParam).subscribe((accepteddata: any) => {
              console.log("accepted driver data", accepteddata.data);
              if (accepteddata && accepteddata.status === 200 && accepteddata.data.length > 0) {
                accepteddata.data.forEach(async (acceptedElement) => {
                  console.log('acceptedElement================>',acceptedElement ,driver_id)
                  if(acceptedElement.driver_id == driver_id){
                    if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(element.orders)) {
                      element.orders = JSON.parse(element.orders);
                      element.date_time = moment(element.date_time).format('dddd, MMMM Do YYYY');
                      if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(element.status)) {
                        if(element.assignee != ''){
                          const assinee = JSON.parse(element.assignee);
                          const assinee_id = assinee[0].driver.split(',');
                          const storeInfo = JSON.parse(element.assignee);
                        console.log(storeInfo, "Store info");
                        const storeStatus = JSON.parse(element.status);
                        console.log('storestatus>', storeStatus);
                        const orderStatus = storeStatus.filter(x => x.id === storeInfo[0].assignee);
                        console.log('orderStatus=?', orderStatus);
                        if (orderStatus && orderStatus.length) {
                          console.log('element============>',element)
                          element.orders.forEach(order => {
                         
                            if (order.variations && order.variations !== '' && typeof order.variations === 'string') {
                              console.log('strings', element.id);
                              order.variations = JSON.parse(order.variations);
                              console.log(order['variant']);
                              if (order["variant"] === undefined) {
                                order['variant'] = 0;
                              }
                            }
                          });
                          const stat = orderStatus[0].status;
                          element['orderStatus'] = stat;
                          element.orders =  element.orders.filter(x => x.store_id === storeInfo[0].assignee);
                          console.log("orders pushed","starting", this.orders);
                          console.log("orders pushed","starting", this.oldOrders);
                          if((stat === 'delivered' || stat === 'cancelled' || stat === 'rejected' || stat === 'refund'|| stat === 'accepted' ) && acceptedElement.status == "accepted"){
                            element['driverAccepted'] = "true";
                            this.oldOrders.push(element);
                          }else{
                            this.orders.push(element);
                          }
                        }
                      }
                    }
                  }
                }
              })
              }else{
                console.log("element",element.assignee);
                if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(element.orders)) {
                  element.orders = JSON.parse(element.orders);
                  element.date_time = moment(element.date_time).format('dddd, MMMM Do YYYY');
                  if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(element.status)) {
                    if(element.assignee != ''){
                      const assinee = JSON.parse(element.assignee);
                      const assinee_id = assinee[0].driver.split(',');
                      console.log("asignee id", assinee_id)
                      for(let i = 0; i < assinee_id.length; i++){
                        console.log("asignee id inside", assinee_id[i])
                        if(driver_id == assinee_id[i]){
                          this.driver_assigned = "true";
                        }
                      }
                      
                      if (this.driver_assigned == "true") {
                        const storeInfo = JSON.parse(element.assignee);
                        console.log(storeInfo, "Store info");
                        const storeStatus = JSON.parse(element.status);
                        console.log('storestatus>', storeStatus);
                        const orderStatus = storeStatus.filter(x => x.id === storeInfo[0].assignee);
                        console.log('orderStatus=?', orderStatus);
                        if (orderStatus && orderStatus.length) {
                          element.orders.forEach(order => {
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
                          const stat = orderStatus[0].status;
                          console.log('orderstatus===>', stat);
                          element['orderStatus'] = stat;
                          element.orders =  element.orders.filter(x => x.store_id === storeInfo[0].assignee);
                          console.log("orders pushed","starting", this.orders);
                          console.log("orders pushed","starting", this.oldOrders);
                          if (stat === 'delivered' || stat === 'cancelled' || stat === 'rejected' || stat === 'refund') {
                            this.oldOrders.push(element);
                            console.log("oldorders pushed",stat,this.oldOrders);
                          } else {
                            element['driverAccepted'] = "false";
                            this.orders.push(element);
                            console.log("orders pushed",stat, this.orders);
                          }
                        }
                      }
                    } 
                  }
                }
              }
          });
        });
        console.log(' this.orders===============>',this.orders)
      }
    }, error => {
      console.log(error);
      this.dummy = [];
      this.util.errorToast(this.util.getString('Something went wrong'));
    });
  }

  accepted(order_id, status,orderDetail){
    const orderParam = {
     id : order_id
    };
    let DriversIds =  []
    DriversIds = orderDetail.driver_id.split(',')
    let driver_id = localStorage.getItem('uid');

    console.log('DriversIds>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',DriversIds)
    this.api.post('acceptedorders/getByOrderId', orderParam).subscribe((orderdata: any) => {
      console.log('orderdata=======>',orderdata)
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
          // console.log("accepted data==>", data);
          // console.log("accepted status", data.data[0].status);
          DriversIds.forEach(id =>{
            this.api.updateDriverOrderStatus(id,'NOTPLAY');
          })
          this.ionViewWillEnter();
      //    this.acceptNotify = "You have successfully accepted the order";
          // if(data.data[0].status == "accepted"){
          //   console.log('==========accepted=======>')

          //   this.acceptNotify = "You have successfully accepted the order";
            
          // }
        });
      }
    });
  }

  doRefresh(event){
    setTimeout(() => {
      this.getMyOrder();
      event.target.complete();
    }, 1500); 
  }

  goToOrder(ids) {
    const navData: NavigationExtras = {
      queryParams: {
        id: ids.id,
        itemStatus : JSON.parse(ids.status)[0].status
      }
    };
    this.router.navigate(['/order-details'], navData);
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
    return this.driver_statuss;
  }

}
