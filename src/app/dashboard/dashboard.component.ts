import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  location = {
    city: 'france',
    code: 'fr'
  };
  weather: any;
  value;
  constructor(private router: Router, private apiweatherService: ApiServiceService, private cookieService: CookieService) { }

  ngOnInit() {
    this.value = localStorage.getItem('location');
    const test: string = this.cookieService.get('Test');
    if (test === 'non') {
      this.router.navigate(['login']);
    }
    console.log(test);
    if (this.value != null) {
        this.location = JSON.parse(this.value);
  }


    this.apiweatherService.getWeather(this.location.city, this.location.code).subscribe(
      response => {
        console.log(response);
        this.weather = response;
      }
    );
  }


}
