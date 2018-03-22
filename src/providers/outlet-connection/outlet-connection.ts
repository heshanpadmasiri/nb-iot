import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';

/*
  Generated class for the OutletConnectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OutletConnectionProvider {

  constructor() {
    console.log('Hello OutletConnectionProvider Provider');
  }

  test(text:string){
    let db = firebase.firestore();
    db.collection("test").add({
      text:text
    });
  }

}
