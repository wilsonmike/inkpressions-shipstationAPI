import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShipstationService {
  baseURL = 'http://localhost:3000';

  constructor(private router: Router, private http: HttpClient) { }

  getShipments = () => {
    return this.http.get(`${this.baseURL}/shipments`);
  }
}
