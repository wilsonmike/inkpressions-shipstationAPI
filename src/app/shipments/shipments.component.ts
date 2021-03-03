import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ShipstationService } from '../shipstation.service';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit {
  sum = 0;
  fulfillment = 0;
  masterTotal = 0;
  term = '';
  grandTotal = 0;
  lineitemtotal = 0;
  lineX: any = [];
  grandTotalX: any = [];
  // new naming convention
  startArray = [];
  totalArray = [];
  totalArrayFiltered = [];
  shippingTotal = 0;

  constructor(private service: ShipstationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    combineLatest([this.service.getLine1(), this.service.getLine2(), this.service.getLine3(), this.service.getLine4()]).subscribe((res) => {
      this.startArray = res;
      // tslint:disable-next-line:max-line-length
      this.totalArray = this.startArray[0].shipments.concat(this.startArray[1].shipments, this.startArray[2].shipments, this.startArray[3].shipments);
      this.totalArrayFiltered = this.totalArray.filter((item) => {
        return !item.shipDate.includes('2020');
      });
      this.totalArrayFiltered.sort(( a , b) => (a.orderNumber > b.orderNumber) ? 1 : -1);
      for (const item of this.totalArrayFiltered) {
        this.sum += item.shipmentCost;
        this.fulfillment += 1.40;
        this.shippingTotal = this.sum + this.fulfillment;
        this.masterTotal = this.shippingTotal + this.lineitemtotal;
      }
    });
    this.getLine();
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
        // this.masterTotal = this.shippingTotal + this.lineitemtotal;
        return this.grandTotalX;
      });
    });
  }
}
