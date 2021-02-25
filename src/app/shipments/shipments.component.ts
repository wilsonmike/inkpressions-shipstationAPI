import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipstationService } from '../shipstation.service';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit {
  orders: any = [];

  constructor(private service: ShipstationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getShipments().subscribe((response) => {
      this.orders = response;
      console.log(this.orders);
    });
  }
  getShipments = () => {
    this.service.getShipments().subscribe((response) => {
      this.orders = response;
    });
  }

}
