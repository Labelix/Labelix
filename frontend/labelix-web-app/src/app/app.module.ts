import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApplicationHeaderComponent} from './generic-ui-components/application-header/application-header.component';
import {DrawerContentComponent} from './generic-ui-components/drawer-content/drawer-content.component';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';


import {MaterialModule} from './material.module';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import * as $ from 'jquery';

window['$'] = $;

@NgModule({
  declarations: [
    AppComponent,
    ApplicationHeaderComponent,
    DrawerContentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
