import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChefRoutingModule } from './chef-routing.module';
import { StandbyOrdersComponent } from './standby-orders/standby-orders.component';
// import { CardComponent } from '../card/card.component';
// import { HeaderComponent } from '../plantillas/header/header.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    StandbyOrdersComponent,
    // CardComponent,
    // HeaderComponent
  ],
  imports: [
    CommonModule,
    ChefRoutingModule,
    SharedModule
  ]
})
export class ChefModule { }
