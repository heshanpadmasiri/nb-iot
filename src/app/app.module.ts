import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { OutletsPage} from '../pages/outlets/outlets';
import { UsagePage } from '../pages/usage/usage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Geolocation } from '@ionic-native/geolocation';

import { OutletConnectionProvider } from '../providers/outlet-connection/outlet-connection';

import { ChartsModule } from 'ng2-charts';
import { UsageProvider } from '../providers/usage/usage';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OutletsPage,
    UsagePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OutletsPage,
    UsagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Geolocation,
    BluetoothSerial,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OutletConnectionProvider,
    UsageProvider
  ]
})
export class AppModule {}
