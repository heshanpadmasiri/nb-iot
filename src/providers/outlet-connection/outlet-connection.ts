import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';

import { Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';

/*
  Generated class for the OutletConnectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OutletConnectionProvider {

  // REST endpoints
  socketEnnableEndpoint:string = "http://13.76.88.107:8088/nbsend";
  deviceId:string = "863703031920692"
  deviceKey:string = "bf76b2cc1571706da34d33d6ea69768d"  

  constructor(public http:Http) {
    console.log('Hello OutletConnectionProvider Provider');
  }

  // Todo:remove this
  test(text:string){
    const headers = new Headers({
      'Content-Type':  'application/json',
    });
    const requestOptions = new RequestOptions({headers:headers});
    this.http.post('http://13.76.88.107:8088/nbsend', 
    {"deviceId":"863703031920692","deviceKey":"bf76b2cc1571706da34d33d6ea69768d","payload": text}, 
    requestOptions).subscribe(
      res => {
        console.log(res);
      }, 
      error => {
        console.error(error);
      }
    )
  }

  async socketCommunication(message:string){
    const headers = new Headers({
      'Content-Type':  'application/json',
    });
    const requestOptions = new RequestOptions({headers:headers});
    this.http.post(this.socketEnnableEndpoint, 
    {"deviceId":this.deviceId,"deviceKey":this.deviceKey,"payload": message}, 
    requestOptions).subscribe(
      res => {
        console.log(res);
      }, 
      error => {
        console.error(error);
      }
    );
  }
}
