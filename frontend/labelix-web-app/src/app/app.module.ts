import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {ApplicationHeaderComponent} from './generic-ui-components/application-header/application-header.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {DrawerContentComponent} from './generic-ui-components/drawer-content/drawer-content.component';
import {ProjectOverviewBaseComponent} from './project-overview/PresentationLayer/project-overview-base/project-overview-base.component';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationHeaderComponent,
    DrawerContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
