import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';

import { Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';

import { Outlet } from '../../Models/Outlet';

/*
  Generated class for the OutletConnectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OutletConnectionProvider {

  // REST endpoints
  socketEnnableEndpoint:string = "http://13.76.88.107:8088/nbsend";
  outlet:Outlet;
  deviceId:string = "863703031920692"
  deviceKey:string = "bf76b2cc1571706da34d33d6ea69768d" 
  outletState:number = 0;
  lastTime:number;
  docRef:any;
  totalPowerConsumption:number;

  constructor(public http:Http) {
    console.log('Hello OutletConnectionProvider Provider');
  }

  async connect(socketId:string){
    this.totalPowerConsumption = 0;    
    let db = firebase.firestore();
    await db.collection('sockets').doc(socketId).get()
      .then(snapShot => {
        let data = snapShot.data();
        this.outlet = new Outlet(data.deviceId,data.deviceKey,data.current_usage);
        this.docRef = snapShot.ref;
        setInterval(()=>{
          this.docRef.get().then(snapShot => {
            this.outlet.current_usage = snapShot.data().current_usage;
          },10000);
        })
      });
    for (let index = 0; index < 1000; index++) {
      this.socketCommunication('On',this.outlet);          
    }
  }

  async disconnect(){
    this.socketCommunication('Off',this.outlet);
  }

  async socketCommunication(message:string,outlet:Outlet){
    const headers = new Headers({
      'Content-Type':  'application/json',
    });
    const requestOptions = new RequestOptions({headers:headers});
    this.http.post(this.socketEnnableEndpoint, 
    {"deviceId":outlet.deviceId,"deviceKey":outlet.deviceKey,"payload": message}, 
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
