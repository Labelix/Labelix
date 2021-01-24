import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserFacade} from '../../../abstraction-layer/UserFacade';
import {TimeInterval} from 'rxjs';

@Component({
  selector: 'app-application-header',
  templateUrl: './application-header.component.html',
  styleUrls: ['./application-header.component.css']
})
export class ApplicationHeaderComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean;
  interval;

  constructor(public router: Router, private userFacade: UserFacade) {
    this.isLoggedIn = this.userFacade.checkLoggedIn();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.userFacade.checkLoggedIn();
    this.userFacade.isLoggedIn$.asObservable().subscribe(value => this.isLoggedIn = value);
    this.delayedCheckForLoginCredentials();
    this.router.navigate(['/projects']);
  }

  ngOnDestroy() {
  }

  delayedCheckForLoginCredentials() {
    if (!this.isLoggedIn) {
      this.interval = setInterval(() => {
        this.isLoggedIn = this.userFacade.checkLoggedIn();
        if (this.isLoggedIn === false) {
          this.delayedCheckForLoginCredentials();
        }
      }, 100);
    }
  }

  login() {
    this.isLoggedIn = this.userFacade.checkLoggedIn();
    this.userFacade.login();
  }

  logout() {
    this.isLoggedIn = this.userFacade.checkLoggedIn();
    this.userFacade.logout();
  }

  getUserName(): string {
    if (this.isLoggedIn) {
      // @ts-ignore
      return this.userFacade.getIdentityClaims().name;
    } else {
      return '';
    }
  }

}
