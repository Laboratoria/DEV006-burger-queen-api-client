import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MenuDesayunoComponent } from './menu-desayuno/menu-desayuno.component';
import { MenuAlmuerzoComponent } from './menu-almuerzo/menu-almuerzo.component';

const routes: Routes = [
  {
    path: 'desayuno',
    component: MenuDesayunoComponent,
  },
  {
    path: 'almuerzo',
    component: MenuAlmuerzoComponent,
  }
]

@NgModule({
  declarations: [
    MenuDesayunoComponent,
    MenuAlmuerzoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MeseroModule { }
