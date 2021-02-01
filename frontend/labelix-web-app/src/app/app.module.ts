import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApplicationHeaderComponent} from './presentation-layer/generic-ui-components/application-header/application-header.component';
import {DrawerContentComponent} from './presentation-layer/generic-ui-components/drawer-content/drawer-content.component';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {NgxImageZoomModule} from 'ngx-image-zoom';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {UserFacade} from './abstraction-layer/UserFacade';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {initializer} from './core-layer/utility/init';
import {AuthGuard} from './core-layer/guard/auth-guard';

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
    NgxImageZoomModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    KeycloakAngularModule
  ],
  providers: [
    UserFacade,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService],
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
