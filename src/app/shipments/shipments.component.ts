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
  shipmentCostOne: any = [];
  shipmentCostTwo: any = [];
  shipmentCostThree: any = [];
  shipmentCostFour: any = [];
  sum = 0;

  constructor(private service: ShipstationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getShipments().subscribe((response) => {
      this.orders = response;
      this.shipmentCostOne = this.orders[0].shipments.concat(this.orders[1].shipments, this.orders[2].shipments, this.orders[3].shipments);
      this.shipmentCostOne.sort(( a , b ) => (a.orderNumber > b.orderNumber) ? 1 : -1);
      console.log(this.shipmentCostOne);
      for (const item of this.shipmentCostOne) {
        this.sum += item.shipmentCost;
      }
    });
    this.getShipments();
  }
  getShipments = () => {
    this.service.getShipments().subscribe((response) => {
      this.orders = response;
      console.log(this.shipmentCostOne);
      this.shipmentCostOne.filter((sku) => {
        if (sku.shipmentItems !== null) {
          // console.log(sku.shipmentItems.map());
        }
      });
    });
  }
}
