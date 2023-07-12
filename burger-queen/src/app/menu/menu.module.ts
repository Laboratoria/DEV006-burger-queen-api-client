import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuDesayunoComponent } from './menu-desayuno/menu-desayuno.component';


@NgModule({
  declarations: [
    MenuDesayunoComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
