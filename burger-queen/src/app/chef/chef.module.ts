import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChefRoutingModule } from './chef-routing.module';
import { StandbyOrdersComponent } from './standby-orders/standby-orders.component';


@NgModule({
  declarations: [
    StandbyOrdersComponent
  ],
  imports: [
    CommonModule,
    ChefRoutingModule
  ]
})
export class ChefModule { }
