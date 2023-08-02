import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkersComponent } from './workers/workers.component';
import { ProductsAdminComponent } from './products-admin/products-admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'workers',
    pathMatch: 'full'
  },
  {
    path: 'workers',
    component: WorkersComponent,
  },
  {
    path: 'products',
    component: ProductsAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
