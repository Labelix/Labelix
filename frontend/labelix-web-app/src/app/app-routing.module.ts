import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ApplicationHeaderComponent} from './presentation-layer/generic-ui-components/application-header/application-header.component';


const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () => import('./presentation-layer/project-overview/project-overview.module')
      .then((m) => m.ProjectOverviewModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./presentation-layer/settings/settings.module')
      .then((m) => m.SettingsModule)
  },
  {
    path: 'colleagues',
    loadChildren: () => import('./presentation-layer/colleagues/colleagues.module')
      .then((m) => m.ColleaguesModule)
  },
  {
    path: 'image-annotation',
    loadChildren: () => import('./presentation-layer/image-annotation/image-annotation.module')
      .then((m) => m.ImageAnnotationModule)
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
