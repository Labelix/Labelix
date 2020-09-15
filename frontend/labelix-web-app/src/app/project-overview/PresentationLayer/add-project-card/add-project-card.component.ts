import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ProjectCreationDialogComponent} from '../project-creation-dialog/project-creation-dialog.component';

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
    const dialogRef = this.dialog.open(ProjectCreationDialogComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
