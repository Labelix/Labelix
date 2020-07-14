import { Component, OnInit } from '@angular/core';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';
import {AnnotaionMode} from '../../CoreLayer/annotaionModeEnum';

@Component({
  selector: 'app-widget-bar',
  templateUrl: './widget-bar.component.html',
  styleUrls: ['./widget-bar.component.css']
})
export class WidgetBarComponent implements OnInit {

  constructor(private annotationFacade: AnnotationFacade) { }

  currentAnnotationMode: AnnotaionMode;

  ngOnInit(): void {
    this.annotationFacade.currentAnnotationMode.subscribe(value => this.currentAnnotationMode = value);
  }

}
