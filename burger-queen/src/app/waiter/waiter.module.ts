import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaiterRoutingModule } from './waiter-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
// import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';
// import { HeaderComponent } from '../plantillas/header/header.component';
import { SharedModule } from '../shared/shared.module';
// import { OrderDetailsComponent } from './order-details/order-details.component';


@NgModule({
  declarations: [
    OrdersComponent,
    // HeaderComponent,
    ListOrdersComponent,
    // CardComponent
    // OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    WaiterRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class WaiterModule { }
