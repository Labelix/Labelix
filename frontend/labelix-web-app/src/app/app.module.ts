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
import {OAuthModule, OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from './auth.config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

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
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler =
      new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

}
