/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { Injectable ,EventEmitter} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { forkJoin, Observable, BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public events: EventEmitter<any>;
  public orderSub: BehaviorSubject<any>;
  public orders: Observable<any>;
  baseUrl: any = '';
  mediaURL: any = '';
  constructor(
    private http: HttpClient,
    private nativeHttp: HTTP,
    public firbaseDB: AngularFireDatabase
  ) {
    this.baseUrl = environment.baseURL;
    this.mediaURL = environment.mediaURL;
    this.orderSub = new BehaviorSubject([]);
    this.orders = this.orderSub.asObservable();
    this.events = new EventEmitter();

  }
  alerts(title, message, type) {
    Swal.fire(
      title,
      message,
      type
    );
  }
  /*============= firebase update driver status ===========*/
  updateDriverOrderStatus(driverId,customStr?){
    console.log('driverId updateDriverOrderStatus',driverId)
    const today = new Date();
    const itemRef = this.firbaseDB.object(['drivers',driverId].join('/'));
          itemRef.update({ status: customStr || today.getTime()});
  }
  /*============= firebase update store status ===========*/
  public getAllOrders(url, body) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Basic', `${environment.authToken}`)
    };
    const param = this.JSON_to_URLEncoded(body);

    this.http?.post(this.baseUrl + url, param, header).subscribe((res) => {
      this.orderSub.next(res);
    });
  }

  uploadFile(files: File[]) {
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('userfile', f));
    return this.http.post(this.baseUrl + 'users/upload_image', formData);
  }

  getCurrencyCode() {
    return environment.general.code;
  }

  getCurrecySymbol() {
    return environment.general.symbol;
  }

  // createOrderNotification(stores) {
  //   const ids = [...new Set(stores.map(item => item.token))];
  //   const apiCalls = [];
  //   ids.forEach(element => {
  //     apiCalls.push(this.sendNotification('You have received new order', 'New Order Received', element));
  //   });
  //   forkJoin(apiCalls).subscribe((data) => {
  //     console.log('fork result', data);
  //   }, error => {
  //     console.log('fork error', error);
  //   });

  // }
  createOrderNotification(stores) {    
    const ids = [...new Set(stores.map(item => item.token))];    
    console.log(ids,'stores sendNotification ',stores)
    /*
    const apiCalls = [];
    ids.forEach(element => {
      apiCalls.push(this.sendNotification('You have received new order', 'New Order Received', element));
    });
    forkJoin(apiCalls).subscribe((data) => {
      console.log('fork result', data);
    }, error => {
      console.log('fork error', error);
    });*/

    let traverse = ()=>{
      if(ids.length>0){
          let idToken = ids.shift();
          if(idToken!=""){
            this.sendNotification('You have received new order', 'New Order Received', idToken).toPromise().then((r:any)=>{
              console.log('CALLING- '+ idToken,'RES',r);
              traverse();
            }).catch(()=>{
              traverse();
            });
          }else{
            traverse();
          }

      }else{
        console.log('OVER1')
      }
    }
    traverse();

  }
  

  sendNotification(msg, title, id) {
    const body = {
      app_id: environment.onesignal.appId,
      include_player_ids: [id],
      headings: { en: title },
      contents: { en: msg },
      data: { task: msg }
    };
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Basic ${environment.onesignal.restKey}`)
    };
    return this.http.post('https://onesignal.com/api/v1/notifications', body, header);
  }

  JSON_to_URLEncoded(element, key?, list?) {
    let new_list = list || [];
    if (typeof element === 'object') {
      for (let idx in element) {
        this.JSON_to_URLEncoded(
          element[idx],
          key ? key + '[' + idx + ']' : idx,
          new_list
        );
      }
    } else {
      new_list.push(key + '=' + encodeURIComponent(element));
    }
    return new_list.join('&');
  }


  post(url, body) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Basic', `${environment.authToken}`)
    };
    const param = this.JSON_to_URLEncoded(body);
    console.log(param);
    return this.http.post(this.baseUrl + url, param, header);
  }

  externalPost(url, body, key) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${key}`)
    };
    const order = this.JSON_to_URLEncoded(body);
    console.log(order)
    return this.http.post(url, order, header);
  }
  get(url) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Basic', `${environment.authToken}`)
    };
    return this.http.get(this.baseUrl + url, header);
  }

  externalGet(url) {
    return this.http.get(url);
  }

  httpGet(url, key) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${key}`)
    };

    return this.http.get(url, header);
  }

  nativePost(url, post) {
    console.log(this.baseUrl + url, post);
    return this.nativeHttp.post(this.baseUrl + url, post, {
      Basic: `${environment.authToken}`
    });
  }

  geNewtOrdersEvent(){
    console.log('event servic call')
    this.events.emit(true);
  }

}
