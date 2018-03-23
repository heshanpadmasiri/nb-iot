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
    [6.929714, 79.857600],
    [6.925760, 79.865993],
    [6.922863, 79.854535],
    [6.922522, 79.860586],
    [6.931000, 79.865693],
    [6.931554, 79.859985],
    [6.934067, 79.867495],
    [6.934365, 79.853977],
    [6.934450, 79.869727],
    [6.926994, 79.844707],
    [6.925886, 79.844964],
    [6.924480, 79.845436],
    [6.923926, 79.845651],
    [6.922051, 79.846552],
    [6.926268, 79.865606],
    [6.924351, 79.865263],
    [6.920389, 79.865263],
    [6.925288, 79.868010],
    [6.921628, 79.871374],
    [6.924227, 79.873348],
    [6.926698, 79.871631],
    [6.932683, 79.850731],
    [6.902009, 79.854336],
    [6.904948, 79.854250],
    [6.904677, 79.860388],
    [6.916041, 79.866048],
    [6.911227, 79.868709],
    [6.921920, 79.878150],
    [6.920556, 79.866477],
    [6.916083, 79.872743],
    [6.930866, 79.881541],
    [6.932144, 79.887678],
    [6.932144, 79.887678],
    [6.953188, 79.883429],
    [6.960217, 79.873473],
    [6.962901, 79.868237],
    [6.964562, 79.869653],
    [6.964562, 79.869653],
    [6.957789, 79.863258],
    [6.956894, 79.862614],
    [6.953358, 79.858837],
    [6.947096, 79.857163],
    [6.944327, 79.856219],
    [6.939726, 79.852399],
    [6.956983, 79.884825],
    [6.959837, 79.885769],
    [6.960731, 79.888172],
    [6.957706, 79.881820],
    [6.962775, 79.881005],
    [6.959665, 79.877529]
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
    this.chargingPoints.forEach(chargingPoint => {
      let latLng = new google.maps.LatLng(chargingPoint[0],chargingPoint[1]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: this.map
          });
    });
    
  }

}
