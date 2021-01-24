
import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  issuer: 'http://167.172.110.28:8180/auth/realms/Labelix',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // The SPA's id.
  // The SPA is registerd with this id at the auth-server
  clientId: 'frontend',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC.
  scope: 'microprofile-jwt',
  // Remove the requirement of using Https to simplify the demo
  // THIS SHOULD NOT BE USED IN PRODUCTION
  // USE A CERTIFICATE FOR YOUR IDP
  // IN PRODUCTION
  requireHttps: false
};
