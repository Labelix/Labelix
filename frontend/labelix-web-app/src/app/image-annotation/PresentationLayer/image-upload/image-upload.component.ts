import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  constructor() {
  }

  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;

  files: File[] = [];

  ngOnInit(): void {
  }


  onFileDropped($event){
    for (const item of $event) {
      this.files.push(item);
    }
  }

}
