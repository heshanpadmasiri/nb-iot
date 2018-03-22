import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  scanData : {};
  options :BarcodeScannerOptions;

  heading:string;
  connectionState:number; // 0 - not connected 1 - in the middle of connecting 3 - connected


  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner) {
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
        }
    }, (err) => {
        console.log("Error occured : " + err);
    });         
}    

}
