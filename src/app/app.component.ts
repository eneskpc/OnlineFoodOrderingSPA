import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.selectedCity == null)
      this.router.navigateByUrl("change-city");
  }

  get selectedCity() {
    if (localStorage.getItem("selectedCity") != null)
      return localStorage.selectedCity;
    return null;
  }
}
