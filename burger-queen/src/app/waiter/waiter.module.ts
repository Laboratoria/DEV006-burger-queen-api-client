import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaiterRoutingModule } from './waiter-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';


@NgModule({
  declarations: [
    OrdersComponent,
    PendingOrdersComponent
  ],
  imports: [
    CommonModule,
    WaiterRoutingModule
  ]
})
export class WaiterModule { }
