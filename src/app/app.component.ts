import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { OutletsPage } from '../pages/outlets/outlets';
import { UsagePage } from '../pages/usage/usage';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Outlets', component: OutletsPage},
      { title: 'Usage', component:UsagePage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      const config = {
        apiKey: "AIzaSyDUFjLVJ48ZAkauv19y1xItQ3otgW4SYA8",
        authDomain: "nb-iot-charger.firebaseapp.com",
        databaseURL: "https://nb-iot-charger.firebaseio.com",
        projectId: "nb-iot-charger",
        storageBucket: "nb-iot-charger.appspot.com",
        messagingSenderId: "1047831575364"
      };
      firebase.initializeApp(config);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
