import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Project} from '../../../core-layer/models/Project';

@Component({
  selector: 'app-project-edit-dialog',
  templateUrl: './project-edit-dialog.component.html',
  styleUrls: ['./project-edit-dialog.component.css']
})
export class ProjectEditDialogComponent implements OnInit {

  @Inject(MAT_DIALOG_DATA) public data: Project;

  constructor() { }

  ngOnInit(): void {
  }

}
