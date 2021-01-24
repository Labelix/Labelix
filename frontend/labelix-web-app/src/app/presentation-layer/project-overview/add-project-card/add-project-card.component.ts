import { Component, OnInit } from '@angular/core';
import {ProjectCreationDialogComponent} from '../project-creation-dialog/project-creation-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-add-project-card',
  templateUrl: './add-project-card.component.html',
  styleUrls: ['./add-project-card.component.css']
})
export class AddProjectCardComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onAddCardClick() {
    this.dialog.open(ProjectCreationDialogComponent, {
      height: '80%',
      width: '60%',
    });
  }
}
