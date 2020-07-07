import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApplicationHeaderComponent} from './generic-ui-components/application-header/application-header.component';
import {DrawerContentComponent} from './generic-ui-components/drawer-content/drawer-content.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';



import { MaterialModule } from './material.module';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationHeaderComponent,
    DrawerContentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
