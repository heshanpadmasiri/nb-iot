import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { OutletConnectionProvider } from '../../providers/outlet-connection/outlet-connection';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  scanData : {};
  options :BarcodeScannerOptions;

  heading:string;
  connectionState:number; // 0 - not connected 1 - in the middle of connecting 3 - connected


  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private outletConnection: OutletConnectionProvider) {
    this.heading = 'Connect to outlet';
    this.connectionState = 0;
  }

  scan(){
    this.options = {
        prompt : "Scan QR code of outlet"
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {

        console.log(barcodeData);
        if(!barcodeData.cancelled){
          this.scanData = barcodeData.text;
          // send this to outlet connectins provider to activate the plug via firebase
        }
    }, (err) => {
        console.log("Error occured : " + err);
    });             
  }  
}
