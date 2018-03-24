import firebase from 'firebase';
import 'firebase/firestore';
import { Injectable } from '@angular/core';

/*
  Generated class for the UsageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsageProvider {

  userId:string="o6RxEDe99euUkMBq3upu";

  public lineChartData:Array<any> = [
    {data: [0, 0, 0, 0, 0, 0], label: 'Power Usage(kWh)'},    
  ];
  public lineChartLabels:Array<any> = ['0', '0', '0', '0', '0', '0'];
  

  constructor() {
    console.log('Hello UsageProvider Provider');
    
  }

  updateData(){
    let db = firebase.firestore();
    db.collection('users').doc(this.userId).get().then(snapShot => {
      let data = snapShot.data();
      this.lineChartLabels = data.dates;
      this.lineChartData[0].data = data.usage;
      console.log(this.lineChartData);
      console.log(this.lineChartLabels);
    })
  }

  async addPowerUsage(addition:number){
    let db = firebase.firestore();
    db.collection('users').doc(this.userId).get().then(snapShot => {
      let data = snapShot.data();
      let currentUsage = data.usage;
      currentUsage[5] += addition;
      let newData = {
        usage:currentUsage
      }
      snapShot.ref.update(newData);      
    })
  }

}
