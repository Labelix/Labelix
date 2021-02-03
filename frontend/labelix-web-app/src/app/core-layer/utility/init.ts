import { KeycloakService } from 'keycloak-angular';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: 'https://labelix.me/auth/',
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
}
