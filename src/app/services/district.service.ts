import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { District } from '../models/district';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private httpClient: HttpClient) { }

  path = "http://localhost:8080";

  getDistricts(): Observable<District[]> {
    return this.httpClient.get<District[]>(this.path + "/districts");
  }

  getDistrictById(districtId): Observable<District> {
    return this.httpClient.get<District>(this.path + "/district/" + districtId);
  }

}
