import { Component } from '@angular/core';
import { ForecastResponse } from '../service/forecast_response.model';
import { SummaryResponse } from '../service/summary_response.model';
import { WeatherEnergyService } from '../service/weatherEnergy.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  forecastData: ForecastResponse;
  summaryData: SummaryResponse;

  constructor(private weatherEnergyService: WeatherEnergyService) {
    this.forecastData = {
      date: [
        'no data loaded',
        'no data loaded',
        'no data loaded',
        'no data loaded',
        'no data loaded',
        'no data loaded',
        'no data loaded',
      ],
      weather_code: [NaN, NaN, NaN, NaN, NaN, NaN, NaN],
      temperature_2m_max: [NaN, NaN, NaN, NaN, NaN, NaN, NaN],
      temperature_2m_min: [NaN, NaN, NaN, NaN, NaN, NaN, NaN],
      generated_energy: NaN,
    };
    this.summaryData = {
      date: 'no data loaded yet...',
      average_pressure: NaN,
      average_sun_exposition_time: NaN,
      max_temperature: NaN,
      min_temperature: NaN,
      precipitation: 'no data loaded yet...',
    };
  }

  public ngOnInit(): void {
    this.weatherEnergyService.forecastData$.subscribe((data) => {
      if (data) {
        this.forecastData = data;
        this.forecastData.generated_energy = parseFloat(
          data.generated_energy.toFixed(2)
        );
      } else {
        console.log('Error fetching data');
      }
    });
    this.weatherEnergyService.summaryData$.subscribe((data) => {
      if (data) {
        this.summaryData = data;
        this.summaryData.average_sun_exposition_time = parseFloat(
          (data.average_sun_exposition_time / 60 / 60).toFixed(2)
        );
        this.summaryData.average_pressure = parseFloat(
          data.average_pressure.toFixed(2)
        );
      } else {
        console.log('Error fetching data');
      }
    });
    this.getLocationAndReloadData();
  }

  getLocationAndReloadData() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          if (position) {
            console.log(
              'Latitude: ' +
                position.coords.latitude +
                'Longitude: ' +
                position.coords.longitude
            );
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            this.weatherEnergyService.fetchForecastAndSummary(lng, lat);
          }
        },
        (error: GeolocationPositionError) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
