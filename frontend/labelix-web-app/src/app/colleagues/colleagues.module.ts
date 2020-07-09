import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColleaguesRoutingModule } from './colleagues-routing.module';
import { ColleaguesBaseComponent } from './PresentationLayer/colleagues-base/colleagues-base.component';


@NgModule({
  declarations: [ColleaguesBaseComponent],
  imports: [
    CommonModule,
    ColleaguesRoutingModule
  ]
})
export class ColleaguesModule { }
