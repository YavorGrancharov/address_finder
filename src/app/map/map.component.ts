import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { GeoLocationService } from '../geo-location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @ViewChild('googleMap', { static: true }) gmap: ElementRef;
  @ViewChild('openStreetMap', { static: true }) omap: ElementRef;

  public gLat = 42.698334;
  public gLng = 23.319941;
  public oLat = 42.698334;
  public oLng = 23.319941;

  public address = '';
  public error = '';

  private map: google.maps.Map;
  private oMap: L.Map;
  private coordinates = new google.maps.LatLng(this.gLat, this.gLng);
  private mapOptions: google.maps.MapOptions;
  private marker;

  constructor(private geoLocationService: GeoLocationService) {
    this.geoLocationService.getCurrentPos().subscribe((pos: Position) => {
      this.gLat = pos.coords.latitude;
      this.gLng = pos.coords.longitude;
      this.oLat = pos.coords.latitude;
      this.oLng = pos.coords.longitude;

      this.setGoogleMapOptions();
      this.googleMapInitializer();
    });
  }

  ngOnInit(): void {
    this.autocompleteSearch();
    this.setOpenMapOptions();
  }

  public getLocation() {
    this.getGooglemapCoords();
    this.getOpenStreetMapCoords();
  }

  // Google Maps Implementation
  private googleMapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
  }

  private setGoogleMapOptions() {
    this.coordinates = new google.maps.LatLng(this.gLat, this.gLng);
    this.mapOptions = {
      center: this.coordinates,
      zoom: 12,
    };
    this.marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    });
  }

  private getGooglemapCoords() {
    this.autocompleteSearch();
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: this.address }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        this.gLat = results[0].geometry.location.lat();
        this.gLng = results[0].geometry.location.lng();
        this.setGoogleMapOptions();
        this.googleMapInitializer();
      }
      if (!this.address) {
        this.error = 'Please add a valid address!';
      } else {
        this.error = '';
      }
    });
  }

  private autocompleteSearch() {
    const place = document.getElementById('place') as HTMLInputElement;
    this.address = place.value;
    console.log(place.value);
    const autocomplete = new google.maps.places.Autocomplete(place);
    autocomplete.setTypes(['geocode']);
  }

  // Open Street Map Implementation
  private setOpenMapOptions() {
    this.oMap = L.map('openStreetMap').setView([this.oLat, this.oLng], 12);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.oMap);

    L.marker([this.oLat, this.oLng]).addTo(this.oMap);
  }

  private async getOpenStreetMapCoords() {
    const place = document.getElementById('place') as HTMLInputElement;
    const provider = new OpenStreetMapProvider();
    // const searchControl = new GeoSearchControl({
    //   provider
    // });
    const results = await provider.search({ query: place.value });
    // this.oMap.addControl(searchControl);
    this.oLat = results[0].y;
    this.oLng = results[0].x;
    this.oMap.remove();
    this.setOpenMapOptions();
  }
}
