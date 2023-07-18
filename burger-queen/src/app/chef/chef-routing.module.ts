import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandbyOrdersComponent } from './standby-orders/standby-orders.component';

const routes: Routes = [
  {
    path: '',
    component: StandbyOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChefRoutingModule { }
