import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ApplicationHeaderComponent} from './generic-ui-components/application-header/application-header.component';


const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () => import('./project-overview/project-overview.module')
      .then((m) => m.ProjectOverviewModule)
  },
  {path: '', component: ApplicationHeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
