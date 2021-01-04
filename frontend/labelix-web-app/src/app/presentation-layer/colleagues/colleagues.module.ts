import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColleaguesRoutingModule } from './colleagues-routing.module';
import { ColleaguesBaseComponent } from './colleagues-base/colleagues-base.component';


@NgModule({
  declarations: [ColleaguesBaseComponent],
  imports: [
    CommonModule,
    ColleaguesRoutingModule
  ]
})
export class ColleaguesModule { }
