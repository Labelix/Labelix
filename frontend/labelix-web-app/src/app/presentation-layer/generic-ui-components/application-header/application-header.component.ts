import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserFacade} from '../../../abstraction-layer/UserFacade';

@Component({
  selector: 'app-application-header',
  templateUrl: './application-header.component.html',
  styleUrls: ['./application-header.component.css']
})
export class ApplicationHeaderComponent implements OnInit {

  constructor(public router: Router, private userFacade: UserFacade) {
  }

  login() {
    this.userFacade.login();
  }

  logout() {
    this.userFacade.logout();
  }

  getUserName(): string {
    if (this.userFacade.isLoggedIn()) {
      // @ts-ignore
      return this.userFacade.getIdentityClaims().name;
    } else {
      return '';
    }
  }

  isLoggedIn(): boolean {
    return this.userFacade.isLoggedIn();
  }

  ngOnInit(): void {
    this.router.navigate(['/projects']);
  }

}
