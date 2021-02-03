import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApplicationHeaderComponent} from './presentation-layer/generic-ui-components/application-header/application-header.component';
import {DrawerContentComponent} from './presentation-layer/generic-ui-components/drawer-content/drawer-content.component';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';


import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {OAuthModule, OAuthService, OAuthStorage} from 'angular-oauth2-oidc';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {UserFacade} from './abstraction-layer/UserFacade';

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
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    OAuthModule.forRoot(),
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  providers: [
    UserFacade,
    { provide: OAuthStorage, useValue: localStorage },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }

}
