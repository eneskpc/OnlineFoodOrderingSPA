import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient) { }

  path = "http://localhost:8080";

  getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.path + "/cities");
  }

  getCityById(cityId): Observable<City> {
    return this.httpClient.get<City>(this.path + "/city-by-id/" + cityId);
  }

  getCityBySeoLink(seoLink): Observable<City> {
    return this.httpClient.get<City>(this.path + "/city-by-link/" + seoLink);
  }
}