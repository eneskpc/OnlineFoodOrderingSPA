import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { City } from '../models/city';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-change-city',
  templateUrl: './change-city.component.html',
  styleUrls: ['./change-city.component.css']
})
export class ChangeCityComponent implements OnInit {

  constructor(private titleService: Title,private cityService: CityService, private router: Router) { }

  public cities: City[];

  ngOnInit() {
    this.titleService.setTitle("Bir Şehir Seç");
    this.getCities();
  }

  public getCities() {
    this.cityService.getCities().subscribe(data => {
      this.cities = data;
    });
  }

  public changeCity(citySeo: string) {
    localStorage.selectedCity = citySeo;
    this.router.navigateByUrl(citySeo+"/welcome");
  }
}
