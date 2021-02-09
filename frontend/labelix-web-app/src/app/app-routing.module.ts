import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ApplicationHeaderComponent} from './presentation-layer/generic-ui-components/application-header/application-header.component';
import {AuthGuard} from './core-layer/guard/auth-guard';
import {PendingChangesGuard} from './core-layer/guard/PendingChangesGuard';


const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () => import('./presentation-layer/project-overview/project-overview.module')
      .then((m) => m.ProjectOverviewModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./presentation-layer/settings/settings.module')
      .then((m) => m.SettingsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'colleagues',
    loadChildren: () => import('./presentation-layer/colleagues/colleagues.module')
      .then((m) => m.ColleaguesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'image-annotation',
    loadChildren: () => import('./presentation-layer/image-annotation/image-annotation.module')
      .then((m) => m.ImageAnnotationModule),
    canActivate: [AuthGuard]
  },
  {
    path: '', component: ApplicationHeaderComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
