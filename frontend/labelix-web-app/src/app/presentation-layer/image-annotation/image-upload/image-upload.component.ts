import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IRawImage} from '../../../core-layer/contracts/IRawImage';
import {RawImageFacade} from '../../../abstraction-layer/RawImageFacade';
import {Router} from '@angular/router';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit, OnDestroy {

  listOfFiles: IRawImage[];
  nums: number;
  subscription: Subscription;

  @ViewChild('fileDropRef', {static: false}) fileDropEl: ElementRef;

  constructor(private facade: RawImageFacade,
              private router: Router,
              private annotationFacade: AnnotationFacade) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.facade.numberOfImages$.subscribe(value => this.nums = value));
    this.subscription.add(this.facade.rawImages$.subscribe(value => this.listOfFiles = value));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFileDropped($event) {

    const tmp: IRawImage[] = [];

    let count = 1;
    for (const item of $event) {
      // base 64 encoding wird später hinzugefügt
      tmp.push({id: count, file: item, height: -1, width: -1, base64Url: '', name: item.name});
      count++;
    }

    this.annotationFacade.resetAnnotationState();
    this.facade.addRawImagesToState(tmp);
    this.annotationFacade.changeCurrentAnnotationImage(tmp[0]);

    this.router.navigate(['image-annotation/image-view']);
  }

}
