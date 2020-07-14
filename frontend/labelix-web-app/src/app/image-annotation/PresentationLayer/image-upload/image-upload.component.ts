import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IFile} from '../../../utility/contracts/IFile';
import {RawImageFacade} from '../../AbstractionLayer/RawImageFacade';
import {Router} from '@angular/router';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';
import {AnnotaionMode} from '../../CoreLayer/annotaionModeEnum';

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

  listOfFiles: IFile[];
  nums: number;

  ngOnInit(): void {
    this.facade.numberOfImages$.subscribe(value => this.nums = value);
    this.facade.files$.subscribe(value => this.listOfFiles = value);
  }

  onFileDropped($event) {
    const tmp: IFile[] = [];

    for (const item of $event) {
      console.log(item.name);
      tmp.push({id: this.nums, file: item, height: -1, width: -1});
    }

    this.facade.uploadRawImages(tmp);
    this.annotationFacade.changeCurrentAnnotationImage(tmp[0]);
    this.annotationFacade.addImageAnnotation({
      id: -1,
      annotationMode: AnnotaionMode.WHOLE_IMAGE,
      area: -1,
      boundingBox: undefined,
      categoryLabel: undefined,
      image: tmp[0],
      isCrowd: false,
      segmentations: []
    });

    this.router.navigate(['image-annotation/image-view']);
  }

}
