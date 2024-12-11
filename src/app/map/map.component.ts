import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, map, tileLayer, LatLng } from 'leaflet';
import { WeatherEnergyService } from '../service/weatherEnergy.service';
import e from 'express';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map')
  mapElementRef: ElementRef = null!;

  private _map: Map = null!;

  constructor(private weatherEnergyService: WeatherEnergyService) {}

  ngAfterViewInit(): void {
    this._map = map(this.mapElementRef.nativeElement).setView([52, 20], 6); //z grubsza Polska

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap',
    }).addTo(this._map);

    this._map.on('click', (event) => {
      const coords: LatLng = event.latlng;
      //mapa  leaflet po przeskrolowaniu dodaje koordynaty zamiast je resetowac, przyklad po przunieciu calej mapy w prawo kooridynat longitude bedzie w zakresie 180-360 a lewo od -360 do -180
      if (coords.lng > 180) {
        while (coords.lng > 180) {
          coords.lng -= 360;
        }
      } else if (coords.lng < -180) {
        while (coords.lng < -180) {
          coords.lng += 360;
        }
      }
      this.weatherEnergyService.fetchForecastAndSummary(coords.lng, coords.lat);
    });
  }
}
