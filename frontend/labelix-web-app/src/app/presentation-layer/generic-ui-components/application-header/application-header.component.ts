import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-application-header',
  templateUrl: './application-header.component.html',
  styleUrls: ['./application-header.component.css']
})
export class ApplicationHeaderComponent implements OnInit {

  constructor(public router: Router, private oauthService: OAuthService) { }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get getClaimName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    // @ts-ignore
    return claims.given_name;
  }

  ngOnInit(): void {
    this.router.navigate(['/projects']);
  }

}
