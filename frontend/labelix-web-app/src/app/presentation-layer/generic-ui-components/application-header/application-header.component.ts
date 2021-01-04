import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-application-header',
  templateUrl: './application-header.component.html',
  styleUrls: ['./application-header.component.css']
})
export class ApplicationHeaderComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/projects']);
  }

}
