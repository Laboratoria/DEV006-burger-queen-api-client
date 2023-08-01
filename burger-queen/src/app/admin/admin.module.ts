import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { WorkersComponent } from './workers/workers.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    WorkersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
