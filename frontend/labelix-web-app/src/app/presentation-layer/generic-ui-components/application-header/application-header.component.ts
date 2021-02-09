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
  }

  async ngOnInit(): Promise<void> {
    this.userFacade.isLoggedIn$.asObservable().subscribe(value => this.isLoggedIn = value);
    this.delayedCheckForLoginCredentials();
    this.router.navigate(['/projects']);
    this.isLoggedIn = await this.userFacade.checkLoggedIn();
  }

  ngOnDestroy() {
  }

  delayedCheckForLoginCredentials() {

  }

  async login() {
    this.isLoggedIn = await this.userFacade.checkLoggedIn();
    this.userFacade.login();
  }

  async logout() {
    this.isLoggedIn = await this.userFacade.checkLoggedIn();
    this.userFacade.logout();
  }

  getUserName(): string {
    if (this.isLoggedIn) {
      // @ts-ignore
      return this.userFacade.currentUser.username;
    } else {
      return '';
    }
  }

}
