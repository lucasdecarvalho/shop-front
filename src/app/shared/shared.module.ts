import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SliderComponent } from './slider/slider.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    SliderComponent,
    CardComponent,
  ],
  imports: [
  CommonModule,
    SharedRoutingModule
  ],
  exports: [
    SliderComponent,
    CardComponent
  ]
})
export class SharedModule { }
