import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the OutletsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-outlets',
  templateUrl: 'outlets.html',
})
export class OutletsPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  chargingPoints = [
    [6.795511, 79.899036]
  ]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter(),
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 5
        }
      });
      this.addMarkers();   
    }, (err) => {
      console.log(err);
    }); 
  }

  addMarkers(){
    let latLng = new google.maps.LatLng(this.chargingPoints[0][0],this.chargingPoints[0][1]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: this.map
          });
  }

}
