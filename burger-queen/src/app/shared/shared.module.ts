import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { TimerComponent } from './timer/timer.component';


@NgModule({
  declarations: [
    CardComponent,
    HeaderComponent,
    TimerComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    CardComponent,
    HeaderComponent,
    TimerComponent
  ]
})
export class SharedModule { }
