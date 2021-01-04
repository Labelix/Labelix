import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingsBaseComponent} from './PresentationLayer/settings-base/settings-base.component';


const routes: Routes = [
  {path: '', component: SettingsBaseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
