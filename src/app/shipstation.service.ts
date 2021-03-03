import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { headingA, lowerA } from './keys';
import { combineLatest } from 'rxjs';
const heading = headingA;
const lower = lowerA;
const encoded = btoa(heading + ':' + lower);

@Injectable({
  providedIn: 'root'
})
export class ShipstationService {
  private readonly BASE_URL = environment.apiBaseUrl;
  shipstationBaseUrl = 'https://ssapi.shipstation.com/shipments?';
  items = [];

  constructor(private router: Router, private http: HttpClient) { }

  getShipments = () => {
    return this.http.get(`${this.BASE_URL}/shipments`);
  }

  getLine = () => {
    return this.http.get(`${this.BASE_URL}/lineitems`);
  }
  getLine1 = () => {
    return this.http.get(`${this.shipstationBaseUrl}createDateStart=2021-01-01&storeId=78297&createDateEnd=2021-01-31&includeShipmentItems=true&pageSize=500&page=1`, {
      headers: {
          Authorization: 'Basic ' + encoded,
      },
    });
  }
  getLine2 = () => {
    return this.http.get(`${this.shipstationBaseUrl}createDateStart=2021-01-01&storeId=78297&createDateEnd=2021-01-31&includeShipmentItems=true&pageSize=500&page=2`, {
      headers: {
          Authorization: 'Basic ' + encoded,
      },
    });
  }
  getLine3 = () => {
    return this.http.get(`${this.shipstationBaseUrl}createDateStart=2021-01-01&storeId=78297&createDateEnd=2021-01-31&includeShipmentItems=true&pageSize=500&page=3`, {
      headers: {
          Authorization: 'Basic ' + encoded,
      },
    });
  }
  getLine4 = () => {
    return this.http.get(`${this.shipstationBaseUrl}createDateStart=2021-01-01&storeId=78297&createDateEnd=2021-01-31&includeShipmentItems=true&pageSize=500&page=4`, {
      headers: {
          Authorization: 'Basic ' + encoded,
      },
    });
  }
  // combineLat = () => {
  //   combineLatest([this.getLine1(), this.getLine2(), this.getLine3(), this.getLine4()]).subscribe((res) => {
  //     console.log(res);
  //     return res;
  //   });
  // }

}
