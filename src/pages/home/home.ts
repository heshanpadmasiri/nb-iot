import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { OutletConnectionProvider } from '../../providers/outlet-connection/outlet-connection';
import { UsageProvider } from '../../providers/usage/usage';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  scanData : {};
  options :BarcodeScannerOptions;

  heading:string;
  connectionState:number; // 0 - not connected 1 - in the middle of connecting 3 - connected

  MAC:string='00:21:13:02:84:C2';

  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    public outletConnection: OutletConnectionProvider,
    private alertController: AlertController,
    private usageProvider:UsageProvider,
    private bluetoothSerial:BluetoothSerial) {
    this.heading = 'Connect to outlet';
    this.connectionState = outletConnection.outletState;
  }

  ionViewDidLoad(){}

  scan(){
    this.options = {
        prompt : "Scan QR code of outlet"
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {

        console.log(barcodeData);
        if(!barcodeData.cancelled){
          this.scanData = barcodeData.text;
          // send this to outlet connectins provider to activate the plug via firebase
          this.initiateConnection(barcodeData.text);
        }
    }, (err) => {
        console.log("Error occured : " + err);
    });
  } 


  initiateConnection(outlet:string){    
    let prompt = this.alertController.create({
      title:'Select Automatic TimeOut Option',
      message:'Select time limit after which your connection will automatically disconnect',
      inputs:[
        {
          type:'radio',
          label:'30 minutes',
          value:'value1'
        },
        {
          type:'radio',
          label:'1 hour',
          value:'value2'
        },
        {
          type:'radio',
          label:'1 hour 30 miutes',
          value:'value3'
        },
        {
          type:'radio',
          label:'2 hour',
          value:'value4'
        },
        {
          type:'radio',
          label:"Don't turn off automatically",
          value:'value2'
        }
      ],
      buttons:[
        {
          text:'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('cancel clicked')
          }
        },
        {
          text:'Select',
          handler: ()=> {
            this.outletConnection.connect(outlet);
            this.heading = "Connected"
            this.outletConnection.outletState = 3;
            this.connectionState = this.outletConnection.outletState;
            this.outletConnection.lastTime = Date.now();
            setInterval(()=> {
              if(this.outletConnection.outletState == 3){
                let currentTime = Date.now()
                let escapedTime = currentTime - this.outletConnection.lastTime;
                this.outletConnection.lastTime = currentTime;
                let additive = escapedTime * this.outletConnection.outlet.current_usage;
                this.outletConnection.totalPowerConsumption += additive;
                this.usageProvider.addPowerUsage(additive);
              }              
            },10000);
            this.bluetoothSerial.connectInsecure(this.MAC).subscribe(
              success => {
                this.heading = "device Connected";
                this.bluetoothSerial.write('y');
                this.bluetoothSerial.subscribe('\n').subscribe(
                  success => {
                    this.heading = success;
                  }
                );
              },
              error => {
                this.heading = error;
              }
            );            
          }
        }
      ]
    });
    prompt.present();
  }

  disconnect(){
    this.bluetoothSerial.write('n');
    this.bluetoothSerial.disconnect();
    this.outletConnection.disconnect();
    this.outletConnection.outletState = 0;
    this.connectionState = this.outletConnection.outletState;
    this.heading = 'Connect to outlet';
    this.ionViewDidLoad();
  }
}
