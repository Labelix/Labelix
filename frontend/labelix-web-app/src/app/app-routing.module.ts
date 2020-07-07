import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ApplicationHeaderComponent} from './generic-ui-components/application-header/application-header.component';


const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () => import('./project-overview/project-overview.module')
      .then((m) => m.ProjectOverviewModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module')
      .then((m) => m.SettingsModule)
  },
  {
    path: 'colleagues',
    loadChildren: () => import('./colleagues/colleagues.module')
      .then((m) => m.ColleaguesModule)
  },
  {
    path: '', component: ApplicationHeaderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
