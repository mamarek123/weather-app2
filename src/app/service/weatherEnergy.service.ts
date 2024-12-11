import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ForecastResponse } from "./forecast_response.model";
import { SummaryResponse } from "./summary_response.model";

@Injectable({ providedIn: 'root' })
export class WeatherEnergyService {
  private forecastDataSubject = new BehaviorSubject<ForecastResponse | null>(null);
  forecastData$ = this.forecastDataSubject.asObservable();

  private summaryDataSubject = new BehaviorSubject<SummaryResponse | null>(null);
  summaryData$ = this.summaryDataSubject.asObservable();

  private apiUrl = 'http://localhost:8080/api/v1/weekly';


  constructor(private http: HttpClient) {}

  fetchSummary(lng:number, lat: number): void{
    const params = new HttpParams()
    .set('latitude', lat.toString())
    .set('longitude', lng.toString());



        this.http.get<SummaryResponse>(this.apiUrl + '/summary', { params }).subscribe({
      next:  (data) => {
        this.summaryDataSubject.next(data);

      },
      error: (error) => {
        console.error("Error fetching summary:", error);
      }
  });
  }

  fetchForecastAndSummary(lng: number, lat: number): void {
    this.fetchForecast(lng,lat);
    this.fetchSummary(lng,lat);
  }

  fetchForecast(lng: number, lat: number): void {
    const params = new HttpParams()
      .set('latitude', lat.toString())
      .set('longitude', lng.toString());


    this.http.get<ForecastResponse>(this.apiUrl + '/forecast', { params }).subscribe({
      next:  (data) => {this.forecastDataSubject.next(data);},
      error: (error) => {
        console.error("Error fetching forecast:", error);
      }
      }
    );
  }

}
