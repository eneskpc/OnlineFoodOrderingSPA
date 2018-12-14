import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.css']
})
export class PageSelectorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.selectedCity) {
      this.router.navigateByUrl(localStorage.selectedCity + "/welcome");
    } else {
      this.router.navigateByUrl("change-city");
    }
  }

}
