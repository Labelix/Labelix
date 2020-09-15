import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IRawImage} from '../../../utility/contracts/IRawImage';
import {RawImageFacade} from '../../AbstractionLayer/RawImageFacade';
import {Router} from '@angular/router';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  constructor(private facade: RawImageFacade,
              private router: Router,
              private annotationFacade: AnnotationFacade) {
  }

  @ViewChild('fileDropRef', {static: false}) fileDropEl: ElementRef;

  listOfFiles: IRawImage[];
  nums: number;

  ngOnInit(): void {
    this.facade.numberOfImages$.subscribe(value => this.nums = value);
    this.facade.files$.subscribe(value => this.listOfFiles = value);
  }

  onFileDropped($event) {
    const tmp: IRawImage[] = [];

    let count = 1;
    for (const item of $event) {
      // base 64 encoding wird später hinzugefügt
      tmp.push({id: count, file: item, height: -1, width: -1, base64Url: '', name: item.name});
      count++;
    }

    this.facade.uploadRawImages(tmp);
    this.annotationFacade.changeCurrentAnnotationImage(tmp[0]);

    this.router.navigate(['image-annotation/image-view']);
  }

}
