import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { BannerComponent } from './banner/banner.component';
import { CardComponent } from './card/card.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    BannerComponent,
    CardComponent,
    NewsletterComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatSliderModule,
  ],
  exports: [
    BannerComponent,
    CardComponent,
    NewsletterComponent,
  ]
})
export class SharedModule {  }
