import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaiterRoutingModule } from './waiter-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OrdersComponent,
    ListOrdersComponent,
  ],
  imports: [
    CommonModule,
    WaiterRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class WaiterModule { }
