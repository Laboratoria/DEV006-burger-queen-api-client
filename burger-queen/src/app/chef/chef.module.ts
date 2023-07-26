import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChefRoutingModule } from './chef-routing.module';
import { StandbyOrdersComponent } from './standby-orders/standby-orders.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    StandbyOrdersComponent,

  ],
  imports: [
    CommonModule,
    ChefRoutingModule,
    SharedModule
  ]
})
export class ChefModule { }
