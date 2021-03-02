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
  result: any = [];
  shipmentCostOne: any = [];
  shipmentCostTwo: any = [];
  shipmentCostThree: any = [];
  shipmentCostFour: any = [];
  sum = 0;
  fulfillment = 0;
  masterTotal = 0;
  term = '';
  grandTotal = 0;
  lineitemtotal = 0;
  lineX: any = [];
  grandTotalX: any = [];

  constructor(private service: ShipstationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getShipments().subscribe((response) => {
      this.orders = response;
      this.shipmentCostOne = this.orders[0].shipments.concat(this.orders[1].shipments, this.orders[2].shipments, this.orders[3].shipments);
      this.result = this.shipmentCostOne.filter((order) => {
        return !order.shipDate.includes('2020');
      });
      // this.result = this.shipmentCostOne;
      this.result.sort(( a , b ) => (a.orderNumber > b.orderNumber) ? 1 : -1);
      // console.log(this.result);
      // console.log(this.shipmentCostOne);
      for (const item of this.result) {
        this.sum += item.shipmentCost;
        this.fulfillment += 1.40;
        this.grandTotal = this.sum + this.fulfillment;
      }
    });
    this.getShipments();
    this.getLine();
  }
  getShipments = () => {
    this.service.getShipments().subscribe((response) => {
      this.orders = response;
      // console.log(this.shipmentCostOne);
      // this.shipmentCostOne.filter((sku) => {
      //   if (sku.shipmentItems !== null) {
      //     console.log(sku.shipmentItems.map((name) => {
      //       if (name.name === '') {
      //         this.lineitemtotal += 2;
      //         console.log(this.lineitemtotal);
      //       }
      //     }));
      //   }
      // });
    });
  }
  getLine = () => {
    this.service.getLine().subscribe((response) => {
      this.lineX = response;
      this.lineX.splice(0, 1);
      // console.log(this.lineX);
      this.lineX.map((total) => {
        // console.log(total);
        this.grandTotalX = Number(total.totalprice.replace(/[^0-9.-]+/g, '') * Number(total.qtysold));
        this.lineitemtotal += this.grandTotalX;
        this.masterTotal = this.grandTotal + this.lineitemtotal;
        return this.grandTotalX;
      });
    });
  }
}
