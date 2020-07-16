import {Component, OnInit} from '@angular/core';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';
import {AnnotaionMode} from '../../CoreLayer/annotaionModeEnum';
import {MatDialog} from '@angular/material/dialog';
import {SingleAnnotationExportFormComponent} from '../single-annotation-export-form/single-annotation-export-form.component';

@Component({
  selector: 'app-widget-bar',
  templateUrl: './widget-bar.component.html',
  styleUrls: ['./widget-bar.component.css']
})
export class WidgetBarComponent implements OnInit {

  constructor(private annotationFacade: AnnotationFacade, public dialog: MatDialog) {
  }

  currentAnnotationMode: AnnotaionMode;

  ngOnInit(): void {
    this.annotationFacade.currentAnnotationMode.subscribe(value => this.currentAnnotationMode = value);
  }

  openExportDialog() {
    const dialogRef = this.dialog.open(SingleAnnotationExportFormComponent);
  }

}
