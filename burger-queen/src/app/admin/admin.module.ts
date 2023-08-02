import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { WorkersComponent } from './workers/workers.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateWorkersComponent } from './create-workers/create-workers.component';
import { ProductsAdminComponent } from './products-admin/products-admin.component';


@NgModule({
  declarations: [
    WorkersComponent,
    CreateWorkersComponent,
    ProductsAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
