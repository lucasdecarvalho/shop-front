import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './slider/slider.component';
import { CardComponent } from './card/card.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { SharedRoutingModule } from './shared-routing.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    CardComponent,
    NewsletterComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    CardComponent,
    NewsletterComponent,
    SearchComponent,
  ]
})
export class SharedModule { }
