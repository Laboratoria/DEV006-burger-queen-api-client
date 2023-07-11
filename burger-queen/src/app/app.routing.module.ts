import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', loadChildren: () => import ('./modules/login/login.module').then((m) => m.LoginModule) },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
