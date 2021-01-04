import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsBaseComponent } from './PresentationLayer/settings-base/settings-base.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { AiConfigSettingsComponent } from './PresentationLayer/ai-config-settings/ai-config-settings.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {AiModelConfigFacade} from '../project-overview/AbstractionLayer/AiModelConfigFacade';
import {MatListModule} from '@angular/material/list';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [SettingsBaseComponent, AiConfigSettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    AiModelConfigFacade
  ]
})
export class SettingsModule { }
