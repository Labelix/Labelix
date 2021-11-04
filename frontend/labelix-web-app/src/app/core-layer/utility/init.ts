import {KeycloakService} from 'keycloak-angular';

/*
export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: 'http://localhost:8180/auth/',
            realm: 'Labelix',
            clientId: 'frontend',
          },
          loadUserProfileAtStartUp: false,
          // initOptions: {
          //   onLoad: 'login-required',
          //   checkLoginIframe: true
          // },
          enableBearerInterceptor: true,
          bearerPrefix: 'Bearer',
          bearerExcludedUrls: []
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}*/

export function initializer(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8180/auth/',
        realm: 'Labelix',
        clientId: 'frontend',
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: [],
      loadUserProfileAtStartUp: false,
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}
